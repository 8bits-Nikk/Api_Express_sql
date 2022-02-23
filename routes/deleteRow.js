const express = require('express')
const router = express.Router()
const pool = require('../dbconfig')

// Delete Row
router.get('/:RowId', (req, res) => {
    pool.query(`DELETE FROM user_data WHERE id = ${req.params.RowId}`, (err, result) => {
        if (err) throw err
        res.header("Access-Control-Allow-Origin", "*");
        res.json(result)
    })
})


module.exports = router
