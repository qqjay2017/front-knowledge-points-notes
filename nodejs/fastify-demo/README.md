# fastify的学习

#### 支持typescript

```shell
npm i typescript ts-node   @types/node -D
```

#### 支持环境变量

```
npm install dotenv
```

#### 开发监听


```
npm i concurrently @types/concurrently -D
```

-  watch-ts

```
tsc -w
```

- watch-node

```
nodemon dist/server.js
```

 - watch
 
```
"concurrently -k -p \"[{name}]\" -n \"TypeScript,Node\" -c \"cyan.bold,green.bold\"  \"npm run watch-ts\" \"npm run watch-node\"
```

## 控制器

1. 路径参数

```
/:id

```

2. 入参验证

> https://www.fastify.io/docs/latest/TypeScript/

```ts
app.get<{
    Querystring:IQuerystring
}>('/:id', {
    preValidation:(request, reply, done)=>{
        const { username , password} = request.query
        if(!username || !password){
            done(new Error('Must be admin'))

        }
        done()
    }
},(request, reply) => {
    console.log(request.query)
    reply.send({
        hello: '111'
    })
})
```


## ts类型

1. 控制器参数
```ts
app.get<{
    Querystring:IQuerystring
}>('/:id', (request, reply) => {
    console.log(request.query)
    reply.send({
        hello: '111'
    })
})
```

2. 控制器参数

```ts
    app.get('/', {
        schema:{
            querystring:{
                type: "object",
                properties:{
                    name:{
                        type:'number',

                    },
                    size:{
                        type:'number',
                        default:10
                    }
                },
                required:['name']
            }
        }
    },userRouter.index)
```

## 支持prisma

> https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-express/src/index.ts#L10
> https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project-typescript-postgres

1. 安装
```
npm install prisma -D

```

2. 设置环境变量

.env
```
DATABASE_URL="mysql://root:rootroot@101.32.10.202:3306/prisma"
```

3. turn your database schema into a Prisma data model.

```
npx  prisma db pull 
```

4. install Prisma Client

```
npx  prisma generate 
```

检查

```
npx prisma introspect
```

1. prisma安装.初始化,同步模型,client生成,数模检查
2. fastify整合prisma
3. prisma一对一 /一对多 / 多对多查询

sql模式

```
class UserService {
    async index(){

       const employees =  await prisma.$queryRaw`
       SELECT
            emp.emp_no,
            emp.birth_date,
            emp.first_name,
            emp.gender,
            dep.dept_name
            FROM
            employees AS emp 
            JOIN ( SELECT emp_no,dept_name FROM dept_emp INNER JOIN departments ON dept_emp.dept_no = departments.dept_no ) 
            dep ON emp.emp_no = dep.emp_no  LIMIT 10 OFFSET 0;
       `
        return employees
    }
}
```

> https://json-schema.org/
> https://kenve.github.io/understanding-json-schema

## 
1. 自定义异常处理
2. 了解JSON Schema,了解fastify集成json-schema,实验类型定义/默认值/必填值