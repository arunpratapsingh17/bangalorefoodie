var express       =require("express"),
	app           =express(),
	Comment       =require("./models/comment.js"),
	bodyParser    =require("body-parser"),
	mongoose      =require("mongoose"),
	passport      =require("passport"),
	LocalStrategy =require("passport-local"),
	methodOverride=require("method-override"),
	User          =require("./models/user"),
	Campground1   =require("./models/campground.js"),
	seedDB        =require("./seeds.js"),
	flash         =require("connect-flash")
var campgroundRoute=require("./routes/campground.js"),
	commentRoute   =require("./routes/comments.js"),
	authRoute      =require("./routes/auth.js")
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true,useFindAndModify:false });
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.use(flash());
app.use(express.static(__dirname+"/public"));
//seedDB();
app.use(require("express-session")({
	secret:"Tommy is the best",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
////
////FOR SENDING USER'S INFO TO EVERY PAGE
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");	
	next();
});
// Campground1.create(
// 		{
// 			Name:"Gamma",
// 			image:"https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
// 			description:"Gamma bole to third vala,aise hi likh diye jo man kiya"
// 		},function(err,Campground1){
// 			if(err)
// 				{
// 					console.log("An Error Occured!");
// 				}
// 			else
// 				{
// 					console.log("Database Content Is");
// 					console.log(Campground1);
// 				}
// 		}
// 	);


//var campgrounds=
//	[{Name:"Alpha",image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-	1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"},
	 
	 
//	{Name:"Beta",image:"https://cdn.vox-cdn.com/thumbor/1j72cfH6ka3baNiIvbstiHQbnfo=/0x0:5225x3479/920x613/filters:focal(2195x1322:3031x2158):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg"},
	 
	 
//	{Name:"Gamma",image:"https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"}];

////==================
////COMMENT ROUTES
////==================

///==========
//////AUTH ROUTES
//////===========
app.use(authRoute);
app.use("/campground",campgroundRoute);
app.use(commentRoute);
app.listen(6006,function(req,res){
	console.log("App is pakka running");
});