__author__ = 'yuyc'

import bottle
import logging
import logging.config
from bottle import *
from beaker.middleware import SessionMiddleware
from decimal import Decimal
from OkrConfig import *
from l_model.KrUserOp import KrUserOpPy
from l_model.KrUserGroupOp import KrUserGroupOpPy
from l_model.KrOp import KrOpPy
from l_model import PersistPool

# session
session_opts = {
    'session.type': 'file',
    'session.cookie_expires': 31536000,
    'session.data_dir': './data',
    'session.timeout': 18000,
    'session.auto': True
}

app = SessionMiddleware(bottle.app(), session_opts)

DEPARTMENT='1'
PROJECT='2'
PERSON='3'
ADMIN='4'

O_DEPARTMENT_LEVEL=0
O_PROJECT_LEVEL=1
O_PERSON_LEVEL=2
O_PERSON_KR_LEVEL=3

# static file definition
@route('/<filename:path>')
def staticfiles(filename):
    return static_file(filename, root='./static')


@route('/')
@route('/index')
def index():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0:
        redirect('/okr', code=302)

    s['uid'] = 0
    s['uaccount'] = ''
    s['uname'] = ''
    s['groupids'] = ''

    result={}
    result['errmsg']=''
    return template("login", viewmodel=result)


@route('/logout')
def index():
    s = bottle.request.environ.get('beaker.session')
    s['uid'] = 0
    s['uaccount'] = ''
    s['uname'] = ''
    s['groupids'] = ''

    result={}
    result['errmsg']=''
    return template("login", viewmodel=result)


@route('/chpwd')
def showchpwd():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0:
        result={}
        result['uname']=s['uname']
        result['errmsg']=''

        return template("changepwd", viewmodel=result)

    redirect('/', code=302)


@route('/chpwdp', method='POST')
def chpwd():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0:
        result = {}
        result['uname'] = s['uname']
        result['errmsg'] = ''

        conn = PersistPool.okrPool.getconn()
        ok = KrUserOpPy().modifyUserPwd(conn, s['uid'], request.forms.get('oldupwd'), request.forms.get('newupwd'))
        if ok:
            result['errmsg'] = 'password is changed!'
        else:
            result['errmsg'] = 'failed to change password!'

        return template("changepwd", viewmodel=result)

    redirect('/', code=302)


@route('/login', method='POST')
def login():
    s = bottle.request.environ.get('beaker.session')
    uname = request.forms.get('uname')
    upwd = request.forms.get('upwd')

    conn = PersistPool.okrPool.getconn()

    users = KrUserOpPy().checkUserPwd(conn, uname, upwd)

    PersistPool.okrPool.putconn(conn)

    if users and len(users) > 0:
        s['uid']=users[0]['uid']
        s['uaccount']=users[0]['uaccount']
        s['uname'] =users[0]['uname']
        s['groupids'] = users[0]['groupids']
        redirect('/okr', code=302)
    else:
        s['uid']=0
        s['uaccount'] = ''
        s['uname'] = ''
        s['groupids'] = ''

    result={}
    result['errmsg']="User name error or password error."
    return template("login", viewmodel=result)


@route('/okr')
def okr():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0:
        result={}
        result['uname']=s['uname']

        if hasgroup(s['groupids'], DEPARTMENT):
            redirect('/departmentokr', code=302)
        if hasgroup(s['groupids'], PROJECT):
            redirect('/projectokr', code=302)
        if hasgroup(s['groupids'], PERSON):
            redirect('/personokr', code=302)
        if hasgroup(s['groupids'], ADMIN):
            redirect('/showdepartmentokr', code=302)

    redirect('/', code=302)

@route('/showdepartmentokr')
def showdepartmentokr():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0:
        result = {}
        initUserInfo(result, s)

        result['curid'] = s['uid']

        conn = PersistPool.okrPool.getconn()

        result['okrs'] = getokrs(conn, O_DEPARTMENT_LEVEL, 0)
        allusers = KrUserOpPy().allUsers(conn)
        result['userscount'] = len(allusers)
        result['users'] = doubleUser(allusers)
        result['krtype'] = DEPARTMENT
        result['kolevel'] = O_DEPARTMENT_LEVEL
        result['krlevel'] = O_PROJECT_LEVEL

        PersistPool.okrPool.putconn(conn)

        return template('okrshow', viewmodel=result)

    redirect('/', code=302)

@route('/departmentokr')
def departmentokr():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0:
        result={}
        initUserInfo(result, s)

        result['curid'] = s['uid']

        conn = PersistPool.okrPool.getconn()

        result['okrs'] = getokrs(conn, O_DEPARTMENT_LEVEL, 0)
        allusers = KrUserOpPy().allUsers(conn)
        result['userscount']=len(allusers)
        result['users']=doubleUser(allusers)
        result['krtype']=DEPARTMENT
        result['kolevel'] = O_DEPARTMENT_LEVEL
        result['krlevel'] = O_PROJECT_LEVEL

        PersistPool.okrPool.putconn(conn)

        return template('okr', viewmodel=result)

    redirect('/', code=302)


