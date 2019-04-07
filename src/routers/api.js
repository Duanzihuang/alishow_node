// 导入express
const express = require('express')
const path = require('path')
const db = require(path.resolve(__dirname,"../utils/db.js"))

// 创建路由对象
const router = express.Router()

// 处理请求
// 获取分类列表
router.get('/categories',async (req,res)=>{
    const result = await db.execPromise('select * from ali_cate')

    res.send({
        success:true,
        data:result
    })
})

// 导出
module.exports = router