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
                	% if viewmodel['umage']:
                	<span class="text-c"><a href="/showdepartmentokr" class="now nav">部门OKR展示</a></span>
                	% end
                	% if viewmodel['uadmin']:
                	<span class="text-c"><a href="/users" class="nav">用户管理</a></span>
                	% end
                </div>
            </nav>
        </header>

        <!--内容开始-->
        <input type="hidden" name="dispatcher" id="dispatcher" data-urlAfterSave="/showdepartmentokr" value="okr-manage">
        <div class="middle m-t30 cnt-title">
        	<div class="w1k middle"><b>OKR管理</b>&nbsp;&nbsp;&nbsp;&nbsp;<select id="selectmonth">
        	        <option value="">请选择月度</option>
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
                	    <th width="5%">ID</th>
                    	<th width="5%">部门O</th>
                        <th width="5%">项目O</th>
                        <th width="5%">个人O</th>
                        <th width="33%">个人KR</th>
                        <th width="12%">参与人员</th>
                        <th width="7%">计划月份</th>
                        <th width="7%">计划人日</th>
                        <th width="4%">难度</th>
                        <th width="6%">完成(%)</th>
                        <th width="11%">开始日期</th>
                    </thead>
                    <tbody>
                    % for depto in viewmodel['okrs']:
                    	<tr id="{{depto['kid']}}">
                    	    <td>{{depto['kid']}}</td>
                        	<td colspan="4" class="krCnt"><a href="javascript:;" class="switchIcon clo-op-op f-l" subClass="{{depto['kid']}}"></a><div class="text-hidden w400"><a href="javascript:;" class="showDetail">{{depto['kdesc']}}</a></div></td>
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
                        </tr>
                        % for deptkr in depto['krs']:
                        <tr id="{{deptkr['kid']}}" class="{{depto['kid']}}"  parentId="{{deptkr['pkid']}}">
                        	<td></td>
                        	<td>{{deptkr['kid']}}</td>
                            <td colspan="3" class="krCnt"><a href="javascript:;" class="switchIcon clo-op-op f-l" subClass="{{deptkr['kid']}}"></a><div class="text-hidden w300"><a href="javascript:;" class="showDetail">{{deptkr['kdesc']}}</a></div></td>
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
                        </tr>
                            % for deptkrr in deptkr['krs']:
                        <tr id="{{deptkrr['kid']}}" class="{{depto['kid']}} {{deptkr['kid']}}"  parentId="{{deptkrr['pkid']}}">
                        	<td></td>
                        	<td></td>
                        	<td>{{deptkrr['kid']}}</td>
                            <td colspan="2" class="krCnt"><a href="javascript:;" class="switchIcon clo-op-op f-l" subClass="{{deptkrr['kid']}}"></a><div class="text-hidden w180"><a href="javascript:;" class="showDetail">{{deptkrr['kdesc']}}</a></div></td>
                            <td class="krPeople" peopleIds="{{deptkrr['link_user_ids']}}"><div class="text-hidden w180"><a href="javascript:;" class="showDetail">{{deptkrr['link_user_names']}}</a></div></td>
                            <td class="krMonth" monthIds="{{deptkrr['planmonth']}}"><div class="text-hidden w120"><a href="javascript:;" class="showDetail">{{deptkrr['planmonth']}}</a></div></td>
                            <td class="krTime">{{deptkrr['plandays']}}</td>
                            <td class="krLevel">{{str(deptkrr['elevel'])}}</td>
                            <td class="krComplete">{{deptkrr['complement']}}</td>
                            <td>
                             % if deptkrr['stime'] is not None:
                                {{deptkrr['stime']}}
                            % end
                            </td>
                        </tr>
                                % for deptkrrr in deptkrr['krs']:
                        <tr id="{{deptkrrr['kid']}}" class="{{depto['kid']}} {{deptkr['kid']}} {{deptkrr['kid']}}"  parentId="{{deptkrrr['pkid']}}">
                        	<td></td>
                        	<td></td>
                        	<td></td>
                        	<td>{{deptkrrr['kid']}}</td>
                            <td class="krCnt"><div class="text-hidden w120"><a href="javascript:;" class="showDetail">{{deptkrrr['kdesc']}}</a></div></td>
                            <td class="krPeople" peopleIds="{{deptkrrr['link_user_ids']}}"><div class="text-hidden w180"><a href="javascript:;" class="showDetail">{{deptkrrr['link_user_names']}}</a></div></td>
                            <td class="krMonth" monthIds="{{deptkrrr['planmonth']}}"><div class="text-hidden w120"><a href="javascript:;" class="showDetail">{{deptkrrr['planmonth']}}</a></div></td>
                            <td class="krTime">{{deptkrrr['plandays']}}</td>
                            <td class="krLevel">{{str(deptkrrr['elevel'])}}</td>
                            <td class="krComplete">{{deptkrrr['complement']}}</td>
                            <td>
                             % if deptkrrr['stime'] is not None:
                                {{deptkrrr['stime']}}
                            % end
                            </td>
                        </tr>
                                % end
                            % end
                        % end
                    % end
                    </tbody>
                </table>
            </div>
		<!--内容结束-->

<script src="include/js/seajs/sea.js?v=2.0" data-config="config.js?v=2.0" data-main="main.js?v=2.0" data-refresh-token=""  id="seajsFile"></script>
</body>
</html>