const express = require('express')
const router = express.Router()
const pool = require('../dbconfig')

//Get ALl Users
router.get('/',(req, res)=>{
    pool.query('SELECT * FROM user_data',(err, result)=>{
        if(err) throw err
        res.header("Access-Control-Allow-Origin", "*");
        res.json(result)
    })
})

//Get One user
router.get('/:id', (req, res)=>{
    pool.query('SELECT * FROM user_data WHERE id='+req.params.id,(err, result)=>{
        if(err) {
            res.header("Access-Control-Allow-Origin", "*");
            res.json({
                message: "error",
                err
            })
            return
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.json(result[0])
    })
})
module.exports = router
