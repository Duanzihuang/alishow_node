// 导入express
const express = require('express')

// 创建路由对象
const router = express.Router()

// 处理请求
router.get('/', (req, res) => {
  // res.render('admin/index.html',{
  //   sessionUser:req.session.user
  // })
  res.render('admin/index.html')
})

router.get('/login', (req, res) => {
  res.render('admin/login.html')
})

router.get('/categories', (req, res) => {
  res.render('admin/categories.html')
})

router.get('/users', (req, res) => {
  res.render('admin/users.html')
})

// 前缀
router.prefix = '/admin'

// 导出
module.exports = router
