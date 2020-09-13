$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').click(function() {
        $('#file').click()
    })

    //为文件选择框绑定change事件
    $('#file').on('change', function(e) {
        //获取用户选择的文件
        // console.log(e);
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }
        // 1. 拿到用户选择的文件
        var file = e.target.files[0]

        // 2. 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)

        // 3. 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image.cropper('destroy')
        $image.attr('src', newImgURL)
        $image.cropper(options)



    })

    //为确定按钮绑定点击事件
    $('#btnUpload').click(function() {
        //1拿到用户裁剪的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        //2调用接口，把头像上传到服务器
        $.ajax({
            url: '/my/update/avatar',
            method: 'post',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg(res.message)

                // 调用父页面的方法
                top.window.parent.getUserInfo()
            }
        })
    })
})