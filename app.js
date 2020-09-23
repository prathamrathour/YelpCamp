var express= require("express");
var app =express();
var bodyParser=require("body-parser");
const mongoose =require('mongoose');

var Campground = require("./models/campground");
mongoose.connect('mongodb://localhost/yelp_camp',{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

//Schema Setup


//new campground create
/*Campground.create(
 { 
  name:"Salmon Creek",
  image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
  description:"This is a huge creek"
}
 ,function(err,campground){
  if(err){
    console.log(err);
  }
  else{
    console.log("Newly Created Campground");
    console.log(campground);
  }
})
*/


app.use(bodyParser.urlencoded({extended:true}));
 



app.set("view engine","ejs");

app.get("/",function(req,res){
      res.render("landing");
});

app.get("/campgrounds/new",function(req,res){
         res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
  Campground.findById(req.params.id,function(err,foundCampground){
     if(err){
      console.log(err);

     }else{
        res.render("show",{campground:foundCampground});
     }
  });
  
});

app.get("/campgrounds",function(req,res){
      
      Campground.find({},function(err,allCampgrounds){
        if(err){
          console.log(err);
        }else{
                 res.render("index",{campgrounds:allCampgrounds});
        }
      });

       //res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds/new",function(req,res){
       var name= req.body.name;
        var image =req.body.image;
        var desc =req.body.description;
         var newCampground={name:name,image:image,description:desc};
         
         //create new campground and save
         Campground.create(newCampground,function(err,newlyCreated){
          if(err){
            console.log(err);
          }else{
            res.redirect("/campgrounds");
          }
         });
         
         


});

app.listen(3000,function(){
	console.log("YelpCamp server Started");
});
