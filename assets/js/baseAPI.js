//注意：每次调用$.get()或者$.post()或$.ajax()的时候
//会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$(function() {
    $.ajaxPrefilter(function(options) {
        // console.log(options);

        // console.log(options.url);

        //在发起真正的ajax请求之前，统一拼接请求的根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url
            // console.log(options.url);

        //统一为有权限的接口，设置header请求头
        if (options.url.indexOf('/my/') != -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }

        options.complete = function(res) {
            // console.log(res);
            //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //清除本地的token  也是防止伪造假的token
                localStorage.removeItem('token')

                // 跳回登录页面
                location.href = 'login.html'
            }
        }
    })


})