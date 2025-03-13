const { configure } = require('@oneaudi/oneaudi-os-build-scripts');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

/**
 * This config file expects arguments passed to the CLI
 *
 *    oneaudi-os-cli build --scope=fh:csr
 *    oneaudi-os-cli build --scope=fh:ssr
 *    oneaudi-os-cli build
 */

/**
 * Feature Hub demo integrator config
 */
const demoConfig = (_env, isProd) => {
  return {
    entry: {
      main: path.join(__dirname, 'src/app/demo/index.tsx'),
    },
    output: {
      path: path.resolve(__dirname, './dist/app/demo'),
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.join(
              path.dirname(require.resolve('@oneaudi/unified-web-components/package.json')),
              'dist/icons',
            ),
            to: 'icons',
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.m?js$/,
              resolve: {
                fullySpecified: false,
              },
            },
          ],
        },
      ],
    },
  };
};

/**
 * This config is used for the Feature Hub Feature App bundles.
 */
const featureHubAppConfig = (target) => (_env, isProd) => {
  let libraryTarget = 'umd';
  let filename = 'app.js';
  const plugins = [];

  if (target === 'node') {
    libraryTarget = 'commonjs';
    filename = 'app.node.js';

    plugins.push(
      new HtmlWebpackPlugin({
        inject: false,
        filename: path.resolve(__dirname, 'dist/app/index.html'),
        template: path.resolve(__dirname, 'src/app/demo/index.ssr.ejs'),
        templateParameters: {
          // Temporarily hard-code CSR bundle URL. Later, when SSR and CSR
          // integrators are merged, this will be referenced and served
          // relatively by the `serve-feature-apps` command.
          csrBundleUrl: `https://assets.audi.com/feature-hub-integrator-csr/7.31.0/${
            isProd ? 'audi-feature-hub-integrator-csr.js' : 'audi-feature-hub-integrator-csr.dev.js'
          }`,
        },
      }),
    );
  }

  return {
    entry: {
      main: path.join(__dirname, './src/app/FeatureHubAppDefinition.tsx'),
    },
    output: {
      filename,
      path: path.resolve(__dirname, './dist/app/fh'),
      libraryTarget,
    },
    plugins,
    externals: ['@oneaudi/unified-web-common', '@feature-hub/react', 'react', 'styled-components'],
  };
};

/**
 * Get the right config script based on arguments passed to the CLI
 */
function getCompiler() {
  const { argv } = yargs(hideBin(process.argv));

  switch (argv.scope) {
    case 'fh:csr':
      return configure({
        config: featureHubAppConfig('web'),
        noFederation: true,
        html: false,
        devServer: false,
        babel: false,
        swc: true,
      });
    case 'fh:ssr':
      return configure({
        config: featureHubAppConfig('node'),
        noFederation: true,
        html: false,
        devServer: false,
        babel: false,
        swc: true,
      });
    default:
      return configure({
        config: demoConfig,
        noFederation: true,
        css: { bundleCss: true },
        html: 'src/app/demo/index.html',
        babel: false,
        swc: true,
      });
  }
}

module.exports = getCompiler();
