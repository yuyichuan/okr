__author__='yuyc'

from psycopg2.pool import ThreadedConnectionPool
from OkrConfig import *

# data base pool
okrPool=ThreadedConnectionPool(minconn=4, maxconn=100, database=DB_NAME, user=DB_USER, password=DB_PWD, host=DB_HOST, port=DB_PORT)