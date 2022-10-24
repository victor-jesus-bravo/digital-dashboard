export async function runGoogleScript(serverFuctionName, data = null) {
    return new Promise((resolve, reject) => {
        google.script.run.withSuccessHandler((data) => {
            resolve(data)
        }).withFailureHandler((err) => {
            reject(err)
        })[serverFuctionName](data)
    })
}