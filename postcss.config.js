let pluginList = [
  require('autoprefixer')({browsers: ['> 2%', 'IE 10', 'iOS >= 7']}),
  require('css-mqpacker')({ sort: true }),
  require('cssnano')
  ];

module.exports = {
  plugins: pluginList,
};
