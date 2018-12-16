// Module requires
var express = require('express');
var logger = require('morgan');
var routes = require('./routes');

// Instatiate application instance
var app = express();

// Configure the middleware - in this case Morgan Logger
app.use(logger('dev'));

// Let's add a View Engine - Handlebars
app.set('view engine', 'hbs');

// Handle URL root 
app.get('/', routes.index);

app.get('/api', routes.apiIndex);



app.get('/api/email', routes.email);
app.get('/api/pics', routes.pics);
app.get('/api/comlen' , routes.comlen);

app.get('*', routes.default);

// Initialize the server
var server = app.listen(3000, function() {
    console.log('Listening on port 3000');
});