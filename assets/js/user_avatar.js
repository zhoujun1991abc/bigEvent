$(function() {
    var layer = layui.layer;


    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
        // 纵横比 指定预览区域
    const options = { aspectRatio: 1, preview: '.img-preview' }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    //为上传按钮点击事件
    $("#btnChooseImg").on("click", function() {
        //点击上传按钮模仿 上传文件的效果
        $("#file").click();
    })


    //文件图片change事件
    $("#file").on("change", function(e) {
        var fileList = e.target.files;
        if (fileList.length === 0) {
            return layer.msg("请选择图片")
        }
        // 1. 拿到用户选择的文件
        var file = e.target.files[0];

        // 2 将文件转化为路径
        var newImgURL = URL.createObjectURL(file);

        // 3 重新初始化裁剪区域
        $image.cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options)
    })


    // 为确定按钮绑定点击事件
    $("#btnUpload").on("click", function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为

        $.ajax({
            method: "post",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("更换头像失败");
                }
                layer.msg("跟新头像成功");
                window.parent.getUserInfo();
            }
        })
    })
})