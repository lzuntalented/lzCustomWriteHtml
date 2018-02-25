# lzCustomWriteHtml
> 让书写html标签变得更有趣，更简洁

## 项目结构
```
output   ------------- 输出文件
src      |------------- 项目代码
tpl      ------------- 模板文件
```
## 使用
``` 
node index.js 路径 语言
路径：可以为文件
      也可以是目录，此时遍历目录下文件，逐个解析
语言：解析模板使用的配置文件，当前项目支持zh-cn(中文)
```
## 示例
> 在项目路径下执行命令
```
node src/index.js zh zh-cn
```
模板文件内容：
```
容器
    链接
        !a
    粗体[class=1231,style=color:red;data-id=id]
        1级标题
            我是标题

容器
    输入框[value=12312]
    三栏布局
        列表项
            1
        列表项
            2
        列表项
            3


```
输出文件内容：
```
<div> 
<a> 
!a</a> 
<b class="1231" style="color:red;data-id=id" > 
<h1> 
我是标题</h1> 
</b> 
</div> 
<div> 
<input value="12312" > 
</input> 
<div> 
<div class="main"><li> 
1</li> 
</div><div class="left"><li> 
2</li> 
</div><div class="right"><li> 
3</li> 
</div></div> 
</div> 

```