const express = require('express')
const router = express.Router()
const pool = require('../dbconfig')

// Insert Row In Table
router.post('/:rowData',(req,res)=>{
    let index = 0
    let columName = ''
    let params = '';

    let paramsArray = req.params.rowData.split('||')
    paramsArray.map(e =>{
        params += "'"+e +"'"+","
    })
    params = params.slice(0,-1)

    pool.query(`SELECT MAX(id) as 'index' from user_data`,(err,result1)=>{
        if(err){
            res.header("Access-Control-Allow-Origin", "*");
            res.json({
                message: "error",
                err
            })
            return
        }
        index = result1[0].index + 1
        pool.query('SELECT column_name FROM column_lookup ORDER BY id ASC',(err,result)=>{
            if(err){
                res.header("Access-Control-Allow-Origin", "*");
                res.json({
                    message: "error",
                    err
                })
                return
            }
            result.map(e => {
                columName += e.column_name + ','
            })
            columName =  columName.slice(0,-1)

            pool.query(`INSERT INTO user_data (${columName}) VALUES ( ${index} , ${params})`,(err, result)=>{
                if(err){
                    res.header("Access-Control-Allow-Origin", "*");
                    res.json({
                        message: "error",
                        err
                    })
                    return
                }
                res.header("Access-Control-Allow-Origin", "*");
                res.json({
                    message: "Success",
                    result,
                })
            })
        })
    })
})

module.exports = router
