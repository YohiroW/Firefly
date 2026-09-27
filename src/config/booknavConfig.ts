import type { BooknavGroup, BooknavPageConfig } from "../types/booknavConfig";

// 书签导航页面配置
export const booknavPageConfig: BooknavPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// favicon 自动获取配置
	favicon: {
		// 书签未填写 icon 时，是否自动获取目标站点的 favicon 图标
		enabled: true,

		// favicon 接口地址，{domain} 为占位符，会被替换成目标站点域名
		// 更换接口只需保证地址里含有 {domain}，例如：
		//   https://a.favicon.im/{domain}
		//   https://favicon.im/{domain}
		api: "https://a.favicon.im/{domain}",
	},
};

// 书签导航配置
// 每个数组项是一个分类组，分类组内的 items 是该分类下的书签
export const booknavConfig: BooknavGroup[] = [
	{
		id: "dev",
		name: "开发",
		icon: "material-symbols:code-rounded",
		desc: "写代码时离不开的站点",
		weight: 100,
		items: [
			{
				title: "GitHub",
				url: "https://github.com",
				desc: "全球最大的代码托管平台",
				// icon 字段可以使用 astro-icon 图标库的图标名称
				// 也可以使用图片 URL 和本地图片路径
				// 不填则会通过接口自动获取目标站点的 favicon 图标（需要在上面配置）
				icon: "fa7-brands:github",
				weight: 10,
			},
			{
				title: "Godot",
				url: "https://godotengine.org/",
				desc: "开源免费 2D/3D 游戏引擎",
				weight: 9,
			},
			{
				title: "Blender",
				url: "https://www.blender.org/",
				desc: "开源 DCC 工具",
				weight: 9,
			},
		],
	},
	{
		id: "blogs",
		name: "技术博客",
		icon: "material-symbols:code-rounded",
		desc: "与图形、设计、开发相关的博客",
		weight: 100,
		items: [
			{
				title: "SelfShadow",
				url: "https://blog.selfshadow.com/",
				weight: 10,
			},
			{
				title: "Jendrik Illner",
				url: "https://www.jendrikillner.com/index.html",
				desc: "Weekly Graphics",
				weight: 9,
			},
			{
				title: "ぼっちプログラマのメモ",
				url: "https://pafuhana1213.hatenablog.com/",
				desc: "关于 unreal engine 的开发",
				weight: 8,
			},
			{
				title: "The Danger Zone",
				url: "https://therealmjp.github.io/posts/",
				desc: "Graphics, engine, and game programming.",
				weight: 8,
			},
			{
				title: "The ryg blog",
				url: "https://fgiesen.wordpress.com/",
				desc: "When I grow up I'll be an inventor.",
				weight: 8,
			},
			{
				title: "Inigo Quilez",
				url: "https://iquilezles.org/",
				desc: "",
				weight: 8,
			},
		],
	},
	{
		id: "opensource",
		name: "项目",
		icon: "material-symbols:code-rounded",
		desc: "好用的开源项目",
		weight: 90,
		items: [
			{
				title: "Firefly",
				url: "https://github.com/CuteLeaf/Firefly",
				desc: "清晰美观的 Astro 个人博客主题模板",
				icon: "/favicon/firefly-32.png",
				weight: 10,
			},
			{
				title: "SmartRename",
				url: "https://github.com/chrdavis/SmartRename",
				desc: "基于 win shell 的重命名工具",
				weight: 10,
			},
			{
				title: "input-leap",
				url: "https://github.com/input-leap/input-leap",
				desc: "开源 KVM 工具",
				weight: 10,
			},
			{
				title: "code-review-graph",
				url: "https://github.com/tirth8205/code-review-graph",
				desc: "Local-first code intelligence graph for MCP and CLI.",
				weight: 10,
			},
		],
	},
	{
		id: "design",
		name: "设计",
		icon: "material-symbols:palette-outline-rounded",
		desc: "配色、图标与灵感来源",
		weight: 90,
		items: [
			{
				title: "ShaderToy",
				url: "https://www.shadertoy.com/",
				desc: "构建和分享你最喜欢的着色器",
				weight: 10,
			},
			{
				title: "Iconify",
				url: "https://icon-sets.iconify.design",
				desc: "海量开源图标集合搜索",
				weight: 10,
			},
			{
				title: "iconfont",
				url: "https://www.iconfont.cn",
				desc: "阿里巴巴矢量图标库",
				weight: 9,
			},
		],
	},
	{
		id: "tools",
		name: "工具",
		icon: "material-symbols:build-outline-rounded",
		desc: "顺手的在线小工具",
		weight: 80,
		items: [
			{
				title: "Compiler Explorer",
				url: "https://godbolt.org/",
				desc: "在线编译 cpp 并对比不同编译器下的汇编代码",
				weight: 10,
			},
			{
				title: "desmos",
				url: "https://www.desmos.com/calculator?lang=zh-CN",
				desc: "在线函数绘图工具",
				weight: 10,
			},
			{
				title: "TinyPNG",
				url: "https://tinypng.com",
				desc: "在线压缩 PNG / JPEG 图片",
				weight: 9,
			},
			{
				title: "Squoosh",
				url: "https://squoosh.app",
				desc: "Google 出品的图片压缩与格式转换",
				weight: 9,
			},
			{
				title: "ImGui Manual",
				url: "https://pthom.github.io/imgui_explorer/",
				desc: "Dear ImGui 的在线手册",
				weight: 8,
			},
			{
				title: "Carbon",
				url: "https://carbon.now.sh",
				desc: "把代码片段生成漂亮的图片",
				weight: 8,
			},
		],
	},
	{
		id: "resources",
		name: "资源",
		icon: "material-symbols:auto-stories-outline-rounded",
		desc: "文档、教程与阅读",
		weight: 70,
		items: [
			{
				title: "Unreal Engine Community",
				url: "https://dev.epicgames.com/community/unreal-engine/learning",
				desc: "Unreal Engine 官方学习社区",
				weight: 8,
			},
			{
				title: "GPU Gems 系列",
				url: "https://developer.nvidia.com/gpugems/gpugems3/contributors/",
				desc: "实时图形学技术概览",
				weight: 7,
			},
			{
				title: "Tech-Arists.Org",
				url: "https://www.tech-artists.org/",
				desc: "TA 交流中心",
				weight: 7,
			},
			{
				title: "Real-Time VFX",
				url: "https://realtimevfx.com/",
				desc: "",
				weight: 7,
			},
			{
				title: "Direct3D 12",
				url: "https://learn.microsoft.com/zh-cn/windows/win32/direct3d12/direct3d-12-graphics",
				desc: "Direct3D 12 官方指南",
				weight: 6,
			},
			{
				title: "游戏设计模式",
				url: "https://gpp.tkchu.me/acknowledgements.html",
				desc: "游戏开发中常用的设计模式",
				weight: 6,
			},
			{
				title: "C++ 参考手册",
				url: "https://en.cppreference.com/",
				desc: "c/cpp 参考大全",
				weight: 9,
			},
			{
				title: "Rust 参考手册",
				url: "https://doc.rust-lang.org/reference/index.html",
				desc: "Rust 参考手册",
				weight: 9,
			},
			{
				title: "Cpp 到 Rust 的参考手册",
				url: "https://tangxiangong.github.io/crp-zh/",
				desc: "适用于从 cpp 迁移到 rust 的开发者",
				weight: 9,
			},
			{
				title: "LINUX DO",
				url: "https://linux.do/",
				desc: "",
				weight: 9,
			},
			{
				title: "V2EX",
				url: "https://www.v2ex.com/",
				desc: "",
				weight: 9,
			},
		],
	},
];
