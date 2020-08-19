# docker命令

`$ docker --version`

`$ docker run hello-world`

`$ docker run --detach --publish=8080:80 --name=webserver nginx`

--detach:Run container in background and print container ID,要求Docker在后台运行此容器

 --pushlish表示端口映射(本地8080映射到镜像的80),Publish a container's port(s) to the host,端口8000传入的流量转发到容器的端口8080。容器具有自己的专用端口集，因此，如果要从网络访问某个端口，则必须以这种方式将流量转发到该端口。否则，作为默认的安全状态，防火墙规则将阻止所有网络流量到达您的容器

## 查看容器列表

`$ docker container ls`  or  `$ docker ps`

## 停止和移除容器/镜像

`$ docker container ls`

`$ docker container stop webserver`

`$ docker rm --force bb`

该`--force`选件停止正在运行的容器，因此可以将其删除。如果先停止运行该容器`docker stop bb`，则无需使用`--force`来删除它。

`$ docker container rm webserver`

`$ docker image ls`

`$ docker image rm nginx`

## 开发容器化的应用程序

#### 首先创建Docker映像，为应用程序的每个组件创建和测试单独的容器。

###### Dockerfile

```dockerfile
FROM node:current-slim

WORKDIR /usr/src/app
COPY package.json .
RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 8080
CMD [ "npm", "start" ]

COPY . .%  
```

- 启动`FROM`先前存在的`node:current-slim`图像。这是由node.js供应商构建的*官方映像*，并已由Docker验证为包含Node.js长期支持（LTS）解释器和基本依赖项的高质量映像。
- 使用`WORKDIR`指定的后续操作应该从目录中取`/usr/src/app` *你的映像文件系统*（从主机的文件系统）。
- `COPY``package.json`从您的主机到`.`图像中当前位置（）的文件（因此在此情况下为`/usr/src/app/package.json`）
- `RUN``npm install`映像文件系统内的命令（将读取该命令`package.json`以确定应用程序的节点依赖性，并进行安装）
- `COPY` 在应用程序其余部分的源代码中，从主机到图像文件系统。

###### 构建

`$ docker build --tag bulletinboard:1.0 .`

###### 运行

`$ docker run --publish 8080:8080 --detach --name bb bulletinboard:1.0`



1. 将您的容器和支持基础结构组装成一个完整的应用程序。
2. 测试，共享和部署完整的容器化应用程序。

## mmongodb镜像

`$ docker pull mongo`

`$ docker run --name mongo -d mongo:latest `

`$ docker run --detach --publish 27017:27017 --name mongo -d mongo:latest`

###### 容器外壳访问和查看MongoDB日志

```shell
$ docker exec -it some-mongo bash
```

可通过Docker的容器日志获取MongoDB服务器日志：

```shell
$ docker logs some-mongo
```

## 安装ubuntu

`$ docker pull ubuntu`

`$ docker run -ti ubuntu bash`

`$ docker run -it -d --name myubuntu -p 8088:80 ubuntu`

