


const express = require('express');


const ShopifyExpress = require('shopify-express');
const {MemoryStrategy} = require('shopify-express/strategies');

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
    const { session: { accessToken, shop } } = request;

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

app.use('/shopify', routes);


export default app