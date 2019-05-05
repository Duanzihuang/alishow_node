const path = require('path')
const express = require('express')
const multer = require('multer')
const crypto = require('crypto')
const db = require(path.join(__dirname, '../../utils/db.js'))

const uploadPath = '/public/uploads'

var storage = multer.diskStorage({
  // 上传文件的路径，注意：要写全路径，否则报错
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads'))
  },
  // 设置文件名
  filename: function(req, file, cb) {
    // 获取文件的拓展名
    const extName = path.extname(file.originalname)
    // 获取15位数的随机16进制字符串
    const randomBytes = crypto.randomBytes(15).toString('hex')
    cb(null, randomBytes + '-' + Date.now() + extName)
  }
})

// 自定义上传文件的存储方式
var upload = multer({ storage: storage })

// 创建路由
const router = express.Router()

// 配置前缀
router.prefix = '/api/posts'

// 处理添加文章的请求
router.post('/create', upload.single('article_file'), async (req, res) => {
  // 获取 文件数据 和 普通的文本数据
  const { file, body } = req

  const result = await db.execPromise(`insert into ali_article set ?`, {
    article_title: body.article_title,
    article_body: body.article_body,
    article_adminid: req.session.user.admin_id,
    article_slug: body.article_slug,
    article_file: `${uploadPath}/${file.filename}`,
    article_cateid: body.article_cateid,
    article_pubtime: body.article_pubtime,
    article_status: body.article_status
  })

  if (result.affectedRows === 1){ // 插入成功
    // 保存到数据库
    res.send({
        success: true,
        message: '添加成功'
    })
  }  
})

module.exports = router
