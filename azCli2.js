const { argv0 } = require('process')
const {axiosClient} = require('./axioshelpers')

const tsto= require('util').promisify(setTimeout)


//module.exports= {azCLI}
azCLI()

async function azCLI () {

    console.log(process.argv0)

var data={
    client_id:"04b07795-8ddb-461a-bbee-02f9e1bf7b46",
    resource:"https://management.core.windows.net/" || argv0
}
var opt = {
    method:"post",
    url:"https://login.microsoftonline.com/common/oauth2/devicecode?api-version=1.0",
    data
}

    var at = await axiosClient(opt, true).catch((error) => {
        console.log(error)
    })

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
    loop.data.access_token = "redacted ****"
    loop.data.refresh_token = "redacted ****"
    loop.data.id_token = "redacted ****"
    console.log(loop?.data)
}
