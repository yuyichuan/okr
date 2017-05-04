__author__ = 'yuyc'

import bottle
import logging
import logging.config
from bottle import *
from beaker.middleware import SessionMiddleware
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

O_DEPARTMENT_LEVEL=0
O_PROJECT_LEVEL=1
O_PERSON_LEVEL=2

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

    redirect('/', code=302)

@route('/departmentokr')
def departmentokr():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0:
        result={}
        result['uname']=s['uname']
        result['umage']=hasgroup(s['groupids'], DEPARTMENT)
        result['uproject'] = hasgroup(s['groupids'], PROJECT)
        result['uperson'] = hasgroup(s['groupids'], PERSON)

        conn = PersistPool.okrPool.getconn()

        result['okrs'] = getokrs(conn, O_DEPARTMENT_LEVEL)
        result['users']=doubleUser(KrUserOpPy().allUsers(conn))

        PersistPool.okrPool.putconn(conn)

        return template('departmentokr', viewmodel=result)

    redirect('/', code=302)

@route('/projectokr')
def projectokr():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0:
        result={}
        result['uname']=s['uname']
        result['umage']=hasgroup(s['groupids'], DEPARTMENT)
        result['uproject'] = hasgroup(s['groupids'], PROJECT)
        result['uperson'] = hasgroup(s['groupids'], PERSON)

        conn = PersistPool.okrPool.getconn()

        result['okrs'] = getokrs(conn, O_PROJECT_LEVEL)
        result['users'] = doubleUser(KrUserOpPy.allUsers(conn))

        PersistPool.okrPool.putconn(conn)

        return template('projectokr', viewmodel=result)

    redirect('/', code=302)

@route('/personokr')
def personokr():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0:
        result={}
        result['uname']=s['uname']
        result['umage']=hasgroup(s['groupids'], DEPARTMENT)
        result['uproject'] = hasgroup(s['groupids'], PROJECT)
        result['uperson'] = hasgroup(s['groupids'], PERSON)

        conn = PersistPool.okrPool.getconn()

        result['okrs'] = getokrs(conn, O_PERSON_LEVEL)
        result['users'] = doubleUser(KrUserOpPy.allUsers(conn))

        PersistPool.okrPool.putconn(conn)

        return template('personokr', viewmodel=result)

    redirect('/', code=302)

@route('/users')
def users():
    s = bottle.request.environ.get('beaker.session')
    if s and s.has_key('uid') and s['uid'] > 0 and hasgroup(s['groupids'], DEPARTMENT):
        result = {}
        result['uname'] = s['uname']
        result['umage'] = hasgroup(s['groupids'], DEPARTMENT)
        result['uproject'] = hasgroup(s['groupids'], PROJECT)
        result['uperson'] = hasgroup(s['groupids'], PERSON)

        conn = PersistPool.okrPool.getconn()

        result['users']=KrUserOpPy().allUsers(conn)
        for user in result['users']:
            user['groupnames'] = groupnames(user['groupids'])

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
        user2 = allusers.pop()
        if user1:
            userdouble.append(user1)
        if user2:
            userdouble.append(user2)

        allusersRet.append(userdouble)

    return allusersRet

def formatlinkusers(okrlist):
    for okr in okrlist:
        okr['link_user_ids'] = reduce(lambda x, y: (x + str(y['uid'])) if (x == "") else(x + "," + str(y['uid'])),okr['link_users'], "")
        okr['link_user_names'] = reduce(lambda x, y: (x + str(y['uname'])) if (x == "") else(x + "," + str(y['uname'])), okr['link_users'], "")

def getokrs(conn, okrlevel):
    okrs = KrOpPy().allOkr(conn, okrlevel)
    formatlinkusers(okrs)

    for okr in okrs:
        subokrs = KrOpPy().allSubOkr(conn, okr['kid'])
        formatlinkusers(subokrs)
        okr['krs'] = subokrs

    return okrs


if __name__ == '__main__':
    logging.config.fileConfig(LOG_CONFIG)
    run(app=app, host=HTTP_HOST, port=HTTP_PORT, reloader=True)
