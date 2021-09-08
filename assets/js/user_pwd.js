$(function() {
    var form = layui.form;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $("[name = oldPwd]").val()) {
                return "新旧密码不能相同"
            }
        },
        rePwd: function(value) {
            if (value !== $("[name = newPwd]").val()) {
                return "两次密码不一致"
            }
        }
    })

    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: "/my/updatepwd",
            method: "post",
            data: $(this).serialize(),
            success(res) {
                console.log(123, res)
                if (res.status !== 0) {
                    return layui.layer.msg("更新失败");
                }
                layui.layer.msg("更新密码成功");

                //将jq元素转为dom元素 d调用原生方法reset
                $(".layui-form")[0].reset();
            }
        })
    })
})