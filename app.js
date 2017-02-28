var express = require('express');
var app = express();
var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors');

//https://res.cloudinary.com/hx1imsdve/image/upload/v1487858892/dee0khp0aqrpgmsh3nrn.jpg  ==> Rambo

app.use(cors());
app.use(bodyParser.json());

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: '', // give cloudinary folder where you want to store images
  allowedFormats: ['jpg', 'png', 'jpeg'],
});

var parser = multer({ storage: storage });

app.set('port', (process.env.PORT || 5000));

var users = [{
        id: "0",
        username: "test",
        password: "pwd",
        email: "test@test.com",
        imageProfile : 'http://res.cloudinary.com/hx1imsdve/image/upload/v1487857939/glwd9nx9rljwdiaf1vyd.png'
    },
    {
        id: "1",
        username: "john",
        password: "doe",
        email: "john@doe.com",
        imageProfile : 'http://res.cloudinary.com/hx1imsdve/image/upload/v1487857939/glwd9nx9rljwdiaf1vyd.png'
    },
    {
        id: "3",
        username: "Marty Mc Fly",
        password: "password",
        email: "marty@future.com",
        imageProfile : 'http://res.cloudinary.com/hx1imsdve/image/upload/v1487850019/ojvegsie0uwcdrzikbni.jpg'
    },
    {
        id: "4",
        username: "Batman",
        password: "batpass",
        email: "man@bat.com",
        imageProfile : 'http://res.cloudinary.com/hx1imsdve/image/upload/v1487850235/inosp0i8lexpke2jmczk.jpg'
    }
    ];

var posts = [{
      id: "0",
      picture: "http://res.cloudinary.com/hx1imsdve/image/upload/v1487849906/un7xumaluiktopvkcnlk.jpg",
      description: "This is our new poster!",
      id_user: "3"
    },
    {
      id: "1",
      picture: "http://res.cloudinary.com/hx1imsdve/image/upload/v1487850404/t0ir65t65amlz8tlqm17.jpg",
      description: "My new car!",
      id_user: "4"
    }]


app.get('/', function (req,res){
  res.send('Hello world!');
})

app.post('/myPost/:id', function(req, res){
  var images = posts.filter(function(element){
    return (element.id_user === req.params.id);
  });
  var images_url = [];

  for (var i = 0; i < images.length; i++) {
    images_url[i]= images[i].picture;
  }
  return res.json(images_url);
});

app.post('/login', function(req, res){
  //console.log("test");
  console.log(req.body);
  var u = users.find(function(element){
    return (element.username === req.body.username) && (element.password === req.body.password);
  });

  if(u !== undefined)
    {
        return res.json({id: u.id, username: u.username});
    }
    else
    {
        return res.sendStatus(401);
    }
});

app.post('/register', function(req, res){
  var nb_users = users.length;
  users.push({
    id: users.length,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    imageProfile: 'http://res.cloudinary.com/hx1imsdve/image/upload/v1487857939/glwd9nx9rljwdiaf1vyd.png'
  });
  console.log(users);

  if (nb_users != users.length) {
    return res.json(users);
  }


});

app.get('/users', function(req, res){
  res.json(users);
});

app.get('/users/:id', function(req, res){
  //res.json(users);
  //console.log('test id user');
  //console.log(req.params.id);
  var user = users.find(function(element){
    if (element.id == req.params.id) {
      return element;
    }
  });
  console.log(user);
  res.json(user);
});

app.get('/posts', function(req, res){
  return res.json(posts);
});

app.post('/upload', parser.single('image'), function (req, res) {
      console.log(req);
      posts.push({
          id: posts.length,
          picture: req.file.url,
          description: req.body.description,
          id_user: req.body.id_user
        });
        return res.json(posts);
});

app.get("/postUser/:id", function(req, res){
  var userpost = users.find(function(element){
    if (element.id == req.params.id) {
      return (element.username) && (element.imageProfile);
    }
  });

  if(userpost !== undefined)
    {
        return res.json({imgProfile: userpost.imageProfile, username: userpost.username});
    }
    else
    {
        return res.sendStatus(401);
    }
});

app.get('/searchUser/:word', function(req, res){
  console.log(req.params);
  var upperCaseSearchWord = req.params.word.toUpperCase();
  if(req.params.word.length > 0){
    var matches = users.filter(function(u){
      var testString = u.username.toUpperCase();
      console.log(upperCaseSearchWord);
      console.log(testString);
      return testString.includes(upperCaseSearchWord);
    });
  }
  console.log(matches);
  res.json(matches);
});

app.listen(app.get('port'), function(){
  console.log("App running in a port: " + app.get('port'));
})
