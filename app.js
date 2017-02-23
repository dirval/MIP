var express = require('express');
var app = express();
var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var bodyParser = require('body-parser');
var cors = require('cors');

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
        imageProfile : 'img/rambo.jpeg'
    },
    {
        id: "1",
        username: "john",
        password: "doe",
        email: "john@doe.com",
        imageProfile : 'img/marty.jpeg'
    }
    ];


app.get('/', function (req,res){
  res.send('Hello world!');
})

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
    email: req.body.email
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

app.post('/upload', parser.single('image'), function (req, res) {
    console.log(req.file);
    res.sendStatus(201);
});

app.listen(app.get('port'), function(){
  console.log("App running in a port: " + app.get('port'));
})
