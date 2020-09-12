$(function() {
    var layer = layui.layer
    getUserInfo()

    // 给退出绑定事件
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1、移除本地的token
            localStorage.removeItem('token')

            //2、重新跳回登录界面
            location.href = 'login.html'

            layer.close(index);
        })
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        // headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }

            //调用renderAvatar渲染用户的头像
            renderAvatar(res.data)

        },
        // error: function() {},

        //不论成功还是失败，最终都会调用complete回调函数
        // complete: function(res) {
        //     console.log(res);
        //     //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //清除本地的token  也是防止伪造假的token
        //         localStorage.removeItem('token')

        //         // 跳回登录页面
        //         location.href = 'login.html'
        //     }
        // }


    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username

    //设置欢迎文本
    $('#welcome').html('欢迎 ' + name)

    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        var first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(first).show()

    }

}