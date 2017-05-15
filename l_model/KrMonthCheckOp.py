__author__='yuyc'

import time

class KrMonthCheckPy:
    tableName='okr_month_check'

    def getMonth(self, conn, krid, omonth):
        with conn:
            with conn.cursor() as cur:
                cur.execute("SELECT status FROM " + self.tableName + " WHERE kid=%s AND omonth=%s;", (krid, omonth))
                for record in cur:
                    return str(record[0])
                return '0'

    def saveMonthCheckOkr(self, conn, krid, omonth, status, uid):
        with conn:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM " + self.tableName + " WHERE kid=%s AND omonth=%s", (krid, omonth))
                cur.execute("INSERT INTO " + self.tableName +"(kid, omonth, status, uid, createtime) VALUES(%s, %s, %s, %s, %s);",
                            (krid, omonth, status, uid, time.strftime('%Y%m%d %H:%M:%S', time.localtime(time.time()))))