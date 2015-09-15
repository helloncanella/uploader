var express = require('express');
var router = express.Router();
var srt2vtt = require('srt-to-vtt');
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/srt2vtt', function(req, res) {
  name = req.query.fileName;
  subtitle = req.query.subtitle;

  var srtPath = __dirname+'/../public/subtitles/'+name

  fs.writeFile(srtPath, subtitle, function(err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });

  var vttPath = __dirname+'/../public/subtitles/'+name + '.vtt'

  fs.createReadStream(srtPath)
    .pipe(srt2vtt())
    .pipe(fs.createWriteStream(vttPath))

  res.end('/subtitles/'+name + '.vtt');
});


module.exports = router;
