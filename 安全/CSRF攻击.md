# CSRF

跨站请求伪造（CSRF）是一种冒充受信任用户，向服务器发送非预期请求的攻击方式。
例如，这些非预期请求可能是通过在跳转链接后的 URL 中加入恶意参数来完成:

CSRF攻击并不需要将恶意代码注入用户当前页面的html文档中，而是跳转到新的页面，利用服务器的验证漏洞和用户之前的登陆状态来模拟用户进行操作

## 案例

```html
<img src="https://www.example.com/index.php?action=delete&id=123">
```

对于在 `https://www.example.com` 有权限的用户，
这个` <img>` 标签会在他们根本注意不到的情况下对 `https://www.example.com` 执行这个操作，
即使这个标签根本不在 `https://www.example.com `内亦可。

## 预防

#### Token

#### SameSite Cookie属性

```
Set-Cookie: JSESSIONID=xxxxx; SameSite=Strict
Set-Cookie: JSESSIONID=xxxxx; SameSite=Lax
```

> SameSite可以设置为三个值，Strict、Lax和None。

1.在Strict模式下，浏览器完全禁止第三方请求携带Cookie。比如请求zhufeng.com网站只能在zhufeng.com域名当中请求才能携带 Cookie，在其他网站请求都不能。
2.在Lax模式，就宽松一点了，但是只能在 get 方法提交表单况或者a 标签发送 get 请求的情况下可以携带 Cookie，其他情况均不能。
3.在None模式下，也就是默认模式，请求会自动携带上 Cookie。

#### Origin / Referer头

验证来源站点

这就需要要用到请求头中的两个字段: Origin和Referer。 其中，Origin只包含域名信息，而Referer包含了具体的 URL 路径。 当然，这两者都是可以伪造的，通过 Ajax 中自定义请求头即可，安全性略差。



#### 实现restful接口