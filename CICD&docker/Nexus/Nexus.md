# Nexus 制品库的介绍与安装

<a name="hyuwz"></a>
## 
<a name="8Nx0l"></a>
## 介绍

<br />在前面我们写到，制品库是**承接CI构建后的产出制品的****仓库****。**具有版本管理，历史管理，权限校验等功能。<br />在这里，我们选用 **Nexus3** 作为制品库。

<a name="akuyx"></a>
## 拉取 Neuxs 镜像

<br />老规矩，先拉取nexus镜像。命令不多解释：
```shell
docker pull sonatype/nexus3
```


<a name="9Km51"></a>
## 启动 Nexus 容器

<br />在 `/home` 下面新建一个名为 `nexus` 的文件夹，方便我们存放 `Nexus` 相关数据。并赋予权限
```shell
mkdir /home/nexus && chown -R 200 /home/nexus
```

<br />然后启动容器。
```shell
docker run -d -p 8081:8081 -p 8082:8082 \
--name nexus \
-v /home/nexus:/nexus-data \
--restart always \
sonatype/nexus3
```
> Nexus 的主服务端口是8081，但 Nexus Docker 制品库还需要分配一个新的端口作为服务端口。
> 这里没有演示分配哪个端口，想分配自己加 -p 参数即可。在这里我使用8082作为 docker 服务端口


<br />将8081，8082端口添加到防火墙规则内：
```shell
firewall-cmd --zone=public --add-port=8081/tcp --permanent
firewall-cmd --zone=public --add-port=8082/tcp --permanent
```
<a name="3yPUc"></a>
## 
<a name="mRcQO"></a>
## 访问 Nexus

