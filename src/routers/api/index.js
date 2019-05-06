const express = require('express')
const path = require('path')
const upload = require(path.join(__dirname,'../../utils/upload.js'))
const router = express.Router()

router.prefix = '/api'

router.post('/upload',upload.single('file'),(req,res)=>{
    res.send({
        success:true,
        filePath:`/public/uploads/${req.file.filename}`
    })
})

module.exports = router