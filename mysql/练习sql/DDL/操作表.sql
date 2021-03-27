# 查询所有的表
# SHOW TABLES; 

# 创建表

CREATE TABLE IF NOT EXISTS `students` ( `name` VARCHAR ( 10 ), `age` INT, `score` INT ,`phoneNum` VARCHAR(11) UNIQUE); 
	
# 创一个完美的表

CREATE TABLE
IF
	NOT EXISTS `users` ( 
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR ( 20 ) NOT NULL, `age` INT DEFAULT 0,
  `phoneNum` VARCHAR ( 20 ) UNIQUE ,
	`createTime` TIMESTAMP 
	);
    


# 修改表结构  1. 修改表的名字
ALTER TABLE `users` RENAME TO `user`;

# 2. 添加一个新的列
ALTER TABLE `user` ADD `updateTime` TIMESTAMP;

# 3. 修改字段
ALTER TABLE `user` CHANGE `phoneNum` `telPhone` VARCHAR(20);

# 4.修改字段的类型
ALTER TABLE `user` MODIFY `name` VARCHAR(30);

# 5. 删除字段
ALTER TABLE `user` DROP `age`;

## 用一个表结构创另一张表
CREATE TABLE `user1` LIKE `user`;

## 用一个表的内容创另一张表(不会复制约束,表结构的本质不会复制)

CREATE TABLE `user2` ( SELECT * FROM `user` );

## 根据另一个表中的所有内容,创建一个表



DROP TABLE IF EXISTS `moment`; # 删除表

DESC students; # 查看表结构

SHOW CREATE TABLE `students`; # 查看创表语句

