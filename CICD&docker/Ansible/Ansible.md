# Ansible 介绍与安装



<a name="bl4wg"></a>
## 啥是 Ansible

<br />我们先看网络上对它的解释：
> `Ansible` 是一款简单的运维自动化工具，只需要使用 `ssh` 协议连接就可以来进行系统管理，自动化执行命令，部署等任务。


<br />显而易见， `Ansible` 拿来做服务器部署再合适不过。只需要**预制好一份主机清单和要执行的命令步骤**，就可以实现**对一个清单的全部或部分主机远程****批量执行命令**。<br />

<a name="68lp4"></a>
## 对比 Jenkins

<br />和 `Jenkins` 做服务部署对比， `Ansible` 更适合批量执行。<br />以前我们在 `Jenkins` 做部署，就是脚本执行 `ssh` 命令远程执行命令。**如果有大量的服务器，那么我们的脚本会写很长，且灵活度会变差**。<br />
<br />`Ansible` 还支持**无阻塞异步批量执行命令**，非常方便。**<br />

<a name="76DmZ"></a>
## 安装 Ansible


<a name="pRAwn"></a>
### 使用 Dockerfile 制作镜像

<br />`Ansible` 目前的部署方式没有 `Docker` 安装，但我们可以定制一份 `Ansible` 镜像。<br />
<br />因为 `Ansible` 批量执行服务器时，还是采用的 `ssh` 进行操作，所以我们还是需要配置公钥私钥。**我们可以找一个已经在目标服务器配置过的公钥，和它配套的私钥一起打到 **`**Ansible**`**镜像内。这样我们就可以实现 `Ansible` 免密登录。**<br />
<br />但是，ssh连接时还涉及到一个叫做 `known_hosts` 文件。这个文件的主要作用是：<br />

> 当你用ssh连接到一个新的服务器的时候，ssh会让你确认服务器的信息（域名、IP、公钥），如果你确认了，就会将其写到 known_hosts 文件内。
> 以后你再连接到这个服务器，但是信息改变了（通常是公钥改变了），就会提示你服务器信息改变了，你可以把服务器信息它从 known_hosts 里删除，然后重新确认一份新的服务器信息。


<br />但是在我们这里该文件作用不大，我们就可以在 `Ansible` 内配置 `host_key_checking = False` 和 `host_key_checking = False` 这两个选项来关闭这个校验（下方dockerfile内有写）。**直接使用公钥私钥配对成功就可以进行连接。**我们将公钥私钥放在 `ssh` 文件夹内即可：<br />![image.png](https://images.gitee.com/uploads/images/2020/0802/201129_27ee82e5_1720749.png)<br />除了公钥私钥外，我们还需要准备一份 `主机清单`，命名为 `hosts`。**清单里面声明了要批量执行的主机。**这里可以先简单写一下，下一章我们会详细描述清单的语法格式。**最简单的****格式使用中括号声明主机组名称，换行写IP即可。**如下：
```shell
vim ./hosts
```
```shell
[fe-servers]
172.16.81.151
172.16.81.152
```
![image.png](https://images.gitee.com/uploads/images/2020/0802/203958_e3044cd9_1720749.png)<br />
<br />这里我们使用 `Centos7` 做镜像底座，用 `Dockerfile` 做镜像：
```dockerfile
FROM centos:7
# 安装必要依赖，openssh-clients是为了支持ssh连接
RUN yum -y install wget curl vim openssh-clients
RUN wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
RUN yum clean all
RUN yum makecache
# 拷贝公钥私钥进镜像内
COPY ssh /root/.ssh/
# 公钥私钥赋权
RUN chmod 755 ~/.ssh/
RUN chmod 600 ~/.ssh/id_rsa ~/.ssh/id_rsa.pub
# 安装 ansible
RUN yum -y install ansible
# 拷贝主机组清单进 ansible 目录
COPY hosts /etc/ansible/
# 关闭 known_hosts 校验
RUN sed -i 's/^#host_key_checking = False/host_key_checking = False/' /etc/ansible/ansible.cfg
RUN ansible --version
```
使用 `docker build` 命令打包为镜像，版本为t1：
```shell
docker build -t ansible:t1 .
```


<a name="pfHiQ"></a>
### 启动容器并测试

<br />等待 `build` 完成后，使用 `docker run` 命令启动容器：
```shell
docker run -itd --name ansible ansible:t1
```
> 因为ansible并没有可视化界面，所以不需要分配端口


<br />启动后，使用 `docker exec` + `ansible command` 命令测试 `ansible` 安装，并远程执行一个命令测试：
```shell
docker exec -it ansible ansible all -m command -a "chdir=~ docker ps"
```
> ansible all: 代表匹配所有主机组的所有主机
> command：Ansible 命令模块。代表执行一个命令
> chdir=~：chdir 在哪里执行命令
> docker ps：查看正在跑的docker容器


<br />执行成功后，如下图（我的主机组配置了2台机器，一台可以连接另一台不存在）：<br />![image.png](https://images.gitee.com/uploads/images/2020/0802/201158_ef758193_1720749.png)<br />
<br />到这里，我们的 `Ansible` 就安装成功