@route('/projectokr')
def projectokr():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0:
        result={}
        initUserInfo(result, s)
        result['curid'] = s['uid']

        conn = PersistPool.okrPool.getconn()

        result['okrs'] = getokrs(conn, O_PROJECT_LEVEL, s['uid'])
        allusers = KrUserOpPy().allUsers(conn)
        result['userscount'] = len(allusers)
        result['users'] = doubleUser(allusers)

        result['krtype'] = PROJECT
        result['kolevel'] = O_PROJECT_LEVEL
        result['krlevel'] = O_PERSON_LEVEL

        PersistPool.okrPool.putconn(conn)

        return template('projectokr', viewmodel=result)

    redirect('/', code=302)


@route('/personokr')
def personokr():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0:
        result={}
        initUserInfo(result, s)
        result['curid'] = s['uid']

        conn = PersistPool.okrPool.getconn()

        result['okrs'] = getokrs(conn, O_PERSON_LEVEL, s['uid'])
        allusers = []
        allusers.append(KrUserOpPy().getUser(conn, s['uid']))
        result['userscount'] = len(allusers)
        result['users'] = doubleUser(allusers)

        result['krtype'] = PERSON
        result['kolevel'] = O_PERSON_LEVEL
        result['krlevel'] = O_PERSON_KR_LEVEL

        PersistPool.okrPool.putconn(conn)

        return template('personokr', viewmodel=result)

    redirect('/', code=302)


@route('/startokr', method='POST')
def startokr():
    s = bottle.request.environ.get('beaker.session')
    conn = PersistPool.okrPool.getconn()
    if s and s.has_key('uid') and s['uid'] > 0:
        kid = request.forms.get('krid')
        okr = KrOpPy().getOkr(conn, kid)
        if okr['ouid'] == s['uid']:
            KrOpPy().startOkr(conn, kid)
            PersistPool.okrPool.putconn(conn)
            return '{"status":0,"errorMsg":""}'

    PersistPool.okrPool.putconn(conn)
    return '{"status":-1,"errorMsg":"no permission!"}'


@route('/complementokr', method='POST')
def complementokr():
    s = bottle.request.environ.get('beaker.session')
    conn = PersistPool.okrPool.getconn()
    if s and s.has_key('uid') and s['uid'] > 0:
        kid = request.forms.get('krid')
        okr = KrOpPy().getOkr(conn, kid)
        if okr['ouid'] == s['uid']:
            complement = request.forms.get('complete')
            KrOpPy().complementOkr(conn, kid, complement)
            PersistPool.okrPool.putconn(conn)
        return '{"status":0}'

    PersistPool.okrPool.putconn(conn)
    return '{"status":-1,"errorMsg":"no permission!"}'


@route('/saveokr', method='POST')
def saveoke():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0 :
        krtype = request.forms.get('krtype')
        isNoprev = True
        if krtype == '1' and hasgroup(s['groupids'], DEPARTMENT):
            isNoprev = False
        elif krtype == '2' and hasgroup(s['groupids'], PROJECT):
            isNoprev = False
        elif krtype == '3' and hasgroup(s['groupids'], PERSON):
            isNoprev = False

        if isNoprev:
            return '{"status":-1,"errorMsg":"no permission!"}'

        conn = PersistPool.okrPool.getconn()
        okr={}
        okr['klevel'] = request.forms.get('klevel')
        okr['pkid'] = request.forms.get('pkid')
        okr['kdesc'] = request.forms.get('kdesc')
        okr['planmonth'] = request.forms.get('planmonth')

        if krtype == '3' and okr['klevel'] == O_PERSON_KR_LEVEL:
            okr['link_users'] = s['uid']
            okr['elevel'] = KrOpPy().getOkr(conn, okr['pkid'])['elevel']
        else:
            okr['link_users'] = request.forms.get('link_users')
            okr['elevel'] = request.forms.get('elevel')

        okr['plandays'] = request.forms.get('plandays')
        okr['status'] = '-1'
        okr['ouid'] = s['uid']

        kid = request.forms.get('kid')
        if kid > '0':
            okr['kid']=kid
            KrOpPy().updateOkr(conn, okr)
        else:
            KrOpPy().newOkr(conn, okr)
        PersistPool.okrPool.putconn(conn)

        return '{"status":0}'

    redirect('/', code=302)


