$(function() {
    var btnAddCatelayer = layui.layer
        //获取文章类别
    getCatelist()

    function getCatelist() {
        $.ajax({
            url: '/my/article/cates',
            post: 'get',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                //使用模板引擎渲染页面
                //数据必须是一个对象
                var tableHtml = template('tpl-table', res)
                    // console.log(tableHtml);

                $('tbody').html(tableHtml)
            }
        })
    }

    // 为添加类别绑定事件
    var btnAddCate = null
    $('#btnAddCate').click(function() {
        //layui规定 每弹出一个层都会返回一个index
        //作用场景 根据index确认关闭哪一个弹出层
        btnAddCate = layer.open({
            type: 1,
            area: ['500px', ['249px']],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 添加文章分类
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()

        $.ajax({
            url: '/my/article/addcates',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                //重新渲染页面
                getCatelist()

                //关闭弹出层
                layer.close(btnAddCate)


            }
        })
    })
})