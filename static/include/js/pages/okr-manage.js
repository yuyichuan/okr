/**
 * okr管理
 * Created by wanghaojun on 2017/4/27.
 */
define(function(require, exports, module) {
    var $dispatcher = $('#dispatcher');
    var Validate = require('validate'),formValidator;
    var Dialog = require('dialog'),popWin = new Dialog ();
    var Common=require('Common');


    //保存O/KR后刷新的URL
    var afterSaveUrl=$dispatcher.attr('data-urlAfterSave');

    //列表页 删除的url
    var delUrl = $dispatcher.attr('data-urlDelete');

    var Main={
        /*
         * 初始化表单验证
         * */
        initValidate: function () {
            var validate = new Validate ();

            validate.initMethods();
            validate.setPopupErr();
            validate.setPopupSuccess();

            formValidator = $('#okrForm').validate();
        },
        /**
         * 初始化验证规则
         */
        initValidRules:function () {
            $('#okrGoal').rules('add', {
                required: true,
                messages: {
                    required: 'O/KR不能为空'
                }
            });
            $('#planTime').rules('add', {
                required: true,
                isPlanTime:'',
                messages: {
                    required: '请输入计划天数',
                    isPlanTime:'最多4位数，保留1位小数'
                }
            });
            $('#goalLevel').rules('add', {
                required: true,
                messages: {
                    required: '请选择难度'
                    }
                });
             $('.chkMonth').rules('add',{
                required: function(){
                     if($('.chkMonth').length>0 && !$('#checkedMonths').val()){
                        return true;
                     }else{
                        return false;
                     }
                },
                messages: {
                    required: '请选择jihuayuefen'
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
                         popWin.tinyAlert('保存成功！', 1);
                        setTimeout(function () {
                            location.href = afterSaveUrl;
                        },1500);
                    } else {
                        popWin.alert(d.errorMsg || '操作失败');
                    }
                },
                error: function (xhr, s, err) {
                    popWin.alert('操作失败');
                    return false;
                }
            });
        },

        clearKr:function(){
            $('#checkedIds').val('');
            $('#okrGoal').val('');
            $('#planTime').val('');
            $('#participant').val('');
            $('#checkedIds').val('');
            $('.checkItem').prop('checked',false)
            $('.chkMonth').prop('checked',false);
            $('#goalLevel').find('option').prop('selected',false);
            $('#kid').val('');
        },

        //修改kr
        editKr:function (okrCnt,okrTime,okrPeople,okrMonth,okrLevel, okrid) {
            $('#checkedIds').val(okrPeople)
            $('#okrGoal').val(okrCnt);
            $('#planTime').val(okrTime);
            $('#participant').val('已选择'+okrPeople.length+'人');
            $.each(okrPeople,function (i,v) {
                $('.checkItem[value=' + v + ']').prop('checked',true);
            })
            $.each(okrMonth,function (i,v) {
                $('.chkMonth[value=' + v + ']').prop('checked',true);
            });
            $('#goalLevel').find('option[value=' + okrLevel + ']').prop('selected',true);
            $('#kid').val(okrid);
        },
        /*
         * 新增开户弹框
         * */
        addODialog:function ($cur,data) {
            var dialogHtml = $('#newODialog').html();
            $.dialog({
                id:   'newODialog',
                title:   $cur.attr('title'),
                padding:0,
                lock: true,
                content:$('#newODialog')[0],
                init:function () {
                    Main.clearKr();
                    var that=this;
                    var okrTr=$cur.closest('tr');
                    var curClass=$cur.attr('class');//新增的标识
                    var okrCnt=okrTr.find('.krCnt div a').html();//O/KR的内容

                    var pkid=$cur.attr('pkid')
                    $('#dpkid').val(pkid)
                    var klevel=$cur.attr('klevel')
                    $('#dklevel').val(klevel)

                    if($cur.is('#addO')){
                        $('#krDes').hide();
                        //$('#krInput').find('i').html('<b>*</b>部门<b class="o-font">O</b>:<br/><em class="jishu">0/300</em>')
                    }
                    //新增KR
                   if($cur.is('.addKR')){
                       $('#krDes').show();
                       $('.okr-show').html(okrCnt);
                       $('#krInput').find('i').html('<b>*</b>KR:<br/><em class="jishu">0/300</em>');
                    }
                    //修改的代码
                    if(data.isEdit){
                        var curSign=$cur.attr('data-sign');//修改的标识
                        var okrTime=okrTr.find('.krTime').html();//计划用时
                        var okrLevel=okrTr.find('.krLevel').html();//难度
                        var okrPeople=okrTr.find('.krPeople').attr('peopleIds').split(',');//参与人员的数组
                        var okrMonth=okrTr.find('.krMonth').attr('monthIds').split(',');//已选择月份的数组
                        var krid = okrTr.attr('id');
                        $('#checkedMonths').val(okrTr.find('.krMonth').attr('monthIds'));
                        if($cur.attr('parentId')){
                            var subDes=$('#'+$cur.attr('parentId')).find('.krCnt div a').html();
                        }
                        switch (curSign){
                            case 'editO':
                                $('#krDes').hide();
                                Main.editKr(okrCnt,okrTime,okrPeople,okrMonth,okrLevel, krid);
                                break;
                            case 'editKR':
                                $('#krInput').find('i').html('<b>*</b>KR:<br/><em class="jishu">0/300</em>');
                                $('#krDes').find('.okr-show').html(subDes);
                                Main.editKr(okrCnt,okrTime,okrPeople,okrMonth,okrLevel, krid);
                                break;
                            default:break;
                        }
                    }
                    $('body').off('click','.chkMonth').on('click','.chkMonth',function () {//选择月份
                        var me = $(this), isChecked = false, checkedVal = "", checkedIds = '';
                        isChecked = me.is(':checked'), checkedVal = me.val();
                        checkedIds = Main.getCheckedIds(isChecked, checkedVal,$('#checkedMonths'));
                        $('#checkedMonths').val(checkedIds);
                    }).off('click','#participant').on('click','#participant',function () {
                        Main.getParticipantDlg();
                    }).off('click','.saveBtn').on('click','.saveBtn',function () {
                        if (!formValidator || !formValidator.form()) {
                            $('#okrForm .error:first').focus();
                            return false;
                        }
                        if($('#participant').length>0 && !$('#checkedIds').val()){
                            Common.initPoshytip($('#participant'),'请至少选择一个参与人员');
                            $('#participant').addClass('error errorInput').focus();
                            return false;
                        }
                        Main.doSave($('#okrForm'),that);
                    });
                    $('#okrGoal').countTip(300,function (v) {
                        return v.length;
                    })
                    $('.cancelBtn').off('click').on('click',function () {
                        that.close();
                    });
                }
            });
        },
        getParticipantDlg:function (customerIds) {
                $.dialog({
                    id:'participantDialog',
                    title:'选择人员',
                    padding:0,
                    content:$('#participantDialog')[0],
                    close:function(){
                        var checkedIds=$('#checkedIds').val();
                        var checkList;
                        if(checkedIds){
                            checkList=checkedIds.split(',');
                            $('.checkItem').removeAttr('checked');
                            $.each(checkList,function (i,v) {
                                $('.checkItem[value=' + v + ']').prop('checked',true);
                            })
                        }else {
                            $('.checkItem').removeAttr('checked');
                        }
                    },
                    init:function () {
                        var $that=this;
                        $('#financialCheckedIds').val($('#checkedIds').val());
                        Main.sumChecked();
                        $('body').off('click', '.showCheck').on('click', '.showCheck', function() {
                            var checkedIds = '', isShowChecked = '';
                            //‘仅显示已勾选项’是否选中，选中为true(checkbox的value值)，没有选中为空
                            isShowChecked = $('.showCheck:checked').val() || 'false';
                            //根据已勾选的账户id 向后台请求搜索结果
                            if(isShowChecked=='true'){
                                $('input.checkItem').not(':checked').parent().hide();
                            }else{
                                $('input.checkItem').not(':checked').parent().show();
                            }
                        }).off('click','.searchBtn').on('click','.searchBtn',function () {
                            var keyword=$('#searchInput').val();
                        });

                        //初始化判断全选状态
                        Main.checkAll();
                        //全选
                        $(document).off('click','#checkAll').on('click', '#checkAll', function() {
                            //回填
                            Common.selectAll($('#checkAll'), $('.checkItem'));
                            //计算当前选中的checkbox数目并回填数值
                            Main.sumChecked();
                        });

                        $(document).off('change', '.checkItem').on('change', '.checkItem', function() {
                            var me = $(this), isChecked = false, checkedVal = "", checkedIds = '';
                            isChecked = me.is(':checked'), checkedVal = me.val();

                            Main.checkAll();
                            //记录当前勾选项
                            checkedIds = Main.getCheckedIds(isChecked, checkedVal,$('#financialCheckedIds'));
                            $('#financialCheckedIds').val(checkedIds);
                            //计算当前选中的checkbox数目并回填数值
                            Main.sumChecked();
                        });
                        //确认-
                        $('body').off('click', '.sureBtn').on('click', '.sureBtn', function() {
                            var checkedIds = '', checkedNum = 0;
                            //获取已勾选的项
                            checkedIds = $('#financialCheckedIds').val();
                            //回填id为objIds的隐藏域 中
                            $('#checkedIds').val(checkedIds);
                            //回填 已选择的会员类别数目
                            if (checkedIds != '') {//至少选择一个时，才计算  ''.split(',').length=1
                                checkedNum = checkedIds.split(',').length;
                            }
                            if (checkedNum) {//至少选择一个时，才显示统计医院数目
                                $('#participant').val('已选择' + checkedNum + '项');
                            } else {//否则显示 点击选择
                                $('#participant').val('点击选择');
                            }
                            $that.close();
                            return false;
                        });
                        //取消
                        $('body').off('click', '.staffCancelBtn').on('click', '.staffCancelBtn', function() {
                            $that.close();
                        });
                    }
                })
        },

        /**
         * 输出已勾选的项ids
         * @return {String:ids 已勾选的项id组成的字符串，以逗号分隔}
         * @param {Boolean isChecked 当前checkbox的勾选状态}
         * @param {String checkedVal 当前checkbox的值}
         */
        getCheckedIds : function(isChecked, checkedVal,$tar) {
            var ids = "", idsArr = [];
            //初始化 已勾选的ids
            ids = $tar.val(), ids != '' ? idsArr = ids.split(',') : idsArr = [];
            //根据当前checkbox勾选情况，判断当前checkbox的值 是否加入idsArr
            if (isChecked && $.inArray(checkedVal, idsArr) < 0) {//如果被勾选且不存在于之前的idsArr
                //checkedVal插入到idsArr
                idsArr.push(checkedVal);
            }
            if (!isChecked && $.inArray(checkedVal, idsArr) >= 0) {//如果取消勾选且存在于之前的idsArr
                removeByValue(idsArr, checkedVal);
            }
            ids = idsArr.join();
            return ids;
        },
        /**
         * 计算当前选中的项数目，并回填到列表中。
         */
        sumChecked : function() {
            var checkedNum = 0, checkedIds = '', checkedIdsArr = [];
            checkedIds = $("#financialCheckedIds").val();
            if (checkedIds != '') {
                checkedIdsArr = checkedIds.split(',');
                checkedNum = checkedIdsArr.length;
            }
            $('#checkedNum').html(checkedNum);
        },/**
         * 初始化当前全选的选中状态
         * @return {void}
         */
        checkAll : function() {
            if ($(".checkItem:checked").length == 0 || $(".checkItem:checked").length < $(".checkItem").length) {
                $("#checkAll").prop("checked", false);
            } else {
                $("#checkAll").prop("checked", true);
            }
        },
        /*
         * 初始化事件
         * */
        initEvent:function () {
            $(document).on('click',"#addO,.addKR",function (e) {
                Main.addODialog($(this),{
                    isEdit:false
                });
                return false;
            }).on('click','.delBtn',function () {
                var me=$(this), $tr=me.closest('tr'),dataId='';
                dataId=$tr.attr('id');
                popWin.confirm('确定要删除?',function () {
                    Common.doDel({
                        url:delUrl,
                        data:{
                            krid:dataId,
                            r:Math.random()
                        },
                        afterUrl:afterSaveUrl
                    })
                });
                return false;
            }).on('click',".editO,.editKR",function (e) {
                Main.addODialog($(this),
                    {
                        isEdit:true
                    });
                return false;
            }).on('click','.switchIcon',function () {
                var me=$(this);
                if(me.is('.clo-op-clo')){
                    $('.'+me.attr('subClass')).show();
                    me.removeClass('clo-op-clo').addClass('clo-op-op')
                }else {
                    $('.'+me.attr('subClass')).hide();
                    me.removeClass('clo-op-op').addClass('clo-op-clo');
                }
            }).on('click','.showDetail',function () {
                var detHtml=$(this).html();
                $.dialog({
                    title:'详细',
                    content: '<div class="add-kh middle"><'
                    +'p  class="okr-xx">'+detHtml+'</p> </div>',
                    padding:0,
                    fixed:true
                })

            }).on('click','.startBtn',function(){
                var me=$(this);
                var curId=me.attr('data-id');
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: me.attr('data-url'),
                    data:{
                        krid:curId,
                        r:Math.random()
                    },
                    success: function (d, s, xhr) {
                        if (d.status === 0) {
                            popWin.tinyAlert('保存成功！', 1);
                            setTimeout(function () {
                                location.href = afterSaveUrl;
                            },1500);
                        } else {
                            popWin.alert(d.errorMsg || '操作失败');
                        }
                    },
                    error: function (xhr, s, err) {
                        popWin.alert('操作失败');
                        return false;
                    }
                   })
            }).on('click','.complementBtn',function(){
                    var me=$(this);
                    var curId=me.attr('data-id');
                    var krDetail=me.closest('tr').find('.showDetail').html();
                    var krComplete=me.closest('tr').find('.krComplete').html();
                    $.dialog({
                        title:'wanchengdu',
                        padding:0,
                        content:$('#newComplete')[0],
                        init:function(){
                            var that=this;
                            $('#ccurId').val(curId);
                            $('#completeForm').find('.okr-show').html(krDetail);
                            $('#complete').find('option[value='+krComplete+']').prop('selected',true);
                            $('body').off('click','.cancelBtn').on('click','.cancelBtn',function(){
                                that.close();
                            }).off('click','.saveBtn').on('click','.saveBtn',function(){
                                Main.doSave($('#completeForm'),that);
                            });

                        }
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
    Main.initpage();
    function removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    }
});