var express = require('express');
var app = express();

const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));
app.get('/*', function(req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(process.env.PORT || 8080);
