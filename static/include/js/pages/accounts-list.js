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
    var refreshUrl = $dispatcher.attr('data-urlAfterEdit');
    //搜素用户url
    var searchUrl=$dispatcher.attr('data-urlSearch');
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
        doSave:function (tarForm,that) {
            var formData, saveUrl;
            saveUrl = tarForm.attr('action'), formData = tarForm.serialize();
            $.ajax({
                type: 'post',
                url: saveUrl,
                dataType: 'json',
                data: formData,
                success: function (d, s, xhr) {
                    if (d.status === 0) {
                        that.close();
                        popWin.tinyAlert('恭喜您开户成功',1);
                        location.href = refreshUrl;
                    } else {
                        popWin.alert(d.errorMsg || '操作失败');
                    }
                },
                error: function (xhr, s, err) {
                    return false;
                }
            });
        },
        /*
        * 新增开户弹框
        * */
        addUserDialog:function (cur,data) {
          $.dialog({
              id:   'addUserDialog',
              title:   data.title,
              padding:0,
              lock: true,
              content:$('#addUserDialog')[0],
              init:function () {
                    // clear
                    $('#groupids').prop('checked',false)

                    var that=this;
                    if(data.isEdit){
                        var uId=cur.closest('tr').attr('data-id');
                        var curId=cur.closest('tr').find('td:eq(1)').html();
                        var curName=cur.closest('tr').find('td:eq(2)').html();
                        var curGroup=cur.closest('tr').find('td:eq(3)').attr('gids').split(',');
                        $('#uId').val(uId);
                        $('#userId').val(curId);
                        $('#userName').val(curName);
                        $.each(curGroup,function (i,v) {
                            $('.group[value=' + v + ']').prop('checked',true);
                        });
                    }
                    $('.cancelBtn').on('click',function () {
                       that.close();
                    });
                    $('#saveBtn').off('click').on('click',function () {
                        var userData=$('addUserForm').serialize();
                        if (!formValidator || !formValidator.form()) {
                            $('#addUserForm .error:first').focus();
                            return false;
                        }
                        if($('#addUserForm').find('input.group:checked').length<=0){
                            popWin.alert('请至少选择一个用户组');
                            return false;
                        }
                        if(data.isEdit){
                            $.ajax({
                                type: 'post',
                                url: $('#addUserForm').attr('action'),
                                dataType: 'json',
                                data: $('#addUserForm').serialize(),
                                success: function (d, s, xhr) {
                                    if (d.status === 0) {
                                        that.close();
                                        popWin.tinyAlert('修改成功',1);
                                        location.href = refreshUrl;
                                    } else {
                                        popWin.alert(d.errorMsg || '操作失败');
                                    }
                                },
                                error: function (xhr, s, err) {
                                    return false;
                                }
                            });
                        }else {
                            Main.doSave($('#addUserForm'),that);
                        }

                    });
//                    $('.group').on('click',function () {
//                        $(this).val(($(this).is(':checked'))?'true':'false');
//                    })
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
                Main.addUserDialog($(this),
                    {
                        isEdit:false,
                        title:'新增用户'
                    });
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
            }).on('click','.editBtn',function () {
                Main.addUserDialog($(this),
                    {
                        isEdit:true,
                        title:'修改用户信息'
                    })
            });

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