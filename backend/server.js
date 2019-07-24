var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var server = express()

server.use(bodyParser.json());
// map to front end folder
server.use('/myguitar', express.static('../frontend'));

// mongodb part
mongoose.connect('mongodb://localhost:27017/my_data', { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
})
var UserModel = mongoose.model('users', userSchema)

// rest api part(express)

server.post('/register_api', function (req, res) {
	UserModel.findOne({ email: req.body.getemail }, function(err, user) {
		if (user) {
		    res.send({ status: 'error' })
			return
		}
		var user = new UserModel()
		user.email = req.body.getemail
		user.name = req.body.getname
		user.password = req.body.getpassword
		user.save();
		res.send({ status: 'success' })
	})
})
 
server.post('/login_api', function (req, res) {
	UserModel.findOne({
		email: req.body.getemail,
		password: req.body.getpassword,
	}, function(err, user) {
		if (user == null) {
		    res.send({ status: 'error' })
			return
		}
		res.send({ status: 'success', name: user.name })
	})
})
 
server.listen(9999, function() {
	console.log('server started')
})