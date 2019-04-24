// 导入express
const express = require('express')
const path = require('path')
const db = require(path.join(__dirname, '../../utils/db.js'))

// 创建路由对象
const router = express.Router()

// 添加前缀
router.prefix = '/api/users'

// 处理请求
router.get('/', async (req, res, next) => {
  try {
    const result = await db.execPromise('select * from ali_admin')

    res.send({
      success: true,
      message: result
    })
  } catch (error) {
    next(error)
  }
})

// 导出
module.exports = router