@route('/delokr', method='POST')
def delork():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0:
        kid = request.forms.get('krid')
        conn = PersistPool.okrPool.getconn()
        result = KrOpPy().delOkr(conn, kid)
        PersistPool.okrPool.putconn(conn)
        if result:
            return '{"status":0}'
        else:
            return '{"status":-1,"errorMsg":"failed to delete!" }'

    return '{"status":-1,"errorMsg":"no permission!"}'


@route('/users')
def users():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0 and hasgroup(s['groupids'], DEPARTMENT):
        result = {}
        initUserInfo(result, s)

        conn = PersistPool.okrPool.getconn()

        result['users']=KrUserOpPy().allUsers(conn)
        for user in result['users']:
            user['groupnames'] = groupnames(conn, user['groupids'])

        result['groups']=KrUserGroupOpPy().allGroups(conn)

        PersistPool.okrPool.putconn(conn)

        return template('users', viewmodel=result)

    redirect('/', code=302)


@route('/saveuser', method='POST')
def newuser():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0 and hasgroup(s['groupids'], DEPARTMENT):

        uid = request.forms.get('uid')
        userinfo = {}
        userinfo['uaccount'] = request.forms.get('uaccount')
        userinfo['uname'] = request.forms.get('uname')
        userinfo['upasswd']='888888'
        userinfo['groupids']=request.forms.dict['groupids']

        conn = PersistPool.okrPool.getconn()

        if uid > '0':
            userinfo['uid']=uid
            KrUserOpPy().updateUser(conn, userinfo)
        else:
            KrUserOpPy().newUser(conn, userinfo)

        PersistPool.okrPool.putconn(conn)

        return '{"status":0}'

    redirect('/', code=302)


def hasgroup(groups, expectgroup):
    grouplist = groups.split(',')
    for group in grouplist:
        if expectgroup == group:
            return True
    return False


def groupnames(conn, groupids):
    groups = KrUserGroupOpPy().allGroups(conn)
    gids = groupids.split(',')
    gnams=[]
    for gid in gids:
        for group in groups:
            if str(group['gid']) == gid:
                gnams.append(group['gname'])
                break;

    return ','.join(gnams)


def doubleUser(allusers):
    allusersRet = []
    while len(allusers)>0:
        userdouble = []
        user1 = allusers.pop()
        userdouble.append(user1)

        if len(allusers) > 0:
            user2 = allusers.pop()
            userdouble.append(user2)

        allusersRet.append(userdouble)

    return allusersRet


def formatlinkusers(okrlist):
    for okr in okrlist:
        okr['link_user_ids'] = reduce(lambda x, y: (x + str(y['uid'])) if (x == "") else(x + "," + str(y['uid'])),okr['link_users'], "")
        okr['link_user_names'] = reduce(lambda x, y: (x + str(y['uname'])) if (x == "") else(x + "," + str(y['uname'])), okr['link_users'], "")

    return


def getokrs(conn, okrlevel, uid):
    okrs = KrOpPy().allOkr(conn, okrlevel, uid)
    formatlinkusers(okrs)

    for okr in okrs:
        getSubOkrs(conn, okr)

    return okrs


# 1--------
# 2--------
#    3-----
#    4-----
#    5-----
#       6-- plandays start here
#       7--
#         8     complement start here
#         9
def getSubOkrs(conn, okr):
    subokrs = KrOpPy().allSubOkr(conn, okr['kid'])
    formatlinkusers(subokrs)
    okr['krs'] = subokrs
    if len(subokrs) > 0:
        for subokr in subokrs:
            getSubOkrs(conn, subokr)

        stime=reduce(lambda x,y:(y['stime'] if (x is None or (y['stime'] is not None and y['stime'] < x)) else x), subokrs, None)
        okr['stime'] = stime

        complement=reduce(lambda x,y:{'plandays':x['plandays'] + y['plandays'], 'cmpdays':x['cmpdays'] + int(y['complement']) * y['plandays'] / 100 }, subokrs, {'plandays':Decimal('0.0'), 'cmpdays':Decimal('0.0')})

        if int(okr['klevel']) < O_PERSON_LEVEL:
            okr['plandays'] = complement['plandays']

        okr['complement'] = int(complement['cmpdays'] * 100 / complement['plandays'])
    return

def initUserInfo(result, s):
    result['uname'] = s['uname']
    result['umage'] = hasgroup(s['groupids'], DEPARTMENT)
    result['uproject'] = hasgroup(s['groupids'], PROJECT)
    result['uperson'] = hasgroup(s['groupids'], PERSON)
    result['uadmin'] = hasgroup(s['groupids'], ADMIN)
    return


if __name__ == '__main__':
    logging.config.fileConfig(LOG_CONFIG)
    run(app=app, host=HTTP_HOST, port=HTTP_PORT, reloader=True)
