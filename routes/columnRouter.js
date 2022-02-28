const express = require('express')
const router = express.Router()
const pool = require('../dbconfig')

//List Column
router.get('/', (req, res) => {
    pool.query('SHOW COLUMNS FROM user_data', (err, result) => {
        if (err) throw err
        res.header("Access-Control-Allow-Origin", "*");
        res.json(result)
    })
})

//Add Column to the table
router.post('/:ColumnName', (req, res) => {
    pool.query(`ALTER TABLE  user_data ADD ${req.params.ColumnName} varchar(45)`, (err) => {
        if (err) {
            res.header("Access-Control-Allow-Origin", "*");
            res.json({
                message: "error",
                err
            })
            return
        }
        pool.query(`INSERT INTO column_lookup (column_name) VALUES ('${req.params.ColumnName}')`, (error)=>{
            if (error){
                res.header("Access-Control-Allow-Origin", "*");
                res.json({
                    message: "error",
                    error
                })
            }
        })
        pool.query(`UPDATE user_data SET ${req.params.ColumnName} = 0`, (err2, result) => {
            if (err2) {
                res.header("Access-Control-Allow-Origin", "*");
                res.json({
                    message: "error",
                    error
                })
                return
            }
            res.header("Access-Control-Allow-Origin", "*");
            res.json({
                message: "success",
                result
            })
        })
    })
})



module.exports = router
