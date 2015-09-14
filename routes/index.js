var express = require('express');
var router = express.Router();
var subtitle, videoFile;
/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Express'
  });
});
router.post("/composeVideo", function(req, res) {
  if (req.body.hasOwnProperty("subtitle")) {
    subtitle = req.body.subtitle;
  };
  if (req.body.hasOwnProperty("video")) {
    videoFile = req.body.video;
  }

  console.log(videoFile,subtitle);

  if (videoFile && subtitle) {
    console.log("ok");

    // $.get("/srt2vtt");
    res.redirect('/srt2vtt')
    // // res.render('video',{video:videoFile, subtitle:subtitle})
  }
})


router.get('/srt2vtt', function(req, res) {
  res.render('video', {
    title: 'Express'
  });
});


module.exports = router;
