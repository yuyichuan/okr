/**
 * 选择短信模板--HI-CRM新样式
 * @author 王洋
 * @version 2015-01-16
 */
define(function(require, exports, module) {"use strict";

    var Util = require('util'), util = new Util();

    // 选择模板
    $.fn.extend({
        selectSmsTemplate : function(dsUrl, dataId, selCallback,callbackFun) {
            var cacheData;
            var me = this;
            if (me.length === 0) {
                return;
            }
            var className = this[0].id + '-template-panel';
            var ctl = $('.' + className);
            // 加载数据
            var loadData = function(callback) {
                $.commonAjax({
                    type : 'post',
                    url : dsUrl,
                    data : {
                        subHospitalId : dataId
                    },
                    success : function(re) {
                        cacheData = re;
                        if (callback) {
                            callback(re);
                        }
                    },
                    error : function(msg, status) {
                        alert(msg);
                    }
                });
            };
            // 预加载模板数据
            //loadData();
            // 绑定一次性事件，用于处理
            var bindHelpEvent = function() {
                // 选择
                $('body').one('click', '.' + className + ' .item', function() {
                    me.val($(this).find('.name').text());
                    selCallback($(this).find('.ctn').text(),$(this).closest('.item').attr('data-id'));
                    ctl.hide();
                });
                // 隐藏
                $('body').one('click', function(e) {
                    var $tar = $(e.target);
                    var pnt = $tar.parent();
                    if ($tar.is(me) || pnt.is(ctl) || pnt.parent().is(ctl)) {
                        return;
                    }
                    ctl.hide();
                });
            };

            // HTML编码
            var toHtmlEnCode = function(str) {
                var s = "";
                if (str.length === 0) {
                    return "";
                }
                s = str.replace(/&/g, "&gt;");
                s = s.replace(/</g, "&lt;");
                s = s.replace(/>/g, "&gt;");
                s = s.replace(/ /g, "&nbsp;");
                s = s.replace(/\'/g, "'");
                s = s.replace(/\"/g, "&quot;");
                return s;
            };

            // 弹出弹出层
            var showPanel = function(ds) {
                if (!ds || ds.length === 0) {
                    ctl.empty().hide();
                    return;
                }
                // // 有则直接显示
                // if (ctl.length > 0) {
                // ctl.show();
                // bindHelpEvent();
                // return;
                // }
                // 没有则创建
                ctl = $('<div class="order-array1 ' + className + '"></div>').appendTo($('body'));
                ctl.css({
                    position : 'absolute',
                    left : me.offset().left,
                    top : me.offset().top + me.height() + 3,
                    width : me.width() + 312,
                    zIndex : 9999
                });
                if (ds.length > 5) {
                    ctl.css({
                        height : 180,
                        overflowY : 'scroll'
                    });
                }
                var html = '<div class="pub-box-con pos-abs bg-fff"><table cellpadding="0" cellspacing="0" width="100%">' + '<thead><tr><td class="first-td" width="35%">模板名称</td><td width="65%">短信内容</td></tr></thead><tbody>';
                for (var i = 0; i < ds.length; i++) {
                    var item = ds[i];
                    var name = item.templateName;
                    html += '<tr data-id="' + item.msgTemplateId + '" class="item"><td class="first-td"><div class="text-hidden w120 name">' + name + '</div></td>' + '<td><div class="text-hidden w260 ctn" title="' + item.msgContent + '">' + toHtmlEnCode(item.msgContent) + '</div></td>' + '</tr>';
                }
                html += '</tbody></table><div>';
                ctl.empty().append(html).show();
                bindHelpEvent();
            };

            if (ctl.is(':visible')) {
                return;
            }

            loadData(function(ds) {
                showPanel(ds);
            });

            //绑定事件
            // me.on('click', function() {
                // if (cacheData) {
                    // showPanel(cacheData);
                // } else {
                    // loadData(function(ds) {
                        // showPanel(ds);
                    // });
                // }
            // });
        }
    });
});
