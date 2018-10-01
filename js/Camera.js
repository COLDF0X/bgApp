//  Variable for picture source and return value format.
var pictureSource;
var destinationType;
var stringUri;

//hides smallImage and saveblock
function hideSmIm(){
document.getElementById('smallImage').style.display = 'none';
$("#savPicBlk").hide();
}

//show thumbnail images for listviews
function setThumbs(image,imageURI){
var thumbImage = document.getElementById(image);
thumbImage.style.display = 'block';
thumbImage.src = decodeURI(imageURI);
}

//save game number to session storage
function savGamNumSess(num){
sessionStorage.setItem("gameNum", JSON.stringify(num));
}

// Loading device API libraries.
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are ready to use.
function onDeviceReady() {
pictureSource=navigator.camera.PictureSourceType;
destinationType=navigator.camera.DestinationType;
}

// This function is called on the successful retrival of image.
function onPhotoURISuccess(imageURI) {
var smallImage = document.getElementById('smallImage');
smallImage.style.display = 'block';// This function is used for unhiding the image elements
smallImage.src = imageURI;// This function is used to display the captured image.
$("#savPicBlk").show();//Show save and cancel buttons
stringUri = imageURI;//save string of URI to session storage
}

// This function will execute on button click.
function capturePhotoWithFile() {
// Take picture using device camera and retrieve image with file data
        navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: false });
}

// This function will execute on button click.
function capturePhotoWithFileEdit() {
// Take picture using device camera, allow edit, and retrieve image with file data
        navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, allowEdit: true, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: false });
}

// Retrieve image file location from specified source
/* navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
destinationType: destinationType.FILE_URI,
sourceType: pictureSource.PHOTOLIBRARY }); }*/


// This function will be called if some thing goes wrong.
function onFail(message) {
errorAdPicPop('Failed because: ' + message);
}

//save picture URI to a game object
function savGamePic(){
try{
	var num = JSON.parse(sessionStorage.getItem("gameNum"));
	var storedGames = $.jStorage.get("games");
	if(storedGames != null){
		//get the array and set to var gamesArray
		var gamesArray = JSON.parse(storedGames);
		console.log("found games array");
	}
	else{
		console.log("error didn't find games array to save pic to");
	}
	if(stringUri != null || gamesArray != null || num != null){
	gamesArray[num].PicUri = stringUri;
	$.jStorage.set("games", JSON.stringify(gamesArray));
	RefreshAll();
	picSavedPop();
	hideSmIm();
}
}
catch (e) 
{
//deal with error using console log and error message popup
console.log("Error: Adding a game pic. " + e.message);
errorAdPicPop("Could not add a picture due to: " + e.message);
}
}

//popup for error when adding a pic for a game
function errorAdPicPop(message){
	$("#popUpPic").html("<h2>Alert!</h2><p style='color:red; text-align: center;'><b>"+message+"</b></p>"+
	'<a href="#add-new" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext ui-btn-a"></a>').popup("open"); 
	setTimeout(function(){  $("#popUpPic").popup("close"); }, 5000);
}

//popup for pic sucessfully added
	function picSavedPop(){
		$("#popUpPic").html("<h2>Info</h2><p style='color:blue; text-align: center;'><b>New Picture Has Been Saved</b></p>"+
		'<a href="#" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext ui-btn-a"></a>').popup("open"); 
		setTimeout(function(){  $("#popUpPic").popup("close"); }, 5000);
	}

//popup for pic sucessfully added
	function picDelPop(){
		$("#popUpPic").html("<h2>Info</h2><p style='color:blue; text-align: center;'><b>The Picture Has Been Removed From This Game</b></p>"+
		'<a href="#" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext ui-btn-a"></a>').popup("open"); 
		setTimeout(function(){  $("#popUpPic").popup("close"); }, 5000);
	}

//save picture URI to a game object
function delGamePic(){
try{
	var num = JSON.parse(sessionStorage.getItem("gameNum"));
	var storedGames = $.jStorage.get("games");
	if(storedGames != null){
		//get the array and set to var gamesArray
		var gamesArray = JSON.parse(storedGames);
		console.log("found games array");
	}
	else{
		console.log("error didn't find games array to remove pic from");
	}
	if(gamesArray != null || num != null){
		if(gamesArray[num].hasOwnProperty("PicUri")){
		delete gamesArray[num].PicUri;
		$.jStorage.set("games", JSON.stringify(gamesArray));
		RefreshAll();
		picDelPop();
		hideSmIm();
		}
		else{
		errorAdPicPop("This game has had no picture to remove");}
	}
}
catch (e) 
{
//deal with error using console log and error message popup
console.log("Error: Removing a game pic. " + e.message);
errorAdPicPop("Could not remove a picture due to: " + e.message);
}
}