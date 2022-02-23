const express = require('express')
const router = express.Router()
const pool = require('../dbconfig')

// Delete Column
router.get('/:ColumnName', (req, res) => {
    pool.query(`ALTER TABLE user_data DROP COLUMN ${req.params.ColumnName}`, (err, result) => {
        if (err) {
            res.header("Access-Control-Allow-Origin", "*");
            res.json({
                message: "error",
                err
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


module.exports = router
