/*global $,CryptoJS*/
/**
 * 编码转换
 * @author luoweiping
 * @version 2013-10-11
 * @since 2013-10-11
 */
define(function (require, exports, module) {
    //@formatter:off
    'use strict';
    //@formatter:on
    require('./src/core-min');
    // require.async('./src/enc-base64');

    function Transcode () {
    }

    /**
     * Base64编码
     * @return {void}
     * @author luoweiping
     * @version 2013-10-11
     * @since 2013-10-11
     */
    Transcode.prototype.encodeBase64 = function (srcStr) {
        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(srcStr));
    };

    /**
     * Base64解码
     * @return {void}
     * @author luoweiping
     * @version 2013-10-11
     * @since 2013-10-11
     */
    Transcode.prototype.decodeBase64 = function (srcStr) {
        return CryptoJS.enc.Base64.parse(srcStr).toString(CryptoJS.enc.Utf8);
    };

    module.exports = Transcode;
});
