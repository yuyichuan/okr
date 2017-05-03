/**
 * OKR-开户
 * Created by wanghaojun on 2017/4/27.
 */
define(function(require, exports, module) {
    var $dispatcher = $('#dispatcher');
    var Validate = require('validate'),formValidator;
    var Dialog = require('dialog'),popWin = new Dialog ();
    var Common=require('Common');
    //列表页 删除的url
    var delUrl = $dispatcher.attr('data-urlDelete');
    //删除后 刷新列表的url
    var refreshUrl = $dispatcher.attr('data-urlAfterDelete');
    //搜素用户url
    var searchUrl=$dispatcher.attr('data-urlSearch');
    //新开用户保存后url
    var addUserUrl=$dispatcher.attr('data-urlAddUser');
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

            formValidator = $('#addUserForm').validate();
        },
        /**
         * 初始化验证规则
         */
        initValidRules:function () {
            $('#userId').rules('add', {
                required: true,
                messages: {
                    required: '请输入ID',
                }
            });
            $('#userName').rules('add', {
                required: true,
                messages: {
                    required: '请输入姓名',
                }
            });
        },
        /*
        * 新增开户弹框
        * */
        addUserDialog:function () {
          $.dialog({
              id:   'addUserDialog',
              title:   '新增开户',
              padding:0,
              lock: true,
              content:$('#addUserDialog')[0],
              init:function () {
                    var that=this;
                    $('.cancelBtn').on('click',function () {
                       that.close();
                    });
                    $('#saveBtn').on('click',function () {
                        var userData=$('addUserForm').serialize();
                        if (!formValidator || !formValidator.form()) {
                            $('#addUserForm .error:first').focus();
                            return false;
                        }
                        if($('#addUserForm').find('input.group:checked').length<=0){
                            popWin.alert('请至少选择一个用户组');
                            return false;
                        }
                        popWin.tinyAlert('恭喜您开户成功',1);
                        that.close();

                        $.get(addUserUrl,userData,function (re) {
                            $('.table-div').find('table tbody').html(re);
                        },'html');
                    });
                    $('.group').on('click',function () {
                        $(this).val(($(this).is(':checked'))?'true':'false');
                    })
              }
          });
        },
        /*
        * 搜索用户
        * */
        searchUser:function (keyword) {
            $.get(searchUrl,keyword,function (re) {
                $('.table-div').find('table tbody').html(re);
            },'html');
        },
        /*
        * 初始化事件
        * */
        initEvent:function () {
            $(document).on('click',"#addUser",function () {
                Main.addUserDialog();
            }).on('click','.delBtn',function () {
                var me=$(this), $tr=me.closest('tr'),dataId='';
                dataId=$tr.attr('data-id');
                popWin.confirm('确定要删除?',function () {
                    Common.doDel({
                        url:delUrl,
                        data:{
                            userId:dataId,
                            r:Math.random()
                        },
                        afterUrl:refreshUrl
                    })
                });
                return false;
            }).on('click','#searchBtn',function () {
                var keyWord=$(this).prev().val();
                Main.searchUser(keyWord);
            })

        },
        /*
        * 初始化加载页面
        * */
        initpage:function () {
            Main.initEvent();
            Main.initValidate();
            Main.initValidRules();
        }
    }
    Main.initpage()
});