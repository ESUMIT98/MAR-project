var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var sql=require('mysql');
var bodyParser = require('body-parser');
var scon = sql.createConnection({
        host:'localhost',
        user: "Biswarup",
        password:"123456",
        database:"db1"
});
app.use(express.urlencoded())

app.get('/login', function(req, res){
        res.sendFile(path.join(__dirname+'/Login.html'))
});

app.get('/register', function(req, res){
        res.sendFile(path.join(__dirname+'/register.html'))
});


app.post('/registration', function(req, res){
        bool=0;
        scon.connect(function(err) {
        var val1=req.body.Username;
        var sql="SELECT * FROM db WHERE Username='"+val1+"'";
        scon.query(sql,function(err,count,fields){
                if (err) throw err;
                bool=count.length;
                if(bool == 0) 
                {
                        Values=[[req.body.Username,req.body.psw,req.body.College,req.body.Location,req.body.Branch]];
                        scon.query("INSERT INTO db(Username,Passowrd,College,Location,Branch) VALUES ?",[Values],function (err){
                                if (err) throw err;
                        });
                        res.sendFile('/home/trainee/Downloads/Assingment_1/Registration.html')
                }
                else
                {
                        res.sendFile('/home/trainee/Downloads/Assingment_1/Exists.html')
                }
        });
            
        });
});

app.post('/login', function(req, res){
        scon.connect(function(err){
        var len=0;
        use=req.body.Username;
        pas=req.body.psw;
        var sql1="SELECT Username FROM db WHERE Passowrd='"+pas+"'AND Username='"+use+"'";
        scon.query(sql1,function(err,result,fields){
                if(result.length!=0)
                {
                        res.sendFile('/home/trainee/Downloads/Assingment_1/Sucess.html')
                }
                else
                {
                        res.sendFile('/home/trainee/Downloads/Assingment_1/error.html')
                        console.log(pas)
                }

        
        
        });
        });
});
app.listen(3000)