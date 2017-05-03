/**
 * validation form 表单验证功能
 * User: 张顺金 <zhangshunjin@eetop.com>
 * Date: 13-4-8 下午4:01
 */

define(function(require, exports, module) {
    require('lib/validate/src/jquery.validate-1.11');
    require('lib/validate/src/jquery.metadata');

    function Validate() {
    }

    /**
     * 初始化验证控件的自定义方法
     * @return {void}
     * @author luoweiping
     * @version 2014-08-11
     * @since 2013-06-28
     */
    Validate.prototype.initMethods = function() {
        var RE = require('re'), reExp = new RE();

        $.validator.addMethod("isValidAccount", reExp.isValidAccount, "");
        $.validator.addMethod("isValidTelphone", reExp.isValidTelphone, "");
        $.validator.addMethod("isValidTelMobile", reExp.isValidTelMobile, "");
        $.validator.addMethod("isValidMobile", reExp.isValidMobile, "");
        $.validator.addMethod("isValidLoginAccount", reExp.isValidLoginAccount, "");
        $.validator.addMethod("isComplexPassword", reExp.isComplexPassword, "");
        $.validator.addMethod('isDateTime', reExp.isDateTime, '');
        $.validator.addMethod('isMsgPhones', reExp.isMsgPhones, '');
        $.validator.addMethod('isValidPhoneNums', reExp.isValidPhoneNums, '');
        $.validator.addMethod('isMedCardNo', reExp.isMedCardNo, '');
        $.validator.addMethod('isMedInsCardNo', reExp.isMedInsCardNo, '');
        $.validator.addMethod('isCurrencyNum', reExp.isCurrencyNum, '');
        $.validator.addMethod('isAlpha', reExp.isAlpha, '');
        $.validator.addMethod('isDigit', reExp.isDigit, '');
        $.validator.addMethod('isAllDigit', reExp.isAllDigit, ''); //整数 正负零均可
        $.validator.addMethod('isAlphaDigit', reExp.isAlphaDigit, '');
        $.validator.addMethod('isAlphaDigitCn', reExp.isAlphaDigitCn, '');
        $.validator.addMethod('isPostCode', reExp.isPostCode, '');
        $.validator.addMethod('isFax', reExp.isFax, '');
        $.validator.addMethod('isAlphaDigitUline', reExp.isAlphaDigitUline, '');
        $.validator.addMethod('isEqualTo', reExp.isEqualTo, '');
        $.validator.addMethod('minDate', reExp.minDate, '');
        $.validator.addMethod('isContactType', reExp.isContactType, '');
        $.validator.addMethod('isSpecifyFormat', reExp.isSpecifyFormat, '');
        $.validator.addMethod('isValidTel', reExp.isValidTel, '');
        $.validator.addMethod('isValidSubTel', reExp.isValidSubTel, '');
        $.validator.addMethod('isChoose', reExp.isChoose, '');
        $.validator.addMethod('checkHour', reExp.checkHour, '');
        $.validator.addMethod('checkMinute', reExp.checkMinute, '');
        $.validator.addMethod('isFDigit', reExp.isFDigit, '');
        $.validator.addMethod('isT2Digit', reExp.isT2Digit, '');
        $.validator.addMethod('isAllT2Digit', reExp.isAllT2Digit, '');
        //100以内正数，最多两位小数
        //最多14位，最多四位小数
        $.validator.addMethod('isF9Digit', reExp.isF9Digit, '');
        //1000,0000,000以内正数，最多两位小数
        $.validator.addMethod('isMDigit', reExp.isMDigit, '');
        $.validator.addMethod('notInclude', function(value, element, param) {
            if (value.indexOf(param) > -1) {
                return false;
            } else {
                return true;
            }
        }, '');
        //大于
        $.validator.addMethod("over", function(value, element, param) {
            return this.optional(element) || Number(value) > Number(param);
        }, '');
        //小于
        $.validator.addMethod("lessThan", function(value, element, param) {
            return this.optional(element) || Number(value) < Number(param);
        }, '');
        //校验品名项目时候是手动输入导致不匹配
        $.validator.addMethod("medicine", function (v, e, p) {
            return this.optional(e) || v === $(e).siblings('.itemName').val();
        }, '');
        // 汉化提示
        $.validator.messages={
            required: "请输入.",
            remote: "请输入.",
            email: "请输入有效邮件地址.",
            url: "请输入有效URL.",
            date: "请输入有效日期.",
            dateISO: "请输入有效日期(ISO).",
            number: "请输入有效数字.",
            digits: "只允许你输入数字.",
            creditcard: "请输入有效卡号.",
            equalTo: "Please enter the same value again.",
            maxlength: $.validator.format("最多输入{0}个字符."),
            minlength: $.validator.format("最少输入{0}个字符."),
            rangelength: $.validator.format("请输入 {0} 到 {1}个字符."),
            range: $.validator.format("输入范围为 {0} - {1}."),
            max: $.validator.format("输入范围为 <= {0}."),
            min: $.validator.format("输入范围为 >= {0}.")
        };
    };

    /**
     * 设置默认验证错误提示位置
     * @param {Function} errPmFn 验证错误提示位置处理函数
     * @return {void}
     * @author luoweiping
     * @version 2013-08-12
     * @since 2013-07-05
     */
    Validate.prototype.setErrPlacement = function(errPmFn) {
        if ( typeof errPmFn === 'function') {
            $.validator.setDefaults({
                errorPlacement: errPmFn
            });
        } else {
            $.validator.setDefaults({
                errorPlacement: function($label, $inputEle) {
                    // $label.addClass('errorLabel');
                    // $inputEle.removeClass('error').parent().append($label);
                    // $label.prepend('<br/>');
                    // $inputEle.removeClass('error').parent().append($label);
                    $inputEle.siblings('.validTipInfo').html($label).show();
                }
            });
        }
    };

    /**
     * 设置默认验证通过时的处理函数
     * @param {Function} successFn 验证通过时的处理函数
     * @return {void}
     * @author luoweiping
     * @version 2013-08-12
     * @since 2013-07-05
     */
    Validate.prototype.setSuccessHandler = function(successFn) {
        if ( typeof successFn === 'function') {
            $.validator.setDefaults({
                success: successFn
            });
        } else {
            $.validator.setDefaults({
                success: function($label, inputEle) {
                    $(inputEle).siblings('.validTipInfo').empty().hide();
                }
            });
        }
    };

    /**
     * 冒泡提示方式
     * @param {Function} errPmFn 验证错误提示位置处理函数
     * @return {void}
     * @author luoweiping
     * @version 2014-02-07
     * @since 2014-02-07
     */
    Validate.prototype.setPopupErr = function(errPmFn) {
        if ( typeof errPmFn === 'function') {
            $.validator.setDefaults({
                errorPlacement: errPmFn
            });
        } else {
            $.validator.setDefaults({
                errorPlacement: function($label, $inputEle) {
                    $inputEle.poshytip('disable');
                    $inputEle.poshytip('destroy');
                    if (!$label.is(':empty')) {
                        $inputEle.addClass('errorInput');
                        $inputEle.poshytip({
                            className: 'tip-yellowsimple',
                            showOn: 'focus',
                            alignTo: 'target',
                            alignX: 'center',
                            offsetY: 5,
                            showTimeout: 10,
                            content: $label.html()
                        });
                    } else {
                        $inputEle.removeClass('errorInput');
                        $inputEle.poshytip('disable');
                        $inputEle.poshytip('destroy');
                    }
                }
            });
            // IE浏览器中下拉框的冒泡提示会导致无法选择选项，改进为点击时提示
            $('body').on('click', 'select.errorInput', function() {
                $(this).poshytip('show');
            });
        }
    };
    /**
     * 验证通过回调（冒泡提示方式）
     * @param {Function} successFn 验证通过时的处理函数
     * @return {void}
     * @author luoweiping
     * @version 2014-02-07
     * @since 2014-02-07
     */
    Validate.prototype.setPopupSuccess = function(successFn) {
        if ( typeof successFn === 'function') {
            $.validator.setDefaults({
                success: successFn
            });
        } else {
            $.validator.setDefaults({
                success: function($label, inputEle) {
                    // $(inputEle).poshytip('disable').poshytip('destroy');
                }
            });
        }
    };

    /**
     * @description: Global Validate Form Method
     * @param objForm 输入的表单名，如"#registerForm"
     * @param intErrorType  错误的类型，如1或者2
     * @param fn    回调的函数，可以为true或者一个function(){...}
     * @returns {*}
     */
    Validate.prototype.init = function(objForm, intErrorType, fn) {
        seajs.log("Validate.prototype.form");

        this.initMethods();

        /**
         * @description: Private Methods: Place Error Messge into somewhere,When (intErrorType == 2) indicates this case is for popup window
         * @param error
         * @param element
         * @private
         */
        var _errorPlacement = function(errLabel, $inputEle) {
            if (intErrorType === 2) {
                $inputEle.parent().parent().parent().find(".log-box-error").html(errLabel);
            } else {
                $inputEle.parent().find(".validatorInfo").html(errLabel);
            }
        };

        /**
         * @description: Private Methods: specifying a submitHandler prevents the default submit
         * @param form
         * @private
         */
        var _submitHandler = function(form) {
            return ($.type(fn) === 'function') ? fn() : (fn === true ? form.submit() : '');
        };

        /**
         * @description: Private Methods: Private Methods: specifying a submitHandler prevents the default submit
         * @param label
         * @param element
         * @private
         */
        var _verifySuccess = function(label, element) {
            if (intErrorType == 2) {
                label.parent().html("");
            } else {
                label.parent().html("<label generated=\"true\" class=\"success\">&nbsp;</label>");
            }
        };

        // validate universal form on keyup and submit
        return $(objForm).validate({
            onkeyup: false,
            errorPlacement: _errorPlacement,
            submitHandler: _submitHandler,
            success: _verifySuccess
        });
    };
    /**
     * @description: 清除表单的验证
     * @param objForm
     */
    Validate.prototype.reset = function(objForm) {
        $(objForm).find(".validatorInfo label").removeClass("success");
        $(objForm).find(".validatorInfo label").html("");
        $(objForm).find(".validatorInfo").siblings().removeClass("valid");
        $(objForm).find(".validatorInfo").siblings().removeClass("error");
    };

    module.exports = Validate;
});
