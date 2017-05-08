-- 建用户
CREATE ROLE okr_user LOGIN ENCRYPTED PASSWORD 'md530a4565cf2000fe914f26030f0c30fb7'
   VALID UNTIL 'infinity';

--建库
CREATE DATABASE okr
  WITH ENCODING='UTF8'
       OWNER=okr_user
       LC_COLLATE='zh_CN.UTF-8'
       LC_CTYPE='zh_CN.UTF-8'
       CONNECTION LIMIT=-1;

--用户组
CREATE TABLE u_group
(
   gid serial,
   gname character varying(24) NOT NULL,
   createtime timestamp without time zone,
   CONSTRAINT pk_gid PRIMARY KEY (gid)
) ;


insert into u_group(gname, createtime) values('部门', '2017-05-02');
insert into u_group(gname, createtime) values('项目', '2017-05-02');
insert into u_group(gname, createtime) values('个人', '2017-05-02');
insert into u_group(gname, createtime) values('管理', '2017-05-02');

--用户
CREATE TABLE u_user
(
   uid serial,
   uaccount character varying(24),
   uname character varying(24),
   upasswd character varying(64),
   groupids character varying(24),
   createtime timestamp without time zone,
   CONSTRAINT pk_uid PRIMARY KEY (uid)
) ;
ALTER TABLE u_user
  ADD CONSTRAINT uk_account UNIQUE (uaccount);


--kr
CREATE TABLE okr
(
kid serial,
klevel bigint NOT NULL DEFAULT 0,
pkid bigint NOT NULL DEFAULT 0,
kdesc character varying(512),
planmonth character varying(64),
link_users character varying(512),
plandays numeric(10,2) NOT NULL DEFAULT 0.0,
elevel bigint NOT NULL DEFAULT 2,
stime timestamp without time zone,
etime timestamp without time zone,
status bigint NOT NULL DEFAULT -1,
createtime timestamp without time zone NOT NULL,
updatetime timestamp without time zone NOT NULL,
ouid bigint,
complement integer NOT NULL DEFAULT 0,
CONSTRAINT pk_kid PRIMARY KEY (kid)
) ;
COMMENT ON COLUMN public.okr.plandays IS '计划用天数';
COMMENT ON COLUMN public.okr.elevel IS '难度';
COMMENT ON COLUMN public.okr.stime IS '实际开始时间';
COMMENT ON COLUMN public.okr.etime IS '实际结束时间';
COMMENT ON COLUMN public.okr.status IS '状态:-1未开始，0进行中， 1完成了';
COMMENT ON COLUMN public.okr.ouid IS '最后操作者';
COMMENT ON COLUMN public.okr.complement IS '完成度';

-- okr log
CREATE TABLE okr_log
(
k_logid serial,
kid bigint NOT NULL,
klevel bigint NOT NULL,
pkid bigint NOT NULL,
kdesc character varying(512),
planmonth character varying(64),
link_users character varying(512),
plandays numeric(10,2) NOT NULL DEFAULT 0.0,
elevel bigint NOT NULL DEFAULT 2,
stime timestamp without time zone,
etime timestamp without time zone,
status bigint NOT NULL DEFAULT -1,
createtime timestamp without time zone NOT NULL,
ouid bigint,
complement integer NOT NULL,
CONSTRAINT pk_klog_id PRIMARY KEY (k_logid)
) ;

--okr month
CREATE TABLE okr_month
(
   omid serial,
   kid bigint   NOT NULL,
   omonth bigint NOT NULL,
   createtime timestamp without time zone NOT NULL,
   CONSTRAINT pk_omid PRIMARY KEY (omid)
) ;


--okr user
CREATE TABLE okr_user
(
   ouid serial,
   kid bigint     NOT NULL,
   uid bigint     NOT NULL,
   createtime timestamp without time zone NOT NULL,
   CONSTRAINT pk_ouid PRIMARY KEY (ouid)
) ;