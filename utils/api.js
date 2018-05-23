import { message } from 'antd';
import domain from './domain';
/**判断请求status
 * @Author   LHK
 * @DateTime 2018-05-08
 * @version  [version]
 * @param    {[type]}   response [description]
 * @return   {[type]}            [description]
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
/**将结果转换为json
 * @Author   LHK
 * @DateTime 2018-05-08
 * @version  [version]
 * @param    {[type]}   response [description]
 * @return   {[type]}            [description]
 */
function parseJSON(response) {
  return response.json();
}
/**发送get请求
 * @Author   LHK
 * @DateTime 2018-05-06
 * @version  [version]
 * @param    {[type]}   options.method        [方法名]
 * @param    {[type]}   options.options       [自定义请求头]
 * @param    {[type]}   options.callback      [成功回调函数]
 * @param    {[type]}   options.errorCallback [失败回调函数]
 * @return   {[type]}                         [description]
 */
function requestGet({ method, callback ,errorCallback, options = {}}) {
  options.mode = "cors";
  return fetch(domain.host + method)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      callback(data);
    }).catch((err) => {
       if(errorCallback){
        errorCallback(err);
        return;
      }
      message.error('调用node.js失败,' + JSON.stringify(err) + ',方法名：' + method);
    });
}

/**
 * fetch--post请求
 * @Author   LHK
 * @DateTime 2018-05-06
 * @version  [version]
 * @param    {[type]}   options.method        [方法名]
 * @param    {[type]}   options.args          [参数]
 * @param    {[type]}   options.callback      [成功的回调函数]
 * @param    {[type]}   options.errorCallback [失败的回调函数]
 * @param    {Object}   options.options       [自定义fetch请求头]
 * @return   {[type]}                         [description]
 */
function requestPost({ method, args, callback ,errorCallback,options = {}}) {
    fetch(domain.host + method, {
        ...options,
        mode:'cors',
        method:'post',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(args)
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      callback(data);
    }).catch((err) => {
      if(errorCallback){
        errorCallback(err);
        return;
      }
      message.error('调用node.js失败,' + JSON.stringify(err) + ',方法名：' + method);
    });
}

export { requestGet, requestPost };