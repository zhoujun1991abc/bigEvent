$(function() {

    //登录 注册互相切换
    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    })

    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    })


    // 自定义表单规则
    // layui 表单里面的正则 
    // 两种形式  数组是第一种方法  函数是第二种方法
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码6-12位且不能出现空格"],
        repwd: function(value) {
            var pwd = $(".reg-box [name=password]").val();
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })

    //监听注册表单的提交事件
    $("#form_reg").on("submit", function(e) {
        e.preventDefault();
        $.post("/api/reguser", { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg("注册成功,请登录");
            $("#link_login").click();
        })
    })

    //监听登录表单的提交事件
    $("#form_login").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "post",
            data: $(this).serialize(), //快速获取表单数据
            success(res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败");
                }
                layer.msg("登录成功");
                //将token字符串保存到localstrage种
                localStorage.setItem("token", res.token);
                location.href = '/index.html'
            }
        })
    })
})