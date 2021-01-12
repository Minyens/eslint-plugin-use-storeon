module.exports = {
  rules: {
    'use-storeon': {
      create: function (context) {
        return {
          CallExpression (node) {
            if (node.callee.name === 'useStoreon') {
              const storeonVars = { dispatch: true }
              const storeonArgs = {}

              node.arguments.forEach(n => { storeonVars[n.value] = true })

              node.parent.id.properties.forEach(p => {
                const { name } = p.key
                storeonArgs[name] = true

                if (!storeonVars[name]) {
                  context.report({
                    node: p,
                    message: 'useStoreon variables must have matching string passed in.'
                  })
                }
              })

              node.arguments.forEach(n => {
                if (!storeonArgs[n.value]) {
                  context.report({
                    node: n,
                    message: 'useStoreon is watching an unused variable.'
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
