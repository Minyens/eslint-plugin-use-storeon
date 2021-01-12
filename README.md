# eslint-plugin-use-storeon

An [ESlint](https://eslint.org/) rule for [Storeon](https://github.com/storeon/storeon) that lets you know when you're not watching a variable you're accessing from `useStoreon` and when you're watching a variable that isn't being accessed.

# Usage
Configure your `.eslint.rc.*` file.

```
  rules: {
    "use-storeon/use-storeon": ["error"],
  },
  plugins: ["use-storeon"],
```
