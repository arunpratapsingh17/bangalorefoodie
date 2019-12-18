var Comments=require("../models/comment");
var Campground1=require("../models/campground");

var middlewareObj={}

middlewareObj.checkownership=function(req,res,next)
{
	if(req.isAuthenticated()){
		Campground1.findById(req.params.id,function(err,foundcampground){
		if(err){
			res.redirect("back");
		}
		else
			{
				if(foundcampground.author.id.equals(req.user._id)){
					next();	

				}
				else
					{
						req.flash("error","You don't have permission to do that");
						res.redirect("back");
					}
			}

	});
	}
	else
		{
			req.flash("error","You need to login first");
			res.redirect("back");
		}
}
middlewareObj.checkcommentownership=function(req,res,next)
{
	if(req.isAuthenticated()){
		Comments.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("back");
		}
		else
			{
				if(foundComment.author.id.equals(req.user._id)){
					next();	

				}
				else
					{
						req.flash("error","You don't hav permission to do that");
						res.redirect("back");
					}
			}

	});
	}
	else
		{
			req.flash("error","You need to login first");
			res.redirect("back");
		}
}
middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
	   return next();
	   }
req.flash("error","You Need To Login First")
res.redirect("/"); 
}
module.exports=middlewareObj;