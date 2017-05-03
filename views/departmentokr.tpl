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
                <span>你好，<cite class="m-r10">{{viewmodel['uname']}}</cite><cite class="m-r10">|</cite><cite class="m-r10"><a href="#">修改密码</a></cite><cite class=" m-r10">|</cite><cite><a href="javascript:;" url="/logout" id="logoutBtn">退出</a></cite></span>
			</div>
            <nav>
            	<div class="w1k middle">
            	    %if viewmodel['umage']:
                	<span class="text-c right-brd"><a href="" class='now nav'>部门OKR管理</a></span>
                	%end
                	%if viewmodel['uproject']:
                	<span class="text-c right-brd"><a href="/projectokr" class='nav'>项目OKR管理</a></span>
                	%end
                	% if viewmodel['uperson']:
                	<span class="text-c right-brd"><a href="/personokr" class='nav'>个人OKR管理</a></span>
                	% end
                	% if viewmodel['umage']:
                	<span class="text-c"><a href="/users" class="nav">开户</a></span>
                	% end
                </div>
            </nav>
        </header>

        <!--内容开始-->
        <input type="hidden" name="dispatcher" id="dispatcher" value="okr-manage" >
        <div class="w1k middle m-t30">
        	<div class="cnt-title"><b>OKR管理</b><button class="orange-btn f-r" id="addO" title="新增O">新增<b class="o-font">O</b></button></div>
        </div>
            <div class="table-div okr-gl">
                <table class="m-t15">
                	<thead>
                    	<th width="11%">项目O</th>
                        <th width="29%">项目KR</th>
                        <th width="11%">参与人员</th>
                        <th width="8%">计划月份</th>
                        <th width="6%">计划用时(天)</th>
                        <th width="4%">难度</th>
                        <th width="8%">操作</th>
                    </thead>
                    <tbody>
                    	<tr>
                        	<td colspan="4" class="krCnt"><a href="#" class="clo-op-clo f-l"></a><div class="text-hidden w1120"><a href="#">这里超长就省略掉了 但可以点击查看详细</a></div></td>
                            <td class="krPeople" peopleIds="1,2,5"><div class="text-hidden w180"><a href="#">一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四</a></div></td>
                            <td class="krMonth" monthIds="1,2,5"><div class="text-hidden w120"><a href="#">1，2，3，4，1，2，3，4</a></div></td>
                            <td class="krTime">123</td>
                            <td class="krLevel">5</td>
                            <td><a href="javascript:;" class="m-r10 editO" data-sign="editO">修改</a><a href="javascript:;" class="m-r10 delBtn">删除</a><a href="javascript:;" class="addBranchKR" title="新增部门KR">新增KR</a></td>
                        </tr>
                        <tr>
                        	<td></td>
                            <td colspan="3" class="krCnt"><a href="#" class="clo-op-op f-l"></a><div class="text-hidden w910"><a href="#">一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四</a></div></td>
                            <td class="krPeople" peopleIds="1,2,9"><div class="text-hidden w180"><a href="#">一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四</a></div></td>
                            <td class="krMonth" monthIds="1,2,5,6,8"><div class="text-hidden w120"><a href="#">1，2，3，4，1，2，3，4</a></div></td>
                            <td class="krTime">123</td>
                            <td class="krLevel">5</td>
                            <td><a href="javascript:;" class="m-r10 editBranchKR" data-sign="editBranchKR">修改</a><a href="javascript:;" class="m-r10 delBtn">删除</a><a class="addItemKR" href="javascript:;" title="新增项目KR">新增KR</a></td>
                        </tr>
                        <tr>
                        	<td></td>
                            <td></td>
                            <td colspan="2" class="krCnt"><a href="#" class="clo-op-op f-l"></a><div class="text-hidden w690"><a href="#">一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四</a></div></td>
                            <td class="krPeople" peopleIds="1,2,5,7"><div class="text-hidden w180"><a href="javascript:;">一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四</a></div></td>
                            <td class="krMonth" monthIds="1,2,7"><div class="text-hidden w120"><a href="javascript:;">1，2，3，4，1，2，3，4</a></div></td>
                            <td class="krTime">123</td>
                            <td class="krLevel">5</td>
                            <td><a href="javascript:;" class="m-r10 editItemKR" data-sign="editItemKR">修改</a><a href="javascript:;" class="m-r10 delBtn">删除</a><a href="javascript:;" class="addPersonKR" title="新增个人KR">新增KR</a></td>
                        </tr>
                        <tr>
                        	<td></td>
                            <td></td>
                            <td></td>
                            <td class="krCnt"><div class="text-hidden w500"><a href="#">一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四</a></div></td>
                            <td class="krPeople" peopleIds="1,2,5,9"><div class="text-hidden w180"><a href="#">一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四一二三四</a></div></td>
                            <td class="krMonth" monthIds="1,2,10"><div class="text-hidden w120"><a href="#">1，2，3，4，1，2，3，4</a></div></td>
                            <td class="krTime">123</td>
                            <td class="krLevel">5</td>
                            <td><a href="#" class="m-r10 editPersonKR" data-sign="editPersonKR">修改</a><a href="#" class="m-r10 delBtn">删除</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        <div class="add-kh middle add-o" style="display: none;" id="newODialog">
            <form id="okrForm" action="" method="post">
                <input type="hidden" id="checkedMonths" value="" name="checkedMonth">
                <ul>
                    <li id="krDes"><i>部门<b class="o-font">O</b>:</i><span class="okr-show">部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门部门</span></li>
                    <li id="krInput"><i><b>*</b>部门<b class="o-font">O</b>:<br/><em class="jishu">0/300</em></i><label><textarea name="goal" cols="" rows="" class="text-o" id="okrGoal"></textarea></label></li>
                    <li><i><b>*</b>参与人员:</i><label><input name="" type="text" placeholder="点击选择" id="participant" readonly><input type="hidden" id="checkedIds" name=""></label></li>
                    <li><i><b>*</b>计划月份:</i><div class="choose-m"><label class="m-r20"><input name="" type="checkbox" value="1" class="chkMonth">01月</label><label class="m-r20"><input name="" type="checkbox" value="2" class="chkMonth">02月</label><label class="m-r20"><input name="" type="checkbox" value="3" class="chkMonth">03月</label><label class="m-r20"><input name="" type="checkbox" value="4" class="chkMonth">04月</label><label class="m-r20"><input name="" type="checkbox" value="5" class="chkMonth">05月</label><label class="m-r20"><input name="" type="checkbox" value="6" class="chkMonth">06月</label><label class="m-r20"><input name="" type="checkbox" value="7" class="chkMonth">07月</label><label class="m-r20"><input name="" type="checkbox" value="8" class="chkMonth">08月</label><label class="m-r20"><input name="" type="checkbox" value="9" class="chkMonth">09月</label><label class="m-r20"><input name="" type="checkbox" value="10" class="chkMonth">10月</label><label class="m-r20"><input name="" type="checkbox" value="11" class="chkMonth">11月</label><label class="m-r20"><input name="" type="checkbox" value="12" class="chkMonth">12月</label></div></li>
                    <li><i><b>*</b>计划用时:</i><label><input name="planTime" type="text" id="planTime">&nbsp;天</label></li>
                    <li><i><b>*</b>难度:</i><label><select name="level" id="goalLevel">
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
            <div class="table-top-seach">
                <input name="" type="text" class="f-l" placeholder="ID/姓名"><a href="#"></a>
                <input type="hidden" name="" id="financialCheckedIds">
                <span class="f-r m-r20"><input name="" type="checkbox" class="showCheck">仅显示选择项</span>
            </div>
            <div class="choose-people">
                <div class="all-choose"><input name="" type="checkbox" value="" id="checkAll">全选<cite>（总数：100</cite><cite>已选：<span id="checkedNum">100</span>）</cite></div>
                <div class="table-div">
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td><input name="" type="checkbox" value="1" class="checkItem">周吴郑王</td>
                            <td><input name="" type="checkbox" value="2" class="checkItem">周吴郑王</td>
                        </tr>
                        <tr>
                            <td><input name="" type="checkbox" value="3" class="checkItem">周吴郑王</td>
                            <td><input name="" type="checkbox" value="4" class="checkItem">周吴郑王</td>
                        </tr>
                        <tr>
                            <td><input name="" type="checkbox" value="5" class="checkItem">周吴郑王</td>
                            <td><input name="" type="checkbox" value="6" class="checkItem">周吴郑王</td>
                        </tr>
                        <tr>
                            <td><input name="" type="checkbox" value="7" class="checkItem">周吴郑王</td>
                            <td><input name="" type="checkbox" value="8" class="checkItem">周吴郑王</td>
                        </tr>
                        <tr>
                            <td><input name="" type="checkbox" value="9" class="checkItem">周吴郑王</td>
                            <td><input name="" type="checkbox" value="11" class="checkItem">周吴郑王</td>
                        </tr>
                        <tr>
                            <td><input name="" type="checkbox" value="12" class="checkItem">周吴郑王</td>
                            <td><input name="" type="checkbox" value="13" class="checkItem">周吴郑王</td>
                        </tr>
                        <tr>
                            <td><input name="" type="checkbox" value="14" class="checkItem">周吴郑王</td>
                            <td><input name="" type="checkbox" value="15" class="checkItem">周吴郑王</td>
                        </tr>
                        <tr>
                            <td><input name="" type="checkbox" value="16" class="checkItem">周吴郑王</td>
                            <td><input name="" type="checkbox" value="17" class="checkItem">周吴郑王</td>
                        </tr>
                        <tr>
                            <td><input name="" type="checkbox" value="18" class="checkItem">周吴郑王</td>
                            <td><input name="" type="checkbox" value="19" class="checkItem">周吴郑王</td>
                        </tr>
                    </table>
                </div>
            </div>
            <span class="text-c"><input name="" type="button" class="gray-btn m-r20 staffCancelBtn" value="取消"></input><input name="" type="button" class="orange-btn sureBtn" value="确定"></input></span>
        </div>
		<!--内容结束-->
        
        
<!-- <script src="js/seajs/base.js?v=2.0" id="seajsFile"></script> -->
<script src="include/js/seajs/sea.js?v=2.0" data-config="config.js?v=2.0" data-main="main.js?v=2.0" data-refresh-token=""  id="seajsFile"></script>
</body>
</html>