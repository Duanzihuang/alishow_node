// 导入express
const express = require('express')
const path = require('path')
const db = require(path.join(__dirname, '../../utils/db.js'))
const crypto = require('crypto')

// 创建路由对象
const router = express.Router()

// 添加前缀
router.prefix = '/api/users'

// 处理请求
// 查询用户列表
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

// 验证邮箱是否存在
router.get('/checkemail',async (req,res,next) => {
  // 解构赋值出admin_email
  const {admin_email} = req.query

  try {
    const result = await db.execPromise('select * from ali_admin where admin_email = ?',admin_email)

    if (result[0]){ // 存在
      res.send(false)
    } else { // 不存在
      res.send(true)
    }
  } catch (error) { 
    res.send(false)
  }
})

// 登录
router.post('/login',async (req,res,next) => {
  // 参数解构赋值
  const {admin_email,admin_pwd} = req.body

  // 创建md5加密
  const hash = crypto.createHash('md5')
  // 对密码进行加密
  hash.update(admin_pwd)
  const md5Pwd = hash.digest('hex')
  
  try {
    // 根据用户名和密码查询，进行登录操作
    const sql = 'select * from ali_admin where admin_email = ? and admin_pwd = ?'
    const result = await db.execPromise(sql,[admin_email,md5Pwd])

    if (result[0]){
      req.session.user = result[0]
      return res.send({success:true,message:'登录成功'})
    }

    return res.send({success:false,message:'用户名或密码有误!'})
  } catch (error) {
    next(error)
  }
})

// 退出
router.get('/logout',(req,res) => {
  // 清空session中的user
  // req.session.user = null
  delete req.session.user

  // 重定向到登录页面
  res.redirect('/admin/login')
})

// 导出
module.exports = router
