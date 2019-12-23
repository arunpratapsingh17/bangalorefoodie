var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");
router.get("/register",function(req,res){
	res.render("register");
});
router.post("/register",function(req,res){
	var newUser=new User({username:req.body.username});
	
	User.register(newUser,req.body.password,function(err,user){
		if(err)
			{
				console.log(err);
				req.flash("error",err.message);
				res.redirect("/register");
			}
		else
			{
				passport.authenticate("local")(req,res,function(){
					req.flash("success","Welcome "+user.username);
					res.redirect("/campground");
				});
			}
	});
});
/////======
/////LOGIN ROUTE
////================
router.get("/",function(req,res){
	res.render("login");
});
router.post("/",passport.authenticate("local",{
	successRedirect:"/campground/landing",failureRedirect:"/"
	}),function(req,res){
});
//////////========
//////////LOGOUT
//////////========
router.get("/logout",function(req,res){
	req.logout();
	req.flash("error","Logged you out");
	res.redirect("/campground");
});
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
	   return next();
	   }
res.redirect("/"); 
}
module.exports=router;