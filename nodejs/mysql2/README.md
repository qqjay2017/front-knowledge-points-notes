# mysql2的使用

> https://www.npmjs.com/package/mysql2



```s
npm install --save mysql2
```

## 模型生成

> https://www.npmjs.com/package/sequelize-auto

> https://sequelize.org/master/manual/migrations.html



#### 命令

```
sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect [dialect] -c [/path/to/config] -o [/path/to/models] -t [tableName]
```

```
sequelize-auto -o "./src/models" -d employees -h localhost -u root -x yourpassword  -p 3306  -e mysql  -t employees 
```

1. 全部生成

```
sequelize-auto -o "/Users/huangbo/front-knowledge-points-notes/nodejs/mysql2/src/models" -d employees -h localhost -u root -x yourpassword  -p 3306  -e mysql  
```

2. 指定表  -t
```
sequelize-auto -o "/Users/huangbo/front-knowledge-points-notes/nodejs/mysql2/src/models" -d employees -h localhost -u root -x yourpassword  -p 3306  -e mysql  -t departments 
```
3. 使用ts  -l ts

```
sequelize-auto -o "/Users/huangbo/front-knowledge-points-notes/nodejs/mysql2/src/models-ts" -d employees -h localhost -u root -x yourpassword  -p 3306  -e mysql   -l ts
```


多对多中间表的init


```js
    // 实际上要这两个就可以了, 
  departments.belongsToMany(employees, { as: 'emp_no_employees', through: dept_emp, foreignKey: "dept_no", otherKey: "emp_no" });
  employees.belongsToMany(departments, { as: 'dept_no_departments', through: dept_emp, foreignKey: "emp_no", otherKey: "dept_no" });

  // 中间表  下面的4个可以注释了
  dept_emp.belongsTo(departments, { as: "dept_no_department", foreignKey: "dept_no"});
  dept_emp.belongsTo(employees, { as: "emp_no_employee", foreignKey: "emp_no"});

  departments.hasMany(dept_emp, { as: "dept_emps", foreignKey: "dept_no"});
  employees.hasMany(dept_emp, { as: "dept_emps", foreignKey: "emp_no"});
  ```

一对多

```js
function initModels(sequelize) {
  var dept_manager = _dept_manager(sequelize, DataTypes);


// salaries

  salaries.belongsTo(employees, { as: "emp_no_employee", foreignKey: "emp_no"});
  employees.hasMany(salaries, { as: "salaries", foreignKey: "emp_no"});

  // title
  titles.belongsTo(employees, { as: "emp_no_employee", foreignKey: "emp_no"});
  employees.hasMany(titles, { as: "titles", foreignKey: "emp_no"});

  return {
    dept_manager,
  };
}
```




#### 多表


1. 员工+title

```js
       const employees = await models.employees.findOne({
            where: {
                emp_no: 13100
            },
            include:[
                {
                    model:models.salaries,
                    as:'salaries'
                },
                {
                    model:models.titles,
                    as:'titles'
                },
            ]
    

        })
```