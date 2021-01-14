module.exports = {
  create: function (context) {
    return {
      CallExpression (node) {
        if (node.callee.name === 'useStoreon') {
          const storeonVars = { dispatch: true }

          node.arguments.forEach(n => { storeonVars[n.value] = true })

          node.parent.id.properties.forEach(p => {
            const { name } = p.key

            if (!storeonVars[name]) {
              context.report({
                node: p,
                message: 'useStoreon variables must have matching string passed in.'
              })
            }
          })
        }
      }
    }
  }
}
