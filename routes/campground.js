var express=require("express");
var router=express.Router();
var Campground1=require("../models/campground");
var Comments=require("../models/comment");
var middleware=require("../middleware");
router.get("/landing",function(req,res){
	res.render("landing")
});
router.get("/",function(req,res){
	console.log(req.user);
	Campground1.find({},function(err,allcampgrounds){
		if(err)
			{
				console.log("There is an error");
			}
		else{
			res.render("campground/index",{campgrounds: allcampgrounds,currentUser: req.user});
		}
	});
	//res.render("campground",{campgrounds: campgrounds});
});
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campground/new");
});
router.post("/",middleware.isLoggedIn,function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var author={
		id:req.user._id,
			username:req.user.username
	}
	var newCamp={name:name,image:image,description:desc,author:author};
	Campground1.create(newCamp,function(err,newlyadded){
		if(err){
			console.log("There was an error in uploading a new photo");
		}
		else{
			req.flash("success","Successfully added a restaurant");
			res.redirect("/campground");
		}
	});
});
router.get("/:id",function(req,res){
	 Campground1.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
		if(err)
		 {
			 console.log("Some Error Occured in finding the the yelp");
			 console.log(err);
		 }
		 else
			 {
				 res.render("campground/show",{campground: foundcampground})
			 }
	 });
});
////EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkownership,function(req,res){
	Campground1.findById(req.params.id,function(err,foundcampground){
		res.render("campground/edit",{campground: foundcampground});
	});
});
////UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkownership,function(req,res){
	Campground1.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err)
			{
				res.redirect("/campground");
			}
		else
			{
				req.flash("success","Successfully updated data");
				res.redirect("/campground/"+req.params.id)
			}
	});
});
////DELETE CAMPGROUND ROUTE
router.delete("/:id",middleware.checkownership,function(req,res){
	Campground1.findByIdAndRemove(req.params.id,function(err){
		if(err)
			{
				res.redirect("/campground");
			}
		else
			{
				req.flash("success","Successfully deleted");
				res.redirect("/campground");
			}
	});
});

module.exports=router;