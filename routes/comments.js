var express=require("express");
var router=express.Router();
var Campground1=require("../models/campground");
var Comments=require("../models/comment");
var middleware=require("../middleware");

router.get("/campground/:id/comment/new",middleware.isLoggedIn,function(req,res){
	Campground1.findById(req.params.id,function(err,camp)
						{
		if(err)
			{
				console.log("Error in finding the campground");
			}
		else
			{
				res.render("comments/new",{camp: camp});
			}
	});
});
router.post("/campground/:id/comment/",function(req,res){
	Campground1.findById(req.params.id,function(err,camp){
		if(err)
			{
				console.log(err);
			}
		else
			{
				Comments.create(req.body.comment,function(err,com){
					if(err)
						{
							console.log("Error in creating the new comment according to the schema");
							console.log(err);
						}
					else
						{
							com.author.id=req.user._id;
							com.author.username=req.user.username;
							com.save();
							camp.comments.push(com);
							camp.save();
							req.flash("success","Successfully added a comment");
							res.redirect('/campground/'+camp._id)
						}
				});
			}
	});
});
///COMMENT EDIT ROUTE
router.get("/campground/:id/comment/:comment_id/edit",middleware.checkcommentownership,function(req,res){
	Comments.findById(req.params.comment_id,function(err,foundcomment){
		if(err)
			{
				res.redirect("back");
			}
		else
			{
				res.render("comments/edit",{camp_id: req.params.id,comment: foundcomment});
			}
	});
});
////COMMENT UPDATE ROUTE
router.put("/campground/:id/comment/:comment_id",middleware.checkcommentownership,function(req,res){
	Comments.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment){
			if(err)
			{
				res.redirect("back");
			}
		else
			{
				req.flash("success","Comment Edited Successfully");
				res.redirect("/campground/"+req.params.id);
			}
	});
});
////COMMENT DELETE ROUTE
router.delete("/campground/:id/comment/:comment_id",middleware.checkcommentownership,function(req,res){
	Comments.findByIdAndRemove(req.params.comment_id,function(err){
		if(err)
			{
				res.render("back");
			}
		else
			{
				req.flash("success","Comment Deleted Successfully");
				res.redirect("/campground/"+req.params.id);
			}
	});
});

module.exports=router;