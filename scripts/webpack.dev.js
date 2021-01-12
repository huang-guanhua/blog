// const webpack = require('webpack');
const path = require('path');
const os = require('os');
const { merge } = require('webpack-merge');

const base = require('./webpack.base');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

module.exports = merge(base, {
  mode: 'development',
  output: {
    path: path.resolve(process.cwd(), 'blog'),
    filename: '[name].js',
  },
  plugins: [
    
  ],
  devServer: {
    publicPath: '/blog/',
    // contentBase: path.join(process.cwd(), "public"),
    compress: true,
    port: 8000,
    // historyApiFallback: true, // 处理使用history模式单页面应用路由，页面404问题
    historyApiFallback: {
      rewrites: [
        { from: /^\/blog/, to: '/blog/index.html' },
      ]
    },
    // inline: true,
    disableHostCheck: true,
    hot: true,
    host: '0.0.0.0',
    // https: true,
    // useLocalIp: true 
    after: function(app, server, compiler) {
      function getLocalIP() {
        const netInfo = os.networkInterfaces(); //网络信息
        let ipv4Ip = ''
        for(let item in netInfo){
          if(item.indexOf('以太网') !== -1 || item.indexOf('WLAN') !== -1){
            const info = netInfo[item];
            info.forEach(i => {
              if(i.family === 'IPv4'){
                ipv4Ip = i.address;
              }
            })
          }
        }
        return ipv4Ip;
      }
      
      // compiler.hooks.done.tap("watchRun", (stats) => {
      //   if (
      //     stats.compilation.errors &&
      //     stats.compilation.errors.length &&
      //     process.argv.indexOf("- -watch") == -1
      //   ) {
      //     console.log('\033[40;90m[log]\033[40;37m build error\033[0m')
      //     process.exit(1);
      //   } else {
      //     console.log('\033[40;90m[log]\033[40;37m Compiling...\033[0m')
      //   }
      // });
      // compiler.hooks.done.tap("done", (stats) => {
      //   if (
      //     stats.compilation.errors &&
      //     stats.compilation.errors.length &&
      //     process.argv.indexOf("- -watch") == -1
      //   ) {
      //     console.log('\033[40;90m[log]\033[40;37m build error\033[0m')
      //     process.exit(1);
      //   } else {
      //     console.log('\033[40;90m[log]\033[40;37m Compiled successfully\033[0m')
      //   }
      // });
      console.log('\033[40;90mi [log]' + '\033[40;37m: Project is running at ' + 'http://localhost:' + server.options.port + '/ or http://' + getLocalIP() + ":" + server.options.port + '/\033[0m');
    },
    proxy: {
      // "/api": {
      //   target: "http://127.0.0.1:8080", // https://www.v2ex.com/api/topics/hot.json
      //   changeOrigin: true,
      //   secure: false,
      //   // pathRewrite: {"^/api" : ""}
      // }
    }
  },
  stats: 'errors-only',
  devtool: 'cheap-source-map'
})






