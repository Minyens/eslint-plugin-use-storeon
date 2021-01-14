module.exports = {
  create: function (context) {
    return {
      CallExpression (node) {
        if (node.callee.name === 'useStoreon') {
          const storeonArgs = {}

          node.parent.id.properties.forEach(p => { storeonArgs[p.key.name] = true })

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
