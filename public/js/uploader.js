var videoFile, binarySubtitle;
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
    event.preventDefault()

    var files = event.originalEvent.dataTransfer.files;
    handleFiles(files);

    //Play video if the correct video and subtitle's format is loaded
    videoIsLoaded = $('#video').hasClass('show');
    subtitleIsLoaded = $('#subtitle').hasClass('show');

    if (videoIsLoaded && subtitleIsLoaded) {

    }

  }

})


function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    type = files[i].type

    switch (type) {

      case "video/mp4": //XXX Simplify statements
        $("#video").addClass("show");
        //Condition will be true  if subtitle isn't loaded
        if (!$("#subtitle").hasClass("show")) {
          $("#dropRegion h1").text("Now add the the Subtitle")
        }
        $.post('/composeVideo', {
            "video": "files[i]"
          },function(){
            console.log('ok')
          });
        break;

      case "text/vtt":
        $("#subtitle").addClass("show");
        //Condition will be true  if video isn't loaded
        if (!$("#video").hasClass("show")) {
          $("#dropRegion h1").text("Now add the the Video");
        }

        var reader = new FileReader();
        reader.onloadend = function() {
          $.post('/composeVideo', {
              "subtitle": "reader.result"
            },function(){
              console.log('ok')
            });
          console.log(reader.result);
        }
        reader.readAsBinaryString(files[i])

        break;

      case "application/x-subrip":
        $.get("/srt2vtt", {
          subtitle: files[i]
        }, function(converted) {

        })
        break;
      default:
        regex = new RegExp("video\/*");
        isVideo = regex.test(type);
    }
  }
}
