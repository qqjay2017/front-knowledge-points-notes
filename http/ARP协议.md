ARP
address resolution Protocol,地址解析协议,处理链路层和物理层之间的

 - 是根据IP地址获取物理地址(MAC地址)的一个TCP/IP协议
 - 主机发送信息时将包含目标IP地址的ARP请求广播到网络上的所有主机，并接收返回消息，以此确定目标的物理地址；收到返回消息后将该IP地址和物理地址存入本机ARP缓存中并保留一定时间，下次请求时直接查询ARP缓存以节约资源
 - 由此攻击者就可以向某一主机发送伪ARP应答报文，使其发送的信息无法到达预期的主机或到达错误的主机，这就构成了一个ARP欺骗

 ARP:我的ip,我的地址,我知道ip,我不知道--->回复我的ip,我的地址

RARP:我的ip,我的地址,我知道mac地址,我不知道ip地址--->回复我的ip,我的地址