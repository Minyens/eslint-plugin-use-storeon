module.exports = {
  create: function (context) {
    return {
      CallExpression (node) {
        if (node.callee.name === 'useStoreon') {
          let useStoreonCount = 0
          const topParentBody = node.parent.parent.parent.body

          for (let i = 0; i < topParentBody.length; i++) {
            if (
              topParentBody[i].declarations &&
              topParentBody[i].declarations[0] &&
              topParentBody[i].declarations[0].init &&
              topParentBody[i].declarations[0].init.callee &&
              topParentBody[i].declarations[0].init.callee.name === 'useStoreon'
            ) {
              useStoreonCount++

              if (useStoreonCount > 1) {
                return context.report({
                  node: node,
                  message: 'useStoreon is declared multiple times'
                })
              }
            }
          }
        }
      }
    }
  }
}
