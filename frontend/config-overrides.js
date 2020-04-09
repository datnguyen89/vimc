const {
  override,
  fixBabelImports,
  addLessLoader,
  disableEsLint,
  addDecoratorsLegacy,
} = require('customize-cra')

module.exports = override(
  disableEsLint(),
  addDecoratorsLegacy(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@layout-header-height': '50px',
    },
  }),
)