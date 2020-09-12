$(function() {
    var form = layui.form

    // 对基本资料表单验证
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '用户昵称必须在1~6位字符之间'
            }
        }
    })

    // 获取用户的基本信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'get',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }

                //注意：如果想赋值成功，后台返回的字段需要和name中的字段一致
                //就是说后台返回的字段，会显示到对应的name 位置
                form.val('formUserInfo', res.data)

            }
        })
    }

    // 重置表单
    $('#resetBtn').click(function() {
        initUserInfo()
    })

    // 更新资料按钮
    $('#changeUserInfo').submit(function(e) {
        e.preventDefault()

        $.ajax({
            url: '/my/userinfo',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                //使用iframe以后，iframe显示的页面可以理解为子页面
                //iframe标签所在的页面，可以看做是父页面
                //如果想父页面的方法，可以使用window.parent.方法名 即可
                window.parent.getUserInfo()
            }
        })
    })

})