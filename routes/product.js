//创建空路由器
const express=require('express');
var router=express.Router();
//引入连接池
const pool=require('../pool.js');
//1.商品列表
router.get('/list',(req,res)=>{
	var obj=req.query;
	var $pno=parseInt(obj.pno);
	var $count=parseInt(obj.count);
	if(!$pno){
		$pno=1;
	}
	if(!$count){
		$count=10;
	}
	var start=($pno-1)*$count;
	pool.query('SELECT * FROM xz_laptop LIMIT ?,?',[start,$count],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})
//2.商品详情
router.get('/detail',(req,res)=>{
	//获取数据
	var obj=req.query;
	var $lid=obj.lid;
	//判断是否为空
	if(!$lid){
		res.send({code:401,msg:'lid required'});
		return;
	}
	//执行SQL语句
	pool.query('SELECT * FROM xz_laptop WHERE lid=?',[$lid],(err,result)=>{
		if(err) throw err;
		//判断
		if(result.length>0){
			res.send(result);
		}else{
			res.send({code:300,msg:'detail err'});
		}
	})
})
//3.商品删除
router.get('/delete',(req,res)=>{
	//获取数据
	var obj=req.query;
	var $lid=obj.lid;
	//判断是否为空
	if(!$lid){
		res.send({code:401,msg:'lid required'});
	}
	//执行SQL语句
	pool.query('DELETE FROM xz_laptop WHERE lid=?',[$lid],(err,result)=>{
		if(err) throw err;
		//判断
		if(result.affectedRows>0){
			res.send({code:200,msg:'delete suc'});
		}else{
			res.send({code:300,msg:'delete err'});
		}
	})
})
//4.商品添加
router.post('/add',(req,res)=>{
	//获取数据
	var obj=req.body;
	//验证判断是否为空
	// var $title=obj.title;
	// var $subtitle=obj.subtitle;
	// var $family_id=obj.family_id;
	// var $price=obj.price;
	// var $promise=obj.promise;
	// var $spec=obj.spec;
	// if(!$title){
	// 	res.send({code:401,msg:'title required'});
	//	return;
	// }
	// if(!$subtitle){
	// 	res.send({code:402,msg:'subtitle required'});
		//	return;
	// }
	// if(!$family_id){
	// 	res.send({code:403,msg:'family_id required'});
		//	return;
	// }
	// if(!$price){
	// 	res.send({code:401,msg:'price required'});
		//	return;
	// }
	// if(!$promise){
	// 	res.send({code:401,msg:'promise required'});
		//	return;
	// }
	// if(!$spec){
	// 	res.send({code:401,msg:'spec required'});
		//	return;
	// }
	//遍历对象属性来判断是否为空
	var $code=400;
	for(var key in obj){
		//console.log(key+'---'+obj[key]);
		//判断属性值
		if(!obj[key]){
			$code++;
			res.send({code:$code,msg:key+'  required'});
			return;
		}
	}
	//执行SQl语句
	pool.query('INSERT INTO xz_laptop SET ?',[obj],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'add suc'});
		}else{
			res.send({code:300,msg:'add err'});
		}
	})
})
//5.商品更改

//导出路由器
module.exports=router;
//挂载到/product