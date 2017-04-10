var webpackConfig = require('./webpack.config.js')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      { pattern: 'test/**/*.spec.jsx', watched: false, serverd: true, included: true },
      { pattern: 'test/**/*.spec.js', watched: false, serverd: true, included: true },
    ],
    exclude: [],
    preprocessors: {
      'test/**/*.spec.jsx': ['webpack', 'sourcemap'],
      'test/**/*.spec.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      devtool: 'inline-source-map',
      module: webpackConfig.module,
      plugins: webpackConfig.plugins,
      externals: webpackConfig.externals,
      resolve: webpackConfig.resolve,
      performance: false,
    },
    webpackServer: {
      stats: 'errors-only',
    },
    reporters: ['mocha'],
    mochaReporter: {
      colors: {
        warning: 'black',
        error: 'red',
      },
      showDiff: true,
    },
    client: {
      captureConsole: false,
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    autoWatchBatchDelay: 1000,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
  })
}
