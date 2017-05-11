<!DOCTYPE HTML>
<html>
	<head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!-- <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />   -->
        <title>OKR</title>
        <link href="include/css/okr.css" rel="stylesheet" type="text/css">
        <!--[if lt IE 9]>
        <script type="text/javascript" src="js/lib/html5/src/html5shiv.js"></script>
        <script type="text/javascript" src="js/lib/html5/src/html5shiv-printshiv.js"></script>
        <![endif]-->
    </head>
	<body>
		<!DOCTYPE HTML>
<html>
	<head>
        <meta charset="UTF-8">
        <title>OKR</title>
        <link href="include/css/okr.css" rel="stylesheet" type="text/css">
        <!--[if lt IE 9]>
        <script type="text/javascript" src="js/lib/html5/src/html5shiv.js"></script>
        <script type="text/javascript" src="js/lib/html5/src/html5shiv-printshiv.js"></script>
        <![endif]-->
    </head>
	<body>
		<header>
			<div class="w1k middle header-top text-r">
				<p class="f-l"></p>
                <span>你好，<cite class="m-r10">{{viewmodel['uname']}}</cite><cite class="m-r10">|</cite><cite class="m-r10"><a href="/chpwd">修改密码</a></cite><cite class=" m-r10">|</cite><cite><a href="javascript:;" url="/logout" id="logoutBtn">退出</a></cite></span>
			</div>
            <nav>
            	<div class="w1k middle">
                	%if viewmodel['umage']:
                	<span class="text-c right-brd"><a href="/departmentokr" class='nav'>部门OKR管理</a></span>
                	%end
                	%if viewmodel['uproject']:
                	<span class="text-c right-brd"><a href="/projectokr" class='nav'>项目OKR管理</a></span>
                	%end
                	% if viewmodel['uperson']:
                	<span class="text-c right-brd"><a href="/personokr" class='nav'>个人OKR管理</a></span>
                	% end
                	% if viewmodel['uadmin']:
                	<span class="text-c"><a href="/users" class="now nav">用户管理</a></span>
                	% end
                	<span class="text-c"><a href="/showdepartmentokr" class="nav">部门OKR展示</a></span>
                </div>
            </nav>
        </header>

        <!--内容开始-->
        <input type="hidden" name="dispatcher" id="dispatcher" value="accounts-list" data-urlDelete="" data-urlAfterEdit="/users" data-urlSearch="">
        <div class="middle m-t30 cnt-title">
        	<div class="w1k middle"><b>开户</b><button class="orange-btn f-r" id="addUser">新增开户</button></div>
            <!--<div class="table-top-seach"><input name="" type="text" class="f-l" placeholder="ID/姓名"><a href="javascript:;" id="searchBtn"></a></div>-->
            </div>
            <div class="table-div">
            	<p></p>
                <table class="m-t15 text-c">
                	<thead>
                	    <th width="10%">ID</th>
                    	<th width="15%">ACCOUNT</th>
                        <th width="15%">姓名</th>
                        <th width="40%">用户组</th>
                        <th width="20%">操作</th>
                    </thead>
                    <tbody>
                    %for user in viewmodel['users']:
                    	<tr data-id="{{user['uid']}}">
                    	    <td class="frist-td">{{user['uid']}}</td>
                        	<td>{{user['uaccount']}}</td>
                            <td>{{user['uname']}}</td>
                            <td gids="{{user['groupids']}}">{{user['groupnames']}}</td>
                            <td><a href="javascript:;" class="editBtn" >修改</a><!--&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="delBtn" >删除</a>--></td>
                        </tr>
                    % end
                    </tbody>
                </table>
            </div>
        </div>
        <div class="add-kh middle" style="display: none;" id="addUserDialog">
            <form action="/saveuser" method="post" id="addUserForm">
            <input type="hidden" value="" name="uid" id="uId"/>
                <ul>
                    <li><i><b>*</b>ACCOUNT:</i><label><input name="uaccount" type="text" id="userId"></label></li>
                    <li><i><b>*</b>姓名:</i><label><input name="uname" type="text" id="userName"></label></li>
                    <li><i><b>*</b>用户组:</i>
                    % for group in viewmodel['groups']:
                    <label class="m-r20 "><input name="groupids" class="group" type="checkbox" value="{{group['gid']}}" id="groupids">{{group['gname']}}</label>
                    % end
                    </li>
                </ul>
                <span class="text-c"><input name="" type="button" class="gray-btn m-r20 cancelBtn" value="取消"></input><input name="" type="button" class="orange-btn " value="保存" id="saveBtn"></input></span>
            </form>
        </div>
		<!--内容结束-->
<script src="include/js/seajs/sea.js?v=2.0" data-config="config.js?v=2.0" data-main="main.js?v=2.0" data-refresh-token=""  id="seajsFile"></script>
</body>
</html>