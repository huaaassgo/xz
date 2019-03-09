//引入mysql连接池对象
const pool=require('../pool.js');
const express=require('express');
//创建空路由器
var router=express.Router();
//添加路由
//1.登陆
router.post("/login",(req,res)=>{
	var obj=req.body;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	if(!$uname){
		res.send('用户名不能为空');
		return;
	}
	if(!$upwd){
		res.send('密码不能为空');
		return;
	}
	pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send('登录成功');
		}else{
			res.send('用户名或密码错误');
		}
	})
})
//2.查询用户列表
router.get("/userlist",(req,res)=>{
	pool.query('SELECT * FROM xz_user',(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})
//3.注册
//检验用户名是否存在
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
			res.send("1");	//重名，不能注册
		}else{
			res.send("0");	//能注册
		}
	})
})
//注册接口
router.post("/register",(req,res)=>{
	var obj=req.body;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	var $email=obj.email;
	var $phone=obj.phone;
	var $user_name=obj.user_name;
	var $gender=obj.gender;
	if(!$uname){
		res.send('用户名不能为空');
		return;
	}
	if(!$upwd){
		res.send('密码不能为空');
		return;
	}
	if(!$email){
		res.send('邮箱不能为空');
		return;
	}
	if(!$phone){
		res.send('手机号不能为空');
		return;
	}
	if(!$user_name){
		res.send('姓名不能为空');
		return;
	}
	pool.query('INSERT INTO xz_user values(null,?,?,?,?,null,?,?)',[$uname,$upwd,$email,$phone,$user_name,$gender],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		}
	})
})


//4.删除
router.get("/user_delete",(req,res)=>{
	var obj=req.query;
	var $uid=obj.uid;
	if(!$uid){
		res.send('编号不能为空');
		return;
	}
	pool.query('DELETE FROM xz_user WHERE uid=?',[$uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('删除成功');
		}else{
			res.send('删除失败');
		}
	})
})

//5.查询修改
router.get("/queryuser",(req,res)=>{
	var obj=req.query;
	var $uid=obj.uid;
	if(!$uid){
		res.send('0');
		return;
	}
	pool.query('SELECT * FROM xz_user WHERE uid=?',[$uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result[0]);
		}else{
			res.send('1');
		}
	})
})
//6.修改,form表单
router.post("/updata",(req,res)=>{
	var obj=req.body;
	console.log(obj);
	var $uid=obj.uid;
	var $uname=obj.uname;
	var $email=obj.email;
	var $phone=obj.phone;
	var $user_name=obj.user_name;
	var $gender=obj.gender;
	if(!$uname){
		res.send('用户名不能为空');
		return;
	}
	if(!$email){
		res.send('邮箱不能为空');
		return;
	}
	if(!$phone){
		res.send('手机号不能为空');
		return;
	}
	if(!$user_name){
		res.send('姓名不能为空');
		return;
	}
	pool.query('UPDATE xz_user SET uname=?,email=?,phone=?,user_name=?,gender=? WHERE uid=?',[$uname,$email,$phone,$user_name,$gender,$uid,],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("<script>alert('修改成功');location.href='http://127.0.0.1:3000/02_list.html'</script>");
		}else{
			res.send('修改失败');
		}
	})
})
//7.修改，ajax修改
router.post("/updata",(req,res)=>{
	var obj=req.body;
	console.log(obj);
	var $uid=obj.uid;
	var $uname=obj.uname;
	var $email=obj.email;
	var $phone=obj.phone;
	var $user_name=obj.user_name;
	var $gender=obj.gender;
	if(!$uname){
		res.send('用户名不能为空');
		return;
	}
	if(!$email){
		res.send('邮箱不能为空');
		return;
	}
	if(!$phone){
		res.send('手机号不能为空');
		return;
	}
	if(!$user_name){
		res.send('姓名不能为空');
		return;
	}
	pool.query('UPDATE xz_user SET uname=?,email=?,phone=?,user_name=?,gender=? WHERE uid=?',[$uname,$email,$phone,$user_name,$gender,$uid,],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send('修改失败');
		}
	})
})



















//导出路由器
module.exports=router;