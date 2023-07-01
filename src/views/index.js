const express = require('express');
const router  = express.Router();


router.get(['/','/index','/logs'], (req, res) => {
    res.render('dashlogs.hbs');
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

router.get('/monitoreo', (req, res) => {
    res.render('monitoreo.hbs')
})

router.get('/blocks', (req, res) => {
    res.render('dashblock.hbs')
})

router.get('/entrada', (req, res) => {
    res.render('entrada.hbs')
})

router.get('/definicion', (req, res) => {
    res.render('definicion.hbs')
})

router.get('/casos', (req,res) => {
    res.render('casos.hbs')
})

router.get('/reglas', (req, res) => {
    res.render('reglas.hbs')
})

router.get('/alertas', (req,res) => {
    res.render('alertas.hbs')
})
module.exports = router;