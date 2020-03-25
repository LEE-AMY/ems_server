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
| tch_no | 教师编号 | number |  10   |   N   | PK                                                    |
| inf_no | 基本信息 | number |  10   |   N   | FK,[<EMS_USER_INF>](#用户基本信息表 '用户基本信息表') |

### 班级信息表

> 表名：EMS_DEPT_CLS

| 字段名  |   含义   |  类型  | 长度  | 空值  | 约束                                          |
| :-----: | :------: | :----: | :---: | :---: | --------------------------------------------- |
| cls_no  | 班级编号 | number |  10   |   N   | PK                                            |
| stu_cnt | 学生总数 | number |   4   |   Y   |                                               |
| tch_no  | 教师编号 | number |  10   |   N   | FK,[<EMS_USER_TCH>](#教师信息表 '教师信息表') |

### 学院信息表

> 表名：EMS_DEPT_INF

|  字段名   |   含义   |  类型  | 长度  | 空值  | 约束                                          |
| :-------: | :------: | :----: | :---: | :---: | --------------------------------------------- |
| dept_code | 学院代码 | number |   4   |   N   | PK                                            |
| dept_name | 学院名称 | string |  60   |   N   |                                               |
|  address  |   地址   | string |  120  |   N   |                                               |
|  cell_no  | 座机号码 | string |  100  |   N   |                                               |
| desc_code | 介绍代码 | number |  10   |   N   | FK,[<EMS_DESC_INF>](#介绍信息表 '介绍信息表') |

### 专业列表表

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
| crs_score | 课程学分 | float  |   6   |   N   |                                               |
| desc_code | 介绍代码 | number |  10   |   N   | FK,[<EMS_DESC_INF>](#介绍信息表 '介绍信息表') |

### 介绍信息表

> 表名：EMS_DESC_INF

|   字段名   |   含义   |  类型  | 长度  | 空值  | 约束 |
| :--------: | :------: | :----: | :---: | :---: | ---- |
| desc_code  | 介绍代码 | number |  10   |   N   | PK   |
| desc_title |   标题   | string |  100  |   Y   |      |
| desc_info  | 介绍信息 | string |   n   |   N   |      |
|   author   |  创建者  | string |  60   |   Y   |      |

### 日期记录表

> 表名：EMS_DATE

|   字段名    |     含义     |  类型  | 长度  | 空值  | 约束 |
| :---------: | :----------: | :----: | :---: | :---: | ---- |
|   date_no   |   日期编号   | number |  20   |   N   | PK   |
| create_date |   创建日期   | number |   8   |   N   |      |
|  pre_date   | 上次操作日期 | number |   8   |   Y   |      |
|  last_date  | 最后操作日期 | number |   8   |   Y   |      |
|  opr_type   |   操作类型   | string |   n   |   N   |      |

### 专业课表表

> 表名：EMS_PRO_TAB

| 字段名  |   含义   |  类型  | 长度  | 空值  | 约束 |
| :-----: | :------: | :----: | :---: | :---: | ---- |
| date_no | 日期编号 | number |  20   |   N   | PK   |

### 课程时间表

> 表名：EMS_CRS_TIME

|   字段名   |   含义   |  类型  | 长度  | 空值  | 约束                     |
| :--------: | :------: | :----: | :---: | :---: | ------------------------ |
|  time_no   | 时间编号 | number |  10   |   N   | PK                       |
| start_date | 开始日期 | number |   8   |   N   |                          |
|  end_date  | 结束日期 | number |   8   |   N   |                          |
| time_type  | 类型名称 | string |  20   |   Y   |                          |
|   status   | 当前状态 | number |   1   |   N   | 0-未激活，1-正常，2-锁定 |

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

|   字段名   |    含义    |  类型  | 长度  | 空值  | 约束                                           |
| :--------: | :--------: | :----: | :---: | :---: | ---------------------------------------------- |
|  room_no   |  教室编号  | number |   4   |   N   | PK                                             |
| room_type  |  教室类型  | string |  20   |   N   |                                                |
| room_floor | 所在楼层数 | number |   3   |   N   |                                                |
|  capacity  |  容纳人数  | number |   5   |   N   |                                                |
|  build_no  | 建筑物编号 | number |  10   |   N   | FK,[<EMS_BUILD_INF>](#建筑物信息 '建筑物信息') |
|   status   |  当前状态  | number |   1   |   N   | 0-未激活，1-正常，2-锁定                       |