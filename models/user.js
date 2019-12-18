var mongoose=require("mongoose");
var passportlocalMongoose=require("passport-local-mongoose");
var userSchema=new mongoose.Schema({
	username:String,
	password:String
});
userSchema.plugin(passportlocalMongoose);
module.exports=mongoose.model("User",userSchema);