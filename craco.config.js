const path = require('path');
module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@icons': path.resolve(__dirname, 'src/assets/icons/collection'),
            '@ui': path.resolve(__dirname, 'src/UI'),
            '@constants': path.resolve(__dirname, 'src/constants'),
        },
    },
};