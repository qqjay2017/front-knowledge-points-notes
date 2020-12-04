## 虚拟机

192.168.152.128
root/root

#### mysql
47.96.109.104
root/Test2016@


#### 创建表

```sql
USE company;
CREATE TABLE IF NOT EXISTS `company`.`customers` (
	`id` int unsigned AUTO_INCREMENT PRIMARY KEY,
	`first_name` VARCHAR(20),
	`last_name` VARCHAR(20),
	`country` VARCHAR(20)
)
```


```sql
USE company;
CREATE TABLE IF NOT EXISTS `company`.`payments` (
	`customer_name` varchar(20) PRIMARY KEY,
	`payment`  float
)
```


#### 插入语句

IGNORE 如果该数据已存在,存在IGNORE时候新数据会被忽略,如果没有IGNORE回报错;
行的唯一性又主键标识;

```sql
INSERT IGNORE INTO `company`.`customers`(first_name,last_name,country) 
VALUES
('Mike','Christensen','USA'),
('Rajiv','Perera','Sri Lanka');
```


#### 更新语句

```sql
UPDATE customers SET first_name='Rajiv',country='uk' WHERE id=1;
```


#### 删除语句

```sql
DELETE FROM customers WHERE id =1 AND first_name = 'Rajiv';
```

#### REPLACE


## mysql数据案例

下载
` wget 'https://codeload.github.com/datacharmer/test_db/zip/master' -O master.zip `

解压

` unzip master.zip  `

进去

`cd test_db-master/`


加载文件

`mysql -u root -p < employees.sql`

#### 查询数据

```sql
SELECT * FROM customers;
```

```sql
SELECT id FROM customers;
```

计数

```sql
SELECT COUNT(*) FROM customers;
```

IN  -   检查一个值是否在一组值中

```sql
SELECT COUNT(*) FROM employees WHERE last_name IN ('Christ','Lamba','Baba');
```

BETWEEN AND  检查一个值是否在一个范围内

```sql
SELECT COUNT(*) FROM employees WHERE hire_date BETWEEN '1856-12-01' AND '1956-12-31'; 
```

NOT
```sql
SELECT COUNT(*) FROM employees WHERE hire_date NOT BETWEEN '1856-12-01' AND '1956-12-31'; 
```


###### 简单模式匹配

LIKE     
> _来精准匹配一个字符    %来匹配任意数量的字符

以R开头的

```sql
SELECT * FROM customers WHERE country LIKE 'R%';
```

任意两个字符串开头,后面紧随ka,再后面跟随任意数量字符的所有员工的人数
```sql
SELECT * FROM customers WHERE country LIKE '__R%';
```

###### 正则表达式

> RLIKE REGEXP

```
^           开头
$           结束
[abc]       只有a ,b 或者c
```

找出以r开头的所有员工的人数

```sql
SELECT COUNT(*) FROM customers WHERE country RLIKE '^R';
```

找出以ba结束的所有员工的人数
```sql
SELECT COUNT(*) FROM customers WHERE country REGEXP 'ba$';
```

找出不包含aeiou的所有员工的人数
```sql
SELECT COUNT(*) FROM customers WHERE country NOT REGEXP '[aeiou]';
```

###### 限定结果

查询语句末尾使用LIMIT来实现此查询

```sql
SELECT * FROM employees WHERE hire_date<'1856-12-01' LIMIT 10;
```

###### 表别名

```sql
SELECT COUNT(*) as cccc FROM employees;
```


## 对结果排序


找出salary前5的,(降序)
```sql
SELECT *  FROM salaries ORDER BY salary DESC LIMIT 5;
```

不指定列名称
```sql
SELECT salary  FROM salaries ORDER BY 1 DESC LIMIT 5;
```

## 对结果分组

在列上使用GROUP BY对结果进行分组


找出男性和女性员工的人数

```sql
SELECT gender,COUNT(*) as count  FROM employees GROUP BY gender;
```

#### COUNT(必须 GROUP BY )

找出员工最常用的10个名字
对名字进行分组，拿到count，用count排序 降序，限制前10

```sql
USE employees;
SELECT first_name,COUNT(first_name) AS count  
FROM employees GROUP BY first_name ORDER BY count  DESC
LIMIT 10;
```

#### SUM(必须 GROUP BY )

> YEAR()函数讲返回给定日期所在的年份


查询每年度的工资总额
```sql
SELECT SUM(salary) AS sum  ,YEAR(from_date)
FROM salaries GROUP BY YEAR(from_date) ;
```


查询每年度的工资总额,并按工资总数进行排序
```sql
SELECT SUM(salary) AS sum  ,YEAR(from_date)
FROM salaries GROUP BY YEAR(from_date) ORDER BY sum DESC;
```

