var webpack = require('webpack')
var path = require('path')
//package version
var Vue = require('vue')
var pkg = require('./package.json')
var package_version = pkg.name + ' ' + pkg.version + "\n" + pkg.homepage + "\n" + 'Compiled using Vue ' + Vue.version

module.exports = {
  entry: './docs/index.js',
  output: {
    path: './build',
    publicPath: 'build/',
    filename: 'build-docs.js'
  },
  resolve: {
    root: path.resolve('./'),
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    loaders: [
      {test: /\.vue$/, loader: 'vue' },
      {
      	test: /\.js$/,
        exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
      	loader: 'babel'
      },
      { test: /\.css$/, loader: "style-loader!css-loader?root=./docs/" },
      {test: /\.scss$/, loader: "style!css!sass"},
      {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new webpack.BannerPlugin(package_version)
  ]
};


if (process.env.NODE_ENV !== 'production') {
  module.exports.devtool = 'source-map';
} else {
  module.exports.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}