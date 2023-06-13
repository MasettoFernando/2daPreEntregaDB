import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import productsRouter from './routes/products.router.js'
import CartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/view.router.js'
import sessionsRouter from './routes/sessions.router.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'

mongoose.set("strictQuery", false)


const app= express()
//database URL
const uri="mongodb+srv://masettofernando:86njr3ykXn2cqX3r@clusterfm.5c5spbs.mongodb.net/eCommerce"

//Json setup
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//handlebars setup
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use(session({
    store: MongoStore.create({
        mongoUrl: uri,
        dbName: 'eCommerce'
    }),
    secret: 'admin1234',
    resave: true,
    saveUninitialized: true
}))

//Passport config
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Routers
app.use('/api/products', productsRouter)
app.use('/api/carts', CartsRouter)
app.use('/products', viewsRouter)
app.use('/session', sessionsRouter)

//Mongoose setup & server
try {
    await mongoose.connect(uri)
    console.log('DBs connected!')
    app.listen(8080, ()=>console.log("Server up"))
} catch (error) {
    console.log('DBs conection failed')
}