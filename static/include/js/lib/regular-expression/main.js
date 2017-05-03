/**
 * Regular Expression 常用正则表达式
 * User: 张顺金 <zhangshunjin@eetop.com>
 * Date: 13-4-15 下午3:52
 */

define(function (require, exports, module) {
    function RE() {
    }

    /**
     * Validate a valid account
     * @param v
     * @param e
     * @returns {*|boolean}
     * @private
     */
    RE.prototype.isValidAccount = function (v, e) {
        var account = /^\s*[\u4E00-\uFA29a-zA-Z0-9_]+\s*$/;   // English, Chinese, Digital Number & Underline are allowed.
        return this.optional(e) || account.test(v);
    };
    /**
     * Validate a valid login account
     * @param v
     * @param e
     * @returns {*|boolean}
     * @private
     */
    RE.prototype.isValidLoginAccount = function (v, e) {
        var account = /^((13[0-9]|15[0-9]|18[0-9])\d{8})|([a-zA-Z0-9_+.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4})$/;
        return this.optional(e) || account.test(v);
    };
    /**
     * Regular Expression for TelPhone Format
     * @param v
     * @param e
     * @returns {*|boolean}
     * @private
     */
    RE.prototype.isValidTelphone = function (v, e) {
        var phone = /((\d{11,12})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
        return this.optional(e) || phone.test(v);
    };
    /**
     * Regular Expression for Valid Mobile Format
     * @param v
     * @param e
     * @returns {*|boolean}
     * @private
     */
    RE.prototype.isValidMobile = function (v, e) {
        var mobile = /^(13[0-9]|15[0-9]|18[0-9])\d{8}$/;///^1[358]\d{9}$/;
        return this.optional(e) || mobile.test(v);
    };
    /**
     * Regular Expression for TelPhone or Mobile Format
     * @param v
     * @param e
     * @returns {*|boolean}
     * @private
     */
    RE.prototype.isValidTelMobile = function (v, e) {
        var phone = /((\d{11,12})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$|^(13[0-9]|15[0-9]|18[0-9])\d{8}$)/;
        return this.optional(e) || phone.test(v);
    };
    /**
     * Regular Expression for Complex Password Format:
     *  - Cannot Be the same numbers or words.
     * @param v
     * @param e
     * @returns {*|boolean}
     * @private
     */
    RE.prototype.isComplexPassword = function (v, e) {
        var password = /^(.)(\1)+$/;    //All are same numbers or words
        return this.optional(e) || !password.test(v);
    };
    
    /**
     * 日期时间验证
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2013-07-23
     * @since 2013-07-02
     */
    RE.prototype.isDateTime = function(v, e, p){
        var reg;

        switch(p) {
        	case 'Y':
                reg = /^\d{4}$/i;
                break;
            case 'Y-m':
                reg = /^\d{4}-(?:0[1-9]|1[0-2])$/i;
                break;
            case 'Y-m-d':
                reg = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/i;
                break;
            case 'Y-m-d H:i':
                reg = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01]) (?:[0-1][0-9]|2[0-3]):(?:[0-5][0-9])$/i;
                break;
            case 'Y-m-d H:i:s':
                reg = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01]) (?:[0-1][0-9]|2[0-3]):(?:[0-5][0-9]):(?:[0-5][0-9])$/i;
                break;
            case 'H:i':
                reg = /^(?:[0-1][0-9]|2[0-3]):(?:[0-5][0-9])$/i;
                break;
            default:
                reg = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/i;
        }

        return this.optional(e) || reg.test(v);
    };
    
    /**
     * 验证多个手机号码，分隔符根据参数判断(默认逗号(,))
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2013-06-28
     * @since 2013-06-28
     */
    RE.prototype.isMsgPhones = function (v, e, p) {
        var reg;
        p = p || ',';
        reg = new RegExp ('^1[358]\\d{9}(?:\\s*' + p + '\\s*1[358]\\d{9})*$', 'i');
        return reg.test(v);
    };
    
    /**
     * 验证手机号码数量是否和指定参数匹配
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2013-07-02
     * @since 2013-07-02
     */
    RE.prototype.isValidPhoneNums = function(v, e, p){
        v = v.split(',');//分隔符可以以傳參的形式
        return v.length === p;
    };
    
    /**
     * 验证就诊卡号
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2014-01-14
     * @since 2013-07-05
     */
    RE.prototype.isMedCardNo = function(v, e, p){
        var reg = /^\s*[0-9a-zA-Z\-]{0,64}\s*$/i;
        return reg.test(v);
    };
    
    /**
     * 验证医保卡号
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2014-01-14
     * @since 2013-07-05
     */
    RE.prototype.isMedInsCardNo = function(v, e, p){
        var reg = /^\s*[0-9a-zA-Z]{0,64}\s*$/;
        return reg.test(v);
    };
    
    /**
     * 验证是否货币值
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2013-11-02
     * @since 2013-07-09
     */
    RE.prototype.isCurrencyNum = function(v, e, p){
        var reg = /^(?:-?\d+(?:\.\d{1,2})?)?$/i;
        return reg.test(v);
    };
    
    /**
     * 验证是否字母
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2013-07-23
     * @since 2013-07-23
     */
    RE.prototype.isAlpha = function(v, e, p){
        var reg = /^[a-zA-Z]*$/;
        return reg.test(v);
    };
    
    /**
     * 验证是否数字
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2013-07-23
     * @since 2013-07-23
     */
    RE.prototype.isDigit = function(v, e, p){
        var reg = /^\d*$/i;
        return reg.test(v);
    };
    //验证是否为整数 正数、0、负数都可以  012不允许
    RE.prototype.isAllDigit = function(v, e, p){
        if(v!=''){
            var reg = /^(-)?(([1-9]+\d*)|0)$/i;
            return reg.test(v);
        }
        return true;
    };
    //验证是否为整数 正数、负数都可以  012不允许，最多9位整数2位小数
    RE.prototype.isAllT2Digit = function(v, e, p){
        if(v!=''){
            var reg = /^(-)?(([1-9]\d{1,8}|\d{1})(\.\d{0,2})?)$/i;
            return reg.test(v);
        }
        return true;
    };
    //验证是否为零及大于零的整数，最多4位小数
    RE.prototype.isFDigit = function(v, e, p) {
        var reg = /^(\d|[1-9]\d+)(\.\d{1,4})?$/i;
        return reg.test(v);
    };
    //验证是否为零大于零的整数，整数部分9位，最多4位小数
    RE.prototype.isF9Digit = function(v, e, p) {
    	 if(v!=''){
        var reg = /^(([1-9]\d{1,8})|\d{1})(\.\d{0,4})?$/i;
        return reg.test(v);}
        return true;
    };
    
    //验证是否为大于零的的数字，最多2位小数 不允许输入012
    RE.prototype.isT2Digit = function(v, e, p) {
        if (v != '') {
        	var reg = /^(\d|[1-9]\d+)(\.\d{0,2})?$/i;
            return reg.test(v);
        }
        return true;
    };
    //验证是否为零和大于零的整数，不允许输入012这样的数字
    RE.prototype.isMDigit = function(v, e, p) {
        var reg = /^(\d|[1-9]\d+)?$/i;
        return reg.test(v);
    };
    /**
     * 验证是否数字或字母
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2013-07-23
     * @since 2013-07-23
     */
    RE.prototype.isAlphaDigit = function(v, e, p){
        var reg = /^[0-9a-zA-Z]*$/;
        return reg.test(v);
    };
    
    /**
     * 验证是否数字或字母或汉字
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2013-07-23
     * @since 2013-07-23
     */
    RE.prototype.isAlphaDigitCn = function(v, e, p){
        var reg = /^[0-9a-zA-Z\u4E00-\uFA29]*$/;
        return reg.test(v);
    };
    
    /**
     * 验证是否邮编
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2013-07-26
     * @since 2013-07-26
     */
    RE.prototype.isPostCode = function(v, e, p){
        var reg = /^[\d\-]*$/i;
        return reg.test(v);
    };
    
    /**
     * 验证是否传真
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2013-07-26
     * @since 2013-07-26
     */
    RE.prototype.isFax = function(v, e, p){
        var reg = /^[\d\-\(\)]*$/i;///^([\d\-(?:\(\d\-\))*]*)$/i
        return reg.test(v);
    };
    
    /**
     * 验证是否数字、字母或下划线
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2013-09-18
     * @since 2013-09-18
     */
    RE.prototype.isAlphaDigitUline = function(v, e, p){
        var reg = /^[0-9a-zA-Z_]*$/;
        return reg.test(v);
    };
    
    /**
     * 验证是否等于给定参数值
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数(因为v为字符串，p也必须是字符串)
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2013-11-28
     * @since 2013-11-28
     */
    RE.prototype.isEqualTo = function(v, e, p){
        return v === p;
    };
    
    /**
     * 验证日期是否大于等于给定参数值
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数(待比较的较小日期的元素选择符)
     * @return {Boolean} 验证结果
     * @author wangyang
     * @version 2016-07-05
     * @since 2016-07-05
     */
    RE.prototype.minDate = function(v, e, p){
        //当前日期可以为空==用于搜索条件判断
        if(v!=''){
            return v >= $(p).val();
        }
        return true;
    };
    
    /**
     * 验证是否为指定的文件格式
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Array} p 参数(文件格式数组)
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2014-04-17
     * @since 2014-04-17
     */
    RE.prototype.isSpecifyFormat = function(v, e, p){
        var i = 0, curFormat = v.split('.').pop(), result = false;
        for (i = 0; i < p.length; i += 1){
            if(curFormat === p[i]){
                result = true;
                break;
            }
        }
        return result;
    };
    
    /**
     * 验证电话号码
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Array} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2014-05-19
     * @since 2014-05-19
     */
    RE.prototype.isValidTel = function (v, e, p) {
        var reg = /^[\d\+\-]{1,18}$/;
        return this.optional(e) || reg.test(v);
    };
    
    /**
     * 验证电话号码（含分机号，无+号）
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Array} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2014-08-11
     * @since 2014-08-11
     */
    RE.prototype.isValidSubTel = function (v, e, p) {
        var reg = /^\d{1,18}(?:\-\d+)*$/;
        return this.optional(e) || reg.test(v);
    };
	
	 /**
     * 验证是否已选择 select
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author 王洋
     * @version 2015-1-11
     * @since 2015-1-1
     */
    RE.prototype.isChoose = function(v, e, p) {
        if (v === ''||v==='0') {
        	return false;
        }
        return true;
    };
	
	/**
     * 验证小时数格式
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author 唐旭
     * @version 2015-8-5
     * @since 2015-8-5
     */
	RE.prototype.checkHour = function(v, e, p) {
       var reg;
       reg = /^(?:[0-1][0-9]|2[0-3])$/i;
       return this.optional(e) || reg.test(v);
    };
	
	
	/**
     * 验证分钟数格式
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Mixed} p 参数
     * @return {Boolean} 验证结果
     * @author 唐旭
     * @version 2015-8-5
     * @since 2015-8-5
     */
	RE.prototype.checkMinute = function(v, e, p) {
       var reg;
       reg = /^(?:[0-5][0-9])$/i;
       return this.optional(e) || reg.test(v);
    };
    /**
     * 验证联系方式
     * @param {String} v 待验证的值
     * @param {Object} e 输入框元素
     * @param {Array} p 参数
     * @return {Boolean} 验证结果
     * @author luoweiping
     * @version 2014-11-13
     * @since 2014-11-13
     */
    RE.prototype.isContactType = function (v, e, p) {
        var reg = /^[\d\+\-]{7,22}$/;
        return this.optional(e) || reg.test(v);
    };
    module.exports = RE;
});
