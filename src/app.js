// 导入相关包
const express = require('express')
const path = require('path')
const glob = require('glob')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)

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

// session持久化存储
const sessionStore = new MySQLStore({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'ali_show'
})

// session中间件
app.use(
  session({
    secret: 'keyboard cat',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // expires:'xxxx年xx月xx日 xx时xx分xx秒' //绝对单位，不推荐，因为可能服务器和浏览器时间不一致导致问题
      maxAge: 1000 * 60 * 30 // 单位：毫秒，这里设置了30分钟 相对单位，从现在起延迟多少毫秒过期
    }
  })
)

// 权限中间件
app.use('/admin', (req, res, next) => {
  // 跳过登录页面
  if (req.originalUrl === '/admin/login') {
    return next()
  }

  // 没有登录，则去登录页面
  if (!req.session.user) {
    return res.redirect('/admin/login')
  }

  // 设置公共页面渲染需要用到的数据
  app.locals.sessionUser = req.session.user

  // 跳转到下一个中间件执行，此刻，是去路由中间执行代码
  // 比如访问的路径是 /admin/users 则去能处理/admin/users 的路由中间件去处理
  // 比如访问的路径是 /admin/categories 则去能处理/admin/categories 的路由中间件去处理
  next()
})

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
