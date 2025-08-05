const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.js', // نقطة الدخول للتطبيق
    output: {
        path: path.resolve(__dirname, '../wwwroot/js'), // مكان حفظ الملفات
        filename: 'bundle.js', // اسم الملف الناتج
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // استهداف ملفات JavaScript و JSX
                exclude: /node_modules/, // تجاهل الملفات في node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // لتحويل الكود إلى JavaScript حديث
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // الامتدادات التي سيتم معالجتها
    },
};
