import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';

/*eslint-disable no-console */
console.log('Opening production build...');

// Run Browsersync
browserSync({
  port: 3000,
  ui: {
    port: 3001
  },
  server: {
    baseDir: 'dist'
  },

  files: [
    'src/*.html'
  ],

  middleware: [historyApiFallback()]
});
