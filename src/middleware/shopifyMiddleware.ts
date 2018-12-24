


const fs = require('fs')
const path = require('path')
export function shopifyMiddleware(req:any,res:any,next:any){
    const rawdata = fs.readFileSync(path.resolve(__dirname,'../../data.json'))
    const realData = JSON.parse(rawdata)
    const {shop} = req.body
    console.log(shop)
    
  
    if(shop){
        req.shop = shop
        const accessToken = (realData.shop.find((e:any) => shop===e.name)).accessToken
        console.log(accessToken)
        req.accessToken = accessToken
    }
    next()
}

export function initShop(shop:any,accessToken:any){
    const rawdata = fs.readFileSync(path.resolve(__dirname,'../../data.json'))
    const realData = JSON.parse(rawdata)
    const oldShop = (realData.shop.find((e:any) => shop===e.name))
    console.log('check',oldShop)
    if(oldShop){
        console.log('oldSHop OKKK')
       return
    }else{
        const addData = {
            name:shop,
            accessToken
        }
        realData.shop.push(addData)
        fs.writeFileSync(path.resolve(__dirname,'../../data.json'), JSON.stringify(realData));  
    }

}