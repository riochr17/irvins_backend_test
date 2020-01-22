
const db            = require('./mongodb/db');
const cors          = require('cors')
const app           = require('express')();
const bodyParser    = require('body-parser');

// use cors
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// start http server
const http = require('http').createServer(app);
const port = process.env.PORT || 3001;
http.listen(port, _ => console.log(`listening on *:${port}`));

require('./router')(db, app);

module.exports = app;