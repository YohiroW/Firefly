---
title: "Dont Store That In A Float"
published: 2019-03-16
author: "Brucedawson"
category: "Game & Engine Development"
tags: ["floating-point", "precision", "programming"]
---

之前做Time of Day系统的时候遇到过一个精度问题，然后看到了这样的一篇文章感觉挺有意思，所以拿来记录一下。

原文传送门👉[**Don’t Store That in a Float \| Random ASCII**](https://randomascii.wordpress.com/2012/02/13/dont-store-that-in-a-float/)

---

文章的核心是论证浮点数精度的重要性，并引入了浮点数的一些数学性质。

有些类型的数据，如已流逝的游戏时间不应当使用float而应该用双精度的double。



