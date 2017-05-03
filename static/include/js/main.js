  /**
 * 描述: Main模块
 * 作者: wangyang
 * 时间：2015年3月19日
 */
define(function(require, exports, module) {
    // 适配器（源码和压缩模式切换）
    var adapter = {
        config: {
            // 默认是发布模式
            //pubMode: true,//发布提测模式
            pubMode: false,//调试模式
            // 源文件目录
            sourceDir: 'pages',
            // 压缩文件目录
            minDir: 'pages-min',
            // 分发器ID
            dispatcherId: 'dispatcher',
            // 存储JS模块路径的cookie名称
            pathCookieName: 'ivf-modulePrefix'
        },
        setCookie: function(name, value) {
            var exp = new Date();
            exp.setTime(exp.getTime() + 7 * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + window.escape(value) + ";expires=" + exp.toGMTString();
        },
        getCookie: function(name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr) {
                return window.unescape(arr[2]);
            }
            return;
        },
        load: function(module) {
            // 加载模块文件并设置调用模式
            var cfg = this.config;
            var dir = cfg.pubMode ? 'include/js/' + cfg.minDir + '/' : 'include/js/' + cfg.sourceDir + '/';
            var prefix = $('#seajsFile').attr('src');
            prefix = prefix.split('include/js/');
            prefix = prefix[0] || './';
            var modulePrefix = prefix + dir;
            seajs.use(modulePrefix + module);
            this.setCookie(cfg.pathCookieName, modulePrefix);
        },
        init: function(module) {
            // 加载模块
            var cfg = this.config;
            var params = top.location.search.substr(1).split('&');
            var last = params.length > 0 ? params[params.length - 1] : '';
            if (params.length === 0 || last.indexOf('debug') === -1) {
                // 没有调试参数
                var modulePrefix = this.getCookie(cfg.pathCookieName);
                if (modulePrefix) {
                    if (modulePrefix.indexOf(cfg.minDir) !== -1) {
                        cfg.pubMode = true;
                    } else {
                        cfg.pubMode = false;
                    }
                    // 有缓存前缀，则直接调用
                    seajs.use(modulePrefix + module);
                } else {
                    // 默认是发布模式
                    //cfg.pubMode = cfg.pubMode;
                    this.load(module);
                }
            } else {
                // 有调试参数
                last = last.split('=');
                if (last.length > 0 && last[1] === "true") {
                    // 调试模式
                    cfg.pubMode = false;
                } else {
                    // 发布模式
                    cfg.pubMode = true;
                }
                this.load(module);
            }
        },
        dispatch: function() {
            // 分发（根据dispatcher隐藏域的值自动加载对应模块）
            var cfg = adapter.config;
            var $dispatcher = $('#' + cfg.dispatcherId + '');
            if ($dispatcher.length) {
                var moduleName = $.trim($dispatcher.val());
                if (moduleName) {
                    // 调用模块，使用适配器处理压缩和非压缩模式切换
                    adapter.init(moduleName);
                    //加载对应模块后，不应该再调用global
                    if (!cfg.pubMode) {
                        // 如果是调试模式，需要另外调用global模块
                        require.async('./' + cfg.sourceDir + '/global');
                    //}
                    }else{
                     require.async('./' + cfg.minDir + '/global');
                    }
                } else {
                    // 没有提供模块名的情况，仍然需要调用global模块以保证全局的功能正常使用（例如退出）
                    require.async('./' + cfg.sourceDir + '/global');
                }
            }
        }
    };

    adapter.dispatch();

}); 