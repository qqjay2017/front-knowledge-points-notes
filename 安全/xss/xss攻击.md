# xss攻击

XSS 的本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。
而由于直接在用户的终端执行，恶意代码能够直接获取用户的信息，或者利用这些信息冒充用户向网站发起攻击者定义的请求。
XSS攻击可分为三类：存储stored（也称为持久性），反射reflected（也称为非持久性）或基于DOM。


 > 资料: https://tech.meituan.com/2018/09/27/fe-security.html

## XSS类型
| 类型       | 存储区(恶意代码存放的位置) | 插入点(谁取得恶意代码，并插入到网页上) |
| ---------- | -------------------------- | -------------------------------------- |
| 存储型 XSS | 后端数据库                 | HTML                                   |
| 反射型 XSS | URL                        | HTML                                   |
| DOM 型 XSS | 后端数据库/前端存储/URL    | 前端 JavaScript                        |


#### 存储型 XSS

存储型 XSS 的攻击步骤：

- 攻击者将恶意代码提交到目标网站的数据库中。
- 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。
- 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
- 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。

#### 反射型 XSS


反射型 XSS 的攻击步骤：

 - 攻击者构造出特殊的 URL，其中包含恶意代码。
 - 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
 - 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
 - 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等。


#### DOM 型 XSS

DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。




## XSS防护

> https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html

> https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html



#### 预防存储型和反射型 XSS 攻击

存储型和反射型 XSS 都是在服务端取出恶意代码后，插入到响应 HTML 里的，攻击者刻意编写的“数据”被内嵌到“代码”中，被浏览器所执行。

预防这两种漏洞，有两种常见做法：

 - 改成纯前端渲染，把代码和数据分隔开。静态HTML,JavaScript 通过 Ajax 加载业务数据
 - 对 HTML 做充分转义。
 - 不要相信任何用户的输入,无论是在前端还是后端
 - 利用HttpOnly,设置Cookie的HttpOnly属性后，JavaScript便无法读取Cookie的值，这样也很好的防范XSS攻击。

#### 预防 DOM 型 XSS 攻击

DOM 型 XSS 攻击，实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。

在使用 `.innerHTML`、`.outerHTML`、`document.write()` 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，
而应尽量使用 `.textContent`、`.setAttribute() `等。

如果用 Vue/React 技术栈，并且不使用` v-html/dangerouslySetInnerHTML` 功能，
就在前端 render 阶段避免 `innerHTML`、`outerHTML` 的 XSS 隐患。

DOM 中的内联事件监听器，如 `location`、`onclick`、`onerror`、`onload`、`onmouseover` 等，`<a>` 标签的 href 属性，
JavaScript 的 `eval()`、`setTimeout()`、`setInterval()` 等，都能把字符串作为代码运行。
如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。



#### 案例

有人提供的图像实际上不是图像（例如，在未经过滤的聊天或论坛中），实际上是向银行服务器提款的请求
如果您登录到您的银行帐户并且您的cookie仍然有效（并且没有其他验证），则在加载包含该图像的HTML时，您将立即进行汇款。

```html
<img src="https://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory">
```


对于需要POST请求的端点，可以在页面加载时以编程方式触发`<form>`提交（也许在不可见的`<iframe>`中）

```html
<form action="https://bank.example.com/withdraw" method="POST">
  <input type="hidden" name="account" value="bob">
  <input type="hidden" name="amount" value="1000000">
  <input type="hidden" name="for" value="mallory">
</form>
<script>window.addEventListener('DOMContentLoaded', (e) => { document.querySelector('form').submit(); }</script>

```

#### QQ 邮箱 m.exmail.qq.com 域名反射型 XSS 漏洞

攻击者发现 `http://m.exmail.qq.com/cgi-bin/login?uin=aaaa&domain=bbbb `这个 URL 的参数`uin`、`domain` 未经转义直接输出到 HTML 中。

于是攻击者构建出一个 URL，并引导用户去点击： `http://m.exmail.qq.com/cgi-bin/login?uin=aaaa&domain=bbbb%26quot%3B%3Breturn+false%3B%26quot%3B%26lt%3B%2Fscript%26gt%3B%26lt%3Bscript%26gt%3Balert(document.cookie)%26lt%3B%2Fscript%26gt%3B`

用户点击这个 URL 时，服务端取出 URL 参数，拼接到 HTML 响应中：

```
<script>
getTop().location.href="/cgi-bin/loginpage?autologin=n&errtype=1&verify=&clientuin=aaa"+"&t="+"&d=bbbb";return false;</script><script>alert(document.cookie)</script>"+"...
```

浏览器接收到响应后就会执行 alert(document.cookie)，攻击者通过 JavaScript 即可窃取当前用户在 QQ 邮箱域名下的 Cookie ，进而危害数据安全。