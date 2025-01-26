//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = 3000;
const _ = require('lodash');

const firstStaticPost = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutText = "A creative and versatile IT consultant, with specialty in a wide variety of Tech. areas. An Educator, a Google-Certified IT Support Specialist and Data Analyst, ALX/Mastercard-Certified Virtual Assistant, a Network Engineer, a Writer, a Web Designer/Developer, a Cisco-Certified Cyber Security Analyst, a Video Editor and Content Creator and yes, I do like driving, riding, good movies, and I'll tell you that music serenates the soul.";
const contactText = "Hey! Would you like to get in touch? Well, there are many channels. Like, many channels through which you can reach me. So, I would give you a chance to choose which is best for you. Simply hit the Portfolio link above to see all the ways through which you can hit me up. Hear you. Cheers!.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoose = require('mongoose');
const dbUrl = "mongodb://localhost:27017/blogDB"
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const blogSchema = new mongoose.Schema(
{
    postTitle: String,
    postMessage: String
});

const Post = mongoose.model("Post", blogSchema);


app.get("/", function(request, response){

  Post.find().then((posts) => {
   response.render("home", {
     // firstHomePost: firstStaticPost,
     secondHomePost: posts
     });
 });

});

app.get("/about", function(request, response){
  response.render("about", {aboutStaticPost: aboutText});

});

app.get("/contact", function(request, response){
  response.render("contact", {contactStaticPost: contactText});

});

app.get("/composepg", function(request, response){
  response.render("composepg");

});


app.post("/composepg", function(request, response){
  const postContent = new Post({
    postTitle: request.body.post_title,
    postMessage: request.body.post_message
  });

  postContent.save()

  response.redirect("/");
});

app.get("/posts/:postId", function(request, response){
  const requestedPostId = request.params.postId;

  Post.findOne({_id: requestedPostId}).then((post) => {
    if (post) {
    response.render("post",
    {requestedLinkTitle: post.postTitle,
      requestedLinkMessage: post.postMessage
    });
  } else {
    response.status(404).send("Uh oh! Post not found.");
  }
});
});



app.listen(port, function() {
  console.log(`Our server started successfully and is running on port ${port}`);
});
