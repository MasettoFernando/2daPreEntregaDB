import { Router } from "express";
import cartManager from "../management/cartManager.js";

const router= Router()
const cm= new cartManager()

//POST /api/carts --> create cart by thc
router.post('/', (req, res)=>{
    cm.createCart()
    res.status(201).send("New cart created")
})
//GET /api/carts/:cid ---> Show the products which are in cid cart
router.get('/:cid', async(req,res)=>{
    const cid= req.params.cid
    const list = await cm.getProductsFromACart(cid)
    res.send(list)
    
})
//POST /api/carts/:cid/products/:pid --> To add a product(pid) to a specific cart(cid)
router.post('/:cid/products/:pid', (req, res)=>{
    const cid= req.params.cid 
    const pid= req.params.pid
    cm.addProductToCart(cid, pid)
    res.status(201).send(`producto ${pid} añadido al carrito ${cid}`)

})
//DELETE /api/cartis/:cid/products/:pid
router.delete('/:cid/products/:pid', async(req, res)=>{
    const cid= req.params.cid
    const pid= req.params.pid
    await cm.deleteOneProductFromACart(cid, pid)
    res.send("product eliminated")
})
//DELETE /api/carts/:cid -> delete a cart by thc
router.delete('/:cid', async(req, res)=>{
    const cid= req.params.cid
    await cm.deleteOneCart(cid) 
    res.send(`product ${cid} eliminated`)
})
export default router