// 导入相关包
const express = require('express')
const path = require('path')

// 创建app
const app = express()

// 设置静态资源目录
app.use('/public',express.static(path.join(__dirname,"public")))

/**
 * 配置使用 art-template 模板引擎
 * app.engine 方法的第一个参数用来指定模板文件的后缀名
 */
app.engine('html', require('express-art-template'))
// 设置的render的默认路径
app.set("views",path.join(__dirname,"views"))

// 集成路由，处理请求
const router = require(path.join(__dirname,"routers"))
const adminRouter = require(path.join(__dirname,"routers/admin.js"))
const apiRouter = require(path.join(__dirname,"routers/api.js"))
app.use(router)
app.use('/admin',adminRouter)
app.use('/api',apiRouter)

// 启动
app.listen(3000,err=>{
    if (err){
        console.log(err)
    }

    console.log('server is running')
})