/*global jQuery*/
/*jslint nomen:true*/
/**
 * User: daihuan
 * Date: 13-6-9
 * Time: 上午11:10
 */
define(function (require, exports, module) {
    'use strict';
    require('jqueryUiNew');
    require('jquery_ui_css_smoothness');
    require('./src/extra.css');

    function editableSelect () {
    }

    editableSelect.prototype.init = function (selCallback, initFunc) {
        (function ($) {
            $.widget("custom.combobox", {
                _create: function () {
                    this.wrapper = $("<span>").addClass("custom-combobox").insertAfter(this.element);
                    this.element.hide();
                    this.createAutocomplete();
                    this.createShowAllButton();
                    // IE10下面改插件会默认触发input事件，导致页面初始的时候会有弹出层，这个事件没有也能正常使用，所以在不修改jQuery UI的情况下，为了修改这个问题，在这里删除
                    $('.custom-combobox-input').off('input');
                },
                createAutocomplete: function () {
                    var selected = this.element.children(":selected"), value = selected.val() ? selected.text() : "", emptyText = '请选择...', inputClass = '', setting, that = this;
                    if (this.element.children(':first').attr('value') === '') {//若第一项value为空，则取其文本作为placeholder
                        emptyText = this.element.children(':first').text();
                    }
                    inputClass = 'custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left';
                    setting = {
                        delay: 0,
                        minLength: 0,
                        source: $.proxy(this, "source"),
                        autoFocus: true//,
                        // response: function(event, ui){
                        // }
                    };
                    
                    this.input = $('<input type="text">').appendTo(this.wrapper).val(value).attr("title", "").attr('placeholder', emptyText).addClass(inputClass).autocomplete(setting).tooltip({
                        tooltipClass: "ui-state-highlight"
                    });
                    this._on(this.input, {
                        autocompleteselect: function (event, ui) {
                            var option = ui.item.option;
                            // option.selected = true;
                            $(option).attr('selected', 'selected').siblings().removeAttr('selected');
                            $(option).parent().val($(option).attr('value'));//解决firefox已经选择的再重新选择的时候无value问题
                            that.input.val(ui.item.label);//解决焦点变更后IE值未变问题
                            this._trigger("select", event, {
                                item: option
                            });
                            // 下拉项选中的回调，目前在电子病历用到
                            if (selCallback && typeof selCallback === "function") {
                                selCallback(option, ui.item.label);
                            }
                        },
                        autocompletechange: "removeIfInvalid"
                    });
                    
                    if(typeof initFunc === 'function'){
                        initFunc.call(this);
                    }
                },
                createShowAllButton: function () {
                    var input = this.input, wasOpen = false;
                    $("<a>").attr("tabIndex", -1).attr("title", "").tooltip().appendTo(this.wrapper).button({
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        },
                        text: false
                    }).removeClass("ui-corner-all").addClass("custom-combobox-toggle ui-corner-right").mousedown(function () {
                        wasOpen = input.autocomplete("widget").is(":visible");
                    }).click(function () {
                        input.focus();
                        // Close if already visible
                        if (wasOpen) {
                            return;
                        }
                        // Pass empty string as value to search for, displaying all results
                        input.autocomplete("search", "");
                    });
                },
                source: function (request, response) {
                    var matcher = new RegExp ($.ui.autocomplete.escapeRegex(request.term), "i"), resultArr = [], $optArr = this.element.children('option'), $opt, optLen, optIdx, optText, optSpell, matchIdx = 0, optCode;
                    optLen = $optArr.length;
                    for(optIdx = 0; optIdx < optLen; optIdx += 1){
                        $opt = $($optArr[optIdx]);
                        optText = $opt.text();
                        optSpell = $opt.attr('data-match');
                        optCode = $opt.attr('data-code');
                        if(matchIdx >= 80){
                            break;
                        }
                        if($optArr[optIdx].value && (!request.term || matcher.test(optSpell) || matcher.test(optText) || (optCode && matcher.test(optCode)))){
                            resultArr.push({
                                label: optText,
                                value: optText,
                                option: $opt[0]
                            });
                            matchIdx += 1;
                        }
                    }
                    response(resultArr);
                },
                removeIfInvalid: function (event, ui) {
                    // Selected an item, nothing to do
                    if (ui.item) {
                        return;
                    }
                    // Search for a match (case-insensitive)
                    var value = this.input.val(), valueLowerCase = value.toLowerCase(), valid = false;
                    this.element.children("option").each(function () {
                        if ($(this).text().toLowerCase() === valueLowerCase) {
                            this.selected = valid = true;
                            return false;
                        }
                    });
                    // Found a match, nothing to do
                    if (valid) {
                        return;
                    }
                },
                _destroy: function () {
                    this.wrapper.remove();
                    this.element.show();
                }
            });
        }(jQuery));
    };

    module.exports = editableSelect;
});
