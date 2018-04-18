module.exports = {
    entry: './index.js', // Default value
    plugins: [
        require('@poi/plugin-vue-static')({
            routes: ['/']
        })
    ]
}