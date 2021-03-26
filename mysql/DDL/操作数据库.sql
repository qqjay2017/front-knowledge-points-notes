# 查询所有的数据库
SHOW DATABASES; # 显示所有数据库
USE bili;# 选择某个数据库
SELECT DATABASE
	( );# 查看当前使用的数据库
CREATE DATABASE
IF
	NOT EXISTS douyu;# 创建数据库
CREATE DATABASE
IF
	NOT EXISTS huya DEFAULT CHARACTER 
	SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;# 创建数据库时候指定编码
DROP DATABASE
IF
	EXISTS douyu;# 删除数据库
ALTER DATABASE bili CHARACTER 
SET = utf8 COLLATE = utf8_unicode_ci;# 修改数据库编码