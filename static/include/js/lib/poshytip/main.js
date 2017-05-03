/**
 * 冒泡提示插件
 * @author luoweiping
 * @version 2013-06-27
 * @since 2013-06-27
 */
define(function (require, exports, module) {
    require('./src/themes/tip-yellowsimple.css');
    require('./src/jquery.poshytip.min');

    function Poshytip () {

    }

    Poshytip.prototype.poshytip = function ($ele, cfgObj) {
        var defCfg = {
            className : 'tip-yellowsimple',
            showOn : 'focus',
            alignTo : 'target',
            alignX : 'center',
            offsetY : 5,
            showTimeout : 100
        };
        cfgObj = cfgObj || {};

        return $ele.poshytip($.extend(defCfg, cfgObj));
    };

    module.exports = Poshytip;
});
