const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    pages: {
        index: 'src/main.js',
        subpage: 'src/subpage/main.js'
    }
})
