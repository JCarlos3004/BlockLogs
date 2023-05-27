const express = require('express');
const router  = express.Router();


router.get(['/','/index'], (req, res) => {
    res.render('index.hbs');
});

router.get('/tables', (req, res) => {
    res.render('tables.hbs');
});

router.get('/blockchain', (req, res) => {
    res.render('blockchain.hbs');
});

router.get('/transacciones', (req, res) => {
    res.render('transacciones.hbs');
});

router.get('/perfil', (req, res) => {
    res.render('perfil.hbs')
})
module.exports = router;