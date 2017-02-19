var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());



app.set('port', (process.env.PORT || 5000));

var users = [{
        id: "0",
        username: "test",
        password: "pwd",
        email: "test@test.com"
    },
    {
        id: "1",
        username: "john",
        password: "doe",
        email: "john@doe.com"
    }
    ];

app.get('/', function (req,res){
  res.send('Hello world!');
})

app.post('/login', function(req, res){
  console.log("test");
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
  console.log("register");
  console.log(req.body);
  var nb_users = users.length;
  console.log(users);
  console.log(nb_users);
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


})

app.listen(app.get('port'), function(){
  console.log("App running in a port: " + app.get('port'));
})
