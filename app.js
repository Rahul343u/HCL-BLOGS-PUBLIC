const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const indexRouter = require('./routes/index');

var livereload = require('livereload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter); 
// app.use(function(req, res) {
//   res.render('index.ejs');
// });

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

var lrserver = livereload.createServer({
    extraExts:['ejs','less'],
    debug: true
  });
lrserver.watch(__dirname);
console.log("livereload started." + __dirname + '/views');

server.listen(port, () => console.log('Server is running at port:' + port));

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
  