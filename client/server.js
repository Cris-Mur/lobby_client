var express = require('express');
var app = express();

app.use(express.static('./public/'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'public/'}
  );
});
app.listen(process.env.PORT || 8080);
