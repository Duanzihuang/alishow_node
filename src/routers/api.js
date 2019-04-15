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

// 删除分类
router.get('/categories/delete',async (req,res)=>{
    // 获取要删除的id
    const id = req.query.id

    await db.execPromise(`delete from ali_cate where cate_id = ${id}`)

    res.send({
        success:true
    })
})

// 新增分类
router.post('/categories/add',async (req,res)=>{
    // 获取增加的分类数据
    const cate = req.body

    // 插入数据库
    // const insertSql = `insert into ali_cate(cate_name,cate_slug) values (?)`
    const insertSql = `insert into ali_cate set ?`

    await db.execPromise(insertSql,cate)

    res.send({
        success:true
    })
})

// 根据id查询分类
router.get('/categories/query',async (req,res) => {
    const result = await db.execPromise(`select * from ali_cate where cate_id = ?`,[req.query.id])

    res.send({
        data:result[0],
        success:true
    })
})

// 修改分类
router.put('/categories/update',async (req,res) => {
    await db.execPromise(`update ali_cate set ? where cate_id = ?`,[req.body,req.query.id])
    
    res.send({
        success:true
    })
})

// 导出
module.exports = router