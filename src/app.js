import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import productsRouter from './routes/products.router.js'
import CartsRouter from './routes/carts.router.js'

const app= express()
//database URL
const uri="mongodb+srv://masettofernando:86njr3ykXn2cqX3r@clusterfm.5c5spbs.mongodb.net/eCommerce"

//Json setup
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//app.use(express.static('./src/public'))

//handlebars setup
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
//Routers
app.use('/api/products', productsRouter)
app.use('/api/carts', CartsRouter)

//Mongoose setup & server
mongoose.set("strictQuery", false)
try {
    await mongoose.connect(uri)
    console.log('DBs connected!')
    app.listen(8080, ()=>console.log("Server up"))
} catch (error) {
    console.log('DBs conection failed')
}