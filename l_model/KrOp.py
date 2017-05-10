

__author__ = 'yuyc'

import time
from KrMonthOp import KrMonthPy
from KrUserRelation import KrUserRelationPy
from KrLog import KrOpLogPy


class KrOpPy:
    tableName = 'okr'

    # get cur time
    def curTime(self):
        return time.strftime('%Y%m%d %H:%M:%S', time.localtime(time.time()))

    # construct okr by record
    def constructOkr(self, conn, row):
        item = {}
        item['kid'] = row[0]
        item['klevel'] = row[1]
        item['pkid'] = row[2]
        item['kdesc'] = row[3]
        item['planmonth'] = KrMonthPy().getMonth(conn, item['kid'])
        item['link_users'] = KrUserRelationPy().getUser(conn, item['kid'])
        item['plandays'] = row[6]
        item['elevel'] = row[7]
        item['stime'] = None if row[8] is None else '%04d'%row[8].year+'%02d'%row[8].month+'%02d'%row[8].day
        item['etime'] = None if row[9] is None else '%04d'%row[9].year+'%02d'%row[9].month+'%02d'%row[9].day
        item['status'] = row[10]
        item['createtime'] = row[11]
        item['updatetime'] = row[12]
        item['ouid'] = row[13]
        item['complement'] = row[14]
        return item

    # get all Okr
    def allOkr(self, conn, klevel, uid, month):
        with conn:
            with conn.cursor() as cur:
                if uid > 0:
                    if month > 0:
                        cur.execute(
                            "SELECT a.* FROM " + self.tableName + " a JOIN okr_user b ON a.kid=b.kid  JOIN okr_month c ON a.kid=c.kid WHERE a.klevel=%s and b.uid = %s and c.omonth =%s;",
                            (klevel, uid, month))
                    else:
                        cur.execute("SELECT a.* FROM "+ self.tableName + " a JOIN okr_user b on a.kid=b.kid WHERE a.klevel=%s and b.uid = %s;", (klevel, uid))
                else:
                    if month > 0:
                        cur.execute(
                            "SELECT a.* FROM " + self.tableName + " a JOIN okr_month b on a.kid=b.kid WHERE a.klevel=%s and b.omonth = %s;",
                            (klevel, month))
                    else:
                        cur.execute("SELECT * FROM " + self.tableName + " WHERE klevel=%s;", (klevel,))

                resultList = []
                for row in cur:
                    resultList.append(self.constructOkr(conn, row))
                return resultList

    # get all sub Okr
    def allSubOkr(self, conn, pkid, month):
        with conn:
            with conn.cursor() as cur:
                if month > 0:
                    cur.execute("SELECT a.* FROM " + self.tableName + " a JOIN okr_month b on a.kid=b.kid WHERE a.pkid=%s and b.omonth=%s ORDER BY a.pkid, a.kid;", (pkid, month))
                else:
                    cur.execute("SELECT * FROM " + self.tableName + " WHERE pkid=%s ORDER BY pkid, kid;", (pkid,))

                resultList = []
                for row in cur:
                    resultList.append(self.constructOkr(conn, row))
                return resultList

    # get one Okr
    def getOkr(self, conn, krid):
        with conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM " + self.tableName + " WHERE kid=%s;", (krid,))
                return self.constructOkr(conn, cur.fetchone())

    # save okr info into database
    def newOkr(self, conn, okr):
        with conn:
            with conn.cursor() as cur:
                curtime = self.curTime()
                cur.execute("SELECT NEXTVAL('okr_kid_seq')")
                kid = cur.fetchone()[0]
                cur.execute("INSERT INTO " + self.tableName
                            + "(kid, klevel,pkid,kdesc,planmonth,link_users,plandays,elevel,status,createtime,updatetime,ouid) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                            (kid,
                             okr['klevel'],
                             okr['pkid'],
                             okr['kdesc'],
                             okr['planmonth'],
                             okr['link_users'],
                             okr['plandays'],
                             okr['elevel'],
                             okr['status'],
                             curtime,
                             curtime,
                             okr['ouid']))
                KrMonthPy().saveMonthsOkr(conn, kid, okr['planmonth'].split(","))
                KrUserRelationPy().saveUserOkr(conn, kid, okr['link_users'].split(","))
                return kid

    # update okr info
    def updateOkr(self, conn, okr):
        with conn:
            with conn.cursor() as cur:
                curtime = self.curTime()

                # log info before modified
                KrOpLogPy().newOkrLog(conn, self.getOkr(conn, okr['kid']))

                KrMonthPy().saveMonthsOkr(conn, okr['kid'], okr['planmonth'].split(","))

                KrUserRelationPy().saveUserOkr(conn, okr['kid'], okr['link_users'].split(","))

                # save the original okr info
                cur.execute("UPDATE "+ self.tableName +" SET klevel=%s, pkid=%s, kdesc=%s, planmonth=%s, link_users=%s, plandays=%s, elevel=%s, updatetime=%s, ouid=%s WHERE kid=%s;",
                            (okr['klevel'],
                             okr['pkid'],
                             okr['kdesc'],
                             okr['planmonth'],
                             okr['link_users'],
                             okr['plandays'],
                             okr['elevel'],
                             curtime,
                             okr['ouid'],
                             okr['kid']))

    # delete okr
    def delOkr(self, conn, okrid):
        with conn:
            with conn.cursor() as cur:

                # do not delete with sub okr
                subs = self.allSubOkr(conn, okrid)
                if len(subs) > 0:
                    return False

                curOkr = self.getOkr(conn, okrid)
                if curOkr['status'] == -1:
                    # log info before modified
                    KrOpLogPy().newOkrLog(conn, self.getOkr(conn, okrid))

                    KrUserRelationPy().delUserOkr(conn, okrid)
                    KrMonthPy().delMonthsOkr(conn, okrid)

                    # delete the okr info
                    cur.execute("delete from " + self.tableName + " WHERE kid=%s;", (okrid,))

                    return True

                return False


    # start okr
    def startOkr(self, conn, okrid):
        with conn:
            with conn.cursor() as cur:
                curOkr = self.getOkr(conn, okrid)
                # log info before modified
                KrOpLogPy().newOkrLog(conn, curOkr)
                curtime = self.curTime()
                if curOkr['pkid'] != 0:
                    self.startOkr(conn, curOkr['pkid'])

                cur.execute("UPDATE " + self.tableName + " SET status=0, complement=0, stime=%s, updatetime=%s where kid=%s and status=-1;", (curtime, curtime, okrid))

    # complementOrk
    def complementOkr(self, conn, okrid, complement):
        with conn:
            with conn.cursor() as cur:
                # log info before modified
                KrOpLogPy().newOkrLog(conn, self.getOkr(conn, okrid))
                curtime = self.curTime()

                status = 0
                if int(complement) > 100:
                    complement = 100
                if int(complement) == 100:
                    status = 1

                if status == 0:
                    cur.execute(
                        "UPDATE " + self.tableName + " SET updatetime=%s, complement=%s WHERE kid=%s AND status=0;", (curtime, complement, okrid))
                else:
                    cur.execute(
                        "UPDATE " + self.tableName + " SET status=1, etime=%s, updatetime=%s, complement=%s WHERE kid=%s AND status=0;",
                        (curtime, curtime, complement, okrid))
# for test
if __name__ == '__main__':
    okrOp = KrOpPy()
    okr={}
    okr['klevel']=0
    okr['pkid']=0
    okr['kdesc']='new okr object'
    okr['planmonth']="1,2,3"
    okr['link_users']="1,2,3,4"
    okr['plandays']=3
    okr['elevel']=2
    okr['stime']=okrOp.curTime()
    okr['etime']=okrOp.curTime()
    okr['status']=0
    okr['ouid']=1

    # new okr
    kid = okrOp.newOkr(okr)
    okr['pkid']=kid
    okr['kdesc']='new sub okr object'

    # new sub okr
    okrOp.newOkr(okr)

    # get all okr level 0
    print okrOp.allOkr(0)

    # get all sub okr which pkid is 1
    print okrOp.allSubOkr([kid])

    # update okr
    okrFromDb=okrOp.getOkr(kid)
    print okrFromDb
    okrFromDb['kdesc']=' update ' + okrFromDb['kdesc']
    okrOp.updateOkr(okrFromDb)

    print okrOp.getOkr(kid)





