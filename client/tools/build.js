// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import gzipSize from 'gzip-size';
import filesize from 'filesize';

process.env.NODE_ENV = 'production'; // this assures the Babel dev config (for hot reloading) doesn't apply.

console.log(chalk.blue('Generating minified bundle for production via Webpack. This will take a moment...'));

webpack(webpackConfig).run((err, stats) => {
  if (err) { // so a fatal error occurred. Stop here.
    console.log(chalk.red(err));
    return 1;
  }
  console.log(chalk.green('Compiled successfully.'));
  console.log('File sizes after gzip:');

  const assets = stats.toJson().assets
      .filter(asset => /\.(js|css)$/.test(asset.name))
      .map(asset => {
        const fileContents = fs.readFileSync('dist/' + asset.name);
        const size = gzipSize.sync(fileContents);
        return{
          folder: path.join('dist', path.dirname(asset.name)),
          name: path.basename(asset.name),
          size: size,
          sizeLabel: filesize(size)
        };
      });
  assets.sort((a, b) => b.size - a.size);
  const longestSizeLabelLength = Math.max.apply(null,
    assets.map(a => a.sizeLabel.length)
  );
  assets.forEach(asset => {
    let sizeLabel = asset.sizeLabel;
    if (sizeLabel.length < longestSizeLabelLength) {
      let rightPadding = ' '.repeat(longestSizeLabelLength - sizeLabel.length);
      sizeLabel += rightPadding;
    }
    console.log(
      '  ' + chalk.green(sizeLabel) +
      '  ' + chalk.dim(asset.folder + path.sep) + chalk.cyan(asset.name)
    );
  });
});
