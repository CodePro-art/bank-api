const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./router/users.route');
const os = require('os');
const app = express();
const port = process.env.PORT || 8080;

// finds user's name from the operating system
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

// Body-parser middleware:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Users route:
app.use('/api/users',usersRouter)

app.listen(port, () => console.log(`Listening on port ${port}!`));
