var acceptedSubtitles = ["text/vtt", "application/x-subrip"];
var supportedVideos = ["video/mp4", "video/ogg", "video/webm"];

var videoFile, subtitleFile, subtitleURL;

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

    var isSupportedVideo = !!~supportedVideos.indexOf(format);
    var isSubtitle = !!~acceptedSubtitles.indexOf(format);

    if (isSupportedVideo) {

      if (!videoFile) {
        video = document.createElement('video');
        videoFile = file;
        if (!subtitleFile) {
          $("#dropRegion h1").text("Add the subtitle now")
        }
      } else {
        var r = confirm("Replace the added movie?");
        if (r == true) {
          videofile = file;
        }
      }

    } else if (isSubtitle) {
      if (!subtitleFile) {
        subtitleFile = file;
        track = document.createElement('track');
        if (format == "text/vtt") {
          subtitleURL = window.URL.createObjectURL(subtitleFile);
        } else {
          var reader = new FileReader();
          reader.onload = function(e) {
            $.get("/srt2vtt", {
              subtitle: reader.result,
              fileName: file.name
            }, function(vttURL) {
              track.src = vttURL;
            })
          }
          reader.readAsBinaryString(file);
        }
        if (!videoFile) {
          $("#dropRegion h1").text("Add the video now")
        }
      } else {
        var r = confirm("Replace the added subtitle?");
        if (r == true) {
          subtitleFile = file;
        }
      }
    } else {
      alert(format + " isn't supported")
    }

    if (videoFile && subtitleFile) {
      //TO FIX
      video.src = window.URL.createObjectURL(videoFile);
      track.src = subtitleURL;

      $('.container').remove();

      $('body').append(video);
      $('video').append(track);

      $('video').addClass("full");

      $("*").css({
        "margin": "0",
        "padding": "0"
      })

      video.controls = true;
      video.play();
    }
  }
})

// blob:http%3A//localhost%3A3000/a379b2cf-8684-4776-86b2-c6fb2391820a blob:http%3A//localhost%3A3000/c3c78ad4-cdf2-4f5d-9c00-7188c13b9dd3
//
