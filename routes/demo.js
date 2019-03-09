//引入mysql连接池对象
const pool=require('../pool.js');
const express=require('express');
//创建空路由器
var router=express.Router();
//添加路由
//1.ajaxDemo
router.get("/ajaxDemo",(req,res)=>{
	res.send("我的第一个ajax");
});
//2.登陆接口
// router.get("/login",(req,res)=>{
// 	var obj=req.query;
// 	var $uname=obj.uname;
// 	if(!$uname){
// 		res.send({code:401,msg:'uname require'});
// 		return;
// 	}
// 	var $upwd=obj.upwd;
// 	if(!$upwd){
// 		res.send({code:402,msg:'upwd require'});
// 		return;
// 	}
// 	// res.send("用户名："+$uname+"密码："+$upwd);
// 	//执行SQL语句，查看是否登录成功(使用用户名和密码两个条件能查询到数据)
// 	pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[$uname,$upwd],(err,result)=>{
// 		if(err) throw err;
// 		if(result.length>0){
// 			res.send({code:200,msg:"login suc"});
// 		}else{
// 			res.send({code:301,msg:"login err"});
// 		}
// 	})
// })
//2.登陆接口，重写
router.get("/login",(req,res)=>{
	var obj=req.query;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	if(!$uname){
		res.send("用户名不能为空");
		return;
	}
	if(!$upwd){
		res.send("密码不能为空");
		return;
	}
	pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:200,msg:"login suc"});
		}else{
			res.send({code:301,msg:"login err"});
		}
	})
})
//2.登陆post接口
router.post("/postlogin",(req,res)=>{
	var obj=req.body;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	if(!$uname){
		res.send("用户名不能为空");
		return;
	}
	if(!$upwd){
		res.send("密码不能为空");
		return;
	}
	// res.send("用户名为"+$uname+"密码为"+$upwd);
	pool.query("SELECT * FROM xz_user WHERE uname=? AND upwd=?",[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("登陆成功");
		}else{
			res.send("用户名或密码错误");
		}
	})
})
//3.注册接口
router.get("/checkUname",(req,res)=>{
	var obj=req.query;
	var $uname=obj.uname;
	if(!$uname){
		res.send("用户名不能为空");
		return;
	}
	pool.query('SELECT * FROM xz_user WHERE uname=?',[$uname],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("用户名被占用");
		}else{
			res.send("用户名可以使用");
		}
	})
})

//4.userlist
router.get('/userlist',(req,res)=>{
	pool.query('SELECT * FROM xz_user',(err,result)=>{
		res.send(result);
	})
})






















//导出路由器
module.exports=router;