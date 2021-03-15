const recast = require("recast")


//add函数拆分
const code = `
  function add(a, b){
    return a + 
    // 有什么东西占据这里的位置了？
    b
  }
`

const ast = recast.parse(code);

const add = ast.program.body[0]

// console.log(add)
// console.log(add.params[0]);
//console.log(add.body.body[0].argument.right);

//add函数组装 匿名函数
//引入变量声明，变量符号，函数声明三个模块
const {variableDeclaration, variableDeclarator, functionExpression} = recast.types.builders

// 将准备好的组件置入磨具,并组装会原来的ast对象
ast.program.body[0] = variableDeclaration("const", [
  variableDeclarator(add.id, functionExpression(
    null,
    add.params,
    add.body
  ))
]);

//将AST对象重新转回可以阅读的代码
const output = recast.print(ast).code;
// 打印
//console.log(output);

//美化打印
const prettyOutput = recast.prettyPrint(ast, {tabWidth : 2}).code;
console.log(prettyOutput);