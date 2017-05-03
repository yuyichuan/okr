/**
 * OKR 用户登陆
 * Created by wanghaojun on 2017/4/26.
 */
define(function (require, exports, module) {
    var Dialog=require('dialog');
    var $dispatcher = $('#dispatcher-admin');
    var Validate = require('validate'),formValidator;

    require('poshytip');
    var Main={
        /*
        * 初始化表单验证
        * */
        initValidate: function () {
            var validate = new Validate ();

            validate.initMethods();
            validate.setPopupErr();
            validate.setPopupSuccess();

            formValidator = $('#loginForm').validate();
        },
        /**
         * 初始化验证规则
         */
        initValidRules:function () {
            $('.userid').rules('add', {
                required: true,
                messages: {
                    required: '用户名不能为空',
                }
            });
            $('.password').rules('add', {
                required: true,
                messages: {
                    required: '密码不能为空',
                }
            });
        },
        initEvent: function () {

            $(document).on('submit', '#searchForm', function (e) {
                //提交表单
                if (!formValidator || !formValidator.form()) {
                    $('#searchForm .error:first').focus();
                    return false;
                }
            });
        },
        //初始化页面
        initPage: function () {
            Main.initEvent();
            Main.initValidate();
            Main.initValidRules();
        }
    };
    Main.initPage();
        // 记住登录
       /* $(".chose,.chose-ed").on("click", function() {
            if ($(this).attr("class") === "chose") {
                $(".chose").hide();
                $(".chose-ed").show();
                $("#rememberMe").val("true");
            } else {
                $(".chose-ed").hide();
                $(".chose").show();
                $("#rememberMe").val("false");
            }
        });
    });*/

});