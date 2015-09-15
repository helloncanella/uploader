var express = require('express');
var router = express.Router();
var subtitle, videoFile;
/* GET home page. */

router.use("/composeVideo", function(req, res, next){
  if (req.body.hasOwnProperty("subtitle")) {
    subtitle = req.body.subtitle;
  };
  if (req.body.hasOwnProperty("video")) {
    videoFile = req.body.video;
  }
  console.log(videoFile,subtitle);
  next();
})

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Express'
  });
});


router.post("/composeVideo", function(req, res) {
  res.send({redirect: '/srt2vtt'});
})


router.get('/srt2vtt', function(req, res) {
  res.render('video');
});


module.exports = router;
