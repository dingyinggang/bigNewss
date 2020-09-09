$(function() {
    // 点击 去注册账号 的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()

    })

    // 点击 去登录 的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()

    })

    //表单验证
    //从layui中获取form对象
    var form = layui.form
        //通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        //校验量词密码是否一致的规则
        repwd: function(value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容

            var pwd = $('.reg-box [name=password]').val()
            if (value != pwd) {
                return '两次密码不一致'
            }
        }


    })
})