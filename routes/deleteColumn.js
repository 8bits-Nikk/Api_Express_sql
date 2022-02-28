const express = require('express')
const router = express.Router()
const pool = require('../dbconfig')

// Delete Column
router.delete('/:ColumnName', (req, res) => {
    pool.query(`ALTER TABLE user_data DROP COLUMN ${req.params.ColumnName}`, (err, result) => {
        if (err) {
            res.header("Access-Control-Allow-Origin", "*");
            res.json({
                message: "error",
                err
            })
            return
        }
        pool.query(`DELETE FROM column_lookup WHERE column_name = '${req.params.ColumnName}'`)
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
            message: "success",
            result
        })
    })
})


module.exports = router
