
const {argv} = require('yargs')
const {axiosClient} = require('./axioshelpers')
const tsto= require('util').promisify(setTimeout)

azCLI()

async function azCLI () {

var data={
    client_id:argv.client || "04b07795-8ddb-461a-bbee-02f9e1bf7b46",
    resource: argv.resource ||  "https://management.core.windows.net/" 
}
var opt = {
    method:"post",
    url:`https://login.microsoftonline.com/${argv?.tid || "common"}/oauth2/devicecode?api-version=1.0`,
    data
}
let errorP 
    var at = await axiosClient(opt, true).catch((error) => {
       errorP =error
    })

if (errorP) {
    console.log(errorP)
    return;
}

    console.log(at?.data?.message)

   // console.log(at?.data)
    var i = 0
    do {
        
        data.grant_type="device_code",
        data.code=at?.data?.device_code
        opt.url="https://login.microsoftonline.com/common/oauth2/token"
        delete opt.data; opt.data = data
        //console.log(opt)
        i++
        var loop = await axiosClient(opt,true).catch((error) => {
            console.log(error?.response?.data?.error)
        })
        await tsto(2000)
    /*     console.log(i)
      console.log(i < 10) */
    } while ( i < 15 && !loop?.data?.access_token)
    console.log('iterations done')
    console.log(loop?.data)
}
