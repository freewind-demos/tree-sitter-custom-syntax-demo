# Tree-sitter Addition Parser Demo

这是一个使用 Tree-sitter 实现的简单加法表达式解析器示例。它可以解析形如 `1 + 2 + 3` 的加法表达式，并生成相应的语法树。

## 特性

- 支持基本的加法表达式
- 左结合性（例如：`1 + 2 + 3` 被解析为 `(1 + 2) + 3`）
- 生成详细的语法树
- TypeScript 支持

## 项目结构

```
.
├── README.md           # 项目文档
├── binding.gyp         # node-gyp 构建配置
├── bindings/          # Node.js 绑定代码
│   └── node/
│       └── binding.cc # C++ 绑定代码
├── grammar.js         # Tree-sitter 语法定义
├── package.json       # 项目配置和依赖
├── queries/          # Tree-sitter 查询
│   └── highlights.scm # 语法高亮规则
├── src/              # 源代码目录
│   ├── index.ts     # 主程序入口
│   ├── parser.c     # 生成的解析器代码
│   └── grammar.json # 生成的语法定义
├── test.add         # 测试文件
├── tsconfig.json    # TypeScript 配置
└── tree-sitter.json # Tree-sitter 配置
```

## 项目文件说明

本项目使用多种编程语言的文件，每种文件都有其特定的作用：

### 语法定义相关
1. `grammar.js` (JavaScript)
   - Tree-sitter 语法定义文件
   - 使用 JavaScript 定义我们的加法语法规则
   - 这是最重要的文件之一，定义了如何解析加法表达式

2. `src/grammar.json` (JSON)
   - 由 Tree-sitter 根据 grammar.js 自动生成
   - 包含编译后的语法规则
   - 不要手动修改此文件

### 解析器相关
1. `src/parser.c` (C)
   - Tree-sitter 自动生成的解析器代码
   - 包含实际的解析逻辑
   - 不要手动修改此文件
   - 修改 grammar.js 后会自动重新生成

2. `src/tree_sitter/parser.h` (C Header)
   - Tree-sitter 的核心头文件
   - 定义了解析器的基本数据结构和函数
   - 这是一个标准文件，不需要修改

### 绑定相关
1. `binding.gyp` (GYP)
   - node-gyp 构建配置文件
   - 定义如何将 C 代码编译为 Node.js 模块
   - 配置编译选项和目标文件名

2. `bindings/node/binding.cc` (C++)
   - Node.js 原生模块的绑定代码
   - 将 C 语言的解析器暴露给 Node.js
   - 处理 JavaScript 和 C 代码之间的交互

### 应用代码
1. `src/index.ts` (TypeScript)
   - 项目的主入口文件
   - 使用 Tree-sitter 解析器的示例代码
   - 处理解析结果的展示

### 配置文件
1. `tsconfig.json` (JSON)
   - TypeScript 配置文件
   - 定义编译选项和项目设置

2. `tree-sitter.json` (JSON)
   - Tree-sitter 工具的配置文件
   - 定义语法名称和文件位置

3. `package.json` (JSON)
   - Node.js 项目配置文件
   - 定义依赖和脚本命令

### 查询和测试
1. `queries/highlights.scm` (Tree-sitter Query)
   - 定义语法高亮规则
   - 使用 Tree-sitter 的查询语言编写

2. `test.add` (Custom)
   - 测试文件
   - 包含要解析的加法表达式

### 工作流程
1. 修改语法：
   - 编辑 `grammar.js`
   - 运行 `pnpm run build:grammar`
   - Tree-sitter 会自动生成 `parser.c` 和 `grammar.json`

2. 修改解析逻辑：
   - 编辑 `src/index.ts`
   - 运行 `pnpm run build`
   - 生成 JavaScript 代码

3. 测试：
   - 编辑 `test.add`
   - 运行 `pnpm run parse:test`
   - 查看解析结果

## Tree-sitter 的能力与局限性

Tree-sitter 是一个强大的解析器生成器，但它也有一些局限性：

### 可以处理的情况

1. **上下文无关语法**
   - 大多数编程语言的基本语法结构
   - 运算符优先级和结合性
   - 嵌套结构（如括号匹配）
   - 基本的词法分析

2. **增量解析**
   - 高效处理局部代码修改
   - 只重新解析修改的部分
   - 适合实时编辑器集成

3. **错误恢复**
   - 在遇到语法错误时继续解析
   - 生成部分正确的语法树
   - 适合IDE的实时语法分析

### 难以处理的情况

1. **上下文相关的语法**
   - 变量声明前使用（需要符号表）
   - 类型检查和类型推断
   - 函数重载解析
   - 宏展开和预处理器指令

2. **语义分析**
   - 变量作用域分析
   - 类型系统规则
   - 控制流分析
   - 数据流分析

3. **特殊语言特性**
   - Python 的缩进语法（需要特殊处理）
   - C++ 模板的完整解析
   - Perl 的上下文敏感语法
   - Ruby 的动态语法扩展

### 解决方案

1. **外部扫描器**
   - 处理上下文相关的词法分析
   - 支持自定义词法规则
   - 可以处理一些特殊的语法结构

2. **后处理**
   - 在语法树生成后进行语义分析
   - 使用符号表进行名称解析
   - 实现类型检查和其他静态分析

3. **组合工具**
   - 将 Tree-sitter 与其他工具结合
   - 使用专门的类型检查器
   - 配合使用语义分析工具

### 最佳实践

1. **专注于语法结构**
   - 使用 Tree-sitter 处理语法分析
   - 将语义分析留给其他工具
   - 清晰分离关注点

2. **合理使用外部扫描器**
   - 仅在必要时使用
   - 保持扫描器逻辑简单
   - 避免在扫描器中实现复杂的语义

3. **增量式开发**
   - 从基本语法开始
   - 逐步添加复杂特性
   - 充分测试每个功能

## 安装

确保你的系统已经安装了以下依赖：

- Node.js (推荐 v16+)
- Python (用于 node-gyp)
- C++ 编译器
- pnpm (推荐的包管理器)

然后运行：

```bash
pnpm install
```

## 使用方法

1. 启动项目：

```bash
pnpm start
```

这个命令会：
- 安装依赖
- 初始化语法
- 运行解析器测试
- 执行主程序

2. 测试自定义输入：

修改 `test.add` 文件或 `src/index.ts` 中的 `sourceCode` 变量来测试不同的加法表达式。

## 语法树示例

对于输入 `1 + 2 + 3`，解析器会生成如下语法树：

```
(source_file
  (expression
    (addition
      left: (expression
        (addition
          left: (expression (number))
          right: (number)))
      right: (number))))
```

## 开发

1. 修改语法：
   - 编辑 `grammar.js`
   - 运行 `pnpm run build:grammar` 重新生成解析器

2. 修改解析逻辑：
   - 编辑 `src/index.ts`
   - 运行 `pnpm run build` 编译 TypeScript 代码

## 许可

MIT
