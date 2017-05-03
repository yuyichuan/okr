seajs.config({
    // 映射,添加版本号
    map: [[/^(.*\.(?:css|js))$/i, '$1?v=1.0']],
    // 别名配置
    alias: {
        'jquery': 'lib/jquery/src/jquery-1.10.1.min',
        'placeholder': 'lib/placeholder/src/jquery.placeholder',
        'dialog': 'lib/dialog/main', // 对话框
        'dialogTools': 'lib/dialog/src/artDialog/plugins/iframeTools', // 对话框tools
        'validate': 'lib/validate/main', // 验证
        'datePicker': 'lib/datePicker/main', // My97DatePicker
        'dtpicker': 'lib/dtpicker/main', // datepicker
        're': 'lib/regular-expression/main', // 正则表达式
        'poshytip': 'lib/poshytip/main', // 冒泡提示
        'util': 'lib/util/main', // 工具方法
        'formatdate': 'lib/formatDate/main', //日期格式化
        'json': 'lib/json/src/json2', // json
        'textPosition': 'lib/position/jquery-textposition', // jquery-textposition
        'ajaxForm': 'lib/jquery-form/jquery.form', // jquery.form
        'upload': 'lib/upload/ajaxfileupload', //文件上传
        'jquery_ui_css_smoothness': 'lib/jquery-ui/src/smoothness/jquery-ui-1.11.4.css',
        'jqueryUiNew': 'lib/jquery-ui/src/jquery-ui-1.11.4.js',
        'editableSelect': 'lib/jquery-ui-autocomplete/main', //可编辑下拉框
        'moment': 'lib/moment/moment.min', //日期工具插件
        'autocomplete': 'lib/autocomplete/main', // 自动完成
        'smsTemplate': 'lib/smsTemplate/main', //选择短信模板
        'ueditor': 'lib/ueditor/main', //ueditor
        'idCard': 'lib/IDCard/main', //身份证校验封装-wangyang
        'Common': 'lib/OKRCommon/main', //通用模块封装-wangyang
        'tableDragCommon':'lib/table-drag/main',//表格拖拽封装-wangyang
        'loadmask': 'lib/loadmask/main'//遮罩

    },
    // 插件
    // plugins: ['shim', 'text', 'debug', 'nocache'], // for development
    // 预加载项
    preload: ["jquery"],
    // 文件编码
    charset: 'utf-8'
});
