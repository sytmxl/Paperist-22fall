const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/user/': {
        target: 'http://127.0.0.1:8000/user/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/user' : ''
        }
      },
      '/pdf': {
        target: 'https://obs-0dcd.obs.cn-north-4.myhuaweicloud.com',
        changOrigin: true,  
        pathRewrite: {
            '^/pdf': ''  
        } 
    },
  }
}
})


