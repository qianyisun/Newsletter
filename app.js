//jshint esversion:6

const  express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();


app.use(express.static("public"));//把本地的文件弄到网页上
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");//html能够work因为它是绝对URL
});

app.post("/", function(req,res){

  const firstName = req.body.fName;//CONST不会去改变firstName这些variable。这样更加保险当variable你不会去改变的时候
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }

      }
    ]
  };

const jsonData = JSON.stringify(data)

const url = 'https://us10.api.mailchimp.com/3.0/lists/91ce71a0b2'

const options = {
  method: "POST",
  auth:"Qianyi01:691abc9e035458ab86a635fcb1d5b99f-us10"
}

const request = https.request(url,options,function(response){

  if (response.statusCode === 200){
    res.sendFile(__dirname + "/sucess.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }

  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})

// request.write(jsonData);
request.end();


});
//导引去home page如果失败的话
app.post("/failure",function(req,res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

//API KEY
//691abc9e035458ab86a635fcb1d5b99f-us10

//LIST ID
// 91ce71a0b2
