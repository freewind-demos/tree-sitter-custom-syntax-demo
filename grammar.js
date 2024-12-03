module.exports = grammar({
    name: 'addition',

    rules: {
        // 源文件包含一个表达式
        source_file: $ => $.expression,

        // 表达式可以是一个数字，或者是一个加法操作
        expression: $ => choice(
            $.number,
            $.addition
        ),

        // 加法操作：左边是表达式，右边是数字
        addition: $ => prec.left(1, seq(
            field('left', $.expression),
            '+',
            field('right', $.number)
        )),

        // 数字：整数
        number: $ => /\d+/
    }
});