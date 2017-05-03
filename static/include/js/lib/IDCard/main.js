/*global $*/
/**
 * 身份证号码校验文件
 * @author 王洋
 * @version 2015-08-06
 * @since 2015-08-06
 */
define(function(require, exports, module) {
    var IDCard = {
        _POWER: [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        /**
         * 验证身份证号
         * @return {String flag:是否通过校验的标记}
         * @param {String certCode:身份证号码}
         * @author wangyang
         * @version 2015-08-06
         * @since 2015-08-06
         */
        varifyCertificate: function(certCode) {
            if (certCode) {
                //CRM3.0 客户管理-新增客户 身份证号码可以为空 为空时不进行校验
                if (certCode.length == 15) {
                    //update by wangyang 2016-4-23
                    //网络医院接口需求，15位的身份证号不能更改为18位
                    //return IDCard.convertIdcarBy15bit(certCode);
                    //将15位转换为18位，然后进行校验
                    certCode = IDCard.convertIdcarBy15bit(certCode);
                    if (!IDCard.isIdCard(certCode)) {
                        return "非法的身份证号！";
                    } else {
                        return false;
                    }
                } else if (!IDCard.isIdCard(certCode)) {
                    return "身份证号码不符合18位的基本规则！";
                }
                if (certCode.length == 18) {
                    return IDCard.isValidate18Idcard(certCode);
                } else {
                    return "身份证号码必须为18位！";
                }
            }
            return false;
        },
        /**
         * 验证身份证号码是否符合基本规则
         * @return {String flag:是否通过校验的标记}
         * @param {String idcard:身份证号码}
         * @author wangyang
         * @version 2015-08-06
         * @since 2015-08-06
         */
        isIdCard: function(idcard) {
            return IDCard.is15Idcard(idcard) || IDCard.is18Idcard(idcard);
        },
        /**
         * 验证身份证号码是否符合15位身份证基本规则
         * @return {String flag:是否通过校验的标记}
         * @param {String idcard:身份证号码}
         * @author wangyang
         * @version 2015-08-06
         * @since 2015-08-06
         */
        is15Idcard: function(idcard) {
            var patrn = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
            var result = true;
            if (!patrn.exec(idcard)) {
                result = false;
            }
            return result;
        },
        /**
         * 验证身份证号码是否符合15位身份证基本规则
         * @return {String flag:是否通过校验的标记}
         * @param {String idcard:身份证号码}
         * @author wangyang
         * @version 2015-08-06
         * @since 2015-08-06
         */
        is18Idcard: function(idcard) {
            var patrn = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([\d|x|X]{1})$/;
            var result = true;
            if (!patrn.exec(idcard)) {
                result = false;
            }
            return result;
        },
        /**
         * 验证身份证号码是否符合18位身份证其他规则
         * @return {String flag:是否通过校验的标记}
         * @param {String idcard:身份证号码}
         * @author wangyang
         * @version 2015-08-06
         * @since 2015-08-06
         */
        isValidate18Idcard: function(idcard) {
            if (idcard) {
                if (idcard.length == 18) {
                    // 身份证省份代码验证
                    var proStr = IDCard.validateProvinceCode(idcard);
                    if (proStr != '')
                        return proStr;

                    // 验证月份和日期
                    var daysStr = IDCard.validateMonthAndDay(idcard);
                    if (daysStr != '')
                        return daysStr;

                    // 当前统计日-出生日期（7-14位）在0-100岁之间
                    // 获取前17位
                    var idcard17 = idcard.substring(0, 17);
                    if (IDCard.isDigital(idcard17)) {
                        var bit = IDCard.converStringToIntArray(idcard17);
                        // 获取和值与11取模得到余数进行校验码
                        var sum17 = IDCard.getPowerSum(bit);
                        var checkCode = IDCard.getCheckCodeBySum(sum17);
                        // 获取第18位
                        var idcard18Code = idcard.substring(17, 18);
                        if (checkCode && (checkCode == idcard18Code.toLowerCase())) {
                            // //出生日期距离系统时间必须为0-100周岁 add by tongys
                            // var timeNow = new Date();
                            // var curDate = "";
                            // curDate = timeNow.getFullYear() + "-";
                            // curDate = curDate + (timeNow.getMonth() + 1) + "-";
                            // curDate = curDate + timeNow.getDate();
                            // var birthDate = idcard.substring(6, 10) + "-" + idcard.substring(10, 12) + "-" + idcard.substring(12, 14);
                            // if (g_CompareDate(curDate, birthDate) < 0 || g_MonthsBetween(curDate, birthDate) > 100 * 12) {
                            // return "出生日期距离当前时间必须为0-100周岁之间！";
                            // }
                            return false;
                        } else {
                            return "该身份证号码不符合身份证号码规则!";
                        }
                    }
                }
            }
            return result;
        },
        /**
         * 验证省份代码是否正确
         * @return {String flag:是否通过校验的标记}
         * @param {String idcard:身份证号码}
         * @author wangyang
         * @version 2015-08-06
         * @since 2015-08-06
         */
        validateProvinceCode: function(idcard) {
            var proCodeStr = "11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65", provice = idcard.substring(0, 2);
            return proCodeStr.indexOf(provice) == -1 ? '该身份证证件的省份不符合身份证录入规则' : '';
        },
        /**
         * 验证月份和日期是否正确
         * @return {String flag:是否通过校验的标记}
         * @param {String idcard:身份证号码}
         * @author wangyang
         * @version 2015-08-06
         * @since 2015-08-06
         */
        validateMonthAndDay: function(idcard) {
            var year = parseInt(idcard.substring(6, 10), 10), month = parseInt(idcard.substring(10, 12), 10), day = parseInt(idcard.substring(12, 14), 10), febMaxDay = IDCard.isLeapYear(year) ? 29 : 28;
            var monthsObj = {
                'moreDays': {
                    'monthsArr': [1, 3, 5, 7, 8, 10, 12],
                    'max': 31
                },
                'lessDays': {
                    'monthsArr': [4, 6, 9, 11],
                    'max': 30
                },
                'specialDays': {
                    'monthsArr': [2],
                    'max': febMaxDay
                }
            };
            for (var key in monthsObj) {
                for (var i in monthsObj[key].monthsArr) {
                    if (monthsObj[key].monthsArr[i] == month) {
                        return monthsObj[key].max < day ? "日期必须根据月份大小计算符合规则" : '';
                    }
                }
            }
            return "月份必须在1-12之间";
        },
        /**
         * 验证是否是闰年
         * @return {String flag:是否通过校验的标记}
         * @param {String idcard:身份证号码}
         * @author wangyang
         * @version 2015-08-06
         * @since 2015-08-06
         */
        isLeapYear: function(year) {
            return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0) ? true : false;
        },
        /**
         * 验证是否为数字
         * @return {String flag:是否通过校验的标记}
         * @param {String idcard:身份证号码}
         * @author wangyang
         * @version 2015-08-06
         * @since 2015-08-06
         */
        isDigital: function(idcard) {
            var patrn = /^[0-9]*$/;
            var result = true;
            if (!patrn.exec(idcard)) {
                result = false;
            }
            return result;
        },
        /**
         * 将string转换为数组
         * @return {String flag:是否通过校验的标记}
         * @param {String idcard:待转换的值}
         * @author wangyang
         * @version 2015-08-06
         * @since 2015-08-06
         */
        converStringToIntArray: function(idcard) {
            var result = null;
            if (idcard) {
                result = new Array(idcard.length);
                for (var i = 0, len = idcard.length; i < len; i++) {
                    try {
                        result[i] = parseInt(idcard.charAt(i));
                    } catch(e) {
                        result = null;
                    }
                }
            }
            return result;
        },
        /**
         * 计算和
         * @return {String result：计算结果}
         * @param {Array bit:待计算数组}
         * @author wangyang
         * @version 2015-08-06
         * @since 2015-08-06
         */
        getPowerSum: function(bit) {
            var sum = 0;
            if (bit != null && IDCard._POWER.length == bit.length) {
                for (var i = 0, len = bit.length; i < len; i++) {
                    sum = sum + bit[i] * IDCard._POWER[i];
                }
            }
            return sum;
        },
        /**
         * 计算校验位
         * @return {String result：计算结果}
         * @param {Array sum17:待计算值}
         * @author wangyang
         * @version 2015-08-06
         * @since 2015-08-06
         */
        getCheckCodeBySum: function(sum17) {
            var checkCode = null;
            if (sum17) {
                var modValue = sum17 % 11;
                switch(true) {
                    case modValue > 2:
                        checkCode = (12 - modValue) + "";
                        break;
                    case modValue == 2:
                        checkCode = "x";
                        break;
                    case modValue == 1:
                        checkCode = "0";
                        break;
                    case modValue == 0:
                        checkCode = "1";
                        break;
                }
            }
            return checkCode;
        },
        /**
         * 将15位身份证号码转换为18位
         * @return {String result：18位身份证号码}
         * @param {Array idcard:待转换的15位身份证号码}
         * @author wangyang
         * @version 2015-08-06
         * @since 2015-08-06
         */
        convertIdcarBy15bit: function(idcard) {
            var result = null;
            if (idcard) {
                var idcard17 = null;
                // 非15位身份证
                if (idcard.length != 15) {
                    result = null;
                } else if (IDCard.isDigital(idcard)) {
                    // 获取出生年
                    var year = idcard.substring(6, 8);
                    year = "19" + year;
                    idcard17 = idcard.substring(0, 6) + year + idcard.substring(8);
                    // 将字符串转为整型数组
                    var bit = IDCard.converStringToIntArray(idcard17);
                    // 获取和值与11取模得到余数进行校验码
                    var sum17 = IDCard.getPowerSum(bit);
                    var checkCode = IDCard.getCheckCodeBySum(sum17);
                    if (checkCode) {
                        // 将前17位与第18位校验码拼接
                        idcard17 += checkCode;
                        result = idcard17;
                    }
                }
            }
            return result;
        }
    };
    module.exports = IDCard;
});
