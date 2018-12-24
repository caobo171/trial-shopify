


const express = require('express');
const fs = require('fs')
const path = require('path')
const ShopifyExpress = require('shopify-express');
const {MemoryStrategy} = require('shopify-express/strategies');
const ShopifyAPIClient = require('shopify-api-node')
const session = require('express-session')
const bodyParser  = require('body-parser')

import {shopifyMiddleware ,initShop} from './middleware/shopifyMiddleware'

const {
  SHOPIFY_APP_KEY,
  BASE_URL,
  SHOPIFY_APP_SECRET,
  SHOPIFY_APP_SCOPE
} = process.env;

const shopifyConfig = {
  host: BASE_URL,
  apiKey: SHOPIFY_APP_KEY,
  secret: SHOPIFY_APP_SECRET,
  scope: [SHOPIFY_APP_SCOPE],
  shopStore: new MemoryStrategy(),
  afterAuth(request:any, response:any) {
    if(request && request.session){
      const { session: { accessToken, shop } } = request;
      initShop(shop,accessToken)

    }else{
      console.log('something went wrong')
    }
    

    // registerWebhook(shop, accessToken, {
    //   topic: 'orders/create',
    //   address: `${SHOPIFY_APP_HOST}/order-create`,
    //   format: 'json'
    // });

    return response.redirect('/');
  },
};

// const registerWebhook = function(shopDomain, accessToken, webhook) {
//   const shopify = new ShopifyAPIClient({ shopName: shopDomain, accessToken: accessToken });
//   shopify.webhook.create(webhook).then(
//     response => console.log(`webhook '${webhook.topic}' created`),
//     err => console.log(`Error creating webhook '${webhook.topic}'. ${JSON.stringify(err.response.body)}`)
//   );
// }

const app = express.Router();
//const isDevelopment = NODE_ENV !== 'production';



// Create shopify middlewares and router
const shopify = ShopifyExpress(shopifyConfig);

// Mount Shopify Routes
const {routes, middleware} = shopify;
const {withShop, withWebhook} = middleware;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(
  session({
    store: undefined,
    secret: SHOPIFY_APP_SECRET,
    resave: true,
    saveUninitialized: false,
  }))
app.use('/shopify', routes);

app.post('/api/create-page',shopifyMiddleware,async (req:any,res:any)=>{
  const {shop,accessToken} = req
  const {title,pageData} = req.body
  const shopifyClient = new ShopifyAPIClient({shopName:shop,accessToken})
  const page: any = await shopifyClient.page.create({
    title,
    body_html:pageData
  })

  console.log(page)
  res.send(page)

  

  console.log(req.shop,req.accessToken)
  //console.log('very ok')
})




export default app