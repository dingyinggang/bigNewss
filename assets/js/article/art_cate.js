$(function() {
    var btnAddCatelayer = layui.layer

    var form = layui.form
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

    //展示编辑弹框
    var editCateIndex = null
    $('body').on('click', '#btn-edit', function() {
        editCateIndex = layer.open({
            type: 1,
            area: ['500px', ['249px']],
            title: '修改文章分类',
            content: $('#edit-dialog').html()
        })

        // 点击编辑之后，获取到自定义的id
        var cateID = $(this).attr('data-Id')

        $.ajax({
            url: `/my/article/cates/${cateID}`,
            type: 'get',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 使用form.val()对表单赋值
                form.val('edit-form', res.data)
            }
        })
    })

    // 编辑文章分类
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()

        $.ajax({
            url: '/my/article/updatecate',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.mag(res.message)
                }
                layer.msg(res.message)

                getCatelist()

                layer.close(editCateIndex)


            }
        })
    })
})