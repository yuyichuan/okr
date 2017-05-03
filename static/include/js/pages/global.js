/*global $*/
/**
 * 全局功能 (头部和底部： 页面全局控制的代码)
 * @author wanghaojun
 * @version 2017-04-26
 * @since 2017-04-26
 */
define(function(require, exports, module) {
    //退出按钮
    $('#logoutBtn').on('click', function(event) {
        try {
            window.external.CloseForm();
        } catch (e) {
            location.href = $(this).attr('url');
        }
        return false;
    });

    //选中当前导航
    $('.nav').on('click',function () {
        $(this).addClass('now').siblings('.nav').removeClass('now')
    })
});
