__author__ = 'yuyc'

import PersistPool


class KrUserGroupOpPy:
    table_name = "u_group"

    def allGroups(self, conn):
        with conn:
            with conn.cursor() as cur:
                resultList = []
                cur.execute("SELECT gid, gname from "+ self.table_name +" order by gid;")
                for row in cur:
                    item = {}
                    item['gid'] = row[0]
                    item['gname'] = row[1]
                    resultList.append(item)
                return resultList
