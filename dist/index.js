"use strict";
const Parser = require('tree-sitter');
const path = require('path');
async function main() {
    // 初始化 Parser
    const parser = new Parser();
    const Language = require(path.join(__dirname, '..', 'build', 'Release', 'tree_sitter_addition_binding.node'));
    parser.setLanguage(Language);
    // 测试输入
    const sourceCode = '1 + 2 + 3';
    // 解析
    const tree = parser.parse(sourceCode);
    // 打印解析树
    console.log('Source code:', sourceCode);
    console.log('\nParse tree:');
    console.log(tree.rootNode.toString());
}
main().catch(console.error);
