---
prev: false
next: false
---

# MCP 协议

## 一、MCP 协议概述

MCP（`Model Context Protocol`，模型上下文协议）是由 `Anthropic` 公司（也就是开发 Claude 模型的公司）推出的一个开放标准协议，就像是一个 “通用插头” 或者 “USB 接口”，制定了统一的规范，不管是连接数据库、第三方 API，还是本地文件等各种外部资源，目的就是为了解决 AI 模型与外部数据源、工具交互的难题。

`MCP` 大概的工作方式：`MCP Host`，比如 `Claude Desktop、Cursor` 这些工具，在内部实现了 `MCP Client`，然后`MCP Client` 通过标准的 MCP 协议和 `MCP Server` 进行交互，由各种三方开发者提供的 `MCP Server` 负责实现各种和三方资源交互的逻辑，比如访问数据库、浏览器、本地文件，最终再通过 标准的 MCP 协议返回给 `MCP Client`，最终在 `MCP Host` 上展示。

## 参考文章

[1] [全网最细，一文带你弄懂 MCP 的核心原理！](https://mp.weixin.qq.com/s/yP6D_mnxwFsL3SbC4qZnYg)