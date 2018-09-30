const express = require('express');
const app = express();
const WEB_PORT = 8888;
const WEB_DIR = 'src';

app.use(express.static(__dirname + '/' + WEB_DIR));
app.get('/', function(req, res){ res.sendFile(__dirname + '/index.html') });
app.listen(WEB_PORT);

console.log(`Server running on port: ${WEB_PORT}`);
