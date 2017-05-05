__author__ = 'yuyc'

import PersistPool
import time


class KrUserOpPy:
    tableName = 'u_user'

    # get all users
    def allUsers(self, conn):
        with conn:
            with conn.cursor() as cur:
                cur.execute("SELECT uid, uaccount, uname, groupids from " + self.tableName + " order by uid;")
                resultList = []
                for row in cur:
                    item = {}
                    item['uid'] = row[0]
                    item['uaccount'] = row[1]
                    item['uname'] = row[2]
                    item['groupids'] = row[3]
                    resultList.append(item)
                return resultList

    # get one user
    def getUser(self, conn, uid):
        with conn:
            with conn.cursor() as cur:
                cur.execute("SELECT uid, uaccount, uname, groupids from " + self.tableName + " where uid=%s;", (uid,))
                record = cur.fetchone()
                item = {}
                item['uid'] = record[0]
                item['uaccount'] = record[1]
                item['uname'] = record[2]
                item['groupids'] = record[3]
                return item

    # save user into db
    def newUser(self, conn, userinfo):
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO " + self.tableName + "(uaccount, uname, upasswd, groupids, createtime) values(%s, %s, %s, %s, %s);",
                    (userinfo['uaccount'], userinfo['uname'], self.transforPwd(userinfo['upasswd']),
                     ",".join(userinfo['groupids']), time.strftime('%Y%m%d %H:%M:%S', time.localtime(time.time()))))
        return

    # update an user info
    def updateUser(self, conn, userinfo):
        with conn:
            with conn.cursor() as cur:
                cur.execute("UPDATE " + self.tableName + " SET uname=%s, groupids=%s WHERE uid=%s;",
                            (userinfo['uname'], ",".join(userinfo['groupids']), userinfo['uid']))
                return

    # user pwd validate
    def checkUserPwd(self, conn, account, passwd):
        with conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM " + self.tableName + " WHERE uaccount=%s and upasswd=%s;",
                            (account, self.transforPwd(passwd)))
                resultList = []
                for record in cur:
                    item = {}
                    item['uid'] = record[0]
                    item['uaccount'] = record[1]
                    item['uname'] = record[2]
                    item['groupids'] = record[4]
                    resultList.append(item)
                return resultList

    # modify pwd
    def modifyUserPwd(self, conn, uid, oldpasswd, newpasswd):
        with conn:
            with conn.cursor() as cur:
                cur.execute("UPDATE " + self.tableName + " SET upasswd=%s WHERE uid=%s and upasswd=%s;",
                            (self.transforPwd(newpasswd), uid, self.transforPwd(oldpasswd)))
                return cur.rowcount == 1

    # password encrypt
    def transforPwd(self, passwd):
        retList = []
        for ch in passwd:
            chi = ord(ch)
            chi += 1
            retList.append(chr(chi))
        return "".join(retList)


# for test
if __name__ == '__main__':
    conn = PersistPool.okrPool.getconn()
    urop = KrUserOpPy()
    groupids = ['1', '2']
    userinfo = {}
    userinfo['uaccount'] = 'yuyc'
    userinfo['uname'] = 'yuyc'
    userinfo['upasswd'] = 'yuyctest@135'
    userinfo['groupids'] = groupids

    # print urop.transforPwd('test@123')
    print urop.newUser(conn, userinfo)
    #print urop.checkUserPwd(userinfo['uaccount'], userinfo['upasswd'])
    #print urop.checkUserPwd(userinfo['uaccount'], '123456')
    #print urop.modifyUserPwd(1, 'yycc@123$%', 'yuyctest@135')
    #print urop.getUser(1)
    #print urop.allUsers()
