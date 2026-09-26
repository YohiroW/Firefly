import fs from "node:fs/promises";
import { githubContributionsConfig } from "../src/config/githubContributionsConfig";

const OUTPUT_FILE = "src/constants/github-contributions.json";
const API_URL = "https://api.github.com/graphql";
const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}`;

type ContributionDay = {
	date: string;
	contributionCount: number;
	contributionLevel: string;
};

type ContributionCalendar = {
	totalContributions: number;
	weeks: { contributionDays: ContributionDay[] }[];
};

async function main() {
	if (!githubContributionsConfig.enable) return;

	const token = process.env.GITHUB_TOKEN?.trim();
	if (!token) {
		console.warn(
			"[GITHUB-CONTRIBUTIONS] No GITHUB_TOKEN; using the existing snapshot.",
		);
		return;
	}

	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			Accept: "application/vnd.github+json",
		},
		body: JSON.stringify({
			query: QUERY,
			variables: { login: githubContributionsConfig.username },
		}),
		signal: AbortSignal.timeout(10000),
	});

	if (!response.ok) {
		throw new Error(`GitHub GraphQL request failed (${response.status}).`);
	}

	const result = (await response.json()) as {
		data?: {
			user?: {
				contributionsCollection?: {
					contributionCalendar?: ContributionCalendar;
				};
			};
		};
		errors?: unknown[];
	};
	const calendar =
		result.data?.user?.contributionsCollection?.contributionCalendar;
	if (
		result.errors?.length ||
		!calendar ||
		!Number.isInteger(calendar.totalContributions) ||
		!Array.isArray(calendar.weeks) ||
		calendar.weeks.length === 0 ||
		calendar.weeks.some(
			(week) =>
				!Array.isArray(week.contributionDays) ||
				week.contributionDays.some(
					(day) =>
						!/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
						!Number.isInteger(day.contributionCount) ||
						!submissionLevels.has(day.contributionLevel),
				),
		)
	) {
		throw new Error("GitHub returned an invalid contribution calendar.");
	}

	const snapshot = {
		username: githubContributionsConfig.username,
		updatedAt: new Date().toISOString(),
		totalContributions: calendar.totalContributions,
		weeks: calendar.weeks,
	};
	await fs.writeFile(OUTPUT_FILE, `${JSON.stringify(snapshot, null, "\t")}\n`);
	console.log(
		`[GITHUB-CONTRIBUTIONS] Updated ${snapshot.username} (${snapshot.weeks.length} weeks).`,
	);
}

const submissionLevels = new Set([
	"NONE",
	"FIRST_QUARTILE",
	"SECOND_QUARTILE",
	"THIRD_QUARTILE",
	"FOURTH_QUARTILE",
]);

main().catch((error: unknown) => {
	// Never log the request headers or token.
	console.error(
		"[GITHUB-CONTRIBUTIONS] Failed to refresh contribution data:",
		error instanceof Error ? error.message : "Unknown error",
	);
	process.exitCode = 1;
});
