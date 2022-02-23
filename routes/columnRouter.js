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
router.get('/:ColumnName-:ColumnType', (req, res) => {
    pool.query(`ALTER TABLE  user_data ADD ${req.params.ColumnName} ${req.params.ColumnType}`, (err, result) => {
        if (err) {
            res.header("Access-Control-Allow-Origin", "*");
            res.json({
                message: "error",
                err
            })
            return
        }
        pool.query(`UPDATE user_data SET ${req.params.ColumnName} = 0`, (err, result) => {
            if (err) throw err
            res.header("Access-Control-Allow-Origin", "*");
            res.json({
                message: "success",
                result
            })
        })
    })
})



module.exports = router
