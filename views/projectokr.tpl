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
        <!-- <script src="http://localhost:35729/livereload.js"></script> -->        
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
        <!-- <script src="http://localhost:35729/livereload.js"></script> -->        
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
            	    <span class="text-c"><a href="/departmentokr" class='nav'>部门OKR管理</a></span>
                	%end
                	%if viewmodel['uproject']:
                	<span class="text-c"><a href="/projectokr" class='now nav'>项目OKR管理</a></span>
                	%end
                	% if viewmodel['uperson']:
                	<span class="text-c"><a href="/personokr" class='nav'>个人OKR管理</a></span>
                	% end
                	% if viewmodel['umage']:
                	<span class="text-c"><a href="/showdepartmentokr" class="nav">部门OKR展示</a></span>
                	% end
                	% if viewmodel['uadmin']:
                	<span class="text-c"><a href="/users" class="nav">用户管理</a></span>
                	% end
                </div>
            </nav>
        </header>

        <!--内容开始-->
        <input type="hidden" name="dispatcher" id="dispatcher" value="okr-manage" data-urlAfterSave="/projectokr" data-urlDelete="/delokr">
        <div class="middle m-t30 cnt-title">
        	<div class="w1k middle"><b>OKR管理</b>&nbsp;&nbsp;&nbsp;&nbsp;</span><b>只显示我创建的O<input id="showme" type="checkbox" value="showme" class="checkItem"
        	            % if 'showme' == viewmodel['showme']:
        	                checked="checked"
        	            % end
        	         ></b>&nbsp;&nbsp;&nbsp;&nbsp;<select id="selectmonth"><option value="">请选择月度</option>
        	            % for i in [1,2,3,4,5,6,7,8,9,10,11,12]:
        	                % if i == viewmodel['selectmonth']:
                                <option value="{{i}}" selected="selected">{{i}}月</option>
                            % else:
        	                    <option value="{{i}}">{{i}}月</option>
        	                % end
        	            % end
        	        </select><button class="orange-btn f-r" id="addO" title="新增O" klevel="{{viewmodel['kolevel']}}" pkid="0">新增<b class="o-font">O</b></button></div>
        </div>
            <div class="table-div okr-gl">
                <table class="m-t15">
                	<thead>
                	    <th width="4%">ID</th>
                    	<th width="7%">项目O</th>
                        <th width="30%">项目KR</th>
                        <th width="12%">参与人员</th>
                        <th width="7%">计划月份</th>
                        <th width="7%">计划人日</th>
                        <th width="4%">难度</th>
                        <th width="6%">完成(%)</th>
                        <th width="10%">开始日期</th>
                        <th width="13%">操作</th>
                    </thead>
                    <tbody>
                    % for depto in viewmodel['okrs']:
                    	<tr id="{{depto['kid']}}">
                    	    <td>{{depto['kid']}}</td>
                        	<td colspan="2" class="krCnt"><a href="javascript:;" class="switchIcon clo-op-op f-l" subClass="{{depto['kid']}}"></a><div class="text-hidden w500"><a href="javascript:;" class="showDetail">{{depto['kdesc']}}</a></div></td>
                            <td class="krPeople" peopleIds="{{depto['link_user_ids']}}"><div class="text-hidden w180"><a href="javascript:;" class="showDetail">{{depto['link_user_names']}}</a></div></td>
                            <td class="krMonth" monthIds="{{depto['planmonth']}}"><div class="text-hidden w120"><a href="javascript:;" class="showDetail">{{depto['planmonth']}}</a></div></td>
                            <td class="krTime">{{depto['plandays']}}</td>
                            <td class="krLevel">{{str(depto['elevel'])}}</td>
                            <td>{{depto['complement']}}</td>
                            <td>
                            % if depto['stime'] is not None:
                                {{depto['stime']}}
                            % end
                            </td>
                            <td>
                            %if viewmodel['curid']== depto['ouid']:
                            <a href="javascript:;" class="m-r10 editO" data-sign="editO" klevel="{{viewmodel['kolevel']}}" pkid="{{depto['pkid']}}">修改</a>
                                % if len(depto['krs']) == 0:
                                    <a href="javascript:;" class="m-r10 delBtn">删除</a>
                                % end
                            % end
                            <a href="javascript:;" class="addKR" title="新增KR" klevel="{{viewmodel['krlevel']}}" pkid="{{depto['kid']}}">新增KR</a></td>
                        </tr>
                        % for deptkr in depto['krs']:
                        <tr id="{{deptkr['kid']}}" class="{{depto['kid']}}"  parentId="{{deptkr['pkid']}}">
                        	<td></td>
                        	<td>{{deptkr['kid']}}</td>
                            <td class="krCnt"><div class="text-hidden w400"><a href="javascript:;" class="showDetail">{{deptkr['kdesc']}}</a></div></td>
                            <td class="krPeople" peopleIds="{{deptkr['link_user_ids']}}"><div class="text-hidden w180"><a href="javascript:;" class="showDetail">{{deptkr['link_user_names']}}</a></div></td>
                            <td class="krMonth" monthIds="{{deptkr['planmonth']}}"><div class="text-hidden w120"><a href="javascript:;" class="showDetail">{{deptkr['planmonth']}}</a></div></td>
                            <td class="krTime">{{deptkr['plandays']}}</td>
                            <td class="krLevel">{{str(deptkr['elevel'])}}</td>
                            <td class="krComplete">{{deptkr['complement']}}</td>
                            <td>
                             % if deptkr['stime'] is not None:
                                {{deptkr['stime']}}
                            % end
                            </td>
                            <td>
                            % if deptkr['status'] != 1:
                            <a href="javascript:;" class="m-r10 editKR" data-sign="editKR" klevel="{{viewmodel['krlevel']}}" pkid="{{deptkr['pkid']}}">修改</a>
                            % end
                            % if deptkr['status'] == -1:
                            <a href="javascript:;" class="m-r10 delBtn">删除</a>
                            % end
                            </td>
                        </tr>
                        % end
                    % end
                    </tbody>
                </table>
            </div>
        <div class="add-kh middle add-o" style="display: none;" id="newODialog">
            <form id="okrForm" action="/saveokr" method="post">
                <input type="hidden" id="dpkid" name="pkid" value=""/>
                <input type="hidden" id="dklevel" name="klevel" value=""/>
                <input type="hidden" id="kid" name="kid" value=""/>
                <input type="hidden" id="checkedMonths" name="planmonth" value="" />
                <input type="hidden" id="krtype" name="krtype" value="{{viewmodel['krtype']}}"/>
                <ul>
                    <li id="krDes"><i><b class="o-font">O</b>:</i><span class="okr-show"></span></li>
                    <li id="krInput"><i><b>*</b><b class="o-font">O</b>:<br/><em class="jishu">0/300</em></i><label><textarea name="kdesc" cols="" rows="" class="text-o" id="okrGoal"></textarea></label></li>
                    <li><i><b>*</b>参与人员:</i><label><input name="" type="text" placeholder="点击选择" id="participant" readonly><input type="hidden" id="checkedIds" name="link_users"></label></li>
                    <li><i><b>*</b>计划月份:</i><div class="choose-m">
                    % for i in [1,2,3,4,5,6,7,8,9,10,11,12]:
                    <label class="m-r20"><input name="planmontht" type="checkbox" value="{{i}}" class="chkMonth">{{i}}月</label>
                    % end
                    </div></li>
                    <li><i><b>*</b>计划人日:</i><label><input name="plandays" type="text" id="planTime">&nbsp;天</label></li>
                    <li><i><b>*</b>难度:</i><label><select name="elevel" id="goalLevel">
                        <option value="">请选择</option>
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                    </select></label></li>
                </ul>
                <span class="text-c"><input name="" type="button" class="gray-btn m-r20 cancelBtn" value="取消"></input><input name="" type="button" class="orange-btn saveBtn" value="保存"></input></span>
            </form>
        </div>
        <div class="add-kh middle add-o" id="participantDialog" style="display: none;">
            <input type="hidden" name="" id="financialCheckedIds">
            <!--<div class="table-top-seach">
                <input name="" type="text" class="f-l" placeholder="ID/姓名"><a href="#"></a>
                <input type="hidden" name="" id="financialCheckedIds">
                <span class="f-r m-r20"><input name="" type="checkbox" class="showCheck">仅显示选择项</span>
            </div>-->
            <div class="choose-people">
                <div class="all-choose"><input name="" type="checkbox" value="" id="checkAll">全选<cite>（总数：{{viewmodel['userscount']}}</cite><cite>已选：<span id="checkedNum"></span>）</cite></div>
                <div class="table-div">
                    <table width="100%" cellpadding="0" cellspacing="0">
                    % for userdouble in viewmodel['users']:
                        <tr>
                            % for user in userdouble:
                            <td><input name="uids" type="checkbox" value="{{user['uid']}}" class="checkItem">{{user['uname']}}</td>
                            % end
                        </tr>
                    % end
                    </table>
                </div>
            </div>
            <span class="text-c"><input name="" type="button" class="gray-btn m-r20 staffCancelBtn" value="取消"></input><input name="" type="button" class="orange-btn sureBtn" value="确定"></input></span>
        </div>
		<!--内容结束-->

<script src="include/js/seajs/sea.js?v=2.0" data-config="config.js?v=2.0" data-main="main.js?v=2.0" data-refresh-token=""  id="seajsFile"></script>
</body>
</html>