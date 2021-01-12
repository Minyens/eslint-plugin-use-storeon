const rule = require('../index')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 12 } })

describe('eslint useStoreon plugin', function () {
  ruleTester.run('use-storeon', rule.rules['use-storeon'], {
    valid: [
      {
        code: `const { one, two, three } = useStoreon('one', 'two', 'three')`
      },
      {
        code: `const { one, two, three, dispatch } = useStoreon('one', 'two', 'three')`
      },
      {
        code: `const { one, two } = useStoreon('one', 'two')`
      },
      {
        code: `const { one, two, dispatch } = useStoreon('one', 'two')`
      },
    ],

    invalid: [
      {
        code: `const { one, two, three } = useStoreon('one', 'two')`,
        errors: [{ message: 'useStoreon variables must have matching string passed in.' }]
      },
      {
        code: `const { one, two, three } = useStoreon()`,
        errors: [
          { message: 'useStoreon variables must have matching string passed in.', column: 9, endColumn: 12 },
          { message: 'useStoreon variables must have matching string passed in.', column: 14, endColumn: 17 },
          { message: 'useStoreon variables must have matching string passed in.', column: 19, endColumn: 24 }
        ]
      },
      {
        code: `const { one, two } = useStoreon('one')`,
        errors: [{ message: 'useStoreon variables must have matching string passed in.', column: 14, endColumn: 17 }]
      },
      {
        code: `const { one, two, three, dispatch } = useStoreon('one', 'two')`,
        errors: [{ message: 'useStoreon variables must have matching string passed in.', column: 19, endColumn: 24 }]
      },
      {
        code: `const { one, two, three, dispatch } = useStoreon('one')`,
        errors: [
          { message: 'useStoreon variables must have matching string passed in.', column: 14, endColumn: 17 },
          { message: 'useStoreon variables must have matching string passed in.', column: 19, endColumn: 24 }
        ]
      },
    ]
  })
})
