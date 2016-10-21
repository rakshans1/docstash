import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';

/*eslint-disable no-console */
console.log('Opening production build...');

// Run Browsersync
browserSync({
  port: 8080,
  ui: {
    port: 8000
  },
  server: {
    baseDir: 'dist'
  },

  files: [
    'src/*.html'
  ],

  middleware: [historyApiFallback()]
});
