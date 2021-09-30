const path = require('path')

module.exports = {
  chainWebpack: config => {
    config
      .resolve.alias.set('@', path.join(__dirname, './src'))
    config
      .plugin('html')
      .tap(args => {
        args[0].title = `${process.env.VUE_APP_TITLE}`
        return args
      })
  }
}
