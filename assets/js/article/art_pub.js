$(function() {
    var layer = layui.layer
    var form = layui.form

    //获取文章分类
    getArtCat()

    function getArtCat() {
        $.ajax({
            url: '/my/article/cates',
            type: 'get',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                var selectHtml = template('select-art', res)
                $('#pubArticle [name=cate_id]').html(selectHtml)

                //需要手动告诉layui  重新加载页面
                form.render()

            }
        })
    }

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)



    // 选择需要上传的图片
    $('#selectImage').click(function() {
        $('#file').click()
    })

    //  获取上传后的图片 并替换裁剪区域
    $('#file').on('change', function(e) {
        //获取图片信息
        console.log(e);

        var files = e.target.files
        if (files.length === 0) {
            return layer.msg('图片上传失败')
        }

        // 将上传的图片转成url格式
        var newImgURL = URL.createObjectURL(files[0])

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    //定义文章的发布状态
    var art_state = '已发布'

    $('#btnSave2').click(function() {
        art_state = '草稿'
    })

    //为表单绑定submit提交事件
    $('#pubArticle').submit(function(e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
            // console.log(fd);
        fd.append('state', art_state)


        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)

                //发起ajax请求
                publishArticle(fd)

            })
            // fd.forEach(function(v, k) {
            //     console.log(v, k);
            // })
    })

    //定义一个发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            type: 'post',
            url: '/my/article/add',
            data: fd,
            //注意如果用formData格式的数据
            //必须添加一下两个配置项
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                location.href = '/article/art_list.html'
            }

        })

    }





})