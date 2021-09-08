$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度在1-6个字符之间"
            }
        }
    })
    initUserInfo();

    //初始化用户的信息
    function initUserInfo() {
        $.ajax({
            url: "/my/userinfo",
            method: "get",
            success(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败")
                }

                //调用form.val 快速为表单赋值
                form.val("formUserInfo", res.data)
            }
        })
    }

    //重置表单数据
    $("#btnReset").on("click", function(e) {
        e.preventDefault();
        initUserInfo();
    })


    //监听表单的提交
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: "/my/userinfo",
            method: "post",
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户失败");
                }
                layer.msg("更新用户成功")

                //调用父页面的方法,重新渲染头像和名字
                window.parent.getUserInfo();
            }
        })

    })
})