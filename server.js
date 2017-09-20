const express = require('express');
const proxy = require('express-http-proxy');
const morgan = require('morgan');

const espn = require('./espn');

const app = express();

app.set('json spaces', 2);

app.use(morgan('short'));
app.use('/api/espn', espn);

app.use('/api', proxy('https://fantasy-rankings.herokuapp.com', {
  proxyReqPathResolver: function (req) {
    return '/api' + require('url').parse(req.url).path;
  }
}));

app.use('/lineup', proxy('https://www.draftkings.com', {
  proxyReqPathResolver: function (req) {
    return '/lineup' + require('url').parse(req.url).path;
  }
}));

app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080, function () {
  console.log('DFS MVP is ready to win!')
});

