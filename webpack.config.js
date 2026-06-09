const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  // ── Load env file ──────────────────────────────────────────
  const envPath = path.resolve(
    __dirname,
    argv.mode === 'production' ? '.env.production' : '.env.development'
  );

  const rawEnv = fs.existsSync(envPath)
    ? dotenv.parse(fs.readFileSync(envPath))
    : {};

  // ── Fallbacks (used when .env file is missing or incomplete) ─
  const fallbacks = {
    REACT_APP_NAME: rawEnv.REACT_APP_NAME || 'NM',
    REACT_APP_VERSION: rawEnv.REACT_APP_VERSION || '1.0.0',
    REACT_APP_API_BASE_URL:
      rawEnv.REACT_APP_API_BASE_URL ||
      'https://jobsschart-api.maktechgroup.tech/api/v1',
    REACT_APP_SOCKET_URL:
      rawEnv.REACT_APP_SOCKET_URL ||
      'https://jobsschart-api.maktechgroup.tech',
    REACT_APP_API_TIMEOUT: rawEnv.REACT_APP_API_TIMEOUT || '10000',
    REACT_APP_API_RETRY_ATTEMPTS:
      rawEnv.REACT_APP_API_RETRY_ATTEMPTS || '3',
    REACT_APP_API_RETRY_DELAY: rawEnv.REACT_APP_API_RETRY_DELAY || '1000',
    REACT_APP_VITALS_ENDPOINT:
      rawEnv.REACT_APP_VITALS_ENDPOINT ||
      'https://vitals.vercel-analytics.com/v1/vitals',
    REACT_APP_SEO_TITLE: rawEnv.REACT_APP_SEO_TITLE || 'NM',
    REACT_APP_SEO_DESCRIPTION:
      rawEnv.REACT_APP_SEO_DESCRIPTION || 'A professional React application',
    REACT_APP_SEO_KEYWORDS:
      rawEnv.REACT_APP_SEO_KEYWORDS || 'react,webpack,tailwind',
  };

  // ── Build DefinePlugin keys ─────────────────────────────────
  const envKeys = {};
  for (const [key, value] of Object.entries(fallbacks)) {
    envKeys[`process.env.${key}`] = JSON.stringify(value);
  }
  envKeys['process.env.NODE_ENV'] = JSON.stringify(argv.mode);

  // ── Debug logging (remove after confirming it works) ────────
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('BUILD MODE:', argv.mode);
  console.log('ENV FILE PATH:', envPath);
  console.log('FILE EXISTS:', fs.existsSync(envPath));
  console.log('REACT_APP_API_BASE_URL =', rawEnv.REACT_APP_API_BASE_URL);
  console.log(
    'DEFINED AS =',
    envKeys['process.env.REACT_APP_API_BASE_URL']
  );
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // ── Dev server config ───────────────────────────────────────
  const devPort = rawEnv.REACT_APP_DEV_PORT
    ? rawEnv.REACT_APP_DEV_PORT === 'auto'
      ? 'auto'
      : parseInt(rawEnv.REACT_APP_DEV_PORT, 10)
    : 5173;

  const allowedHost =
    rawEnv.REACT_APP_ALLOWED_HOST || 'jbosschart.maktechgroup.tech';

  return {
    entry: './src/index.jsx',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      chunkFilename: isProd
        ? 'js/[name].[contenthash:8].chunk.js'
        : 'js/[name].chunk.js',
      clean: true,
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif|webp|svg)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
          generator: {
            filename: 'images/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash:8][ext]',
          },
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx'],
    },

    plugins: [
      new webpack.DefinePlugin(envKeys),

      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
      }),

      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            to: '.',
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ],
      }),
    ],

    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
            name: 'vendor-react',
            chunks: 'all',
            priority: 20,
          },
          redux: {
            test: /[\\/]node_modules[\\/](@reduxjs|react-redux)[\\/]/,
            name: 'vendor-redux',
            chunks: 'all',
            priority: 10,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 1,
          },
        },
      },
      runtimeChunk: 'single',
    },

    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      historyApiFallback: true,
      host: '0.0.0.0',
      allowedHosts: 'all',
      port: devPort,
      hot: true,
      open: true,
      compress: true,
      headers: {
        'Access-Control-Allow-Origin': `https://${allowedHost}`,
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      },
      proxy: {
        '/api': {
          target: 'https://jobsschart-api.maktechgroup.tech',
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            '^/api': '/api/v1',
          },
          onError: (err, req, res) => {
            console.error('Proxy error:', err);
          },
        },
      },
    },

    devtool: isProd ? 'hidden-source-map' : 'eval-cheap-module-source-map',
  };
};