INSERT INTO coderhub.products VALUES (110,'title1','描述啊',30.3,'2020-03-10'); # 插入数据,一般不会这样

INSERT INTO coderhub.products ( `title`, `description`, `price`, `publishTime` )
VALUES
	( 'title2', '描述2', 32.3, '2020-03-12' );


# createTime 新增的时候自动设置值
ALTER TABLE `products` MODIFY `createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

# updateTIme 在修改时候自动更新
ALTER TABLE `products` MODIFY `updateTIme` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

# updateTIme 也加上默认值
ALTER TABLE `products` MODIFY `updateTIme` TIMESTAMP DEFAULT CURRENT_TIMESTAMP  ON UPDATE CURRENT_TIMESTAMP;