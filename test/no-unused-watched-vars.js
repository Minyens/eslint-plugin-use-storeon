const rule = require('../index')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 12 } })

describe('use-storeon/no-unused-watched-vars', function () {
  ruleTester.run('no-unused-watched-vars', rule.rules['no-unused-watched-vars'], {
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
        code: `const { dispatch } = useStoreon('one', 'two')`,
        errors: [
          { message: 'useStoreon is watching an unused variable.', column: 33, endColumn: 38 },
          { message: 'useStoreon is watching an unused variable.', column: 40, endColumn: 45 }
        ]
      },
      {
        code: `const { one, dispatch } = useStoreon('one', 'two')`,
        errors: [
          { message: 'useStoreon is watching an unused variable.', column: 45, endColumn: 50 }
        ]
      },
      {
        code: `const { two, dispatch } = useStoreon('one', 'two')`,
        errors: [
          { message: 'useStoreon is watching an unused variable.', column: 38, endColumn: 43 }
        ]
      },
      {
        code: `const { one } = useStoreon('one', 'two')`,
        errors: [
          { message: 'useStoreon is watching an unused variable.', column: 35, endColumn: 40 }
        ]
      },
      {
        code: `const { two } = useStoreon('one', 'two')`,
        errors: [
          { message: 'useStoreon is watching an unused variable.', column: 28, endColumn: 33 }
        ]
      }
    ]
  })
})
