import express from 'express'
import path from 'path'

const app = express()

const port = process.env.PORT || 8080

app.get('/shopify', (req, res) => {
    console.log('addduuuuu')
    res.send('linhtinh lawm cac anh owi')
    //res.sendFile(path.resolve(__dirname, '../public/index.html'))
})

app.get('adu',(req,res)=>{
    res.send({message:'messagel okk'})
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
