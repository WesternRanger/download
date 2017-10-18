/**
 * @file             : routes/index.js
 * @author           : chenqi <western_ranger@icloud.com>
 * Date              : 18.10.2017
 * Last Modified Date: 18.10.2017
 * Last Modified By  : chenqi <western_ranger@icloud.com>
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:name', function(req, res, next) {
  // 实现文件下载 
	var fileName = req.params.name;
  var filePath = path.join(__dirname, fileName);
  var stats = fs.statSync(filePath); 
  if(stats.isFile()){
	res.set({
	  'Content-Type': 'application/octet-stream',
	  'Content-Disposition': 'attachment; filename='+fileName,
	  'Content-Length': stats.size
	});
	fs.createReadStream(filePath).pipe(res);
  } else {
	res.end(404);
  }
});
module.exports = router;
