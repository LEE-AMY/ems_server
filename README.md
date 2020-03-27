# ems_server

Educational Management System

## 数据库表

/Educational Management System == EMS/
/department == dept 部门|学院/
/class == cls 班级/
/profession == pro 专业/
/subject == sub 学科/
/course = crs 课程/
/description == desc 描述 介绍/

### 用户基本信息表

> 表名：EMS_USER_INF

|  字段名   |   含义   |  类型  | 长度  | 空值  | 约束                                          |
| :-------: | :------: | :----: | :---: | :---: | --------------------------------------------- |
|  inf_no   | 信息编号 | number |  10   |   N   | PK                                            |
|    pwd    |   密码   | string |  50   |   N   |                                               |
|   name    |   姓名   | string |  60   |   N   |                                               |
|    sex    |   性别   | number |   1   |   N   | 1-男, 0-女                                    |
|   birth   | 出生日期 | number |   8   |   N   |                                               |
|   id_no   | 证件编号 | string |  20   |   N   |                                               |
| join_date | 加入时间 | number |   8   |   N   |                                               |
|  address  |   地址   | string |  200  |   N   |                                               |
| desc_code | 介绍代码 | number |  10   |   N   | FK,[<EMS_DESC_INF>](#介绍信息表 '介绍信息表') |
| dept_code | 学院代码 | number |   4   |   N   | FK,[<EMS_DEPT_INF>](#学院信息表 '学院信息表') |
|  status   |   状态   | number |   1   |   N   | 0-未激活 1-正常 2-注销 3-锁定                 |

### 管理员账号信息

> 表名：EMS_USER_ADMIN

| 字段名  | 含义  |  类型  | 长度  | 空值  | 约束                          |
| :-----: | :---: | :----: | :---: | :---: | ----------------------------- |
| account | 账号  | string |  10   |   N   | PK                            |
|   pwd   | 密码  | string |  30   |   N   |                               |
|  name   | 姓名  | string |  60   |   N   |                               |
|  role   | 角色  | string |  10   |   N   |                               |
| status  | 状态  | number |   1   |   N   | 0-未激活 1-正常 2-注销 3-锁定 |

### 学生信息表

> 表名：EMS_USER_STU

| 字段名 |   含义   |  类型  | 长度  | 空值  | 约束                                                  |
| :----: | :------: | :----: | :---: | :---: | ----------------------------------------------------- |
| stu_no |   学号   | number |  10   |   N   | PK                                                    |
| inf_no | 基本信息 | number |  10   |   N   | FK,[<EMS_USER_INF>](#用户基本信息表 '用户基本信息表') |
| cls_no | 班级编号 | number |  10   |   N   | FK,[<EMS_DEPT_CLS>](#班级信息表 '班级信息表')         |

### 教师信息表

> 表名：EMS_USER_TCH

| 字段名 |   含义   |  类型  | 长度  | 空值  | 约束                                                  |
| :----: | :------: | :----: | :---: | :---: | ----------------------------------------------------- |
| tch_no |   工号   | number |  10   |   N   | PK                                                    |
| inf_no | 基本信息 | number |  10   |   N   | FK,[<EMS_USER_INF>](#用户基本信息表 '用户基本信息表') |

### 学院信息表

> 表名：EMS_DEPT_INF

|  字段名   |   含义   |  类型  | 长度  | 空值  | 约束                                          |
| :-------: | :------: | :----: | :---: | :---: | --------------------------------------------- |
| dept_code | 学院代码 | number |   4   |   N   | PK                                            |
| dept_name | 学院名称 | string |  60   |   N   |                                               |
|  address  |   地址   | string |  120  |   N   |                                               |
|  cell_no  | 座机号码 | string |  100  |   N   |                                               |
| desc_code | 介绍代码 | number |  10   |   N   | FK,[<EMS_DESC_INF>](#介绍信息表 '介绍信息表') |

### 班级信息表

> 表名：EMS_DEPT_CLS

|  字段名   |    含义    |  类型  | 长度  | 空值  | 约束                                          |
| :-------: | :--------: | :----: | :---: | :---: | --------------------------------------------- |
|  cls_no   |  班级编号  | number |  10   |   N   | PK                                            |
|  stu_cnt  |  学生总数  | number |   4   |   Y   |                                               |
| master_no | 班主任编号 | number |  10   |   N   | FK,[<EMS_USER_TCH>](#教师信息表 '教师信息表') |

### 专业列表

> 表名：EMS_DEPT_PRO

|  字段名   |   含义   |  类型  | 长度  | 空值  | 约束                                          |
| :-------: | :------: | :----: | :---: | :---: | --------------------------------------------- |
| pro_code  | 专业代码 | number |  10   |   N   | PK                                            |
| pro_name  | 专业名称 | string |  100  |   N   |                                               |
| dept_code | 学院代码 | number |   4   |   N   | FK,[<EMS_DEPT_INF>](#学院信息表 '学院信息表') |
| desc_code | 介绍代码 | number |  10   |   N   | FK,[<EMS_DESC_INF>](#介绍信息表 '介绍信息表') |

### 课程名称表

> 表名：EMS_DEPT_CRS

|  字段名   |   含义   |  类型  | 长度  | 空值  | 约束                                          |
| :-------: | :------: | :----: | :---: | :---: | --------------------------------------------- |
| crs_code  | 课程代码 | number |  10   |   N   | PK                                            |
| crs_name  | 课程名称 | string |  100  |   N   |                                               |
| crs_score | 课程学分 | number |   6   |   N   |                                               |
| crs_time  | 课程学识 | number |   4   |   N   |                                               |
|  crs_pre  | 先修课程 | number |  10   |   Y   |                                               |
| desc_code | 介绍代码 | number |  10   |   N   | FK,[<EMS_DESC_INF>](#介绍信息表 '介绍信息表') |

### 待选课程列表

> 表名：EMS_CRS_TAB

|   字段名   |     含义     |  类型  | 长度  | 空值  | 约束                                          |
| :--------: | :----------: | :----: | :---: | :---: | --------------------------------------------- |
|   crs_no   |   课程编号   | number |  20   |   N   | PK                                            |
|   tch_no   |     工号     | number |  10   |   N   | FK,[<EMS_USER_TCH>](#教师信息表 '教师信息表') |
|  crs_code  |   课程代码   | number |  10   |   N   | FK,[<EMS_DEPT_CRS>](#课程名称表 '课程名称表') |
|  term_no   |   学期编号   | number |  10   |   N   | FK,[<EMS_CRT_TERM>](#创建学期表 '创建学期表') |
|  week_num  |  星期N上课   | string |  20   |   N   |                                               |
|  cls_time  |   上课时间   | string |  20   |   N   |                                               |
|   total    |  总可选人数  | number |   4   |   N   |                                               |
|  surplus   | 剩余可选人数 | number |   4   |   N   |                                               |
| crs_status |     状态     | number |   1   |   N   | 0-未激活，1-可选，2-不可选，3-已满            |

### 选中课程列表

> 表名：EMS_OPT_CRS

|   字段名   |     含义     |  类型  | 长度  | 空值  | 约束                                             |
| :--------: | :----------: | :----: | :---: | :---: | ------------------------------------------------ |
|   opt_no   |   选课编号   | number |  10   |   N   | PK                                               |
|   crs_no   | 被选课程编号 | number |  20   |   N   | FK,[<EMS_CRS_TAB>](#待选课程列表 '待选课程列表') |
|   stu_no   |  选课人学号  | number |  10   |   N   | FK,[<EMS_USER_STU>](#学生信息表 '学生信息表')    |
|   grade    |     成绩     | number |   4   |   Y   |                                                  |
| crs_status |   课程状态   | number |   1   |   Y   | 0-未开课，1-开课中，2-结课                       |

### 时间状态表

> 表名：EMS_TIME_STATUS

|   字段名   |     含义     |  类型  | 长度  | 空值  | 约束                   |
| :--------: | :----------: | :----: | :---: | :---: | ---------------------- |
| status_no  |   状态编号   | number |  10   |   N   | PK                     |
| start_time |   开始时间   | string |  10   |   N   |                        |
|  end_time  |   结束时间   | string |  10   |   N   |                        |
| status_id  | 状态占用编号 | string |  10   |   Y   | FK                     |
|   status   |   状态结果   | number |   1   |   N   | 0-空闲，1-占用，2-锁定 |

### 建筑物信息

> 表名：EMS_BUILD_INF

|    字段名     |    含义    |  类型  | 长度  | 空值  | 约束                                          |
| :-----------: | :--------: | :----: | :---: | :---: | --------------------------------------------- |
|   build_no    | 建筑物编号 | number |   8   |   N   | PK                                            |
|  build_name   | 建筑物名字 | string |  20   |   N   |                                               |
| build_address | 建筑物地址 | string |  200  |   N   |                                               |
|    manager    |  管理人员  | string |  200  |   N   |                                               |
|  connect_inf  |  联系信息  | string |  200  |   N   |                                               |
|  build_date   |  建成日期  | number |   8   |   N   |                                               |
|     floor     |   楼层数   | number |   3   |   N   |                                               |
|   desc_code   |  介绍代码  | number |  10   |   N   | FK,[<EMS_DESC_INF>](#介绍信息表 '介绍信息表') |
|    status     |  当前状态  | number |   1   |   N   | 0-未激活，1-正常，2-锁定                      |

### 教室信息

> 表名：EMS_BUILD_ROOM

|   字段名    |    含义    |  类型  | 长度  | 空值  | 约束                                                 |
| :---------: | :--------: | :----: | :---: | :---: | ---------------------------------------------------- |
|   room_no   |  教室编号  | string |  10   |   N   | PK                                                   |
|  room_type  |  教室类型  | string |  20   |   N   |                                                      |
| room_floor  | 所在楼层数 | number |   3   |   N   |                                                      |
|  capacity   |  容纳人数  | number |   5   |   N   |                                                      |
|   week_no   |  一周编号  | number |  10   |   N   | FK,[<表名：EMS_WEEK_TIME>](#一周时间表 '一周时间表') |
|  build_no   | 建筑物编号 | number |  10   |   N   | FK,[<EMS_BUILD_INF>](#建筑物信息 '建筑物信息')       |
| room_status |  当前状态  | number |   1   |   N   | 0-未激活，1-正常，2-锁定                             |

### 一周时间表

> 表名：EMS_WEEK_TIME

|   字段名   |      含义      |  类型  | 长度  | 空值  | 约束                                            |
| :--------: | :------------: | :----: | :---: | :---: | ----------------------------------------------- |
|  week_no   |    一周编号    | number |  10   |   N   | PK                                              |
| start_date |    开始日期    | number |   8   |   N   |                                                 |
|  end_date  |    结束日期    | number |   8   |   N   |                                                 |
|   mon_no   | 星期一安排编号 | number |  10   |   N   | FK,[<EMS_DAY_LAYOUT>](#一天安排表 '一天安排表') |
|   tue_no   | 星期二安排编号 | number |  10   |   N   | FK,[<EMS_DAY_LAYOUT>](#一天安排表 '一天安排表') |
|   wed_no   | 星期三安排编号 | number |  10   |   N   | FK,[<EMS_DAY_LAYOUT>](#一天安排表 '一天安排表') |
|  thur_no   | 星期四安排编号 | number |  10   |   N   | FK,[<EMS_DAY_LAYOUT>](#一天安排表 '一天安排表') |
|   fri_no   | 星期五安排编号 | number |  10   |   N   | FK,[<EMS_DAY_LAYOUT>](#一天安排表 '一天安排表') |
|   sat_no   | 星期六安排编号 | number |  10   |   N   | FK,[<EMS_DAY_LAYOUT>](#一天安排表 '一天安排表') |
|   sun_no   | 星期天安排编号 | number |  10   |   N   | FK,[<EMS_DAY_LAYOUT>](#一天安排表 '一天安排表') |

### 一天安排表

> 表名：EMS_DAY_LAYOUT

|  字段名   |         含义          |  类型  | 长度  | 空值  | 约束                                          |
| :-------: | :-------------------: | :----: | :---: | :---: | --------------------------------------------- |
| layout_no |     时间安排编号      | number |  10   |   N   | PK                                            |
|  morning  |      早读时间段       | string |  20   |   Y   |                                               |
|   night   |     晚自习时间段      | string |  20   |   Y   |                                               |
|  lesson1  | 第1节课 上课课程代码  | number |  10   |   Y   | FK,[<EMS_DEPT_CRS>](#课程名称表 '课程名称表') |
|  lesson2  | 第2节课 上课课程代码  | number |  10   |   Y   | FK,[<EMS_DEPT_CRS>](#课程名称表 '课程名称表') |
|  lesson3  | 第3节课 上课课程代码  | number |  10   |   Y   | FK,[<EMS_DEPT_CRS>](#课程名称表 '课程名称表') |
|  lesson4  | 第4节课 上课课程代码  | number |  10   |   Y   | FK,[<EMS_DEPT_CRS>](#课程名称表 '课程名称表') |
|  lesson5  | 第5节课 上课课程代码  | number |  10   |   Y   | FK,[<EMS_DEPT_CRS>](#课程名称表 '课程名称表') |
|  lesson6  | 第6节课 上课课程代码  | number |  10   |   Y   | FK,[<EMS_DEPT_CRS>](#课程名称表 '课程名称表') |
|  lesson7  | 第7节课 上课课程代码  | number |  10   |   Y   | FK,[<EMS_DEPT_CRS>](#课程名称表 '课程名称表') |
|  lesson8  | 第8节课 上课课程代码  | number |  10   |   Y   | FK,[<EMS_DEPT_CRS>](#课程名称表 '课程名称表') |
|  lesson9  | 第9节课 上课课程代码  | number |  10   |   Y   | FK,[<EMS_DEPT_CRS>](#课程名称表 '课程名称表') |
| lesson10  | 第10节课 上课课程代码 | number |  10   |   Y   | FK,[<EMS_DEPT_CRS>](#课程名称表 '课程名称表') |

### 介绍信息表

> 表名：EMS_DESC_INF

|    字段名    |   含义   |  类型  | 长度  | 空值  | 约束 |
| :----------: | :------: | :----: | :---: | :---: | ---- |
|  desc_code   | 介绍代码 | number |  10   |   N   | PK   |
|  desc_title  |   标题   | string |  100  |   Y   |      |
| desc_summary |   摘要   | string |  200  |   Y   |      |
| desc_detail  | 介绍详情 | string |   n   |   Y   |      |
|    author    |  创建者  | string |  60   |   Y   |      |

### 创建学期表

> 表名：EMS_CRT_TERM

|   字段名    |     含义     |  类型  | 长度  | 空值  | 约束                                              |
| :---------: | :----------: | :----: | :---: | :---: | ------------------------------------------------- |
|   term_no   |   学期编号   | string |  20   |   N   | PK                                                |
| start_date  |   开始日期   | string |   8   |   N   |                                                   |
|  end_date   |   结束日期   | string |   8   |   N   |                                                   |
|   dbd_no    | 时间分布编号 | string |  20   |   N   | FK,[<EMS_TIME_DBD>](#时间详细分布 '时间详细分布') |
| term_status |   学期状态   | number |   1   |   N   | 0-未激活，1-正常，2锁定                           |

### 时间详细分布

表名：EMS_TIME_DBD

|  字段名  |      含义      |  类型  | 长度  | 空值  | 约束        |
| :------: | :------------: | :----: | :---: | :---: | ----------- |
|  dbd_no  |  时间分布编号  | string |  20   |   N   | PK          |
| morning  |   早读时间段   | string |  20   |   Y   |             |
|  night   |  晚自习时间段  | string |  20   |   Y   |             |
| lesson1  | 第1节课时间段  | string |  20   |   Y   | 08:00-08:45 |
| lesson2  | 第2节课时间段  | string |  20   |   Y   | 09:00-09:45 |
| lesson3  | 第3节课时间段  | string |  20   |   Y   | 10:00-10:45 |
| lesson4  | 第4节课时间段  | string |  20   |   Y   | 11:00-11:45 |
| lesson5  | 第5节课时间段  | string |  20   |   Y   | 14:00-14:45 |
| lesson6  | 第6节课时间段  | string |  20   |   Y   | 15:00-15:45 |
| lesson7  | 第7节课时间段  | string |  20   |   Y   | 16:00-16:45 |
| lesson8  | 第8节课时间段  | string |  20   |   Y   | 17:00-17:45 |
| lesson9  | 第9节课时间段  | string |  20   |   Y   | 20:00-20:45 |
| lesson10 | 第10节课时间段 | string |  20   |   Y   | 21:00-21:45 |
