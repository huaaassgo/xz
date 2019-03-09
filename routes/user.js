//引入mysql连接池对象
const pool=require('../pool.js');
const express=require('express');
//创建空路由器
var router=express.Router();
//添加路由
//1.用户注册
router.post('/register',(req,res)=>{
	//获取post请求的数据
	var obj=req.body;
	//判断用户名是否为空
	var $uname=obj.uname;
	if(!$uname){
		res.send({code:401,msg:'uname require'});
		//阻止继续往后执行
		return;
	}
	//练习：验证密码，邮箱，手机是否为空
	var $upwd=obj.upwd;
	if(!$upwd){
		res.send({code:402,msg:'upwd require'});
		return;
	}
	var $email=obj.email;
	if(!$email){
		res.send({code:403,msg:'email require'});
		return;
	}
	var $phone=obj.phone;
	if(!$phone){
		res.send({code:404,msg:'phone require'});
		return;
	}
	//执行SQL语句，将注册的数据插入xz_user数据表,成功响应{code:200,msg:'register suc'}
	pool.query('INSERT INTO xz_user SET ?',[obj],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'register suc'});
		}
	})
});
//2.用户登陆路由
//url: /login method:post
//创建路由，获取请求的数据，验证数据为空 401，'uname require' 402,'upwd require'
router.post('/login',(req,res)=>{
	var obj=req.body;
	var $uname=obj.uname;
	if(!$uname){
		res.send({code:401,msg:'uname require'});
		return;
	}
	var $upwd=obj.upwd;
	if(!$upwd){
		res.send({code:402,msg:'upwd require'});
		return;
	}
	//执行SQL语句，查看是否登录成功(使用用户名和密码两个条件能查询到数据)
	pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		//判断查询的结果（数组）长度是否大于0
		if(result.length>0){
			res.send({code:200,msg:'login suc'});
		}else{
			res.send({code:301,msg:'login err'});
		}
	})
})
//3.用户检索
router.get('/detail',(req,res)=>{
	var obj=req.query;
	var $uid=obj.uid;
	if(!$uid){
		res.send({code:401,msg:'uid require'});
		return;
	}
	pool.query('SELECT * FROM xz_user WHERE uid=?',[$uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
		}else{
			res.send({code:301,msg:'detail err'});
		}
	})
})
//4.用户修改
router.post('/update',(req,res)=>{
	//获取数据，验证是否为空
	var obj=req.body;
	var $uid=obj.uid;
	var $email=obj.email;
	var $phone=obj.phone;
	var $gender=obj.gender;
	var $user_name=obj.user_name;
		if(!$uid){
		res.send({code:401,msg:'uid require'});
		return;
	}
		if(!$email){
		res.send({code:402,msg:'email require'});
		return;
	}
		if(!$phone){
		res.send({code:403,msg:'phone require'});
		return;
	}
		if(!$gender){
		res.send({code:404,msg:'gender require'});
		return;
	}
		if(!$user_name){
		res.send({code:405,msg:'user_name require'});
		return;
	}
	//执行SQl语句，修改用户表中对应的数据
	pool.query('UPDATE xz_user SET email=?,phone=?,gender=?,user_name=? WHERE uid=?',[$email,$phone,$gender,$user_name,$uid],(err,result)=>{
		if(err) throw err;
		//判断是否更改成功
		if(result.affectedRows>0){
			res.send({code:200,msg:'update suc'});
		}else{
			res.send({code:300,msg:'update err'});
		}
	})
})
//5.用户查询
router.get('/list',(req,res)=>{
	var obj=req.query;
	//将数据转位数值型
	var $pno=parseInt(obj.pno);
	var $count=parseInt(obj.count);
	//如果页码和每页数量为空，设置默认值
	if(!$pno){
		//如果页码为空，默认第一页
		$pno=1;
	}
	if(!$count){
		//如果每页的数量为空，默认显示3条记录
		$count=3;
	}
	//计算开始查询的值 start=(页码-1)*count
	var start=($pno-1)*$count;
	//执行SQL语句,返回商品列表数据
	pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,$count],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
});
//6.用户删除
router.get('/delete',(req,res)=>{
	var obj=req.query;
	var $uid=obj.uid;
	if(!$uid){
		res.send({code:401,msg:'uid required'})
		return;
	}
	pool.query('DELETE FROM xz_user WHERE uid=?',[$uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'delete suc'});
		}else{
			res.send({code:300,msg:'delete err'});
		}
	})
})



















//导出路由器
module.exports=router;