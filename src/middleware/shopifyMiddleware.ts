

const ShopifyAPIClient = require('shopify-api-node')
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
    if(oldShop){
        console.log('oldSHop OKKK')
       return
    }else{
        const addData = {
            name:shop,
            accessToken
        }
        updateHeaderToShopify(shop,accessToken)
        realData.shop.push(addData)
        fs.writeFileSync(path.resolve(__dirname,'../../data.json'), JSON.stringify(realData));  
    }

}

async function updateHeaderToShopify(shop:any,accessToken:any){
    const shopifyClient = new ShopifyAPIClient({shopName: shop, accessToken})
    const theme = (await shopifyClient.theme.list({role: 'main'}))[0]
    if (!theme) {
        return
    }
    const themeAsset = await shopifyClient.asset.get(theme.id, {
        asset: {
            key: 'layout/theme.liquid'
        }
    })
    if (themeAsset && typeof themeAsset.value === 'string') {
       let {value} = themeAsset

       const position = value.indexOf(`</head>`)
       const insertString = `
       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
       `

       const returnValue = value.slice(0,position)+insertString+value.slice(position)
       
       console.log(returnValue)
       shopifyClient.asset.update(theme.id,{
           key:'layout/theme.liquid',
           value:returnValue
       }).then((data:any)=>console.log(data))
       .catch((err:any)=>console.log(err))
       
       //console.log(returnValue)
        // Push new main theme with snippet included to Shopify
        //console.log(value)
    }
}