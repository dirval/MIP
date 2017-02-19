var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());



app.set('port', (process.env.PORT || 5000));

var users = [{
        id: "txgw35",
        username: "test",
        password: "pwd"
    },
    {
        id: "xvj2f2",
        username: "john",
        password: "doe"
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

app.listen(app.get('port'), function(){
  console.log("App running in a port: " + app.get('port'));
})
