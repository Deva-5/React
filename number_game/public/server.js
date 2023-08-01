//require('dotenv').config();
// import dotenv from "dotenv";
// dotenv.config();
import {config} from "dotenv";
config();
//const userLib = require("./backend/lib/userLib");
import * as userLib from "./backend/lib/userLib.js";
// const todoLib = require("./backend/lib/todoLib");
import * as todoLib from "./backend/lib/todoLib.js";
//const mongoose = require("mongoose");
import mongoose from "mongoose";
//const express = require('express');
//import express,{request} from "express";
import  express from "express";
const app = express();
const port = process.env.PORT || 5010;
const options = { extensions:['html','htm','css','js','ico','jpg','jpeg','png','svg'],index:['card.html']}

app.use(express.static(process.cwd()));

app.use(express.json());
app.use(express.static("public",options));

app.get("/card", function(req, result){
	result.sendFile(process.cwd()+"/card.html");
});

app.get("/resume", function(req, result){
	result.sendFile(process.cwd()+"/resume.html");
});

app.get("/weather1", function(req, result){
	result.sendFile(process.cwd()+"/weather1.html");
});

app.get("/index", function(req, result){
	result.sendFile(process.cwd()+"/index.html");
});

app.get("/api/todos", function(req, res){
	todoLib.getAllTodos(function(err,todos){
		if(err)
		{
			res.json({status : "error", message : err , data : null})
		}
		else{
			res.json({status: "success" , data : todos});
		}
	});
});

app.post("/api/todos",function(req,res){
	const todo = req.body;
	todoLib.createTodo(todo , function(err,dbtodo){
		if(err)
		{
			res.json({status : "error", message : err , data : null})
		}
		else{
			res.json({status: "success" , data : todo});
		}
	});
});

app.put("/api/todos/:todoid",function(req,res){
	const dbtodo = req.body;
	const todoid = req.params.todoid;
	todoLib.updateTodoById(todoid,dbtodo,function(err,dbtodo){
		if(err)
		{
			res.json({status : "error", message : err , data : null})
		}
		else{
			res.json({status: "success" , data : dbtodo});
		}
	});
});

app.delete("/api/todos/:todoid",function(req,res){
	const todoid = req.params.todoid;
	todoLib.deleteTodoById(todoid,function(err,dbtodo){
		if(err){
			res.json({status : "error", message : err , data : null})
		}
		else{
			res.json({status: "success" , data : dbtodo});
		}
	})
});

mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{},function(err){
	if(err)
	{
		console.error(err);
	}
	else
	{
		console.log("DB Connected");


		// userLib.createFirstUser(function(err,result)
		// {
		// 	if(err)
		// 	{
		// 		console.error(err);
		// 	}
		// 	else{
		// 		console.log(result);
		// 	}
		// });
		// userLib.createUser({userName : "deva1" , yearOfGraduation : 2025},function(err,result){
		// 	if(err)
		// 	{
		// 		console.error(err);
		// 	}
		// 	else{
		// 		console.log(result);
		// 	}
		// });
		// userLib.updateUser("deva", {yearOfGraduation: 2000}, function(err,result)
		// {
		// 	if(err)
		// 	{
		// 		console.error(err);
		// 	}
		// 	else{
		// 		console.log(result);
		// 	}
		// });
		// userLib.deleteUser("deva kumar1",function(err,result)
		// {
		// 	if(err){
		// 		console.error(err);
		// 	}
		// 	else{
		// 		console.log(result);
		// 	}
		// });
		// userLib.getUsersbyFilter({yearOfGraduation : 2000}, function(err,result){
		// 	if(err){
		// 		console.error(err);
		// 	}
		// 	else{
		// 		console.log(result);
		// 	}
		// });
		// userLib.getAllUsers(function(err,result){
		// 	if(err){
		// 		console.error(err);
		// 	}
		// 	else{
		// 		console.log(result);
		// 	}
		// });

		app.listen(port, function(){
			console.log("Server running on http://localhost:"+port);
			console.log(`Server running on http://localhost:${port}`);
		});
	}
});

