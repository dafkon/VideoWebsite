//The URIs of the REST endpoint
VUPS = "https://prod-31.centralus.logic.azure.com:443/workflows/3d71ce1bfe144e53aa5305efa465c889/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-dlwmZfcVyGNc9E3ds-zKsMZzwb-gqnA7Yu69h3zxgw";
RAI = "https://prod-22.centralus.logic.azure.com:443/workflows/481857cff65e470a8fb49b662c00e230/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PutMmvGFYAwMuB89KHc_jjvdscC-6jFmkGlEpUtMldQ";

DAI = "https://prod-12.centralus.logic.azure.com/workflows/1565ee3018c14d3db56100ac6b6aac90/triggers/manual/paths/invoke/"
DAI2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=26EVQIU2kw2tsGxMBYzQ-jJXU61Vvx8zFqvOUYPsr7E"
BLOB_ACCOUNT = "https://bloblb00798693lcom682.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

    $("#rtVideos").click(function(){

        //Run the get asset list function
        getVideosNoLogin();
  
    }); 
  $("#retVideos").click(function(){

      //Run the get asset list function
      geyVideos();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset() {
    //create a form data object
    submitData = new FormData();

    //get form variables and append them to the form data object
    submitData.append('FileName', $('#FileName').val());
    submitData.append('userID', $('#userID').val());
    submitData.append('userName', $('#userName').val());
    submitData.append('File', $('#UpFile')[0].files[0]);

    //Post the form data to the endpoint, note the need to set the content type header
    $.ajax({
        url: VUPS,
        data: submitData,
        cache: false,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (data) {

        }
    });
}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function geyVideos()
{
    //Replace the curent HTML in that div with a loading message
    $('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
    $.getJSON(RAI, function (data) {
        //Create an array to hold all the retrived assets
        var items = [];

        //iterate through the returned recors and build HTML. Incorperating the key values of the record in the data
        $.each(data, function (key, val) {
            items.push("<hr />");
            items.push("<video type=video/mp4 width='300' height ='400' controls ='controls autoplay'>" + "<source src='" + BLOB_ACCOUNT + val["filepath"] + "' width='400'/>" + "<track src=transcript.vtt label=english kind=subtitles srclang=en-us default />"+ "</video> <br />")
            items.push("File : " + val["fileName"] + "<br />");
            items.push("Uploaded by: " + val["userName"] + " (user id: " + val["userID"] + ")<br />");
            items.push("<hr />");
            items.push('<button type ="button" id="delevid" class = "btn-video" onclick="deleteAsset(\'' + val["id"] + '\',\'' + val["filepath"] + '\')">Delete</button>');
        });
        //Clear the assetlist div
        $('#VideoList').empty();

        //Append the contents of the items array to the videoList Div
        $("<ul/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo("#VideoList");
    });
}
function getVideosNoLogin()
{
    //Replace the curent HTML in that div with a loading message
    $('#vidnolog').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
    $.getJSON(RAI, function (data) {
        //Create an array to hold all the retrived assets
        var items = [];

        //iterate through the returned recors and build HTML. Incorperating the key values of the record in the data
        $.each(data, function (key, val) {
            items.push("<hr />");
            items.push("<video type=video/mp4 width='300' height ='400' controls ='controls autoplay'>" + "<source src='" + BLOB_ACCOUNT + val["filepath"] + "' width='400'/>" + "<track src=transcript.vtt label=english kind=subtitles srclang=en-us default />"+ "</video> <br />")
            items.push("File : " + val["fileName"] + "<br />");
            items.push("Uploaded by: " + val["userName"] + " (user id: " + val["userID"] + ")<br />");
            items.push("<hr />");
        });
        //Clear the assetlist div
        $('#vidnolog').empty();

        //Append the contents of the items array to the videoList Div
        $("<ul/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo("#vidnolog");
    });
}
function deleteAsset(id, path) {
    $.ajax({
        type: "DELETE",
        //Note the need to concatenate the
        url: DAI + id + path + DAI2,
    }).done(function (msg) {
        //On Success, update the assetlist.
        geyVideos();
    });
}


