module.exports = {
  printWidth: 100,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  arrowParens: 'always',
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: [
    '^(react/(.*)$)|^(react$)|^(react)|^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '^@components/(.*)$|^@pages/(.*)$|^@styles/(.*)$',
    '^[./]((?!.module.scss).)*$',
    '^./(.*?).module.scss$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
