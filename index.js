module.exports = {
  rules: {
    'use-storeon': {
      create: function (context) {
        return {
          CallExpression (node) {
            if (node.callee.name === 'useStoreon') {
              const storeonArgs = { dispatch: true }
              node.arguments.forEach(n => { storeonArgs[n.value] = true })
              node.parent.id.properties.forEach(p => {
                const { name } = p.key

                if (!storeonArgs[name]) {
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
  }
}
