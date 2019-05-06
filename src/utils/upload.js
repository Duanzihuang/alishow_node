const path = require('path')
const multer = require('multer')
const crypto = require('crypto')

var storage = multer.diskStorage({
  // 上传文件的路径，注意：要写全路径，否则报错
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/'))
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

// 导出
module.exports = upload
