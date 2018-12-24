import './utils/secrets'
import express from 'express'
import path from 'path'

import shopifyApp from './shopify'

const app = express()

const port = process.env.PORT || 8080

app.use(shopifyApp)

// app.get('/shopify', (req, res) => {
//     console.log('addduuuuu')
//     res.send('linhtinh lawm cac anh owi')
//     //res.sendFile(path.resolve(__dirname, '../public/index.html'))
// })

// app.get('adu',(req,res)=>{
//     res.send({message:'messagel okk'})
// })
app.listen(port,()=>{
    console.log(`server is running on port ${port} 1`)
})
