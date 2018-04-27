# gismap

#### 项目介绍
基于ArcGIS For Javascript 以及springboot 制作的地图服务独立项目

#### 软件架构
软件架构说明
springboot
springboot data jpa

###配置说明
需要修改配置的地方有：
1、application.properties ,此处定义全局变量若干
2、proxy.config ,此处定义gis代理指向的目标服务器
3、arcmaps-config.js ,此处指定gis 页面要加载的服务，指定js库加载的路径
4、页面参数若干，主要为获取全局变量，设置请求路径ctx,ctxStatic 路径