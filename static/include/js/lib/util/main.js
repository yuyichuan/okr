/**
 * 工具模块
 * @author luoweiping
 * @version 2014-07-24
 * @since 2013-07-04
 */
define(function(require, exports, module) {
	var Dialog = require('dialog'), popWin = new Dialog();
	function Util() {

	}

	/**
	 * 格式化数值为货币形式（如：输入8.8，将输出：￥8.80）
	 * @param {Mixed} srcVal 待转换的数值（可以是String或Number类型）
	 * @param {String} symbol 货币符号
	 * @param {String} unit 货币单位
	 * @param {Number} precision 精度
	 * @return {String} 格式化结果字符串
	 * @author luoweiping
	 * @version 2014-06-24
	 * @since 2013-07-04
	 */
	Util.prototype.formatToCurrency = function(srcVal, symbol, unit, precision) {
		srcVal = parseFloat(srcVal);
		srcVal = isNaN(srcVal) ? 0 : srcVal;

		precision = precision || 2;

		if (symbol === undefined || symbol === null) {
			symbol = '￥';
		}
		if (unit === undefined || unit === null) {
			unit = '元';
		}

		return symbol + srcVal.toFixed(precision) + unit;
	};

	/**
	 * 根据费用数组数值计算总费用（可以为负数）
	 * @param {Array} feeArr 费用数组（Number,或String）
	 * @return {String} 计算结果
	 * @author luoweiping
	 * @version 2013-11-20
	 * @since 2013-07-09
	 */
	Util.prototype.calculateFees = function(feeArr) {
		var totalFee = 0;

		$.each(feeArr, function(i, v) {
			v = typeof (v) === 'number' ? v : parseFloat(v);
			totalFee += isNaN(v) ? 0 : v;
		});

		return totalFee.toFixed(2);
	};

	/**
	 * 格式化成小数点的金额
	 * 保留小数点后2位，自动四舍五入
	 * @param sum
	 */
	Util.prototype.formatToDecimalSum = function(sum) {
		return parseFloat(sum).toFixed(2);
	};

	Util.prototype.formatByPrecision = function(num, precision) {
		if ( typeof num === 'string') {
			num = parseFloat(num);
		}
		num = num || 0;
		return num.toFixed(precision || 2);
	};

	/**
	 * 扩展string的方法 replaceAll
	 * @param sourceString
	 * @param findString
	 * @param replacedString
	 * @returns {*}
	 */
	Util.prototype.replaceAll = function(sourceString, findString, replacedString) {
		var r = new RegExp(findString.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g, "\\$1"), "ig");
		return sourceString.replace(r, replacedString);
	};

	/**
	 * 判断两个URL字符串中，连接的时候需要用？还是用&号
	 * @param str1
	 * @param str2
	 * @returns {string}
	 */
	Util.prototype.concatUrl = function(str1, str2) {
		var _s = (str1.indexOf("?") < 0) ? "?" : "&";
		return str1 + _s + str2;
	};

	/**
	 * 比较两个日期，格式为 2013-08-29 的格式
	 * @param date1
	 * @param date2
	 * @returns {number}
	 */
	Util.prototype.compareDate = function(startDate, endDate) {
		var _sDate = new Date(startDate.replace(/-/g, "/"));
		var _eDate = new Date(endDate.replace(/-/g, "/"));

		if (Date.parse(_sDate) - Date.parse(_eDate) < 0) {
			//window.alert("开始日期 小于 结束日期");
			return -1;
		} else if (Date.parse(_sDate) - Date.parse(_eDate) > 0) {
			//window.alert("开始日期 大于 结束日期");
			return 1;
		} else {
			//window.alert("两个日期相等");
			return 0;
		}
	};

	/**
	 * 取得今天的日期
	 */
	Util.prototype.getTodayDate = function() {
		var now = new Date(), vYear = now.getFullYear(), vMon = now.getMonth() + 1, vDay = now.getDate();
		return vYear + "-" + (vMon < 10 ? "0" + vMon : vMon) + "-" + (vDay < 10 ? "0" + vDay : vDay);
	};
	/**
	 * 取得当月第一天的日期日期
	 */
	Util.prototype.getCurMonFirstDate = function() {
		var now = new Date(), vYear = now.getFullYear(), vMon = now.getMonth() + 1;
		return vYear + "-" + (vMon < 10 ? "0" + vMon : vMon) + "-" + '01';
	};
	/**
	 * 返回JS文件根目录（JS目录）
	 * @return {String} JS文件根目录
	 * @author luoweiping
	 * @version 2013-08-30
	 * @since 2013-08-30
	 */
	Util.prototype.getScriptRootPath = function() {
		var seajsPath = $('#seajsFile').attr('src'), pathArr = [];

		pathArr = seajsPath.split('/');
		pathArr.pop();
		pathArr.pop();

		return pathArr.join('/');
	};

	/**
	 * 计算指定日期前指定天数的日期
	 * @param {mixed} curDate 待计算的起始日期，默认取当前日期[optional]
	 * @param {mixed} during 天数，默认30[optional]
	 * @return {String} 计算结果(Y-m-d格式)
	 * @author luoweiping
	 * @version 2013-09-03
	 * @since 2013-09-03
	 */
	Util.prototype.calPastDay = function(curDate, during) {
		if (curDate && typeof curDate === 'string' && /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/i.test(curDate)) {
			curDate = new Date(parseInt(curDate.substr(0, 4), 10), parseInt(curDate.substr(5, 2), 10) - 1, parseInt(curDate.substr(8, 2), 10));
		} else if (Object.prototype.toString.call(curDate) !== '[object Date]') {
			curDate = new Date();
		}

		if ( typeof during === 'string') {
			during = parseInt(during, 10);
			during = isNaN(during) ? 30 : during;
		} else if ( typeof during !== 'number') {
			during = 30;
		}

		return $.format.date(curDate.getTime() - during * 24 * 60 * 60 * 1000, 'yyyy-MM-dd');
	};

	/**
	 * 设置下拉框选中项（匹配第一项后返回），默认根据value值，未设置value属性则根据option文本匹配
	 * @param {Object} $selObj 下拉框对象
	 * @param {Object} val 待选中的value值或option文本
	 * @return {void}
	 * @author luoweiping
	 * @version 2014-04-21
	 * @since 2013-09-11
	 */
	Util.prototype.selectOption = function($selObj, val, byText) {
		byText = byText || false;
		$.each($selObj.find('option'), function(i, v) {
			var curOptVal = byText ? $(v).html() : ($(v).attr('value') || $(v).html());
			if (val) {
				val = val.toString();
			}
			if (curOptVal === val) {
				$(v).get(0).selected = true;
				$(v).attr('selected', 'selected');
				return false;
			}
		});
	};

	/**
	 * 根据value值，返回对应option文本
	 * @param {Object} $selObj 下拉框对象
	 * @param {Object} val 选中的value值
	 * @return {void}
	 * @author luoweiping
	 * @version 2014-04-15
	 * @since 2014-04-15
	 */
	Util.prototype.getOptionText = function($selObj, val) {
		var optionText = '';
		$.each($selObj.find('option'), function(i, v) {
			var curOptVal = $(v).attr('value');
			if (curOptVal === val) {
				optionText = $(v).html();
				return false;
			}
		});
		return optionText;
	};

	/**
	 * 监听指定元素只允许其输入数字和部分控制字符，即屏蔽除数字、.(110,190)、Tab(9)、Delete(46)和退格键(8)和左右箭头外的所有输入
	 * @param {Object} cfgObj 配置对象，包括：待监听元素选择符、是否小数、是否负数
	 * @return {void}
	 * @author luoweiping
	 * @version 2014-06-09
	 * @since 2013-09-26
	 */
	Util.prototype.filterNonNumInput = function(cfgObj) {
		cfgObj = $.extend({
			srcEleStr : '',
			isFraction : false,
			isNegative : false,
			allowPlus : false
		}, cfgObj);

		$('body').on("keydown", cfgObj.srcEleStr, function(e) {
			var curKey = e.which;

			if (!e.shiftKey && ((curKey > 95 && curKey < 106) || (curKey > 47 && curKey < 58))) {//0-9
				return true;
			}
			if (curKey === 8 || curKey === 9 || curKey === 46) {//<--,Tab,Delete
				return true;
			}
			if (curKey === 37 || curKey === 39) {//<-,->
				return true;
			}
			if (curKey === 36 || curKey === 35) {//Home,End
				return true;
			}
			if (cfgObj.isFraction && (curKey === 110 || curKey === 190)) {//.
				return true;
			}
			if (cfgObj.isNegative && (curKey === 109 || (curKey === 173 && !e.shiftKey))) {//-
				return true;
			}
			if (cfgObj.allowPlus && (curKey === 107 || (curKey === 61 && e.shiftKey))) {//+
				return true;
			}
			e.preventDefault();
		});
	};

	/*通用Ajax调用*/
	Util.prototype.ajaxCall = function(options) {
		var url = options.url;
		var href = location.href;
		if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
			var idx = href.lastIndexOf('/');
			url = (idx > -1 ? href.substring(0, idx) : href) + '/' + options.url;
		}
		var requestType = 'jsonp';
		if (url.indexOf(location.host) > -1) {
			requestType = 'json';
		}
		requestType = options.dataType || requestType;

		var async = (options.async === undefined ? true : options.async);
		return {
			url : url,
			async : async,
			type : options.type || 'get',
			dataType : requestType,
			cache : false,
			data : options.data,
			success : function(data, textStatus, xhr) {
				if (requestType === "json" || requestType === "jsonp") {
					if (data.status.code == 0) {
						options.success(data);
					} else if (options.error) {
						options.error(data.status.msg);
					}
				} else {
					options.success(data);
				}
			},
			error : function(xhr, status, handler) {
				if (options.error) {
					options.error();
				}
			}
		};
	};

	/**
	 * 截取字符串并加"..."
	 * @param {String} srcStr 源字符串
	 * @param {Number} cutLength 截取长度
	 * @return {String} 结果字符串
	 * @author luoweiping
	 * @version 2014-05-15
	 * @since 2013-11-21
	 */
	Util.prototype.cutStr = function(srcStr, cutLength) {
		var resultStr = '', i = 0, n = 0, curChar;

		srcStr = srcStr || '';
		srcStr = typeof srcStr === 'string' ? srcStr : '';

		while (n < cutLength && i < srcStr.length) {
			curChar = srcStr.charCodeAt(i);
			if (curChar >= 192 || (curChar >= 65 && curChar <= 90)) {
				n += 1;
				if (n <= cutLength) {
					i += 1;
				}
			} else {
				n += 0.5;
				i += 1;
			}
		}
		resultStr = srcStr.substr(0, i);
		if (srcStr.length > i) {
			resultStr += '...';
		}
		return resultStr;
	};

	/**
	 * 计算字符串长度，ASCII大于128计为2
	 * @param {String} str 源字符串
	 * @return {Number} 字符串长度
	 * @author luoweiping
	 * @version 2013-12-16
	 * @since 2013-12-16
	 */
	Util.prototype.countStr = function(str) {
		var strLen = str.length, resultLen = 0;

		while (strLen-- > 0) {
			resultLen += str.charCodeAt(strLen) > 128 ? 2 : 1;
		}

		return resultLen;
	};

	/**
	 * 根据生日计算年龄:虚岁or周岁
	 * @param {String} birth 生日日期
	 * @param {Boolean} isNominal 是否虚岁
	 * @return {Number} 虚岁or周岁年龄
	 * @author luoweiping
	 * @version 2014-05-19
	 * @since 2013-12-18
	 */
	Util.prototype.getAgeByBirth = function(birth, isNominal) {
		var curDate = new Date(), curYear = curDate.getFullYear(), curMon = curDate.getMonth() + 1, curDay = curDate.getDate(), birthYear, birthMon, birthDay, birthArr = birth.split('-'), age = 0;

		if (isNominal !== true) {
			isNominal = false;
		}

		birthYear = parseInt(birthArr[0], 10);
		birthYear = isNaN(birthYear) ? curYear : birthYear;
		birthMon = parseInt(birthArr[1], 10);
		birthMon = isNaN(birthMon) ? curMon : birthMon;
		birthDay = parseInt(birthArr[2], 10);
		birthDay = isNaN(birthDay) ? curDay : birthDay;

		if (birthMon > curMon || (birthMon === curMon && birthDay > curDay)) {//周岁
			age = curYear - birthYear - 1;
		} else {
			age = curYear - birthYear;
		}
		if (isNominal === true) {//虚岁
			return age + 1;
		}
		return age;
	};

	/**
	 * 根据虚岁年龄计算生日
	 * @param {String} initDate 初始日期
	 * @param {String|Number} age 年龄
	 * @return {String} 生日
	 * @author luoweiping
	 * @version 2014-05-19
	 * @since 2014-05-19
	 */
	Util.prototype.getBirthByAge = function(initDate, age) {
		var curDate = new Date(), curYear = curDate.getFullYear(), curMon = curDate.getMonth() + 1, curDay = curDate.getDate(), initYear, initMon, initDay, initArr;

		if ( typeof age === 'string') {
			if ($.trim(age) === '') {
				return initDate;
			}
			age = parseInt(age, 10);
			age = isNaN(age) ? 0 : age;
		}

		if (initDate) {
			initArr = initDate.split('-');

			initMon = parseInt(initArr[1], 10);
			initMon = isNaN(initMon) ? curMon : initMon;
			initDay = parseInt(initArr[2], 10);
			initDay = isNaN(initDay) ? curDay : initDay;
		} else {
			initMon = curMon;
			initDay = curDay;
		}

		//第一种算法：自动计算月、日为最接近当前月日的周岁时间
		// if (initMon > curMon) {
		// initMon = curMon;
		// }
		// if (initMon === curMon && initDay > curDay) {
		// initDay = curDay;
		// }
		//第二种算法：月日保持不变，但年份减一
		initYear = curYear - age;
		if (initMon > curMon || (initMon === curMon && initDay > curDay)) {
			initYear -= 1;
		}
		if (/^\d+$/i.test(age)) {
			return initYear + '-' + (initMon < 10 ? '0' + initMon : initMon) + '-' + (initDay < 10 ? '0' + initDay : initDay);
		}
		return '';
	};

	/********************************/
	/*       Some Useful Plugin     */
	/********************************/
	$.extend({
		/* to be deleted, common ajax call */
		ajaxCall : function(options) {
			var url = options.url;
			if (!url) {
				alert('Ajax接口地址为空！');
				return;
			}
			var defaults = {
				type : 'get',
				dataType : 'json',
				async : true,
				cache : false
			};
			var settings = $.extend(defaults, options);
			$.ajax({
				url : settings.url,
				async : settings.async,
				type : settings.type,
				dataType : settings.dataType,
				cache : settings.cache,
				data : settings.data,
				success : function(re, textStatus, xhr) {
					if (re.status.resultCode === 0) {
						settings.success(re.data);
					} else {
						if (settings.error) {
							settings.error(re.status.resultMsg);
						}
					}
				},
				error : function(xhr, status, handler) {
					if (settings.error) {
						settings.error('操作失败！');
					}
				}
			});
		},
		/* the latest common ajax call */
		commonAjax : function(options) {
			var url = options.url;
			if (!url) {
				alert('Ajax接口地址为空！');
				return;
			}
			var defaults = {
				type : 'get',
				dataType : 'json',
				async : true,
				cache : false
			};
			var settings = $.extend(defaults, options);
			settings.success = function(re, textStatus, xhr) {
				if (re.status === 0) {
					options.success(re.data, re.msg);
				} else {
					if (options.error) {
						options.error(re.msg || '操作失败！', re.status);
					}
				}
			};
			settings.error = function(xhr, status, handler) {
				if (options.error) {
					options.error('操作失败！', 1);
				}
			};
			$.ajax(settings);
		},
		/* status 为2时 跳转链接*/
		commonAjaxLink : function(options) {
			var url = options.url;
			if (!url) {
				alert('Ajax接口地址为空！');
				return;
			}
			var defaults = {
				type : 'get',
				dataType : 'json',
				async : true,
				cache : false
			};
			var settings = $.extend(defaults, options);
			settings.success = function(re, textStatus, xhr) {
				if (re.status === 0) {
					options.success(re.data, re.msg);
				} else if (re.status === 2) {
					//后台返回2 则页面跳转
					window.location.href = re.msg;
				} else {
					if (options.error) {
						options.error(re.msg || '操作失败！', re.status);
					}
				}
			};
			settings.error = function(xhr, status, handler) {
				if (options.error) {
					options.error('操作失败！', 1);
				}
			};
			$.ajax(settings);
		},
		/*get params for url*/
		getUrlParams : function() {
			var urlParams = {};
			var url = location.href;
			var idx = url.indexOf('?');
			if (idx === -1) {
				return;
			}
			var params = url.substring(url.indexOf('?') + 1);
			params = params.split('&');
			for (var i = 0; i < params.length; i++) {
				var item = params[i];
				item = item.split('=');
				urlParams[item[0]] = item[1];
			}
			return urlParams;
		},
		/* scroll to bottom of the page */
		scrollBottom : function() {
			$('html, body').animate({
				scrollTop : $(document).height()
			}, 500);
		},
		/**
		 * 卫生部报表省市联动
		 * @author tangxu
		 * @version 2016-1-4
		 * @since 2016-1-4
		 */
		provinceCity : function(url) {
			var provOption = "";
			//省市联动
			$.ajax({
				type : 'get',
				url : url,
				success : function(re) {
					$('#provinces').html("<option value=''>省</option>");
					for (var pro in re) {//加载省;
						provOption += '<option value="' + re[pro].code + '">' + re[pro].name + '</option>';
					}
					$('#provinces').append(provOption);
					//隐藏域回填值
					var provCode = $("#fillProv").val();
					var cityCode = $("#fillCity").val();
					if (provCode && provCode != '') {//回填有省，则加载省和相应城市
						$("#provinces option[value='" + provCode + "']").prop("selected", "selected");
						var city = re[provCode].children;
						$.loadCity(city, cityCode);
					} else {
						$("#provinces option:first").prop("selected", "selected");
					}
					//改变省加载市
					$(document).delegate('#provinces', 'change', function() {
						$("#cities").html('<option value="" >市/区</option>');
						$("#cityName").val("");
						var me = $(this), code = me.val(), proName = "";
						if (code && code != '') {
							proName = re[code].name;
							var city = re[code].children;
							$.loadCity(city);
						}
						$("#provName").val(proName);
					});
					//改变城市
					$(document).delegate('#cities', 'change', function() {
						var me = $(this), cityCode = me.val(), provCode = $("#provinces").val(), cityName = "";
						if (cityCode) {
							cityName = re[provCode].children[cityCode].name;
						}
						$("#cityName").val(cityName);
					});

				},
				error : function() {
					popWin.alert("操作失败");
				}
			});
		},
		/**
		 * 卫生部报表加载市
		 * @author tangxu
		 * @version 2016-1-4
		 * @since 2016-1-4
		 */
		loadCity : function(city, cityCode) {
			var cityOption = "";
			for (var c in city) {
				cityOption += '<option value="' + city[c].code + '">' + city[c].name + '</option>';
			}
			$("#cities").append(cityOption);
			if (cityCode && cityCode != '') {//回填有市，则显示对应的市
				$("#cities option[value='" + cityCode + "']").prop("selected", "selected");
			} else {
				$("#cities option:first").prop("selected", "selected");
			}
		}
	});
	$.fn.extend({
		/* 检测输入域的内容变化 */
		contentChange : function(callback) {
			var me = $(this);
			if (!me.length) {
				return this;
			}
			// IE9浏览器中按 backspace, delete 键不会触发 input 事件，所以这里改用 keyup 处理
			var tempEle = document.createElement("b");
			tempEle.innerHTML = "<!--[if IE 9]><i></i><![endif]-->";
			var isIE9 = tempEle.getElementsByTagName("i").length === 1;
			if (isIE9) {
				me.on("keyup", function() {
					if (callback) {
						callback.call(this, $.trim($(this).val()));
					}
				});
			} else {
				me.on("input propertychange", function(event) {
					var ev = event.originalEvent;
					tempEle.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
					var ltIE9 = tempEle.getElementsByTagName("i").length === 1;
					/* IE9以下版本触发的是 propertychange 事件 */
					/* propertychange 是所有属性改变都会触发，我们只需要value变化的事件 */
					if (ltIE9 && ev.propertyName && ev.propertyName.toLowerCase() !== "value") {
						return;
					}
					if (callback) {
						callback.call(this, $.trim($(this).val()));
					}
				});
			}
			return this;
		},
		/* 限制 textarea 的内容长度 */
		limitLength : function(maxLength) {
			var me = $(this);
			if (!me.length) {
				return this;
			}
			me.bind('input propertychange', function(event) {
				var maxLen = $(this).attr('maxlength') || maxLength;
				if (!maxLen) {
					return this;
				}
				var ev = event.originalEvent;
				var tempEle = document.createElement("b");
				tempEle.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
				var ltIE9 = tempEle.getElementsByTagName("i").length === 1;
				/* IE9以下版本触发的是 propertychange 事件 */
				/* propertychange 是所有属性改变都会触发，我们只需要value变化的事件 */
				if (ltIE9 && ev.propertyName && ev.propertyName.toLowerCase() !== "value") {
					return;
				}
				var curValue = $(this).val();
				var curLength = curValue.length;
				if (curLength > maxLen) {
					$(this).val(curValue.substr(0, maxLen));
				}
			});

			return this;
		},
		/* 提示输入的字数并限制长度 */
		countTip : function(maxLength, lengthAdjust) {
			var me = $(this);
			if (!me.length || !maxLength) {
				return this;
			}
			/*var ctl = $('<div class="count-tip">您还可以输入<span class="count"></span>字</div>').insertAfter(me).css({
				position : 'absolute',
				left : me.position().left//,
				// top: me.offset().top + me.outerHeight() + 10
			});*/
			var eventMain = function() {
				var me = $(this);
				setTimeout(function() {
					var curValue = $.trim(me.val());
					// 最大长度控制
					var originLength = curValue.length;
					var newLength = originLength;
					if (lengthAdjust && typeof (lengthAdjust) === 'function') {
						newLength = lengthAdjust(curValue);
					}

					var curLength = newLength;
					if (newLength > maxLength) {
						curLength = originLength - (newLength - maxLength);
						me.val(curValue.substr(0, curLength));
						newLength = lengthAdjust($.trim(me.val()));
					}
					// 字符个数提示
					//var restLength = maxLength - newLength;
					//ctl.find('span').text(restLength).end().show();
                    $('.jishu').html(newLength+'/300')
				}, 100);
			};
			// IE9浏览器中按 backspace, delete 键不会触发 input 事件，所以这里改用 keyup 处理
			var tempEle = document.createElement("b");
			tempEle.innerHTML = "<!--[if IE 9]><i></i><![endif]-->";
			var isIE9 = tempEle.getElementsByTagName("i").length === 1;
			if (isIE9) {
				me.on("keyup", function(event) {
					eventMain.call(this);
				});
			} else {
				me.on('input propertychange', function(event) {
					var ev = event.originalEvent;
					tempEle.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
					var ltIE9 = tempEle.getElementsByTagName("i").length === 1;
					/* IE9以下版本触发的是 propertychange 事件 */
					/* propertychange 是所有属性改变都会触发，我们只需要value变化的事件 */
					if (ltIE9 && ev.propertyName && ev.propertyName.toLowerCase() !== "value") {
						return;
					}
					eventMain.call(this);
				});
			}
			me.on('focus', function(event) {
				eventMain.call(this);
			});
			/*me.on('blur', function(event) {
				ctl.hide();
			});*/
			return this;
		},

		/* 数字输入限制 */
		numeral : function(allowZero) {
			if (!$(this).length) {
				return this;
			}
			$(this).css("ime-mode", "disabled");
			this.unbind("keypress").bind("keypress", function(e) {
				var code = e.which;
				if (code === 46) {
					if (this.value.indexOf(".") !== -1) {
						return false;
					}
				} else {
					return code >= 46 && code <= 57;
				}
			});
			this.unbind("blur").bind("blur", function() {
				if (this.value.lastIndexOf(".") === (this.value.length - 1)) {
					this.value = this.value.substr(0, this.value.length - 1);
				} else if (isNaN(this.value)) {
					this.value = "";
				}
			});
			this.unbind("paste").bind("paste", function() {
				var s = window.clipboardData.getData('text');
				if (!/\D/.test(s)) {
					return false;
				}
				this.value = s.replace(/^0*/, '');
				return false;
			});
			this.unbind("dragenter").bind("dragenter", function() {
				return false;
			});
			// 不允许输入0
			if (!allowZero) {
				this.unbind("keyup").bind("keyup", function() {
					if (/(^0+)/.test(this.value)) {
						this.value = this.value.replace(/^0*/, '');
					}
				});
			}

			return this;
		},
		/* 表单校验 */
		/* tipType: 1 为冒泡提示 */
		doValidate : function(validate, popupTip) {
			var me = $(this);
			if (!$(this).length) {
				return this;
			}
			validate.initMethods();
			if (popupTip) {
				validate.setPopupErr();
				validate.setPopupSuccess();
			} else {
				validate.setErrPlacement();
				validate.setSuccessHandler();
			}
			return me.validate({
				onkeyup : false
			});
		},
		/*把表单数据封装为一个对象*/
		serializeToObj : function() {
			var o = {};
			var a = this.serializeArray();
			$.each(a, function() {
				if (o[this.name]) {
					if (!o[this.name].push) {
						o[this.name] = [o[this.name]];
					}
					o[this.name].push(this.value || '');
				} else {
					o[this.name] = this.value || '';
				}
			});
			return o;
		},
		// 自动完成功能
		showlist : function(options) {
			var me = $(this);
			if (me.length == 0)
				return false;
			me.attr('autocomplete', 'off');
			var keyID = options.keyID;
			var ctlID = this[0].id;
			var ctl = $('.' + ctlID + '-panel');
			window.cacheData = null;
			window.$tr = null;
			
			// 记录选择的值
			var selectedValue = null;
			//获取商品信息json
			var getData = function(keyword, callback) {
				var params = {
					keyWords : keyword
				};
				$.extend(params, (options.extraParams) || {});
				$.commonAjaxLink({
					type : 'post',
					url : options.dsUrl,
					data : params,
					success : function(re) {//成功
						window.cacheData = re;
						callback(re);
					},
					error : function(msg, status) {
						if (status == 2) {
							//后台返回2 则页面跳转
							window.location.href = msg;
						} else {
							popWin.alert(msg);
						}
					}
				});
			};
			var getDataByID = function(id) {
				for (var i = 0; i < window.cacheData.length; i++) {
					var d = window.cacheData[i];
					if (d[keyID] == id) {
						return d;
					}
				}
			};
			var showPanel = function(ds) {
				if (!ds || ds.length === 0) {
					ctl.empty().hide();
					return;
				}

				if (ctl.length === 0) {
					ctl = $('<div class="' + ctlID + '-panel tab-pub-div pos-abs auto-list"></div>').appendTo($('body'));
				}
				var html = options.buildHtml(ds);
				ctl.css({
					position : 'absolute',
					left : me.offset().left,
					top : me.offset().top + me.height() + 6,
					width : options.width || me.width(),
					'z-index':'2000'
				});
				if (ds.length > 5) {
					ctl.css({
						height : 150,
						overflowY : 'scroll'
					});
				}
				ctl.empty().append(html).show();
			};

			var oldTime = 0;
			var timer = null;
			me.bind('input propertychange click keyup', function(event) {//IE9下删除键不会触发input/propertychange/click事件
				var ev = event.originalEvent;
				window.$tr = me.parents('tr');
				if (ev && ev.type === "click" && ctl.is(':visible'))
					return false;
				else {
					if (ev.type !== "click" && (ev.propertyName && ev.propertyName.toLowerCase() !== "value"))
						return false;
				}
				if (event.keyCode === 40 || event.keyCode === 38) {
					return true;
				}

				var keyWord = $(this).val();
				// 没有内容或者和上次选择的值一样则不处理
				if (keyWord == selectedValue)
					return false;


				// 内容有变化则清除ID
				if (options.bindSub) {
					options.bindSub.val('');
				}

				if (timer)
					clearTimeout(timer);
				var newTime = (new Date()).getTime();
				if (oldTime > 0 && (newTime - oldTime) < 300) {
					timer = setTimeout(function() {
						getData(keyWord, function(ds) {
							showPanel(ds);
						});
					}, 300);
					return;
				}

				oldTime = (new Date()).getTime();
				getData(keyWord, function(ds) {
					showPanel(ds);
				});
			});
			me.bind('keydown', function(event) {
				var ctn = $('.auto-list');
				var ctnHeight = ctn.height();
				var cur = $('.selected-item');
				var next = cur.next();
				var prev = cur.prev();
				var tar;
				var mark;
				if (event.keyCode === 40) {
					cur.removeClass('selected-item');
					tar = next;
					if (tar.length === 0 || cur.length === 0) {
						tar = $('.auto-list tbody tr:first');
					}
				} else if (event.keyCode === 38) {
					cur.removeClass('selected-item');
					tar = prev;
					mark = tar.attr('data-name');
					if (!mark || tar.length === 0 || cur.length === 0) {
						tar = $('.auto-list tbody tr:last');
					}

				}
				if (tar) {
					mark = tar.attr('data-name');
					if (!mark)
						tar = tar.next();
					tar.addClass('selected-item');
					// var diff = tar.attr('data-idx') * tar.height() - ctnHeight;
					var diff = (tar.index() + 1) * tar.height() - ctnHeight;
					if (diff < 0) {
						diff = 0;
					}
					ctn.scrollTop(diff);
				}
				if (event.keyCode == 13) {//Enter
					$('.selected-item').trigger('click');
					return false;
				}
			});

			me.bind("paste", function() {
				var s = '';
				if (window.clipboardData) {
					s = window.clipboardData.getData('text');
				}
				if (!/\D/.test(s))
					this.value = s.replace(/^0*/, '');
				$(this).trigger('input');
				return false;
			});
			// table点击选择
			$(document).off('click', '.auto-list tbody tr').on('click', '.auto-list tbody tr', function() {
				var $tr = $(this), orgName = '', mark = '';
				orgName = $tr.attr('data-name'), mark = $tr.attr('data-name');
				if (orgName) {
					selectedValue = orgName;
					//me.val(orgName);
					window.$tr.find('.proName').val(orgName);

				}
				if (options.selectCallBack && !!mark) {
					options.selectCallBack(getDataByID($tr.attr('data-id')), window.$tr);
				}
				ctl.hide();
			});
			// list点击选择
			$(document).off('click', '.auto-list a').on('click', '.auto-list a', function() {
				var text = $(this).text();
				// selectedValue = text;
				var orgName = $(this).attr('data-name');
				if (orgName) {
					selectedValue = orgName;
					me.val(orgName);

				} else {
					selectedValue = text;
					me.val(text);
				}
				if (options.selectCallBack && !! orgName) {
					options.selectCallBack(getDataByID($(this).attr('data-id')));
				}
				ctl.hide();
			});

			$(document).click(function(e) {
				var $tar = $(e.target);
				var pnt = $tar.parent();
				if ($tar.is(me) || pnt.is(ctl) || pnt.parent().is(ctl))
					return;
				ctl.hide();
			});
		},
				// 自动完成功能
		showlist2 : function(options) {
			var me = $(this);
			if (me.length == 0)
				return false;
			me.attr('autocomplete', 'off');
			var keyID = options.keyID;
			var ctlID = this[0].id;
			var ctl = $('.' + ctlID + '-panel');
			window.cacheData = null;
			window.$tr = null;
			
			// 记录选择的值
			var selectedValue = null;
			//获取商品信息json
			var getData = function(keyword, callback) {
				var params = {
					keyWords : keyword
				};
				$.extend(params, (options.extraParams) || {});
				$.commonAjaxLink({
					type : 'post',
					url : options.dsUrl,
					data : params,
					success : function(re) {//成功
						window.cacheData = re;
						callback(re);
					},
					error : function(msg, status) {
						if (status == 2) {
							//后台返回2 则页面跳转
							window.location.href = msg;
						} else {
							popWin.alert(msg);
						}
					}
				});
			};
			var getDataByID = function(id) {
				for (var i = 0; i < window.cacheData.length; i++) {
					var d = window.cacheData[i];
					if (d[keyID] == id) {
						return d;
					}
				}
			};
			var showPanel = function(ds) {
				if (!ds || ds.length === 0) {
					ctl.empty().hide();
					return;
				}

				if (ctl.length === 0) {
					ctl = $('<div class="' + ctlID + '-panel tab-pub-div pos-abs auto-list2"></div>').appendTo($('body'));
				}
				var html = options.buildHtml(ds);
				ctl.css({
					position : 'absolute',
					left : me.offset().left,
					top : me.offset().top + me.height() + 6,
					width : options.width || me.width(),
					'z-index':'2000'
				});
				if (ds.length > 5) {
					ctl.css({
						height : 150,
						overflowY : 'scroll'
					});
				}
				ctl.empty().append(html).show();
			};

			var oldTime = 0;
			var timer = null;
			me.bind('input propertychange click keyup', function(event) {//IE9下删除键不会触发input/propertychange/click事件
				var ev = event.originalEvent;
				window.$tr = me.parents('tr');
				if (ev && ev.type === "click" && ctl.is(':visible'))
					return false;
				else {
					if (ev.type !== "click" && (ev.propertyName && ev.propertyName.toLowerCase() !== "value"))
						return false;
				}
				if (event.keyCode === 40 || event.keyCode === 38) {
					return true;
				}

				var keyWord = $(this).val();
				// 没有内容或者和上次选择的值一样则不处理
				if (keyWord == selectedValue)
					return false;


				// 内容有变化则清除ID
				if (options.bindSub) {
					options.bindSub.val('');
				}

				if (timer)
					clearTimeout(timer);
				var newTime = (new Date()).getTime();
				if (oldTime > 0 && (newTime - oldTime) < 300) {
					timer = setTimeout(function() {
						getData(keyWord, function(ds) {
							showPanel(ds);
						});
					}, 300);
					return;
				}

				oldTime = (new Date()).getTime();
				getData(keyWord, function(ds) {
					showPanel(ds);
				});
			});
			me.bind('keydown', function(event) {
				var ctn = $('.auto-list');
				var ctnHeight = ctn.height();
				var cur = $('.selected-item');
				var next = cur.next();
				var prev = cur.prev();
				var tar;
				var mark;
				if (event.keyCode === 40) {
					cur.removeClass('selected-item');
					tar = next;
					if (tar.length === 0 || cur.length === 0) {
						tar = $('.auto-list tbody tr:first');
					}
				} else if (event.keyCode === 38) {
					cur.removeClass('selected-item');
					tar = prev;
					mark = tar.attr('data-name');
					if (!mark || tar.length === 0 || cur.length === 0) {
						tar = $('.auto-list tbody tr:last');
					}

				}
				if (tar) {
					mark = tar.attr('data-name');
					if (!mark)
						tar = tar.next();
					tar.addClass('selected-item');
					// var diff = tar.attr('data-idx') * tar.height() - ctnHeight;
					var diff = (tar.index() + 1) * tar.height() - ctnHeight;
					if (diff < 0) {
						diff = 0;
					}
					ctn.scrollTop(diff);
				}
				if (event.keyCode == 13) {//Enter
					$('.selected-item').trigger('click');
					return false;
				}
			});

			me.bind("paste", function() {
				var s = '';
				if (window.clipboardData) {
					s = window.clipboardData.getData('text');
				}
				if (!/\D/.test(s))
					this.value = s.replace(/^0*/, '');
				$(this).trigger('input');
				return false;
			});
			// list点击选择
			$(document).off('click', '.auto-list2 a').on('click', '.auto-list2 a', function() {
				var text = $(this).text();
				// selectedValue = text;
				var orgName = $(this).attr('data-name');
				if (orgName) {
					selectedValue = orgName;
					me.val(orgName);

				} else {
					selectedValue = text;
					me.val(text);
				}
				if (options.selectCallBack && !! orgName) {
					options.selectCallBack(getDataByID($(this).attr('data-id')));
				}
				ctl.hide();
			});

			$(document).click(function(e) {
				var $tar = $(e.target);
				var pnt = $tar.parent();
				if ($tar.is(me) || pnt.is(ctl) || pnt.parent().is(ctl))
					return;
				ctl.hide();
			});
		},
		//选择地区
		selectArea : function() {
			var me = $(this);
			var api = me.attr("data-href");
			var arr = new Array('11', '12', '31', '50', '71', '81', '82');
			if ($("#hospitalAreaCode").length > 0) {
				var code = $("#hospitalAreaCode").val();
				if (code) {
					var prefix = code.substring(0, 2);
					if ($.inArray(prefix, arr) < 0) {
						var cityCode = code.substring(0, 4) + '00';
						//不是直辖市，截取四位获取市编码
					} else {
						var cityCode = code;
					}
					var provinceCode = code.substring(0, 2) + '0000';
				}
				code = parseInt(code);
				cityCode = parseInt(cityCode);
				provinceCode = parseInt(provinceCode);
			}
			$.ajax({
				type : 'get',
				url : api,
				dataType : "text",
				success : function(html) {
					var data = $.parseJSON(html);
					me.empty().append("<option value=''>请选择省份</option>");
					for (var key in data) {
						if (data[key].code == provinceCode) {
							me.append('<option value="' + data[key].code + '" selected>' + data[key].name + '</option>');
							continue;
						}
						me.append('<option value="' + data[key].code + '">' + data[key].name + '</option>');
					}
					me.on("change", function() {
						if (me.children("option:selected").text() != "请选择省份") {
							var inde = me.has(":selected").val();
							var child = data[inde].children;
							$('#city').empty().append("<option value=''>请选择城市</option>");
							for (var ind in child) {
								if (child[ind].code == cityCode) {
									$('#city').append('<option value="' + child[ind].code + '"  selected>' + child[ind].name + '</option>');
									continue;
								}
								$('#city').append('<option value="' + child[ind].code + '">' + child[ind].name + '</option>');
							}
							$('#city').on("change", function() {
								if ($('#city').children("option:selected").text() != "请选择城市") {
									var index = $('#city').has(":selected").val();
									var cityList = data[index.substring(0, 2) + '0000'].children;
									var childList = cityList[index].children;
									$('#state').empty().append("<option value=''>请选择区域</option>");
									for (var ind in childList) {
										if (childList[ind].code == code) {
											$('#state').append('<option value="' + childList[ind].code + '"  selected>' + childList[ind].name + '</option>');
											continue;
										}
										$('#state').append('<option value="' + childList[ind].code + '">' + childList[ind].name + '</option>');
									}

								} else {
									$('#state').empty().append("<option value=''>请选择区域</option>");
								}
							});
							$('#city').trigger("change");
						} else {
							$('#city').empty().append("<option value=''>请选择城市</option>");
						}
					});
					me.trigger("change");
				},
				error : function(xhr, textstatus) {
					alert(textstatus);
				}
			});
		}
	});

	module.exports = Util;
});
