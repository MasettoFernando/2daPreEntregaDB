import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection= "products"

const productsSchema= new mongoose.Schema({
    
    title:{
        type: String,
        required: true
    }, 
    description:{
        type: String,
        required: true
    }, 
    price: {
        type:Number,
        required:true, 
        min: 0
    },
    status: Boolean,
    category: {
        type: String,
        required:true,
        enum: ["SNEAKER", "SPORTSWEAR", "ACCESORIES" ],
        default:"SNEAKER"
    },
    thumbnail: {
        type:String,
        default:"https://w7.pngwing.com/pngs/224/696/png-transparent-nike-logo-movement-brands-black.png"
    },
    code: {
        type:String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min:0
    }
})

productsSchema.plugin(mongoosePaginate)
const productsModel = mongoose.model(productsCollection, productsSchema)

export default productsModel 
