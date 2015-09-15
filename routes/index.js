var express = require('express');
var router = express.Router();
var srt2vtt = require('srt-to-vtt');
var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');

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


router.get('/videoConversion', function(req, res) {
  console.log(req.query.url);
  console.log('cadfalkjdfçlasdjfl');
  ffmpeg(req.query.url)
  .on('start', function(commandLine) {
    console.log('Spawned Ffmpeg with command: ' + commandLine);
  }).output('outputfile.mp4')


});



module.exports = router;
