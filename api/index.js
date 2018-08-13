/*
包含n个接口请求函数的模块
每个函数返回的都是promise对象
 */
import ajax from './ajax'

//请求注册
export const reqRegister = (username, password, type) => ajax('/register', {username, password, type}, 'POST')
//请求登录
export const reqLogin = (username, password) => ajax('/login', {username, password,}, 'POST')
