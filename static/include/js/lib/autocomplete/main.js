/**
 * jQuery AutoComplete 自动完成
 * User: 张顺金 <zhangshunjin@eetop.com>
 * Date: 13-6-21 上午9:02
 */

define(function (require, exports, module) {
    require("./src/jquery.autocomplete");
//    require("./src/jquery.autocomplete1.2.3");
    require("./src/jquery.autocomplete.css");

    var _sel = null;

    /**
     * 构造函数
     * @constructor
     */
    function AutoComplete(selector) {
        _sel = selector;
    }

    AutoComplete.prototype.init = function (dataSource, dataConfig) {
        $(_sel).on("focus", function () {
            $(this).autocompletetip(dataSource, dataConfig);
        });
    };

    AutoComplete.prototype.unautocomplete = function () {
        $(":input").unautocomplete();
    };


    module.exports = AutoComplete;
});
