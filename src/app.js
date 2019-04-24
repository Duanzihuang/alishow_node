// 导入相关包
const express = require('express')
const path = require('path')
const glob = require('glob')

// 创建app
const app = express()

// 设置静态资源目录
app.use('/public', express.static(path.join(__dirname, 'public')))

/**
 * 配置使用 art-template 模板引擎
 * app.engine 方法的第一个参数用来指定模板文件的后缀名
 */
app.engine('html', require('express-art-template'))
// 设置的render的默认路径
app.set('views', path.join(__dirname, 'views'))

// body-parser中间件
app.use(express.urlencoded({ extended: true }))

// 集成路由，处理请求
/**
const router = require(path.join(__dirname,"routers"))
const adminRouter = require(path.join(__dirname,"routers/admin.js"))
const apiRouter = require(path.join(__dirname,"routers/api.js"))
app.use(router)
app.use('/admin',adminRouter)
app.use('/api',apiRouter)
*/
// 自动挂载路由模块
const filePaths = glob.sync(path.join(__dirname, 'routers/**/*.js'))
filePaths.forEach(filePath => {
  // 根据文件路径加载路由模块
  const router = require(filePath)

  if (typeof router === 'function') {
    // 自动挂载路由模块
    app.use(router.prefix || '/', router)
  }
})

/**
 * 统一错误处理
 */
app.use((err, req, res, next) => {
  res.status(500).send({
    statusCode: 500,
    message: 'Internal Server error',
    error: err.message
  })
})

// 启动
app.listen(3000, err => {
  if (err) {
    console.log(err)
  }

  console.log('server is running')
})
