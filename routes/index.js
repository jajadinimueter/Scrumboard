var express = require('express');
var router = express.Router(),
    task = require('../models/task_model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Scrum Board' });
});

router.post('/', function(req, res, next) {
  var newTask = task.create(req.body);
});

module.exports = router;
