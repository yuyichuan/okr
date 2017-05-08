<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>TC OKR考核系统</title>
<link href="include/css/okr.css" rel="stylesheet" type="text/css" />
</head>

<body>
<input type="hidden" name="dispatcher" id="dispatcher" value="user-login">
<div class="login-bg w1k">
    <form action="/chpwdp" method="post" id="loginForm">
        <div class="login-center">
            <div class="f-l"></div>
            <div class="f-r">
                <ul>
                    <li class="userid">{{viewmodel['uname']}}</li>
                    <li><span>原密码</span><input name="oldupwd" type="password" class="password" /></li>
                    <li><span>新密码</span><input name="newupwd" type="password" class="password"  /></li>
                    <li class="orange-text">{{viewmodel['errmsg']}}</li>
                    <li class="text-r"><input name="" type="submit" value="Change Pwd" class="orange-btn" /><a href="/">返回</></li>
                </ul>
            </div>
        </div>
    </form>
</div>
<script src="include/js/seajs/sea.js?v=2.0" data-config="config.js?v=2.0" data-main="main.js?v=2.0" id="seajsFile"></script>
</body>
</html>