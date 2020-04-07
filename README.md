# ems_server

> Educational Management System
> 部分表有改动未更新
> 接口文档未更新

[toc]

## 数据库表

> Educational Management System == ***EMS***
> department == ***dept*** 部门|学院
> class == ***cls*** 班级
> profession == ***pro*** 专业
> subject == ***sub*** 学科
> course = ***crs*** 课程
> description == ***desc*** 描述|介绍
> term  学期

### 管理员账号表

> 表名：EMS_USER_ADMIN

|  字段名  | 含义  |  类型  | 长度  | 空值  | 约束                          |
| :------: | :---: | :----: | :---: | :---: | ----------------------------- |
| admin_no | 账号  | string |  10   |   N   | PK                            |
|   pwd    | 密码  | string |  30   |   N   |                               |
|   name   | 姓名  | string |  60   |   N   |                               |
|   role   | 角色  | string |  10   |   N   |                               |
|  status  | 状态  | number |   1   |   N   | 0-未激活 1-正常 2-注销 3-锁定 |

### 用户信息表

> 表名：EMS_USER_BASE

|  字段名   |   含义   |  类型  | 长度  | 空值  | 约束                                          |
| :-------: | :------: | :----: | :---: | :---: | --------------------------------------------- |
|  inf_no   | 信息编号 | string |  10   |   N   | PK                                            |
|   name    |   姓名   | string |  60   |   N   |                                               |
|    sex    |   性别   | number |   1   |   N   | 0-男, 1-女                                    |
|   birth   | 出生日期 | string |   8   |   N   |                                               |
|   id_no   | 证件编号 | string |  20   |   N   |                                               |
| join_date | 加入时间 | number |   n   |   N   |                                               |
|  address  |   地址   | string |  200  |   N   |                                               |
|   phone   | 联系电话 | string |  100  |   Y   |                                               |
|   email   |   邮箱   | string |  100  |   Y   |                                               |
| dept_code | 学院代码 | string |   4   |   N   | FK,[<EMS_DEPT_INF>](#学院信息表 '学院信息表') |
| desc_code | 描述代码 | string |  10   |   N   | FK,[<EMS_PUB_DESC>](#描述信息表 '描述信息表') |

### 学生信息表

> 表名：EMS_USER_STU

|   字段名   |   含义   |  类型  | 长度  | 空值  | 约束                                           |
| :--------: | :------: | :----: | :---: | :---: | ---------------------------------------------- |
|   stu_no   |   学号   | string |  10   |   N   | PK                                             |
|    pwd     |   密码   | string |  50   |   N   |                                                |
|   inf_no   | 信息编号 | string |  10   |   N   | FK,[<EMS_USER_BASE>](#用户信息表 '用户信息表') |
|   cls_no   | 班级编号 | string |  10   |   N   | FK,[<EMS_DEPT_CLS>](#班级信息表 '班级信息表')  |
| login_time | 最后登录 | number |   n   |   Y   |                                                |
|   status   |   状态   | number |   1   |   N   | 0-未激活 1-正常 2-注销 3-锁定                  |

### 教师信息表

> 表名：EMS_USER_TCH

|   字段名   |   含义   |  类型  | 长度  | 空值  | 约束                                           |
| :--------: | :------: | :----: | :---: | :---: | ---------------------------------------------- |
|   tch_no   |   工号   | string |  10   |   N   | PK                                             |
|    pwd     |   密码   | string |  50   |   N   |                                                |
|   inf_no   | 信息编号 | string |  10   |   N   | FK,[<EMS_USER_BASE>](#用户信息表 '用户信息表') |
| login_time | 最后登录 | number |   n   |   Y   |                                                |
|   status   |   状态   | number |   1   |   N   | 0-未激活 1-正常 2-注销 3-锁定                  |

### 学院信息表

> 表名：EMS_DEPT_INF

|  字段名   |   含义   |  类型  | 长度  | 空值  | 约束                                          |
| :-------: | :------: | :----: | :---: | :---: | --------------------------------------------- |
| dept_code | 学院代码 | string |   4   |   N   | PK                                            |
| dept_name | 学院名称 | string |  60   |   N   |                                               |
|  address  |   地址   | string |  200  |   N   |                                               |
|   phone   | 联系电话 | string |  100  |   N   |                                               |
|   email   |   邮箱   | string |  100  |   Y   |                                               |
| desc_code | 描述代码 | string |  10   |   N   | FK,[<EMS_PUB_DESC>](#描述信息表 '描述信息表') |

### 班级信息表

> 表名：EMS_DEPT_CLS

|  字段名  |    含义    |  类型  | 长度  | 空值  | 约束                                          |
| :------: | :--------: | :----: | :---: | :---: | --------------------------------------------- |
|  cls_no  |  班级编号  | string |  10   |   N   | PK                                            |
| stu_cnt  |  学生总数  | string |   4   |   Y   |                                               |
| pro_code |  专业代码  | string |  10   |   N   | FK,[<EMS_DEPT_PRO>](#专业列表表 '专业列表表') |
|  tch_no  | 班主任工号 | string |  10   |   N   | FK,[<EMS_USER_TCH>](#教师信息表 '教师信息表') |
|  status  |    状态    | number |   1   |   N   | 0-未激活 1-正常 2-注销 3-锁定                 |

### 专业列表表

> 表名：EMS_DEPT_PRO

|  字段名   |   含义   |  类型  | 长度  | 空值  | 约束                                          |
| :-------: | :------: | :----: | :---: | :---: | --------------------------------------------- |
| pro_code  | 专业代码 | string |  10   |   N   | PK                                            |
| pro_name  | 专业名称 | string |  100  |   N   |                                               |
| dept_code | 学院代码 | string |   4   |   N   | FK,[<EMS_DEPT_INF>](#学院信息表 '学院信息表') |
| desc_code | 描述代码 | string |  10   |   N   | FK,[<EMS_PUB_DESC>](#描述信息表 '描述信息表') |
|  status   |   状态   | number |   1   |   N   | 0-未激活 1-正常 2-注销 3-锁定                 |

### 课程名称表

> 表名：EMS_DEPT_CRS

|  字段名   |   含义   |  类型  | 长度  | 空值  | 约束                                          |
| :-------: | :------: | :----: | :---: | :---: | --------------------------------------------- |
| crs_code  | 课程代码 | string |  10   |   N   | PK                                            |
| crs_name  | 课程名称 | string |  100  |   N   |                                               |
| crs_score | 课程学分 | number |   4   |   N   |                                               |
| crs_type  | 课程类型 | string |  10   |   N   |                                               |
| crs_time  | 课程学时 | number |   4   |   N   |                                               |
|  crs_pre  | 先修课程 | number |  10   |   Y   |                                               |
| desc_code | 描述代码 | string |  10   |   N   | FK,[<EMS_PUB_DESC>](#描述信息表 '描述信息表') |

### 建筑信息表

> 表名：EMS_BUILD_BUILD

|    字段名     |   含义   |  类型  | 长度  | 空值  | 约束                                          |
| :-----------: | :------: | :----: | :---: | :---: | --------------------------------------------- |
|   build_no    | 建筑编号 | string |   4   |   N   | PK                                            |
|  build_name   | 建筑名字 | string |  20   |   N   |                                               |
| build_address | 建筑地址 | string |  200  |   N   |                                               |
|    manager    | 管理人员 | string |  200  |   N   |                                               |
|  connect_inf  | 联系信息 | string |  200  |   N   |                                               |
|  build_date   | 建成日期 | number |   n   |   N   |                                               |
|     floor     |  楼层数  | number |   3   |   N   |                                               |
|   desc_code   | 描述代码 | string |  10   |   N   | FK,[<EMS_PUB_DESC>](#描述信息表 '描述信息表') |
|    status     | 当前状态 | string |   1   |   N   | 0-未激活 1-正常 2-注销 3-锁定                 |

### 教室信息表

> 表名：EMS_BUILD_ROOM

|   字段名   |    含义    |  类型  | 长度  | 空值  | 约束                                             |
| :--------: | :--------: | :----: | :---: | :---: | ------------------------------------------------ |
|  room_no   |  教室编号  | string |  10   |   N   | PK                                               |
| room_type  |  教室类型  | string |  20   |   N   |                                                  |
| room_floor | 所在楼层数 | number |   3   |   N   |                                                  |
|  capacity  |  容纳人数  | number |   5   |   N   |                                                  |
|  build_no  |  建筑编号  | string |   4   |   N   | FK,[<EMS_BUILD_BUILD>](#建筑信息表 '建筑信息表') |
|   status   |  当前状态  | number |   1   |   N   | 0-未激活 1-正常 2-注销 3-锁定                    |

### 教室使用表

> 表名：EMS_BUILD_USED

|  字段名   |   含义   |  类型  | 长度  | 空值  | 约束                                            |
| :-------: | :------: | :----: | :---: | :---: | ----------------------------------------------- |
|  use_no   | 使用编号 | string |  10   |   N   | PK                                              |
| use_type  | 使用类型 | string |  50   |   N   |                                                 |
|  use_crs  | 课程编号 | string |  10   |   Y   |                                                 |
| use_week  | 使用星期 | number |   1   |   Y   | 1-星期一 ... 7-星期天                           |
| from_date | 开始日期 | number |   n   |   Y   |                                                 |
|  to_date  | 结束日期 | number |   n   |   Y   |                                                 |
|  time_no  | 时间编号 | string |  10   |   Y   | FK,[<EMS_PUB_TIME>](#时间安排表 '时间安排表')   |
|  term_no  | 学期编号 | string |  20   |   N   | FK,[<EMS_PUB_TERM>](#创建学期表 '创建学期表')   |
|  room_no  | 教室编号 | string |  10   |   N   | FK,[<EMS_BUILD_ROOM>](#教室信息表 '教室信息表') |
|  status   | 当前状态 | number |   1   |   N   | 0-未激活 1-正常 2-注销 3-锁定                   |

### 描述信息表

> 表名：EMS_PUB_DESC

|   字段名    |   含义   |  类型  | 长度  | 空值  | 约束 |
| :---------: | :------: | :----: | :---: | :---: | ---- |
|  desc_code  | 描述代码 | string |  10   |   N   | PK   |
| desc_title  |   标题   | string |  100  |   Y   |      |
| descSummary | 简要描述 | string |  200  |   Y   |      |
|  desc_info  | 描述信息 | string |   n   |   Y   |      |
|   author    |  创建者  | string |  60   |   Y   |      |

### 创建学期表

> 表名：EMS_PUB_TERM

|  字段名   |   含义   |  类型  | 长度  | 空值  | 约束                          |
| :-------: | :------: | :----: | :---: | :---: | ----------------------------- |
|  term_no  | 学期编号 | string |  10   |   N   | PK                            |
| term_name | 学期编号 | string |  20   |   N   |                               |
| from_date | 开始日期 | number |   n   |   N   |                               |
|  to_date  | 结束日期 | number |   n   |   N   |                               |
|  status   | 当前状态 | number |   1   |   N   | 0-未激活 1-正常 2-注销 3-锁定 |

### 时间安排表

> 表名：EMS_PUB_TIME

|   字段名   |   含义   |  类型  | 长度  | 空值  | 约束                                          |
| :--------: | :------: | :----: | :---: | :---: | --------------------------------------------- |
|  time_no   | 时间编号 | string |  10   |   N   | PK                                            |
| time_name  | 安排名称 | string |  20   |   N   |                                               |
| time_start | 开始时间 | string |  10   |   N   |                                               |
|  time_end  | 结束时间 | string |   8   |   N   |                                               |
|  term_no   | 学期编号 | string |  10   |   N   | FK,[<EMS_PUB_TERM>](#创建学期表 '创建学期表') |

### 待选课程表

> 表名：EMS_PUB_CRS

|  字段名  |     含义     |  类型  | 长度  | 空值  | 约束                                            |
| :------: | :----------: | :----: | :---: | :---: | ----------------------------------------------- |
|  crs_no  |   课程编号   | string |  10   |   N   | PK                                              |
|  tch_no  | 上课教师工号 | string |  10   |   N   | FK,[<EMS_USER_TCH>](#教师信息表 '教师信息表')   |
| crs_code |   课程代码   | string |  10   |   N   | FK,[<EMS_DEPT_CRS>](#课程名称表 '课程名称表')   |
| term_no  |   学期编号   | string |  10   |   N   | FK,[<EMS_PUB_TERM>](#创建学期表 '创建学期表')   |
| use_room | 上课教室编号 | string |  100  |   N   | FK,[<EMS_BUILD_USED>](#教室使用表 '教室使用表') |
|  total   |  总可选人数  | number |   4   |   N   |                                                 |
| surplus  | 剩余可选人数 | number |   4   |   N   |                                                 |
|  status  |     状态     | number |   1   |   N   | 0-未激活 1-可选 2-不可选 3-已满                 |

### 选课记录表

> 表名：EMS_PUB_OPT

|  字段名  |     含义     |  类型  | 长度  | 空值  | 约束                                          |
| :------: | :----------: | :----: | :---: | :---: | --------------------------------------------- |
| opt_no | 选课记录编号 | string |  10   |   N   | PK                                            |
|  crs_no  |   课程编号   | string |  20   |   N   | FK,[<EMS_PUB_CRS>](#待选课程表 '待选课程表')  |
| term_no  |   学期编号   | string |  10   |   N   | FK,[<EMS_PUB_TERM>](#创建学期表 '创建学期表') |
|  stu_no  | 选课学生学号 | string |  10   |   N   | FK,[<EMS_USER_STU>](#学生信息表 '学生信息表') |
|  grade   |   学生成绩   | number |   4   |   N   |                                               |
|  score   |   获得学分   | number |   4   |   N   |                                               |
|  status  |   当前状态   | number |   1   |   N   | 0-未激活 1-正常 2-注销 3-锁定                 |

## 接口文档
