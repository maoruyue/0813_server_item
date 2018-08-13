/*
使用axios封装的ajax请求函数
函数返回的是promise对象
 */
import axios from 'axios'
export default function ajax(url = '', data = {}, type = 'GET'){ //三个参数是API接口前三个  API接口分为URL，请求方式，请求参数格式，响应数据格式
  if(type === 'GET'){  //get请求
    // 准备data来拼 query参数串
    let queryStr = ''
    //Object.keys(data) ： 得到指定对象自身所有属性名组成的数['suername', 'password']
    //遍历数组拿到每一个参数名
    Object.keys(data).forEach(key =>{
      const value = data[key]
      queryStr += `${key}=${value}&`
    })
    if(queryStr){  //有参数
      queryStr = queryStr.substring(0, queryStr.length-1)
      url += '?' + queryStr

    }
    return axios.get(url)
  }else{  //post请求
    return axios.post(url, data)
  }
}