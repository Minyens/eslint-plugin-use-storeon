# eslint-plugin-use-storeon

[ESlint](https://eslint.org/) rules for [Storeon](https://github.com/storeon/storeon)

## Rules
`no-dupe-use-storeon` Fires when useStoreon is declared multiple times.
`no-unused-watched-vars` Fires when you're accessing a variable from useStoreon that isn't being watched.
`no-unwatched-vars` Fires when you're watching a variable that isn't being accessed.


## Usage
Configure your `.eslint.rc.*` file.

```
{
  rules: {
    "use-storeon/no-dupe-use-storeon": ["error"],
    "use-storeon/no-unused-watched-vars": ["error"],
    "use-storeon/no-unwatched-vars": ["error"],
  },
  plugins: ["use-storeon"],
  ...
}
```
