const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true
        }
    },
    pages: {
        index: 'src/main.js',
        display: 'src/display/main.js'
    }
})
