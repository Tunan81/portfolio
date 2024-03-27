module.exports = {
    apps: [
        {
            name: 'NuxtAppName',
            port: '3005',
            exec_mode: 'cluster',
            instances: 'max',
            script: './server/index.mjs'
        }
    ]
}
