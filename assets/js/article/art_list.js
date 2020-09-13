$(function() {
    var form = layui.form
        // 定义一个查询的参数对象，
        // 将来请求数据的时候，需要将参数对象提交到服务器
    var q = {
        pagenum: 1, //设置当前页码值在1
        pagesize: 2, //默认每页显示2条数据
        cate_id: '', //文章分类的id
        state: '' //文章的状态
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 获取文章列表
    initTable()

    function initTable() {
        $.ajax({
            url: '/my/article/list',
            type: 'get',
            data: q,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var tableHtml = template('tpl-table', res)

                $('tbody').html(tableHtml)
            }

        })
    }

    // 渲染所有的分类
    initCate()

    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            type: 'get',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var cateHtml = template('tpl-cate', res)

                $('.layui-form [name=cate_id]').html(cateHtml)

                // 插入到父级以后，页面不会渲染成功，与layui的渲染机制有关
                //手动调用form.render（）方法  让layui 重新渲染即可
                form.render()
            }
        })
    }

    // 筛选
    $('#listItems').on('submit', function(e) {
        e.preventDefault()

        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()

        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state

        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })
})