/* eslint-disable */ 
const path = require('path');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@databases': path.resolve(__dirname, 'src/databases'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@reducers': path.resolve(__dirname, 'src/reducers'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@translation': path.resolve(__dirname, 'src/translation'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      types: path.resolve(__dirname, 'src/types')
    }
  };

  return config;
};
