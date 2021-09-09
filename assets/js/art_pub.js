$(function() {

    var layer = layui.layer;
    var form = layui.form;

    //定义文章分类的方法
    function initCate() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg("初始化文章分类失败");
                }

                //调用模板引擎渲染分类的下拉菜单
                var htmlStr = template("tpl-cate", res);
                $("[name = cate_id]").html(htmlStr);

                //调用form.render()方法重新渲染
                form.render();
            }
        })
    }

    initCate();
    //初始化富文本编译器
    initEditor();


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    //为选择封面的按钮绑定点击事件
    $("#btnChooseImage").on("click", function() {
        $("#coverFile").click();
    })

    //监听coverFile的change事件,获取用户选择的文件列表
    $("#coverFile").on("change", function(e) {
        var files = e.target.files;
        //判断用户是否选择了文件
        if (files.length === 0) {
            return
        }

        //根据文件创建对应的URL地址
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


    // 定义文章的发布状态. 要么是发布 要么是存为草稿 默认为已发布
    var art_state = "已发布";
    //为存为草稿按钮绑定点击处理函数
    $("#btnSave2").on("click", function() {
        art_state = "存为草稿";
    })


    //为表单绑定submit提交事件
    $("#form_pub").on("submit", function(e) {
        e.preventDefault();
        //基于form表单,快速创建一个forDate对象
        var fd = new FormData($(this)[0]);

        //将文章的发布状态,存到formDate中
        fd.append("state", art_state);


        //将封面裁剪过后的图片输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                //将文件对象存储到formDate中;
                fd.append("cover_img", blob);
                //发起ajax请求
                publishArticle(fd);
            })
    })

    function publishArticle(fd) {
        $.ajax({
            url: "/my/article/add",
            method: "post",
            //如果像服务器提交的是formdate格式的数据 必须要添加以下两个配置项
            data: fd,
            contentType: false,
            processData: false,
            success(res) {
                if (res.status !== 0) {
                    return layer.msg("发布文章失败")
                }
                layer.msg("发布文章成功");
                location.href = "/article/art_list.html"
            }
        })
    }

})