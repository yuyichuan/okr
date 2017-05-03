__author__='yuyc'

import PersistPool
import time
from KrUserOp import KrUserOpPy

class KrUserRelationPy:
    tableName="okr_user"

    # get users by okrid
    def getUser(self, krid):
        with PersistPool.okrPool.getconn() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT a.uid, a.kid, b.uname FROM "+
                            self.tableName+" a left join "+
                            KrUserOpPy.tableName+" b on a.uid = b.uid WHERE a.kid=%s;", (krid,))
                resultList=[]
                for record in cur:
                    item = {}
                    item['uid'] = record[0]
                    item['kid'] = record[1]
                    item['uname'] = record[2]
                    resultList.append(item)
                return resultList

    # save user okr relation
    def saveUserOkr(self, krid, userIds):
        with PersistPool.okrPool.getconn() as conn:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM "+ self.tableName +" WHERE kid=%s;", (krid,))
                for userId in userIds:
                    cur.execute("INSERT INTO "+ self.tableName+"(kid, uid, createtime) values(%s, %s, %s)", (krid, userId, time.strftime('%Y%m%d %H:%M:%S', time.localtime(time.time()))))

# for test
if __name__=='__main__':
    ur = KrUserRelationPy()
    krid= 22
    # uids=[11,22,33,44,55]
    # ur.saveUserOkr(krid,uids)
    print ur.getUser(krid)