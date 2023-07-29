import { Router } from "express";
import passport from 'passport'
import {cookiesTime} from "../utils/dictionary.js"

// "/authGithub"
const routerGithub = Router()

// Register
routerGithub.get('/github', passport.authenticate('github'), async (req, res) => { 
})

// Login
routerGithub.get('/githubSession', passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user
    
    if (req.session.user) {
        req.session.login = true
        const token = req.authInfo.token
        res
        .cookie('jwtCookies',token,{maxAge: cookiesTime.jwt})
        .redirect('/api/products')
    } else {
        res.redirect('/login')
    }
})

export default routerGithub