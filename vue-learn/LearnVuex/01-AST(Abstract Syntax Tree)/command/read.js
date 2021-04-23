#!/usr/bin/env node
const recast = require('recast')

//打印demo.js中的源码
//recast.run( (ast, printSource) => printSource(ast))

//AST节点遍历
// recast.run((ast, printSource)=>{
//   recast.visit(ast, {
//     visitExpressionStatement: function({node}){
//       console.log(node)
//       return false
//     }
//   })
// })

recast.run((ast, printSource)=>{
  recast.visit(ast, {
    visitExpressionStatement: function(path) {
      const node = path.node
      printSource(node)
      //这里的this.需要指向recast对象
      this.traverse(path)
  }
  })
})