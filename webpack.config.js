const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

/**
 * Build Environment Configuration
 *
 * BUILD_ENV can be: 'development', 'staging', 'production'
 * - development: No minification, no compression, source maps, console logs kept
 * - staging: Minification enabled, no compression, no source maps
 * - production: Full optimization, compression (gzip + brotli), no source maps
 */
const BUILD_ENV = process.env.BUILD_ENV || "production";

// Determine optimization levels based on BUILD_ENV
const buildConfig = {
  development: {
    minimize: false,
    compress: false,
    sourceMaps: true,
    dropConsole: false,
    dropDebugger: false,
    outputDir: "dist-dev"
  },
  staging: {
    minimize: true,
    compress: false,
    sourceMaps: false,
    dropConsole: false,
    dropDebugger: true,
    outputDir: "dist-stage"
  },
  production: {
    minimize: true,
    compress: true,
    sourceMaps: false,
    dropConsole: true,
    dropDebugger: true,
    outputDir: "dist-prod"
  }
};

const currentConfig = buildConfig[BUILD_ENV] || buildConfig.production;

// Allow overrides via environment variables
const shouldCompress = process.env.ENABLE_COMPRESSION !== "false" && currentConfig.compress;
const shouldAnalyze = process.env.ANALYZE === "true";
const outputDir = process.env.OUTPUT_DIR || currentConfig.outputDir;
const publicPath = process.env.PUBLIC_PATH || "/";

// Only require compression plugin if needed
const CompressionPlugin = shouldCompress ? require("compression-webpack-plugin") : null;
const BundleAnalyzerPlugin = shouldAnalyze ? require("webpack-bundle-analyzer").BundleAnalyzerPlugin : null;

module.exports = function(_env, argv) {
  const isProduction = argv.mode === "production";

  console.log(`\n📦 Building for: ${BUILD_ENV.toUpperCase()}`);
  console.log(`   Minimize: ${currentConfig.minimize}`);
  console.log(`   Compress: ${shouldCompress}`);
  console.log(`   Source Maps: ${currentConfig.sourceMaps}`);
  console.log(`   Output: ${outputDir}\n`);

  return {
    devtool: currentConfig.sourceMaps ? "cheap-module-source-map" : false,
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, outputDir),
      filename: "assets/js/[name].[contenthash:8].js",
      publicPath: publicPath
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development"
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader"
          ]
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"]
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          loader: require.resolve("file-loader"),
          options: {
            name: "static/media/[name].[hash:8].[ext]"
          }
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    plugins: [
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "assets/css/[name].[contenthash:8].css",
          chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
        }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        inject: true,
        minify: isProduction
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            }
          : false
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        )
      }),
      // Gzip compression (only if CompressionPlugin is loaded)
      isProduction &&
        CompressionPlugin &&
        new CompressionPlugin({
          filename: "[path][base].gz",
          algorithm: "gzip",
          test: /\.(js|css|html|svg)$/,
          threshold: 8192,
          minRatio: 0.8,
          compressionOptions: {
            level: 9
          }
        }),
      // Brotli compression (better than gzip) - using native Node.js zlib
      isProduction &&
        CompressionPlugin &&
        new CompressionPlugin({
          filename: "[path][base].br",
          algorithm: "brotliCompress",
          test: /\.(js|css|html|svg)$/,
          threshold: 8192,
          minRatio: 0.8,
          compressionOptions: {
            level: 11
          }
        }),
      // Bundle analyzer (only when ANALYZE=true and BundleAnalyzerPlugin is loaded)
      BundleAnalyzerPlugin &&
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: "bundle-report.html",
          openAnalyzer: true
        })
    ].filter(Boolean),
    optimization: {
      minimize: currentConfig.minimize,
      minimizer: currentConfig.minimize ? [
        new TerserWebpackPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
              drop_console: currentConfig.dropConsole,
              drop_debugger: currentConfig.dropDebugger
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          parallel: true,
          cache: true,
          sourceMap: currentConfig.sourceMaps
        }),
        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: {
            map: currentConfig.sourceMaps
          }
        })
      ] : [],
      splitChunks: {
        chunks: "all",
        minSize: 10000,
        maxSize: 250000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: ".",
        cacheGroups: {
          // React and React-DOM in separate chunk
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: "vendors.react",
            priority: 40,
            reuseExistingChunk: true
          },
          // Babel runtime
          babel: {
            test: /[\\/]node_modules[\\/](@babel)[\\/]/,
            name: "vendors.babel",
            priority: 30,
            reuseExistingChunk: true
          },
          // Other node_modules
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `vendors.${packageName.replace("@", "")}`;
            },
            priority: 20,
            reuseExistingChunk: true
          },
          // Common code used in multiple places
          common: {
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          },
          // Default
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      },
      runtimeChunk: {
        name: "runtime"
      },
      moduleIds: "hashed",
      usedExports: true,
      sideEffects: true
    },
    devServer: {
      compress: BUILD_ENV !== "development", // No compression in dev mode
      historyApiFallback: true,
      open: true,
      overlay: true
    }
  };
};
