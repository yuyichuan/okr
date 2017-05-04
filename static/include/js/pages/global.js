/*global $*/
/**
 * 全局功能 (头部和底部： 页面全局控制的代码)
 * @author wanghaojun
 * @version 2017-04-26
 * @since 2017-04-26
 */
define(function(require, exports, module) {
    var Validate = require('validate'),allValidator;
    var Dialog = require('dialog'),popWin = new Dialog ();
    var Common=require('Common');
    require('poshytip');
    var Main= {
        initValidate: function () {
            var validate = new Validate();

            validate.initMethods();
            validate.setPopupErr();
            validate.setPopupSuccess();

            allValidator = $('#changeForm').validate();
        },
        /**
         * 初始化验证规则
         */
        initValidRules: function () {
            $('#oldPwd').rules('add', {
                required: true,
                messages: {
                    required: '请输入当前密码'
                }
            });
            $('#newPwd').rules('add', {
                required: true,
                messages: {
                    required: '请输入新密码'
                }
            });
            $('#confirmPwd').rules('add', {
                required: true,
                equalTo:'#newPwd',
                messages: {
                    required: '请再次确认密码',
                    equalTo:'两次输入密码不一致'
                }
            });
            $.each($('.checkLength'), function (i, v) {
                var maxLength = parseInt($(v).attr('maxlength'), 10), minLength = parseInt($(v).attr('minLength'), 10);

                if (!isNaN(maxLength)) {
                    $(v).rules('add', {
                        maxlength : isNaN(maxLength) ? 0 : maxLength,
                        messages : {
                            maxlength : '最大长度为{0}个字符'
                        }
                    });
                }
                if (!isNaN(minLength)) {
                    $(v).rules('add', {
                        minlength : isNaN(minLength) ? 0 : minLength,
                        messages : {
                            minlength : '最小长度为{0}个字符'
                        }
                    });
                }
            });
        },
        initEvent:function () {
            $('#logoutBtn').on('click', function (event) {
                try {
                    window.external.CloseForm();
                } catch (e) {
                    location.href = $(this).attr('url');
                }
                return false;
            });
            $('.nav').on('click', function () {
                $(this).addClass('now').siblings('.nav').removeClass('now')
            });
            $('#changePsd').on('click', function () {
                $.dialog({
                    id:  'changePsdDlg',
                    tittle: '修改密码',
                    padding: 0,
                    lock:true,
                    content: $('#changePsdDlg')[0],
                    init: function () {
                        var that=this;
                        $('#changePsdDlg').find('.checkLength').val('');
                        Main.initValidate();
                        Main.initValidRules();
                        $(document).on('click', '#savePsd', function () {
                            if (!allValidator || !allValidator.form()) {
                                $('#changeForm .error:first').focus();
                                return false;
                            }
                            Common.doSave($('#changeForm'),$(this).attr('data-url'));
                        }).on('click','.cancelBtn',function () {
                            that.close();
                        });

                    }
                })
            });
        }
        }
    Main.initEvent();

});