<br />打开浏览器地址栏，访问 `Nexus` 的服务地址。启动时间比较长，需要耐心等待。可以使用 `docker logs` 命令查看启动日志。如果显示以下文字，代表启动成功。
```shell
docker logs -f nexus
```
![image.png](https://images.gitee.com/uploads/images/2020/0731/104138_0f9fb965_1720749.png)<br />
<br />![image.png](https://images.gitee.com/uploads/images/2020/0731/104139_40c19ae1_1720749.png)<br />

<a name="sKjiy"></a>
## 配置 Nexus

<br />启动成功后，会显示上图提示文字。需要我们输入 `默认密码` 初始化配置。可以在这里找到：
```shell
cat /home/nexus/admin.password
# 6cd3cb39-2479-48ca-8ca0-831342b6f29d
```
将获取到的密码输入进去，用户是 `admin` 。<br />
<br />修改新密码后，会进入到这一步。这一步的意思是 **"是否开启匿名访问"**。匿名访问是指：**我们在任何没有登录的情况下，拉取（推送）制品到制品库，都算匿名访问。**这是个很便捷，也很危险 ⚠️ 的行为。

例如，这个制品库也支持 node 的 `NPM` 私有库。那么我们在没有 `npm login` 这个制品库之前，就可以进行 `npm install` `npm publish` ，其实是不太安全的。那么任何一个知道制品库地址的人，都可以任意进行推送和获取资源。<br />**<br />**这里我们为了测试，可以先允许开启匿名访问。**选择 **`Enable anonymous access` ，**点击下一步。<br />![image.png](https://images.gitee.com/uploads/images/2020/0731/104139_7bd529c2_1720749.png)<br />
<br />

<a name="JIiro"></a>
## 创建一个 Docker 私服

<br />我们使用有权限的账号登录后，点击页面头部导航栏的 `齿轮` 图标，选择左侧菜单中的 `Repositories` ，点击 `Create repository` 。<br />![image.png](https://images.gitee.com/uploads/images/2020/0731/104138_6499abf2_1720749.png)<br />
<br />点击后，我们可以看到一个列表，这就是Nexus所支持的制品库类型。其中有我们要使用的Docker，也有熟悉的 Npm。我们在里面找到 Docker：<br />![image.png](https://images.gitee.com/uploads/images/2020/0731/104139_b41f3dab_1720749.png)<br />
<br />但是 `Docker` 有三种，该选哪个呢？<br />

<a name="y6pps"></a>
### 制品库的类型

<br />在Nexus中，无论什么制品库，一般分为以下三种类型：<br />

- proxy: 此类型制品库原则上 **“只下载，不允许用户推送”**。可以理解为缓存外网制品的制品库。例如，我们在拉取nginx镜像时，如果通过proxy类型的制品库，则它会去创建时配置好的外网docker镜像源拉取（有点像cnpm）到自己的制品库，然后给你。第二次拉取，则不会下载。起到 `缓存` 的作用。
- hosted：此类型制品库和proxy相反，原则上 **”只允许用户推送，不允许缓存“ 。**这是私有库的核心，只存放自己的私有镜像或制品。
- group：此类型制品库用作以上两种类型的 **“集合” **，将上面两个库集合为一个使用。

<br />
<a name="FCiZX"></a>
### 表单解释

<br />在这里，我们其实不需要缓存外网镜像，那么我们只需要 hosted类型 即可。选择 docker(hosted)。

我们将启动Nexus镜像时，配置好的 Docker 端口填入HTTP 内，可以先允许匿名拉取镜像。<br />![image.png](https://images.gitee.com/uploads/images/2020/0731/104139_84af3349_1720749.png)<br />填写完成后，点击最下方的 **Create repository，**保存创建。<br />

<a name="vaSxy"></a>
### 成功

<br />找到我们刚刚创建的制品，点击上面的** copy**，查看地址。<br />![image.png](https://images.gitee.com/uploads/images/2020/0731/104340_bde43825_1720749.png)<br />

<a name="uwzoa"></a>
## 登录制品库

<br />私服建设完成后，还需要在客户端配置一下才可以使用。<br />找到 `daemon.json` 文件，该文件描述了当前docker配置的镜像加速地址，和配置过的私服地址。
```shell
vim /etc/docker/daemon.json
```

<br />找到 `insecure-registries` 字段，如果不存在就自己添加一个。值是数组类型，添加一条你的制品库地址。例如：
```json
{
  "insecure-registries" : [
    "172.16.81.150:8082"
  ],
}
```
> 这里注意，nexus显示的镜像库端口为nexus服务端口，要替换为自己配置的端口才有效。


<br />保存退出，重启 Docker
```shell
systemctl restart docker
```

<br />接着使用 `docker login` 命令尝试登录：
```shell
docker login 服务IP:端口
```

<br />如果提示：**Login Succeeded **则代表登录成功。<br />![image.png](https://images.gitee.com/uploads/images/2020/0731/104138_bcd7a3af_1720749.png)<br />

<a name="LAOkK"></a>
## 推送镜像到制品库

<br />在这里，我们使用 `docker push` 命令推送一个本地的镜像到远程制品库。<br />还记得在我们前面安装 `Jenkins` 时，使用过 `DockerFile` 生成了自己的 `Jenkins` 镜像 -`local/jenkins` 。所以我们可以尝试，将 `local/jenkins`推送到制品库。<br />
<br />但是，docker在推送一个镜像时，**镜像的 Tag (名称:版本号) 必须开头带着镜像库的地址，才可以推送**。例如下面两个镜像：<br />🙅 local/jenkins 不能推送<br />🙆 172.16.81.150:8082/local/jenkins 可以推送。<br />
<br />那我们怎么才能推送上去呢？

1. 制作一份带镜像库地址的镜像：这个可以做，但是开销太大，需要走一遍制作流程
1. 使用 docker tag 命令给已有的镜像打个标签：推荐使用，会将已有的镜像归位某个镜像库内。如下面格式
```shell
# docker tag <镜像ID> 新镜像名称[:版本]
docker tag bd695e3e4317 172.16.81.150:8082/local/jenkins
```
> 查看服务器上的docker镜像列表，可以使用docker images查看


<br />这样，就可以重新打一个全新的tag，实现 “重命名” 功能。<br />![image.png](https://images.gitee.com/uploads/images/2020/0731/104637_c1e26e46_1720749.png)<br />
<br />接着我们使用 `docker push` 命令进行推送：
```shell
docker push 172.16.81.150:8082/local/jenkins
```
![image.png](https://images.gitee.com/uploads/images/2020/0731/104139_ed992f30_1720749.png)<br />
<br />到这里，就代表推送成功。

