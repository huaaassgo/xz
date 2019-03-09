const express=require('express');
const bodyParser=require('body-Parser');
const userRouter=require('./routes/user.js');
const productRouter=require('./routes/product.js');
const demo=require('./routes/demo.js');
const myPro=require('./routes/myPro.js');
//创建web服务器
var server=express();
server.listen(3000);
//托管静态资源到public目录下
server.use(express.static('public'));
server.use(express.static('myex'));
server.use(express.static('myPro'));
//使用bodyparser中间件将post请求数据解析为对象
//注意：要写在路由的前边
server.use(bodyParser.urlencoded({
	extended:false
}));
//把用户路由器挂载到/user
server.use('/user',userRouter);
//把商品路由器挂载到/product
server.use('/product',productRouter);
//ajax测试案例
server.use('/demo',demo);
server.use('/mypro',myPro);






