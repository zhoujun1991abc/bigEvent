$(function() {
    getUserInfo();

    var layer = layui.layer;
    //退出
    $("#btnLogout").on("click", function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem("token");
            location.href = "/login.html"
            layer.close(index);
        });
    })
})


//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        method: "get",
        success: function(res) {
            console.log(1111, res)
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败");
            }

            //渲染用户头像
            rederAvatar(res.data);
        }
    })
}

//渲染用户头像
function rederAvatar(user) {
    console.log(user)
        // 如果有用户昵称 先使用昵称 否则就用 用户的姓名
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎" + name);

    // 如果有头像就直接渲染出来  没有头像的话就把名字的首位作为头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        // 获取用户名的第一位 可能是中文 可能是英文
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }

}