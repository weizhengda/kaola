var express = require('express');
var app = express();
var path = require('path');
var mongoose = require("mongoose");

var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

global.dbHelper = require( './bin/dbHelper' );

global.db = mongoose.connect("mongodb://127.0.0.1:27017/kaola");

// 设置session的时长
app.use(session({
    secret:'secret',
    cookie:{
        maxAge:1000*60*30
    }
}));

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));


// 设定view engine变量，意为网页模板引擎
//app.set('view engine', 'ejs');
app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// 设定静态文件目录，比如本地文件
app.use(express.static(path.join(__dirname, 'public')));
// 动态全局变量
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
});


require('./routes')(app);

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(80);


