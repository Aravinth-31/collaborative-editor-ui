// webpack.config.js

module.exports = {
    // other webpack configurations
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // add .ts and .tsx as valid extensions
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader', // use ts-loader for TypeScript files
            },
            // other rules as needed
        ],
    },
};
