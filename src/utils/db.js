const mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ali_show'
})

connection.connect()

// 暴露一个执行sql的方法
exports.execPromise = sql => {
  return new Promise((resolve, reject) => {
    connection.query(sql, function(error, results) {
      if (error) {
        reject(error)
      }

      resolve(results)
    })
  })
}
