const path = require('path')
const express = require('express')
const db = require(path.join(__dirname, '../../utils/db.js'))
const upload = require(path.join(__dirname,'../../utils/upload.js'))

const uploadPath = '/public/uploads'

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
