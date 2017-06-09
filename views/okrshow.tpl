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
                	<span class="text-c"><a href="/projectokr" class='nav'>项目OKR管理</a></span>
                	%end
                	% if viewmodel['uperson']:
                	<span class="text-c"><a href="/personokr" class='nav'>个人OKR管理</a></span>
                	% end
                	% if viewmodel['uadmin']:
                	<span class="text-c"><a href="/users" class="nav">用户管理</a></span>
                	% end
                	<span class="text-c"><a href="/showdepartmentokr" class="now nav">部门OKR展示</a></span>
                </div>
            </nav>
        </header>

        <!--内容开始-->
        <input type="hidden" name="dispatcher" id="dispatcher" data-urlAfterSave="/showdepartmentokr" value="okr-manage">
        <div class="middle m-t30 cnt-title">
        	<div class="w1k middle"><b>OKR管理</b>&nbsp;&nbsp;&nbsp;&nbsp;<select id="selectmonth">
        	        <option value="-1">请选择月度</option>
        	            % for i in [1,2,3,4,5,6,7,8,9,10,11,12]:
        	                % if i == viewmodel['selectmonth']:
                                <option value="{{i}}" selected="selected">{{i}}月</option>
                            % else:
        	                    <option value="{{i}}">{{i}}月</option>
        	                % end
        	            % end
        	        </select></div>
        </div>
            <div class="table-div okr-gl">
                <table class="m-t15">
                	<thead>
                	    <th width="80px;">开始日期</th>
                	    <th width="60px;">完成(%)</th>
                	    <th width="30px;">难度</th>
                	    <th width="60px;">计划人日</th>
                	    <th width="100px;">计划月份</th>
                	    <th width="20px;">ID</th>
                    	<th width="30px;">部门</th>
                        <th width="30px;">项目</th>
                        <th width="30px;">个人</th>
                        <th>个人KR</th>
                    </thead>
                    <tbody>
                    <tr><td colspan="10"><a href="javascript:;" class="showDetail">统计:
                    % for (k,v) in viewmodel['persondays'].items():
                        {{k}}:{{v}},
                    % end
                    </a></td></tr>
                    % for depto in viewmodel['okrs']:
                    	<tr id="{{depto['kid']}}">
                    	    <td>
                            % if depto['stime'] is not None:
                                {{depto['stime']}}
                            % end
                            </td>
                            <td>
                            % if depto['plandays'] > 0.0:
                                {{depto['complement']}}
                                % end
                            </td>
                            <td class="krLevel">{{str(depto['elevel'])}}</td>
                            <td class="krTime">
                            % if depto['plandays'] > 0.0:
                                {{depto['plandays']}}
                                % end
                            </td>
                            <td class="krMonth" monthIds="{{depto['planmonth']}}"><div class="text-hidden w90"><a href="javascript:;" class="showDetail">{{depto['planmonth']}}</a></div></td>
                    	    <td>{{depto['kid']}}</td>
                        	<td colspan="4" class="krCnt"><a href="javascript:;" class="switchIcon clo-op-op f-l" subClass="{{depto['kid']}}"></a><div class="text-hidden w1220"><a href="javascript:;" class="showDetail">
                        	% if depto['kid'] == -1:
                        	其他项目O
                        	% else:
                        	[{{depto['link_user_names']}}]{{depto['kdesc']}}
                        	% end
                        	</a></div></td>
                        </tr>
                        % for deptkr in depto['krs']:
                        <tr id="{{deptkr['kid']}}" class="{{depto['kid']}}"  parentId="{{deptkr['pkid']}}">
                            <td>
                             % if deptkr['stime'] is not None:
                                {{deptkr['stime']}}
                            % end
                            </td>
                            <td class="krComplete">
                            % if deptkr['plandays'] > 0.0:
                                {{deptkr['complement']}}
                            % end
                            </td>
                            <td class="krLevel">{{str(deptkr['elevel'])}}</td>
                            <td class="krTime">
                            % if deptkr['plandays'] > 0.0:
                                {{deptkr['plandays']}}
                                % end
                            </td>
                            <td class="krMonth" monthIds="{{deptkr['planmonth']}}"><div class="text-hidden w90"><a href="javascript:;" class="showDetail">{{deptkr['planmonth']}}</a></div></td>
                        	<td>{{deptkr['kid']}}</td>
                        	<td>
                        	% if viewmodel['umage'] and viewmodel['selectmonth'] > 0 and deptkr['cstatus'] == '0':
                        	<a href="javascript:;" class="showcheck" kid='{{deptkr['kid']}}' cmonth='{{viewmodel['selectmonth']}}' cstatus={{deptkr['cstatus']}} >检查</a>
                        	% end
                        	% if viewmodel['umage'] and viewmodel['selectmonth'] > 0 and deptkr['cstatus'] == '-1':
                        	    未完
                        	% end
                        	% if viewmodel['umage'] and viewmodel['selectmonth'] > 0 and deptkr['cstatus'] == '1':
                        	    完成
                        	% end
                        	</td>
                            <td colspan="3" class="krCnt"><a href="javascript:;" class="switchIcon clo-op-op f-l" subClass="{{deptkr['kid']}}"></a><div class="text-hidden w1180"><a href="javascript:;" class="showDetail">[{{deptkr['link_user_names']}}]{{deptkr['kdesc']}}</a></div></td>
                        </tr>
                            % for deptkrr in deptkr['krs']:
                        <tr id="{{deptkrr['kid']}}" class="{{depto['kid']}} {{deptkr['kid']}}"  parentId="{{deptkrr['pkid']}}">
                            <td>
                             % if deptkrr['stime'] is not None:
                                {{deptkrr['stime']}}
                            % end
                            </td>
                            <td class="krComplete">
                            % if deptkrr['plandays'] > 0.0:
                                {{deptkrr['complement']}}
                                % end
                            </td>
                            <td class="krLevel">{{str(deptkrr['elevel'])}}</td>
                            <td class="krTime">
                            % if deptkrr['plandays'] > 0.0:
                                {{deptkrr['plandays']}}
                                % end
                            </td>
                            <td class="krMonth" monthIds="{{deptkrr['planmonth']}}"><div class="text-hidden w90"><a href="javascript:;" class="showDetail">{{deptkrr['planmonth']}}</a></div></td>
                            <td>{{deptkrr['kid']}}</td>
                        	<td ></td>
                        	<td ></td>
                            <td colspan="2" class="krCnt"><a href="javascript:;" class="switchIcon clo-op-op f-l" subClass="{{deptkrr['kid']}}"></a><div class="text-hidden w1140"><a href="javascript:;" class="showDetail">[{{deptkrr['link_user_names']}}]{{deptkrr['kdesc']}}</a></div></td>
                        </tr>
                                % for deptkrrr in deptkrr['krs']:
                        <tr id="{{deptkrrr['kid']}}" class="{{depto['kid']}} {{deptkr['kid']}} {{deptkrr['kid']}}"  parentId="{{deptkrrr['pkid']}}">
                            <td>
                             % if deptkrrr['stime'] is not None:
                                {{deptkrrr['stime']}}
                            % end
                            </td>
                            <td class="krComplete">{{deptkrrr['complement']}}</td>
                            <td class="krLevel">{{str(deptkrrr['elevel'])}}</td>
                            <td class="krTime">{{deptkrrr['plandays']}}</td>
                            <td class="krMonth" monthIds="{{deptkrrr['planmonth']}}"><div class="text-hidden w90"><a href="javascript:;" class="showDetail">{{deptkrrr['planmonth']}}</a></div></td>
                            <td>{{deptkrrr['kid']}}</td>
                        	<td ></td>
                        	<td ></td>
                        	<td ></td>
                            <td class="krCnt"><div class="text-hidden w1100"><a href="javascript:;" class="showDetail">[{{deptkrrr['link_user_names']}}]{{deptkrrr['kdesc']}}</a></div></td>
                        </tr>
                                % end
                            % end
                        % end
                    % end
                    </tbody>
                </table>
            </div>
            <div class="add-kh middle add-o" style="display: none;" id="monthCheckDialog">
                <form id="okrForm" action="/okrcheck" method="post">
                    <input type="hidden" id="okrGoal" value="1"/>
                    <input type="hidden" id="planTime" value="1"/>
                    <input type="hidden" class="chkMonth" value="1"/>
                    <input type="hidden" id="ckmkid" name="kid" value=""/>
                    <input type="hidden" id="ckmMonth" name="checkMonth" value="" />
                    <ul>
                        <li><i><b>*</b>检查:</i><label><select name="monthcheck" id="goalLevel">
                            <option value="0">未检查</option>
                            <option value="1">完成</option>
                            <option value="-1">未完成</option>
                        </select></label></li>
                    </ul>
                    <span class="text-c"><input name="" type="button" class="gray-btn m-r20 cancelBtn" value="取消"></input><input name="" type="button" class="orange-btn saveBtn" value="保存"></input></span>
                </form>
            </div>
		<!--内容结束-->

<script src="include/js/seajs/sea.js?v=2.0" data-config="config.js?v=2.0" data-main="main.js?v=2.0" data-refresh-token=""  id="seajsFile"></script>
</body>
</html>