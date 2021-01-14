const rule = require('../index')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 12 } })

describe('use-storeon/no-dupe-use-storeon', function () {
  ruleTester.run('no-dupe-use-storeon', rule.rules['no-dupe-use-storeon'], {
    valid: [
      {
        code: `
        const testComponent = () => {
          const { one, two, three } = useStoreon('one', 'two', 'three')

          return 'test'
        }`
      },
      {
        code: `
        const testComponent = () => {
          const { dispatch } = useStoreon('one', 'two', 'three')

          return 'test'
        }`
      },
      {
        code: `
        const testComponent = () => {
          const { one, two, dispatch } = useStoreon('one', 'two')

          return 'test'
        }`
      }
    ],

    invalid: [
      {
        code: `
        const testComponent = () => {
          const { one, two, dispatch } = useStoreon('one', 'two')
          const { five, six } = useStoreon('five', 'six')

          return 'test'
        }`,
        errors: [
          { message: 'useStoreon is declared multiple times', column: 42, endColumn: 66 },
          { message: 'useStoreon is declared multiple times', column: 33, endColumn: 58 }
        ]
      },
      {
        code: `
        const testComponent = () => {
          const { one, two, dispatch } = useStoreon('one', 'two')
          const { five, six } = useStoreon('five', 'six')
          const { seven, eight } = useStoreon('seven', 'eight')

          return 'test'
        }`,
        errors: [
          { message: 'useStoreon is declared multiple times', column: 42, endColumn: 66 },
          { message: 'useStoreon is declared multiple times', column: 33, endColumn: 58 },
          { message: 'useStoreon is declared multiple times', column: 36, endColumn: 64 }
        ]
      },
      {
        code: `
        const testComponent = () => {
          const { one, two } = useStoreon('one', 'two')
          const { dispatch } = useStoreon()

          return 'test'
        }`,
        errors: [
          { message: 'useStoreon is declared multiple times', column: 32, endColumn: 56 },
          { message: 'useStoreon is declared multiple times', column: 32, endColumn: 44 }
        ]
      }
    ]
  })
})
