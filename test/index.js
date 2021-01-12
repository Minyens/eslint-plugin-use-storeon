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
      {
        code: `const { one, two: destructure, dispatch } = useStoreon('one', 'two')`
      },
      {
        code: `const { one: five, two: destructure, dispatch } = useStoreon('one', 'two')`
      }
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
      {
        code: `const { one, two, three: destructure, dispatch } = useStoreon('one', 'two')`,
        errors: [{ message: 'useStoreon variables must have matching string passed in.', column: 19, endColumn: 37 }]
      },
      {
        code: `const { one, three: destructure, dispatch } = useStoreon('one', 'destructure')`,
        errors: [
          { message: 'useStoreon variables must have matching string passed in.', column: 14, endColumn: 32 },
          { message: 'useStoreon is watching an unused variable.', column: 65, endColumn: 78 }
        ]
      },
      {
        code: `const { one, two } = useStoreon('one', 'two', 'three')`,
        errors: [{ message: 'useStoreon is watching an unused variable.', column: 47, endColumn: 54 }]
      },
      {
        code: `const { dispatch } = useStoreon('one', 'two')`,
        errors: [
          { message: 'useStoreon is watching an unused variable.', column: 33, endColumn: 38 },
          { message: 'useStoreon is watching an unused variable.', column: 40, endColumn: 45 }
        ]
      }
    ]
  })
})
