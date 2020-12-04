```js
echo "# snake" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:qqjay2017/snake.git
git push -u origin master
```

```
$ git pull origin master
```

### 初始化git

```git config --global user.name "qqjay2017"```

初始化用户名

```
git config --global user.email "qqjay2013@gmail.com"
```


初始化邮箱

```
 ssh-keygen -t rsa -C "qqjay2013@gmail.com"
```

获取ssh

```ssh -T git@github.com```
测试



### 用git操纵本地仓库：

```git init``` : 创建一个本地仓库

`git add read.txt`： 把本地文件（工作区）添加到缓存区

`git add . `: 把本地所以文件全部添加到缓存区
    
```git commit -m 'describe message' ```：真正把缓存区的所有文件都添加到仓库上

`git status`： 查看git仓库当前的状态

`git diff read.txt`: 查看文件具体修改了哪里

`git log`：查看最近到最远提交到仓库的文件信息（一串数字为特有的时间序列id 可以根据它进行版本前后回滚）

`git reset --hard HEAD^`： 回退到上一次 commit的时候

`git reset --hard bdeacd`: 版本前进 只能根据 id进行前进（id只写出前六位就好了）

`git reflog`：查看每次操作仓库内的信息（commit） 这样的话当黑窗口没了的时候，也可以查询具体操作信息，进行版本回退或者前进!


```git checkout -- read.txt``` : 工作区恢复到最近一次的commit或者add

```git rm read.txt``` : 删除某一个文件


###分支

`git branch dev`: 创建dev分支

`git checkout dev`： 切换到dev分支上开发

`git branch`：查看所有分支

`git branh -d dev`：删除分支 （-D 强制删除）

`git merge dev`: 合并分支


如果在开发的过程中发现主分支master上右bug但正在开发的dev分支没开发完怎们办，切记一点不要在master分支上直接开发，保存dev工作现场回到master上创建解决bug的分支如issue分支解决完回到master分支把issue分支合并再回到dev恢复现场



`git stash`：保存工作现场；

`git pop`：恢复工作现场；

#### 本地仓库配合远程仓库进行操作-github

 * 首先要再github上创建远程仓库用来存储项目，和本地电脑达成信任关系（ssh）
 * 可以通过`git clone`远程仓库（`git clone git@github.com:HustCst/duyiApp.git`）或者通过`git remote add origin git@github.com:HustCst/duyiApp.git`，是本地仓库和远程仓库相关联，`git pull origin master`，本地才有master分支


 * 之后再本地master分支上的代码上传到 远程仓库上的master分支 第一次上传使用 `git push –u origin master`，之后可以简化命令，把-u去掉。（如果仓库里本身就有文件，但是我们不要了，而是想把远程的代码上传上去，我们可以通过 `git push origin master –f` 强行让master分支上的本地文件覆盖远程master分支上的文件）




