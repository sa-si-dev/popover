const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { version } = require('./package.json');

const banner = `Popover v${version}
https://sa-si-dev.github.io/popover
Licensed under MIT (https://github.com/sa-si-dev/popover/blob/master/LICENSE)`;

module.exports = (env, options) => {
  const config = {
    target: 'es5',

    entry: {
      styles: './src/styles.js',
      popover: ['./node_modules/popper-plugin/dist/popper.min.js', './src/popover.js'],
    },

    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist'),
      chunkFormat: 'array-push',
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'popover.min.css',
      }),

      new webpack.BannerPlugin(banner),

      new FileManagerPlugin({
        events: {
          onStart: {
            delete: ['dist'],
          },
          onEnd: {
            delete: ['dist/styles.min.js'],
            copy: [{ source: 'dist', destination: 'docs/assets' }],
          },
        },
      }),
    ],

    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /(node_modules)/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };

  if (options.mode === 'development') {
    config.devtool = 'inline-source-map';
  }

  return config;
};
