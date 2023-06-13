import { Router } from "express";
import passport from "passport";

const router= Router()

router.get('/register',(req, res)=>{
    res.render('sessions/register')
})

router.post('/register',
    passport.authenticate('register', {failureRedirect: '/session/failureRegister'}),
    async(req, res)=>{
    res.redirect('/session/login')
})

router.get('/failureRegister', (req, res) =>{
    res.send({error: 'failed'})
})

router.get('/login', (req, res)=>{
    res.render('sessions/login')
})

router.post('/login',
    passport.authenticate('login', {failureRedirect: '/session/failLogin'}),
    async(req, res)=>{
    
    if(!req.user){
        return res.status(400).send({status: 'error', error: 'invalid credentials'})
    }
    req.session.user={
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age
    }
    res.redirect('/products')
})

router.get('/failLogin', (req,res)=>{
    res.send({error: 'fail in login'})
})

router.get('/github', passport.authenticate('github', {scope:['user: email']}), (req, res)=>{})

router.get('/githubcallback', 
    passport.authenticate('github', {failureRedirect: '/session/login'}),
    async(req, res)=>{
        req.session.user= req.user
        res.redirect('/products')
    })

router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if(err){
            res.status(500).render('errors/base',{error: err})
        }else{
            res.redirect('/session/login')
        }
    })
})
export default router
