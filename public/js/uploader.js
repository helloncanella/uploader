var acceptedSubtitles = ["text/vtt", "application/x-subrip"];
var supportedVideos = ["video/mp4", "video/mp4"];

var videoFile, subtitleFile;

$("#dropRegion").on({
  dragenter: function(event) {
    event.stopPropagation();
    event.preventDefault();
  },
  dragover: function(event) {
    event.stopPropagation();
    event.preventDefault();
  },
  drop: function(event) {

    event.stopPropagation();
    event.preventDefault();

    var file = event.originalEvent.dataTransfer.files[0];
    var format = file.type;

    var isVideo = new RegExp("video\/*").test(format);
    var isSubtitle = !!~acceptedSubtitles.indexOf(format);

    if (isVideo) {
      var isASupportedFormart = !!~supportedVideos.indexOf(format)

      if (isASupportedFormart) {
        if (!subtitleFile) {
          $("#dropRegion h1").text("Add the subtitle now")
        }
        videoFile = file

      } else {
        //convert it
      }
    } else if (isSubtitle) {
      if (format == "text/vtt") {
        if (!videoFile) {
          $("#dropRegion h1").text("Add the video now")
        }
        subtitleFile = file
      } else {
        //convert it
      }
    } else {
      alert(format + " isn't supported")
    }

    if (videoFile && subtitleFile) {

      console.log(videoFile, subtitleFile);

      videoURL = window.URL.createObjectURL(videoFile);
      subtitleURL = window.URL.createObjectURL(subtitleFile);



      console.log(videoURL, subtitleURL);

      // window.location="/cinema"
    }

  }


})

// blob:http%3A//localhost%3A3000/a379b2cf-8684-4776-86b2-c6fb2391820a blob:http%3A//localhost%3A3000/c3c78ad4-cdf2-4f5d-9c00-7188c13b9dd3
//
