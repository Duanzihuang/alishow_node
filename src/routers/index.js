// 导入express
const express = require('express')

// 创建路由对象
const router = express.Router()

// 处理请求
router.get('/',(req,res)=>{
    res.render('index.html')
})

router.get('/list',(req,res)=>{
    res.render('list.html')
})

router.get('/detail',(req,res)=>{
    res.render('detail.html')
})

// 前缀
router.prefix = '/'

// 导出
module.exports = router