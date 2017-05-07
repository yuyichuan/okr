__author__ = 'yuyc'

import time
from KrMonthOp import KrMonthPy
from KrUserRelation import KrUserRelationPy
from KrUserOp import KrUserOpPy


class KrOpLogPy:
    tableName = 'okr_log'

    # get cur time
    def curTime(self):
        return time.strftime('%Y%m%d %H:%M:%S', time.localtime(time.time()))

    # construct okrLog by record
    def constructOkrLog(self, row):
        item = {}
        item['k_logid'] = row[0]
        item['kid'] = row[1]
        item['klevel'] = row[2]
        item['pkid'] = row[3]
        item['kdesc'] = row[4]
        item['planmonth'] = KrMonthPy().getMonth(item['kid'])
        item['link_users'] = KrUserRelationPy().getUser(item['kid'])
        item['plandays'] = row[7]
        item['elevel'] = row[8]
        item['stime'] = row[9]
        item['etime'] = row[10]
        item['status'] = row[11]
        item['createtime'] = row[12]
        item['ouid'] = KrUserOpPy().getUser(row[13])
        item['complement'] = row[14]
        return item

    # get all OkrLog by kid
    def allOkrLog(self, conn, kid):
        with conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM " + self.tableName + " WHERE kid=%s order by createtime desc;", (kid,))

                resultList = []
                for row in cur:
                    resultList.append(self.constructOkrLog(row))
                return resultList

    # save okrLog info into database
    def newOkrLog(self, conn, okr):
        with conn:
            with conn.cursor() as cur:
                curtime = self.curTime()
                cur.execute("INSERT INTO " + self.tableName
                            + "(kid, klevel,pkid,kdesc,planmonth,link_users,plandays,elevel,stime,etime,status,createtime,ouid, complement) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                            (okr['kid'],
                             okr['klevel'],
                             okr['pkid'],
                             okr['kdesc'],
                             okr['planmonth'],
                             reduce(lambda x, y: (x + str(y['uid'])) if (x == "") else (x + "," + str(y['uid'])), okr['link_users'], ""),
                             okr['plandays'],
                             okr['elevel'],
                             okr['stime'],
                             okr['etime'],
                             okr['status'],
                             curtime,
                             okr['ouid']),
                             okr['complement']
                            )
                return


# for test
if __name__ == '__main__':
    okrLogOp = KrOpLogPy()
    # query okr logs
    print okrLogOp.allOkrLog(63)