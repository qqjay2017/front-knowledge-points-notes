# ssh

https://www.cnblogs.com/ls-pankong/p/12248032.html

#### 本地用xshell生成密钥

选1024,导出的是私钥,

#### 公钥复制到服务器

/root/.ssh/authorized_keys

#### ssh指定密钥

ssh root@192.168.79.131 -i ~/.ssh/id_rsa_1024

#### 服务器添加密钥

`chmod 600 ~/.ssh/id_rsa_1024`
`chmod 600 ~/.ssh/id_rsa_1024.pub`
`ssh-agent bash`
`ssh-add -L`
`ssh-add ~/.ssh/id_rsa_1024.pub`


## 生成github密钥



`$ ssh-keygen -t rsa  -C "qqjay2013@gmail.com" `
