const
  express = require('express'),
  router = express.Router(),
  task = require('../models/task_model');


router.param('task_id', function(req, res, next, id) {
    req.task_item = task.find(id);
    next();
});


router.route('/').
    get(function(req, res, next) {
        var all_tasks = task.getAllEntries();
         res.setHeader('Content-Type', 'application/json');
		 res.end(JSON.stringify(all_tasks));
    }).
    
    post(function(req, res, next) {
       task.create(req.body);     // + callback
       res.setHeader('Content-Type', 'application/json');
       res.end(JSON.stringify(req.task_item));
    }).

    put(function(req, res, next) {
      task.save(req.body);
    });

module.exports = router;