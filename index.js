const noDupeUseStoreon = require('./rules/no-dupe-use-storeon')
const noUnusedWatchedVars = require('./rules/no-unused-watched-vars')
const noUnwatchedVars = require('./rules/no-unwatched-vars')

module.exports = {
  rules: {
    'no-dupe-use-storeon': noDupeUseStoreon,
    'no-unused-watched-vars': noUnusedWatchedVars,
    'no-unwatched-vars': noUnwatchedVars
  }
}
