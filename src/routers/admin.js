// 导入express
const path = require('path')
const express = require('express')
const db = require(path.join(__dirname, '../utils/db.js'))

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

router.get('/posts-add', async (req, res) => {
  const result = await db.execPromise('select * from ali_cate')
  
  res.render('admin/posts-add.html',{
    categoires:result
  })
})

router.get('/posts', (req, res) => {
  res.render('admin/posts.html')
})

// 前缀
router.prefix = '/admin'

// 导出
module.exports = router
