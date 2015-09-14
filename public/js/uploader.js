$("#dropRegion").on({
  dragenter: function (event) {
    event.stopPropagation();
    event.preventDefault();
  }, 
  dragover: function(event) {
    event.stopPropagation();
    event.preventDefault();
  },
  drop: function(event) {
    event.stopPropagation();
    event.preventDefault()

    var files = event.originalEvent.dataTransfer.files;
    handleFiles(files);

    //Play video if the correct video and subtitle's format is loaded
    videoIsLoaded = $('#video').hasClass('show');
    subtitleIsLoaded = $('#subtitle').hasClass('show');

    if (videoIsLoaded && subtitleIsLoaded) {
      alert("play video");
    }

  }

})

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    type = files[i].type
    switch (type) {
      //Verifying if the format is supported
      case "video/mp4": //XXX Simplify statements
      case "video/webm":
      case "video/ogg":
        $("#video").addClass("show");
        //Condition will be true  if subtitle isn't loaded
        if (!$("#subtitle").hasClass("show")) {
          $("#dropRegion h1").text("Now add the the Subtitle")
        }
        break;
      case "text/vtt":
        $("#subtitle").addClass("show");
        //Condition will be true  if video isn't loaded
        if (!$("#video").hasClass("show")) {
          $("#dropRegion h1").text("Now add the the Video")
        }
        break;
      case "application/x-subrip":
        srtToVtt(files[i]);
        break;
      default:
        regex = new RegExp("video\/*");
        isVideo = regex.test(type);
    }
  }
}
