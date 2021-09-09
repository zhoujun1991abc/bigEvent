$(function() {

    var layer = layui.layer;
    var form = layui.form;
    ininArtCateList();

    //获取文章分类列表
    function ininArtCateList() {
        $.ajax({
            url: "/my/article/cates",
            method: "get",
            success(res) {
                var htmlStr = template("tpl-table", res);
                $("tbody").html(htmlStr);
            }
        })
    }

    //弹出层返回的ID值,为关闭弹出层传递id做准备
    var indexAdd = null;
    //为添加类别按钮绑定点击事件
    $("#btnAddCate").on("click", function() {
        indexAdd = layer.open({
            title: "添加文章分类",
            content: $("#dialog-add").html(), // 自定义模板弹出层内容
            type: 1,
            area: ["500px", "250px"]
        })
    })


    //通过代理的形式为form-add绑定submit事件
    //因为表单是点击添加按钮以后动态生成的,此时直接给表单绑定点击事件是不行的
    $("body").on("submit", "#form-add", function(e) {
        e.preventDefault();
        $.ajax({
            method: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg("新增分类失败");
                }

                ininArtCateList();
                layer.msg("新增分类成功");
                //关闭弹层
                layer.close(indexAdd)
            }
        })
    })

    //通过代理的形式为btn-edit绑定submit事件
    //因为表单是点击添加按钮以后动态生成的,此时直接给表单绑定点击事件是不行的
    // 弹出一个修改文章分类的信息层
    var indexEdit = null;
    $("tbody").on("click", ".btn-edit", function() {
        indexEdit = layer.open({
            title: "修改文章分类",
            content: $("#dialog-edit").html(), // 自定义模板弹出层内容
            type: 1,
            area: ["500px", "250px"]
        })

        var id = $(this).attr("data-id");
        $.ajax({
            url: "/my/article/cates/" + id,
            method: "get",
            success(res) {
                form.val("form-edit", res.data)
            }
        })
    })


    //通过代理的形式为btn-edit绑定submit事件
    //因为表单是点击添加按钮以后动态生成的,此时直接给表单绑定点击事件是不行的
    //提交更新修改文章分类信息
    $("body").on("submit", "#form-edit", function(e) {
        e.preventDefault();
        $.ajax({
            url: "/my/article/updatecate",
            method: "post",
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg("更新分类数据失败");
                }
                layer.msg("更新分类数据成功");
                // 关闭弹出层
                layer.close(indexEdit);
                ininArtCateList();
            }
        })
    })


    //通过代理的形式为btn-edit绑定submit事件
    //因为表单是点击添加按钮以后动态生成的,此时直接给表单绑定点击事件是不行的
    //删除分类
    $("tbody").on("click", ".btn-delete", function() {
        var id = $(this).attr("data-id");
        layer.confirm("确认删除", { icon: 3, titie: "提示" }, function(index) {
            $.ajax({
                url: "/my/article/deletecate/" + id,
                method: "get",
                success(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg("删除分类失败");
                    }
                    layer.msg("删除分类成功");
                    // 关闭弹出层
                    layer.close(index);
                    ininArtCateList();
                }
            })
        });
    })
})