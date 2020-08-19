# Ansible 内的概念



<a name="1KviY"></a>
## 基础命令

<br />安装好 `Ansible` 后，使用 `ansible` 命令即可完成基础操作。例如以下命令可以测试你的所有主机的连通性：
```shell
ansible all -m ping
```
> `-m` 代表使用 `ansible`  某个模块，后紧跟模块名
> all代表匹配所有主机组，这里也可以传入指定的主机组名称。


<br />如果想查看有哪些模块：
```shell
ansible-doc -l
```

<br />想查看模块的具体帮助，比如fetch模块：
```shell
ansible-doc -s fetch
```


<a name="LTspC"></a>
## Modules 模块


<a name="mqApu"></a>
### copy
文件拷贝模块：将 `Ansible` 主机下的目录拷贝到目标机器。例如将 `Ansible` 主机内的  `/testdir/copytest` 目录拷贝到目标机器 `/opt` 下。
```shell
ansible all -m copy "src=/testdir/copytest dest=/opt"
```
<a name="5f7fm"></a>
### file
文件操作模块：可以对目标机器进行新建和删除文件。例如：
```yaml
ansible all -m file -a "path=/testdir/testfile state=touch"
```
> 在目标机器下新建 /testdir/testfile 文件

```yaml
ansible all -m file -a "path=/testdir/testfile state=absent"
```
> 在目标机器下删除 /testdir/testfile 文件



<a name="kGz9q"></a>
### find
文件查找模块：可以查找目标机器内的文件。例如查找 `/testdir` 文件夹下包含 `abc` 字符串的文件：
```yaml
ansible all -m find -a 'paths=/testdir contains=".*abc.*"'
```


<a name="yVipe"></a>
### replace
文件内容替换模块：可以在指定文件中通过正则匹配指定内容进行替换。例如在 `/testdir/test` 文件内，查找符合正则 `abc` 的内容，替换为 `buck`
```yaml
ansible all -m replace -a 'path=/testdir/test  regexp="abc" replace=buck'
```


<a name="VMj0d"></a>
### command
命令模块：可以在目标机器内执行命令。<br />**和shell命令不同的是，shell中的 **`**<**` **, **`**>**` **, **`**|**` **, **`**;**` **, **`**&**` **, **`**$**` **等特殊字符不能在command模块中使用，如果需要使用，则用shell模块。**<br />例如：
```yaml
ansible all -m command -a "chdir=/testdir ls"
```
> 在目标机器 /testdir 目录下执行 ls命令


<br />更详细的介绍，可以参考：[**链接**](https://www.cnblogs.com/yanjieli/p/10969143.html)<br />

<a name="rrwiG"></a>
## Inventory 主机清单

<br />主机清单是 `Ansible` 最基础的概念，它声明了 `Ansible` **到底在哪些机器上执行命令**。主机清单默认是 `/etc/ansible/hosts` 文件。<br />主机清单语法花样也很多。**不仅可以保存主机清单，还可以定义主机密码，授权方式等其他信息**。<br />
<br />一般在 `Ansible` 内，都是以 `组` 为集合管理主机。被称为 `主机组` ，一个主机组内有许多主机。<br />
<br />最简单的主机组声明：
```yaml
[apache]
192.168.1.36
192.168.1.33
```
其中， `apache` 是主机组名，下面是组内的主机IP。<br />

<a name="PFC1T"></a>
### 使用密码连接

<br />在主机组内，可以在清单内定义主机密码，端口等信息。
```yaml
# 方法一 主机+端口+密码
[webserver]
192.168.1.31 ansible_ssh_port=22 ansible_ssh_user=root ansible_ssh_pass="123456"
192.168.1.32 ansible_ssh_port=22 ansible_ssh_user=root ansible_ssh_pass="123456"
192.168.1.33 ansible_ssh_port=22 ansible_ssh_user=root ansible_ssh_pass="123456"
192.168.1.36 ansible_ssh_port=22 ansible_ssh_user=root ansible_ssh_pass="123456"


# 方法二 主机+端口+密码
[webserver]
192.168.1.3[1:3] ansible_ssh_user=root ansible_ssh_pass="123456"


# 方法二 主机+端口+密码
[webserver]
192.168.1.3[1:3]
[webserver:vars]
ansible_ssh_pass="123456"
```
> 192.168.1.3[1:3]：代表 192.168.1.31 和 192.168.1.33



<a name="YeUMY"></a>
### 使用密钥连接

<br />当然，最常用的就是密钥连接服务器。这种情况下，我们只需要定义最简单的主机组，将Ansible机器公钥在目标机器配置即可。<br />
<br />更多花样玩法 => [https://www.cnblogs.com/yanjieli/p/10969089.html#380920160](https://www.cnblogs.com/yanjieli/p/10969089.html#380920160)<br />
<br />**
<a name="46YWX"></a>
## Playbook 任务剧本

<br />任务剧本（任务集），yaml格式文件，定义 Ansible 任务的配置文件。作用有点像 `Dockerfile` 。**是一组任务的集合声明文件**<br />示例如下：
```yaml
---
- hosts: all
  remote_user: root
  vars:
    timestamp: 20200625233149
  tasks:
    - name: docker pull new images
      shell: 'chdir=~ docker pull 172.16.81.150:8082/fe/nginx-fe-{{timestamp}}'
    - name: docker rmf
      shell: 'chdir=~ docker ps | grep jenkins-test && docker rm -f jenkins-test'
      ignore_errors: true
    - name: docker run
      shell: 'chdir=~ docker run -p 80:80 -itd --name jenkins-test 172.16.81.150:8082/fe/nginx-fe-{{timestamp}}'
      
```

- hosts: 指定在哪个主机组执行该任务集合。 `all` 代表全部主机
- remote_user: 使用哪个用户进行远程执行
- vars: 定义变量的地方。在下方任务命令中可以使用 `{{ varName }}` 使用变量
- tasks: 任务集合
- shell: `Ansible` 的 `shell` 模块，上面有讲解模块的作用和类型。后面跟着模块的命令


<br />更详细的语法：[https://www.cnblogs.com/yanjieli/p/10969299.html](https://www.cnblogs.com/yanjieli/p/10969299.html)<br />

<a name="pxYoT"></a>
### 执行 Playbook

<br />可以使用 `ansible-playbook` 命令执行 `playbook` ：
```shell
ansible-playbook test.yml
```

<br />使用 `--syntax-check` 命令测试 playbook 语法是否正确
```shell
ansible-playbook --syntax-check test.yml
```

<br />测试playbook执行（并不会真的在主机组上执行，只是模拟）：
```shell
ansible-playbook --check test.yml
```

<br />替换playbook中默认的变量值，并执行playbook。在这种情况下，**命令行传入参数 > 默认值**：
```shell
ansible-playbook -e "timestamp=212123323" test.yml
```


