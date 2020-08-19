# 安装 Gitlab



<a name="Kamg2"></a>
## 1. 拉取 Gitlab 镜像

<br />这里我们拉取最新的gitlab-ce镜像
```shell
docker pull gitlab/gitlab-ce
```


<a name="avd3n"></a>
## 2. 创建 Gitlab 容器

<br />我们使用 `docker run` 命令启动一个新的 Gitlab 容器
```shell
mkdir /home/gitlab #创建Gitlab工作目录

docker run -itd -p 443:443 \
-p 8899:8899 \
-p 333:333 \
--name gitlab \
--restart always \
-v /home/gitlab/config:/etc/gitlab \
-v /home/gitlab/logs:/var/log/gitlab \
-v /home/gitlab/data:/var/opt/gitlab \
gitlab/gitlab-ce
```
> --restart: 当 Docker 重启时，容器自动启动，否则就需要使用 docker restart 启动
> gitlab端口映射规则：最好内外端口映射一致，gitlab 会根据你的配置文件调整服务端口。如外部访问8899，内外都配置8899
> 一般Gitlab有三个端口要使用：ssh，https，主服务地址。
> ssh默认是22，这里我改为了333，下方配置文件内也要改为333


<br />然后我们在防火墙添加 `333` 和 `8899` 端口的放行，并重载防火墙
```shell
firewall-cmd --zone=public --add-port=333/tcp --permanent
firewall-cmd --zone=public --add-port=8899/tcp --permanent
systemctl reload firewalld
```


<a name="2QAXB"></a>
## 3. 修改Gitlab配置文件

<br />容器启动后，我们需要修改 `Gitlab` 配置文件，修改 `Gitlab` 主服务地址和 `SSH` 服务地址
```shell
vi /home/gitlab/config/gitlab.rb
```

<br />在文件内增加三条配置：<br />

- external_url: 外部服务访问地址
- gitlab_rails['gitlab_ssh_host']：SSH代码拉取地址
- gitlab_rails['gitlab_shell_ssh_port']：SSH代码拉取端口
```ruby
external_url 'http://外部访问域名/地址:端口'
gitlab_rails['gitlab_ssh_host'] = 'SSH外部访问域名/地址'
gitlab_rails['gitlab_shell_ssh_port'] = 333
```


<a name="eJqa5"></a>
### 如果修改SSH端口

<br />SSH 默认的端口是 `22` 。这里内外分开，将Gitlab容器内SSH端口改为了 `333` 。<br />
<br />先进入 Gitlab 容器，直接编辑 `/assets/sshd_config` 和 `/etc/ssh/sshd_config` 这两个文件即可。修改最上方的 `Port` 字段。
```shell
docker exec -it gitlab /bin/bash
vim /assets/sshd_config
vim /etc/ssh/sshd_config
```

<br />接着重启 Gitlab
```ruby
docker restart gitlab
```
<a name="RACMq"></a>
## 4. 启动 Gitlab

<br />访问 `宿主机:端口` ，查看Gitlab启动情况，如果显示 `502` ，则代表正在启动中。第一次启动时间可能会有些长。如显示以下界面，代表启动成功。<br />
<br />修改密码后，默认管理员是  admin ，登录进入即可<br />![image.png](http://img.zhufengpeixun.cn/cicd_31.png)<br />![image.png](http://img.zhufengpeixun.cn/cicd_32.png)





