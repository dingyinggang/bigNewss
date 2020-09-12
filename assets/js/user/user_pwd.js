$(function() {
    var form = layui.form

    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('.layui-form [name=oldPwd]').val()) {
                return '两次不能输入相同的密码！'
            }
        },
        rePwd: function(value) {
            if (value !== $('.layui-form [name=newPwd]').val()) {
                return '两次密码修改不一致！'
            }
        }
    })

    // 重置密码操作
    $('.layui-form').submit(function(e) {
        e.preventDefault()

        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layer.msg(res.message)

                // 清空表单内容
                $('.layui-form')[0].reset()

                // 清除本地的token
                localStorage.removeItem('token')

                // 跳回到登录界面
                top.window.location.href = '/home/login.html'
            }
        })
    })
})