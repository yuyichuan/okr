/**
 * UNIX日期格式化
 * User: 张顺金 <zhangshunjin@eetop.com>
 * Date: 13-7-1 下午4:23
 */
define(function (require, exports, module) {
    //解决$.format.date is not a function异常问题
    // require.async("./src/jquery.dateFormat-1.0");

//    require("./src/jquery.dateFormat-1.0");
//    <script type="text/javascript" src="lab.js"></script>
//    <script type="text/javascript">
//        $LAB.script("first-file.js")
//            .script("the-rest.js")
//            .wait(function(){
//                Application.init();
//            });
//    </script>
//
//    //如果想管理依赖关系，可以通过wait函数，这样：
//        <script type="text/javascript" src="lab.js"></script>
//        <script type="text/javascript">
//        $LAB.script("first-file.js").wait()
//        .script("the-rest.js")
//        .wait(function(){
//            Application.init();
//            });



    require("lib/dateFormat/src/jquery.dateFormat-1.0");
    var _unixDate;

    /**
     * 输入的 Unix 时间戳
     * @param unixDateFormat
     * @constructor
     */
    function DateFormat(unixDateFormat) {
        _unixDate = unixDateFormat;
    }

    /**
     * 预期的格式
     * @param destDateFormat
     * @returns {*}
     */
    DateFormat.prototype.format = function (destDateFormat) {
        return $.format.date(_unixDate, destDateFormat);
        //return  $.format.date(1372643327033, "dd/MM/yyyy")
    };
    module.exports = DateFormat;
});