#### AVERAGE(必须 GROUP BY )

平均工资最高的10名员工

```sql
SELECT emp_no,AVG(salary)  AS avg  
FROM salaries GROUP BY  emp_no 
ORDER BY avg DESC
LIMIT 10;
```

#### DISTINCT

过滤出表中的不同条目

查出来都是唯一的title结果
 ```sql
SELECT DISTINCT title FROM titles;
```


#### HAVING

找出平均工资超过14000的员工

```sql

SELECT  emp_no,AVG(salary) AS avg from salaries GROUP BY emp_no HAVING avg > 140000;

```

#### 跨表关联


emp_no 110022 找到员工姓名和部门号码

```
departments    部门表-  部门编号+名称
employees      员工表  -  员工的信息
dept_manager   员工和部门的映射关系

```

```sql
USE employees;
SELECT 
	emp.emp_no,
	emp.first_name,
	emp.last_name,
	dept.dept_name
FROM 
	employees AS emp
JOIN dept_manager AS  dept_mgr
	ON emp.emp_no=dept_mgr.emp_no AND emp.emp_no = 110022
JOIN departments AS dept
	ON dept.dept_no=dept_mgr.dept_no;
```

```sql
SELECT 
	emp.emp_no,
	emp.first_name,
	emp.last_name,
	dept.dept_name
FROM 
	departments AS dept 
JOIN dept_manager AS dept_mgr
	ON dept_mgr.dept_no=dept.dept_no
JOIN employees AS emp
	ON emp.emp_no=dept_mgr.emp_no AND emp.emp_no=110022;
```



每个部门的平均工资

```
USE employees;
SELECT
	dept_name,
	AVG(salary) AS avg_salary
FROM salaries 

JOIN dept_emp 
	ON dept_emp.emp_no=salaries.emp_no
JOIN departments as dept
	ON dept.dept_no=dept_emp.dept_no
GROUP BY dept_emp.dept_no
ORDER BY avg_salary;
```


#### 通过与自己关联寻找重复项

添加索引

```
ALERT TABLE employees ADD INDEX name(first_name,last_name);


SELECT
 emp1.* 
FROM
	employees emp1
JOIN employees emp2
	ON emp1.first_name=emp2.first_name
	AND emp1.last_name=emp2.last_name
	AND emp1.gender=emp2.gender
	AND emp1.hire_date=emp2.hire_date
	AND emp1.emp_no!=emp2.emp_no
ORDER BY
	first_name,last_name;

```

emp1.emp_no!=emp2.emp_no,显示不一样的员工


#### 子查询

查找标题是Senior Engineer且1986-06-26的人的名字
```sql
SELECT 
	first_name,
	last_name
FROM employees
WHERE emp_no 
IN (SELECT emp_no FROM titles WHERE title="Senior Engineer" AND 
from_date="1986-06-26"
);
```


找出工资最高的人

```sql
SELECT emp_no FROM salaries WHERE salary=(SELECT MAX(salary) FROM salaries);
```


###### 找出两个表都有的员工

```
SELECT emp_no FROM employees_list1 WHERE emp_no IN (SELECT emp_no FROM employees_list2);
```


```
SELECT employees_list1.* FROM employees_list1 
JOIN employees_list2 l2 ON
employees_list1.emp_no=l2.emp_no;
```



#### 不匹配的行

一个表有,另一个表却没有;

```
SELECT emp_no FROM employees_list1 WHERE emp_no NOT IN (SELECT emp_no FROM employees_list2);
```


```
SELECT employees_list1.* FROM employees_list1 
LEFT OUTER JOIN employees_list2 l2 ON
employees_list1.emp_no=l2.emp_no
WHERE l2.emp_no IS NULL;
```


## 存储过程


/*  创建之前删除存在的存储过程 */
DROP PROCEDURE IF EXISTS create_employee;
DELIMITER $$
/*  in 指定作为参数的变量 out指定输出的变量  */
CREATE PROCEDURE create_employee 
(OUT new_emp_no INT,IN first_name varchar(20),IN last_name varchar(20),
IN gender enum('M','F'),
IN birth_date date,
IN emp_dept_name varchar(40),
IN title varchar(50))
BEGIN
/*  声明变量  */
	DECLARE emp_dept_no char(4);
	DECIMAL salary int DEFAULT 60000;
	
	/*  找出目前的最大id  */
	SELECT max(emp_no) INTO new_emp_no FROM employees;
	SET new_emp_no = new_emp_no+1;
	
	/*  插入数据到employees表中*/
	INSERT INTO employees VALUES(emp_no,birth_date,first_name,last_name,gender,CURDATE());


















