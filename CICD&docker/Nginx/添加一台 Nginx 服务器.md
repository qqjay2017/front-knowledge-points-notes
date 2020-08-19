# 添加一台 Nginx 服务器


<br />为了部署前端资源文件，我们另外启动一台服务器安装 Nginx。在Nginx之前，先安装 `Docker` <br />

<a name="btmEP"></a>
## 安装 Docker


<a href="https://gitee.com/zhufengpeixun/zhifengpro-cicd/blob/master/day02/%E7%AC%AC%E4%BA%8C%E5%A4%A9%E7%9A%84%E8%AF%BE%E9%A2%98_2.md">查看以前的内容</a>
## 安装Nginx

<br />这里的Nginx我们直接使用docker安装即可：
```shell
docker pull nginx
```

<br />接着启动一个 `Nginx` 容器，将配置文件，资源文件，日志文件挂载到宿主机的 `/home/nginx` 
```shell
mkdir /home/nginx
docker run -itd -p 80:80 --name jenkins-test \
  -v /home/nginx/html:/usr/share/nginx/html \
  -v /home/nginx/logs:/var/log/nginx \
  --restart always \
  nginx
```
![image.png](https://images.gitee.com/uploads/images/2020/0728/175521_944832e0_1720749.png)
