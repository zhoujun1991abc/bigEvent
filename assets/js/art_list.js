$(function() {
    var layer = layui.layer;

    // 定义一个查询的参数,将来请求数据的时候,需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "", //文章分类ID
        state: "" // 文章发布的状态
    }

    //获取文章列表数据方法
    function ininTable() {
        $.ajax({
            method: "get",
            url: "/my/article/list",
            data: q,
            success(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败");
                }
                //使用模板引擎渲染页面数据
                var htmlStr = template("tpl-table", res);
                $("tbody").html(htmlStr);
            }
        })
    }

    ininTable();
})