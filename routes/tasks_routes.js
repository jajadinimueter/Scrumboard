const
  express = require('express'),
  router = express.Router(),
  task = require('../models/task_model');

router.route('/').
    get(function(req, res, next) {
       var all_tasks = task.getAllEntries();
       res.setHeader('Content-Type', 'application/json');
		   res.end(JSON.stringify(all_tasks));
    }).

    put(function(req, res, next) {
       task.create(req.body);
       res.setHeader('Content-Type', 'application/json');
       res.end(JSON.stringify(req.task_item));
    });

router.route('/:id')
  .put(function(req, res, next) {
    task.update(req.params.id, req.body);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.task_item));
  });

module.exports = router;
