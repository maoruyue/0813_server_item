var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')
const {UserModel} = require('../db/models')
const filter = {password: 0, __v: 0} // 过滤掉查询时不需要的属性数据

// 1. 注册的路由
router.post('/register', function (req, res) {
  // 1. 获取请求参数
  const {username, password, type} = req.body
  // 2. 处理: 根据username查询users集合, 如果有, 直接返回了一个失败的提示数据, 如果没有, 保存, 完成后返回一个成功的信息
  UserModel.findOne({username}, (error, userDoc) => {
    if(userDoc) {// 此用户已存在
      // 3. 返回响应(失败)
      res.send({code: 1, msg: '此用户已存在, 请重新注册'})
    } else {// 此用户不存在 , 可以注册
      // 向浏览器返回一个cookie数据( 7天免登陆，实现注册成功后自动登陆了)
      //cookie 是一个小文本数据，有服务器产生，浏览器存储，是一个键值对key:value
          //       key       value
      res.cookie('userid', userDoc._id, {maxAge: 1000*60*60*24*7})

      new UserModel({username, password: md5(password), type}).save((error, userDoc) => {
        // 3. 返回响应(成功)
        res.json({code: 0, data: {_id: userDoc._id, username, type}})
      })
    }
  })
})


// 2. 登陆的路由
router.post('/login', function (req, res) {
  const {username, password} = req.body
  // 根据username和password查询users集合, 如果有对应的user, 返回成功信息, 如果没有返回失败信息
  UserModel.findOne({username, password: md5(password)}, filter, (error, userDoc) => {
    if(userDoc) { // 成功
      // 向浏览器返回一个cookie数据(实现7天免登陆)
      res.cookie('userid', userDoc._id, {maxAge: 1000*60*60*24*7})

      res.send({code: 0, data: userDoc})
    } else { // 失败
      res.send({code: 1, msg: '用户名或密码错误!'})
    }
  })
})

module.exports = router;