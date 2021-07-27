
const execa = require('execa')
const target = 'reactivity'
execa(
    'rollup',
    [
      '-wc',
      '--environment',
      [
        `TARGET:${target}`,
      ]
        .filter(Boolean)
        .join(',')
    ],
    {
      stdio: 'inherit'
    }
  )