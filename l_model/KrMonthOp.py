__author__='yuyc'

import time

class KrMonthPy:
    tableName="okr_month"

    # get months by okrid
    def getMonth(self, conn, krid):
        with conn:
            with conn.cursor() as cur:
                cur.execute("SELECT kid, omonth FROM "+
                            self.tableName+" WHERE kid=%s order by omonth;", (krid,))
                resultList=[]
                for record in cur:
                    resultList.append(str(record[1]))
                return ",".join(resultList)

    # save months okr relation
    def saveMonthsOkr(self, conn, krid, omonths):
        with conn:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM "+ self.tableName +" WHERE kid=%s;", (krid,))
                for omonth in omonths:
                    cur.execute("INSERT INTO "+ self.tableName+"(kid, omonth, createtime) values(%s, %s, %s)", (krid, omonth, time.strftime('%Y%m%d %H:%M:%S', time.localtime(time.time()))))

    def delMonthsOkr(self, conn, krid):
        with conn:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM "+ self.tableName +" WHERE kid=%s;", (krid,))

# for test
if __name__=='__main__':
    mon = KrMonthPy()
    krid= 22
    months=[1,2,3,4,5]
    #mon.saveMonthsOkr(krid,months)
    print mon.getMonth(krid)