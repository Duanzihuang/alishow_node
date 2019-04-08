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

// 删除
router.get('/categories/delete',async (req,res)=>{
    // 获取要删除的id
    const id = req.query.id

    await db.execPromise(`delete from ali_cate where cate_id = ${id}`)

    res.send({
        success:true
    })
})

// 导出
module.exports = router