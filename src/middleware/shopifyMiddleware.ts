const fs = require('fs')
const path = require('path')
export function shopifyMiddleware(req:any,res:any,next:any){
    const rawdata = fs.readFileSync(path.resolve(__dirname,'../../data.json'))
    const realData = JSON.parse(rawdata)
    console.log(req.body)
    const {shop} = req.body
    // console.log(res.body)
    
  
    if(shop){
        res.shop = shop
        realData.shop.forEach((e:any)=>console.log(e))
        console.log(realData)
        //const accessToken = (realData.shop.find((e:any) => shop===e.name)).accessToken
        //console.log('check',accessToken)
        //res.accessToken = accessToken
    }
    next()
}