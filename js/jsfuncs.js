
//------------------------- main app code ----------------------------------

//sets max length for number fields attribute
	function maxNumLength() {
	$('input').on('keyup', function () {
		var max = $(this).attr('maxlength'),
		val = $(this).val(),
		trimmed;
		if (max && val) {
		trimmed = val.substr(0, max);
		$(this).val(trimmed);
		}
	});
	}

//adds enter detect event listener
	function addTxtEvtLis(id){
	document.getElementById(id).addEventListener('keyup',enter_detector,false);
	}

//deselects textbox on enter press
	function enter_detector(e) {
	// if enter key is pressed lose focus
	if(e.which==13||e.keyCode==13){
	$(this).blur();
	}
	}

//check for theme change
	function chkTheme(){
	try{
	var hasTheme = JSON.parse($.jStorage.get("appTheme"));
	if(hasTheme != null && hasTheme == true){
	happyDaysMode(hasTheme);}
	}
	catch(e){
	console.log("error checking theme: " + e.message);}
	}

//change theme of the app to a bright and colourful one
	function happyDaysMode(hasTheme){
	try{
		if(hasTheme){
			if($("#HpyMod").text() =='Normal Mode'){
			location.reload();
			$.jStorage.set("appTheme", JSON.stringify(false));
			return;}
			var theme = 'd';
			//reset all the buttons widgets
			$("body").find('.ui-btn')
			.removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e')
			.addClass('ui-btn-up-' + theme)
			.attr('data-theme', theme);
			//reset the header/footer widgets
			$("body").find('.ui-header, .ui-footer')
			.removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
			.addClass('ui-bar-' + theme)
			.attr('data-theme', theme);
			//reset the page widget
			$("body").removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
			.addClass('ui-body-' + theme)
			.attr('data-theme', theme);
			//changing white text
			$("p, label").css('color', 'black');
			$("#HpyMod").html('Normal Mode');
			$.jStorage.set("appTheme", JSON.stringify(true));
		}
	}catch(e){
	console.log("error changing theme: " + e.message);}
	}

//goes to mainmenu after 5 seconds if app is still on start page
	function srtPgTimer() {
		setTimeout(function () {
		if($.mobile.activePage.attr('id') == 'start-page')
		window.location.href = "#main-menu";
		}, 5000);
	}

//set functions to buttons
	function setButtFunks() {
		$("#gameFind").click(searchGame);
		$("#addGameSave").click(newGameObject);
		$("#helpBtn").click(aboutInfoPop);
		$("#demoBtn").click(populate);
		$("#deleteAllBtn").click(delAllPopup);
		$("#search").click(refreshSrchLV);
		$("#delGame").click(refreshListView);
		$("#edtGame").click(refreshEditLV);
		$("#dupBtn").click(removeDups);
		$("#fbgnAdd").click(getFBGNGames);
		//click on start page to go to main menu
		$('#start-page').click(function() {
		window.location.href = "#main-menu";
		chkTheme();
		});
		chkTheme();
	}

//check local storage is supported
	function load() {
	if (typeof(Storage) == "undefined" ) {
	alert("Your browser does not support HTML5 localStorage. Try upgrading.");
	console.log("browser does not support HTML5 localStorage. Upgrade needed.");
	} else {
	console.log("Both localStorage and sessionStorage support is there.");
	}
	}

//refreshes list views and sorts games
	function RefreshAll(){
	sortGames();
	refreshListView();
	refreshEditLV();
	refreshSrchLV();
	if ( $('#lstVwSrch').data( "listview" ) === undefined ) 
		{
		// listview has not yet been turned into a listview widget so does this here.
		$('#lstVwSrch').listview();
	}
	$('#lstVwSrch').empty();
	$('#lstVwSrch').listview("refresh");
	$("#srhTxt").html('');
	}

//sorts games array into alphabetical order
	function sortGames(){
	try{
	var gamesArray = JSON.parse($.jStorage.get("games"));
	if(gamesArray != null && gamesArray.length > 1)
	{
	console.log("found games array for sort");
	gamesArray.sort(function(a, b){
	var nameA=a.GameName.toLowerCase(), nameB=b.GameName.toLowerCase();
	//sort string ascending
	if (nameA < nameB)
	return -1;
	if (nameA > nameB)
	return 1;
	//default return value (no sorting)
	return 0;
	});
	$.jStorage.set("games", JSON.stringify(gamesArray));
	console.log("sorted games");}
	else{
	console.log("skipped sorting games");
	}}
	catch(e){
	console.log("error when sorting games array"  + e.message);
	}}

//constructor for board game
	function Game(name, time, min, max){
    this.GameName = name;
    this.GameLength = time;
    this.MinPlayers = min;
    this.MaxPlayers = max;
	}

//uses some() method to check for the new game's name in the array
	function checkNewBG(gamesArray,name) {
	return gamesArray.some(function(arrGame) {
    return name.toLowerCase() === arrGame.GameName.toLowerCase();
	});
	}

//------------------------- Options menu code ------------------------

//add games to array for demo purposes.
	function populate(){
	try{
	var storedGames = $.jStorage.get("games");
	if(storedGames != null)
		{
		//get the array
		var myArray = JSON.parse(storedGames);
		console.log("found games array for populate");
		}
	else{
		//create new array if one doesn't exist
		var myArray = [];
		console.log("didn't find games array for populate & created a new one");
		}
	myArray.push(new Game("Catan", 120, 3, 4));
	myArray.push(new Game("Star Wars: Rebellion", 240, 2, 4));
	myArray.push(new Game("The Castles of Burgundy", 90, 2, 4));
	myArray.push(new Game("Mage Knight Board Game", 150, 1, 4));
	myArray.push(new Game("Star Wars: Imperial Assault", 120, 2, 5));
	myArray.push(new Game("Eclipse", 200, 2, 6));
	myArray.push(new Game("Android: Netrunner", 45, 2, 2));
	myArray.push(new Game("Keyflower", 120, 2, 6));
	myArray.push(new Game("Codenames", 15, 2, 8));
	myArray.push(new Game("Eldritch Horror", 240, 1, 8));
	myArray.push(new Game("Lords of Waterdeep", 120, 2, 5));
	myArray.push(new Game("Patchwork", 30, 2, 2));
	myArray.push(new Game("Star Wars: X-Wing Miniatures Game", 45, 2, 2));
	myArray.push(new Game("Pandemic", 45, 2, 4));
	myArray.push(new Game("Star Realms", 20, 2, 2));
	myArray.push(new Game("Arcadia Quest", 60, 2, 4));
	myArray.push(new Game("Legendary Encounters: An Alien Deck Building Game", 45, 1, 5));
	myArray.push(new Game("Ticket to Ride: Europe", 60, 2, 5));
	myArray.push(new Game("Cosmic Encounter", 120, 3, 5));
	myArray.push(new Game("Zombicide: Black Plague", 180, 1, 6));
	myArray.push(new Game("Legendary: A Marvel Deck Building Game", 45, 1, 5));
	myArray.push(new Game("Galaxy Trucker", 60, 2, 4));
	myArray.push(new Game("Carcassonne", 45, 2, 5));
	myArray.push(new Game("Small World", 80, 2, 5));
	myArray.push(new Game("Ghost Stories", 60, 1, 4));
	myArray.push(new Game("Dixit", 30, 3, 6));
	myArray.push(new Game("Mice and Mystics", 120, 1, 4));
	myArray.push(new Game("Takenoko", 45, 2, 4));
	myArray.push(new Game("Love Letter", 20, 2, 4));
	myArray.push(new Game("King of Tokyo", 30, 2, 6));
	myArray.push(new Game("Blood Bowl: Team Manager – The Card Game", 90, 2, 4));
	myArray.push(new Game("Mansions of Madness", 120, 2, 5));
	myArray.push(new Game("Forbidden Desert", 45, 2, 5));
	myArray.push(new Game("Sentinels of the Multiverse", 60, 2, 5));
	myArray.push(new Game("Pathfinder Adventure Card Game: Rise of the Runelords – Base Set", 90, 1, 4));
	$.jStorage.set("games", JSON.stringify(myArray));
	removeDups();
	$("#opPop").html("<h2>Info</h2><p style='color:blue; text-align: center;'><b>Games Populated</b></p>"+
		'<a href="#" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a>').popup("open"); 
		setTimeout(function(){  $("#opPop").popup("close"); }, 5000);
	}
	catch(e){
	//deal with error using console log and error message popup
	console.log("Error: populating. " + e.message);
	}
	}

//info popup
	function aboutInfoPop(){
	$("#opPop").html("<h2>Help & About</h2><p><b>My board games app</b></p>"+
	"<p>This app provides an easy way to store a list of all the board games you own.</p>"+
	"<p>Use the simple form to add new games to the list.</p>"+
	"<p>Then quickly find games to play based on your amount of free time you have and number of players.</p>"+
	"<p>Delete or edit games by searching using their name then clicking the appropriate icon.</p>"
	+'<a href="#" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a>').popup("open"); 
	}

//are you sure popup
	function delAllPopup() {
	$("#opPop").html('<h3 style="color:red;">Delete Game?</h3>'+
	'<p>Are You Sure You Want To Delete All Games?</p>'+
	'<a href="javascript:delAllGames()" class="ui-shadow ui-btn ui-corner-all ui-btn-b ui-icon-check ui-btn-icon-left ui-btn-inline ui-mini ui-nodisc-icon ui-btn-c">Yes</a>'+
	'<a href="#" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-b">No</a>').popup("open");
	}

//saves empty array so refreshes work then clears storage
	function delAllGames(){
	try{
	var eptyArray = [];
	$.jStorage.set("games", JSON.stringify(eptyArray));
	$("#opPop").html("<h2>All Games Deleted</h2><p><b>All games have now been removed.</b></p>"
	+'<a href="#" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a>')
	RefreshAll();
	localStorage.clear();
	}catch(e){
	//deal with error using console log and error message popup
	console.log("Error: deleting. " + e.message);
	}
	}

//removes duplicate games by name
	function removeDups(){
	try{
	var bgames1 = JSON.parse($.jStorage.get("games"));
	var obj = {};
	//compare game names by setting them as named indexes
	for (i = 0; i < bgames1.length; i++)
	{
	if(!obj[bgames1[i].GameName]) obj[bgames1[i].GameName] = bgames1[i];
	}
	var uniqueGames = [];
	for ( var uG in obj ) uniqueGames.push(obj[uG]);
	//save unique games to local storage
	$.jStorage.set("games", JSON.stringify(uniqueGames));
	console.log("removed duplicates. ");
	$("#opPop").html("<h2>Info</h2><p style='color:blue; text-align: center;'><b>Duplicate Games Removed</b></p>"+
	'<a href="#" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a>').popup("open"); 
	setTimeout(function(){  $("#opPop").popup("close"); }, 5000);
	RefreshAll();
	}catch(e){
	//deal with error using console log and error message popup
	console.log("Error: removing duplicates. " + e.message);
	}
	}

//------------------------- add new games page code ------------------------

//read contents of each form input for add new game
	function newGameObject() {
//check fields are not left empty
	if (!$.trim($('#game-name').val()) || !$.trim($('#game-time').val()) ||
		($('#selectMin').val() =="") || ($('#selectMax').val() =="")) 
		{
		emptyPopUp();
		}
	else
		{
		try {
		console.log("Strating process of saving game data to local storage.");
		//check time input
		if(!isNormalInteger($('#game-time').val().trim())){
		errorAdPop("The time value entered is not a positive number");
		return;
		}
		//define the new game Object
		var name1 = $('#game-name').val().trim();
		var time1 = parseInt($('#game-time').val().trim());
		var min1 = $('#selectMin').val();
		var max1 = $('#selectMax').val();
		var gameObject = new Game(name1, time1, min1, max1);
		//number of players validation
		if(max1 < min1){
		errorAdPop("The minimum number of players is greater than the maximum number players");
		return;
		}
		//get existing array if it exists
		var storedGames = $.jStorage.get("games");
		if(storedGames != null)
			{
			//get the array
			var gamesArray = JSON.parse(storedGames);
			console.log("found games array or adding game");
			}
		else{
			//create new array if one doesn't exist
			var gamesArray = [];
			console.log("didn't find games array & created a new one");
			}
		//check if game already exists
		if (checkNewBG(gamesArray,name1)){
		existsPopUp();
		} else {
		//add a game to the array
		gamesArray.push(gameObject);
		$.jStorage.set("games", JSON.stringify(gamesArray));
		gameCreatedPop();
		}
		clearFormData();
		RefreshAll();
		}
		catch (e) 
		{
		//deal with error using console log and error message popup
		console.log("Error: Saving to local storage. " + e.message);
		errorAdPop("An Error Occured When Saving The New Game");
		}}
	}

//test string input is a positive number
function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}

//popup for empty fields
	function emptyPopUp(){
		$("#popUp1").html("<h2>Alert!</h2><p style='color:red; text-align: center;'><b>No Values Can Be Left Empty!</b></p>"
		+'<a href="#add-new" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext ui-btn-a"></a>').popup("open"); 
		setTimeout(function(){  $("#popUp1").popup("close"); }, 5000);
	}

//popup for game that already exists
	function existsPopUp(){
		$("#popUp1").html("<h2>Alert!</h2><p style='color:red; text-align: center;'><b>This Board Game is Already Added</b></p>"+
		'<a href="#" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext ui-btn-a"></a>').popup("open"); 
		setTimeout(function(){  $("#popUp1").popup("close"); }, 5000);
	}

//popup for game sucessfully created
	function gameCreatedPop(){
		$("#popUp1").html("<h2>Info</h2><p style='color:blue; text-align: center;'><b>New Game Has Been Created</b></p>"+
		'<a href="#" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext ui-btn-a"></a>').popup("open"); 
		setTimeout(function(){  $("#popUp1").popup("close"); }, 5000);
	}

//popup for error when adding a game
	function errorAdPop(message){
		$("#popUp1").html("<h2>Alert!</h2><p style='color:red; text-align: center;'><b>"+message+"</b></p>"+
		'<a href="#add-new" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext ui-btn-a"></a>').popup("open"); 
		setTimeout(function(){  $("#popUp1").popup("close"); }, 5000);
	}

//Clears New Game Form Data
	function clearFormData(){
	$("#game-name").val("");
	$("#game-time").val("");
	//only way I could get this to work spent a day on it, tried everything!
	// Grab select field, select the relevant option, de-select any others and refresh.
	var selMin = $('#selectMin');
	selMin.val('').attr('selected', true).siblings('option').removeAttr('selected');
	selMin.selectmenu("refresh", true);
	var selMax = $('#selectMax');
	selMax.val('').attr('selected', true).siblings('option').removeAttr('selected');
	selMax.selectmenu("refresh", true);
	}

//------------------------- delete games page code ----------------------------------

//Refreshes listview when delete page is intialised
	$(document).on("pageinit", "#del-game", function(){
	refreshListView();
	});

//reloads listview
    function refreshListView() {
		if ( $('#listview1').data( "listview" ) === undefined ) 
		{
		// listview has not yet been turned into a listview widget so does this here.
		$('#listview1').listview();
		}
		//get array
	    var brGames = JSON.parse($.jStorage.get("games"));
		var ul = $("#listview1");
		ul.html('');
        if (brGames != null) {
			for (i = 0; i < brGames.length; i++) {
			var num = i;
			var bGname = brGames[i].GameName;
			var bGlength = brGames[i].GameLength;
			var bGmin = brGames[i].MinPlayers;
			var bGmax = brGames[i].MaxPlayers;
			//
			ul.append('<li><a href="javascript:infoPopup(\''+bGname+'\','+bGlength+','+bGmin+','+bGmax+')">'+
			bGname+'</a><a href="javascript:delPopup('+num+',\''+bGname+'\')"></a></li>');
			$('#listview1').listview("refresh");
			}
		}
	}

//are you sure delete popup
	function delPopup(num,name) {
	$("#del-gamepop").html('<h3 style="color:red;">Delete Game?</h3>'+
			'<p>Are You Sure You Want To Delete '+name+'?</p>'+
			'<a href="javascript:delGame('+num+')" class="ui-shadow ui-btn ui-corner-all ui-btn-b ui-icon-check ui-btn-icon-left ui-btn-inline ui-mini ui-nodisc-icon ui-btn-c">Yes</a>'+
			'<a href="#del-game" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-b">No</a>').popup("open");
	}

//game info popup
	function infoPopup(name,leng,min,max){
	$("#del-gamepop").html('<h2>'+name+'</h2>'+
			'<p>Game Length: '+leng+' mins</p>'+
			'<p>Minimum number of Players: '+min+'</p>'+
			'<p>Maximum number of Players: '+max+'</p>'+
			'<a href="#del-game" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a>').popup("open");
	}

//remove a game from array
	function delGame(num) {
	var storedBGames = JSON.parse($.jStorage.get("games"));
	if(storedBGames != null)
		{
	//get the array
		var bGamesAry = storedBGames;
		console.log("found games array");
		}
	else{
		console.log("error opening games array for delete function");
		}
	//remove a game from the array
	bGamesAry.splice(num, 1);
	$.jStorage.set("games", JSON.stringify(bGamesAry));
	$("#del-gamepop").popup("close");
	RefreshAll();
	}

//------------------------- Find games page code ----------------------------------

function searchGame() {

	if (!$.trim($('#free-time').val()) || ($('#select-players').val() =="")) 
		{
			emptyFieldAlert();
		}
	else
		{
		try {
		//get search vars
		var freeTime = parseInt($('#free-time').val().trim());
		var numPlyrs = $('#select-players').val().trim();
		//get games array if it exists
		var strdGames = JSON.parse($.jStorage.get("games"));
		if(strdGames != null)
			{
			//get the array
			var origArray = strdGames;
			console.log("found games array for game search");
			}
		else{
			noSavGameAlert();
			}
		if (strdGames != null) {
		var srchRslts = [];
		for (i = 0; i < strdGames.length; i++) {
		//check the saved games against search 
			if((freeTime >= strdGames[i].GameLength) && (numPlyrs >= strdGames[i].MinPlayers) &&
			(numPlyrs <= strdGames[i].MaxPlayers))
			{
			//add a game to the array if they fit results
			srchRslts.push(strdGames[i]);
			}
		}}
		//clear search fields
		clearSearchFormData();
		$("#srhTxt").html('<b>Games playable in '+freeTime+' mins for ' +numPlyrs+ ' players:</b>');
		refreshFindLV(srchRslts);
		}
		catch (e) 
		{
		//deal with error using console log and error message popup
		errorSrchAlert();
		console.log("Error: Searching For Games. " + e.message);
		}
	}}

//pop up alert
	function emptyFieldAlert()
	{
		$("#popUp2").html("<h2>Alert!</h2><p style='color:red; text-align: center;'><b>No Values Can Be Left Empty!</b></p>"
		+'<a href="#add-new" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a>').popup("open"); 
		setTimeout(function(){  $("#popUp2").popup("close"); }, 5000);
	}
//pop up alert
	function noSavGameAlert()
	{
		$("#popUp2").html("<h2>Alert!</h2><p style='color:red; text-align: center;'><b>No Games Saved To Search</b></p>"
		+'<a href="#add-new" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a>').popup("open"); 
		setTimeout(function(){  $("#popUp2").popup("close"); }, 5000);
		console.log("didn't find games array");
	}
//pop up alert
	function errorSrchAlert()
	{
		$("#popUp2").html("<h2>Alert!</h2><p style='color:red; text-align: center;'><b>An Error Occured When Searching Games</b></p>"+
		'<a href="#add-new" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a>').popup("open"); 
		setTimeout(function(){  $("#popUp2").popup("close"); }, 5000);
	}

//Clears New Game Form Data
	function clearSearchFormData(){
	$("#free-time").val("");
	// Grab select field, select the relevant option, de-select any others and refresh.
	var plrs = $('#select-players');
	plrs.val('').attr('selected', true).siblings('option').removeAttr('selected');
	plrs.selectmenu("refresh", true);
	}

//reload listview updating its data
	function refreshFindLV(sbrGames){
	if ( $('#lstVwSrch').data( "listview" ) === undefined ) 
		{
		// listview has not yet been turned into a listview widget so does this here.
		$('#lstVwSrch').listview();
		}
		//get array
		try{
		var uls = $("#lstVwSrch");
		uls.html('');
		}
		catch(e) 
		{
		//deal with error using console log and error message popup
		errorSrchAlert();
		console.log("Error: Refreshing Search Listview with results. " + e.message);
		}
        if (sbrGames != null) {
			console.log("got temp search array")
			for (i = 0; i < sbrGames.length; i++) 
			{
			var num = i;
			var bGnam = sbrGames[i].GameName;
			var bGleng = sbrGames[i].GameLength;
			var bGminP = sbrGames[i].MinPlayers;
			var bGmaxP = sbrGames[i].MaxPlayers;
			var gamePic = null;
			var thbName = "thm" + num;
			var thumbNaila = '';
			if(sbrGames[i].hasOwnProperty("PicUri")){
				gamePic = encodeURI(sbrGames[i].PicUri);
				thumbNaila = '<img style="display:none;width:80px;height:80px;" id="'+thbName+'" src="" />';
			}
			//populating the listview
			uls.append('<li><a href="javascript:infoSrchPop(\''+bGnam+'\','+bGleng+','+bGminP+','+bGmaxP+','+num+',\''+gamePic+'\')">'+
			thumbNaila+bGnam+'</a></li>');
			if(thumbNaila != '')setThumbs(thbName,gamePic);
			$('#lstVwSrch').listview("refresh");
			}
		}
	}

	//game info popup
	function infoSrchPop(name,leng,min,max,num,gamePic){
	var imgName = "findImg"+num;
	$("#popUp2").html('<br /><h2>'+name+'</h2>'+
			'<p>Game Length: '+leng+' mins</p>'+
			'<p>Minimum number of Players: '+min+'</p>'+
			'<p>Maximum number of Players: '+max+'</p>'+
			'<br /><img style="display:none;max-width:250px; height:280px;margin-left: auto;margin-right: auto;" id="'+imgName+'" src="" />'+
			'<a href="#find-game" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext ui-btn-a"></a><br />').popup("open");
	if(gamePic != "null")
		setThumbs(imgName,gamePic);
	}

//------------------------- Edit games page code ----------------------------------

//Refreshes listview when edit page is intialised
	$(document).on("pageinit", "#edit-games", function(){
	refreshEditLV();
	});

//reloads listview
    function refreshEditLV() {
		if ( $('#editList').data( "listview" ) === undefined ) 
		{
		// listview has not yet been turned into a listview widget so does this here.
		$('#editList').listview();
		}
		//get array
	    var brGames = JSON.parse($.jStorage.get("games"));
		var ul = $("#editList");
		ul.html('');
        if (brGames != null) {
			for (i = 0; i < brGames.length; i++) {
			var num = i;
			var bGname = brGames[i].GameName;
			var bGlength = brGames[i].GameLength;
			var bGmin = brGames[i].MinPlayers;
			var bGmax = brGames[i].MaxPlayers;
			//filling listview
			ul.append('<li><a href="javascript:infoEditPop(\''+bGname+'\','+bGlength+','+bGmin+','+bGmax+')">'+
			bGname+'</a><a href="javascript:edtGame('+num+')"></a></li>');
			$('#editList').listview("refresh");
			}
		}
	}

	//game info popup
	function infoEditPop(name,leng,min,max){
	$("#editPop").html('<h2>'+name+'</h2>'+
			'<p>Game Length: '+leng+' mins</p>'+
			'<p>Minimum number of Players: '+min+'</p>'+
			'<p>Maximum number of Players: '+max+'</p>'+
			'<a href="#find-game" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a>').popup("open");
	}

	//show edit fields and set functions to buttons
	function edtGame(num){
	$("#editList").hide();
	$("#frm1").hide();
	$("#para1").hide();
	$("#editBlock").show();
	editFormData(num);
	var cnclBtn = $('#editCancel');
	cnclBtn.attr('onClick', 'cancelEdit();');
	var savBtn = $('#editSave');
	savBtn.attr('onClick', 'saveEdt('+num+');');
	}

	//Sets the form data to be edited
	function editFormData(num){
	//get game object details into vars
	var brGames1 = JSON.parse($.jStorage.get("games"));
	var bGnam1 = brGames1[num].GameName;
	var bGleng1 = brGames1[num].GameLength;
	var bGminP1 = brGames1[num].MinPlayers;
	var bGmaxP1 = brGames1[num].MaxPlayers;
	//put game details in form fields
	$("#edt-g-name").val(bGnam1);
	$("#edt-g-time").val(bGleng1);
	var selMin = $('#selEdtMin');
	selMin.val(bGminP1).attr('selected', true).siblings('option').removeAttr('selected');
	selMin.selectmenu("refresh", true);
	var selMax = $('#selEdtMax');
	selMax.val(bGmaxP1).attr('selected', true).siblings('option').removeAttr('selected');
	selMax.selectmenu("refresh", true);
	$("#btnAddPicEd").click(savGamNumSess(num));
	}

	//cancels out of edit form
	function cancelEdit(){
	//clears fields
	$("#edt-g-name").val("");
	$("#edt-g-time").val("");
	$("#auto-input-1").val("");
	var selMin = $('#selEdtMin');
	selMin.val('').attr('selected', true).siblings('option').removeAttr('selected');
	selMin.selectmenu("refresh", true);
	var selMax = $('#selEdtmax');
	selMax.val('').attr('selected', true).siblings('option').removeAttr('selected');
	selMax.selectmenu("refresh", true);
	//hides edit fields and shows games list
	$("#editList").show();
	$("#editBlock").hide();
	$("#frm1").show();
	$("#para1").show();
	//takes save function off button
	var savBtn = $('#editSave');
	savBtn.removeAttr('onClick');
	}

	//saves the edited data
	function saveEdt(num){
	//checks fields are nor empty
	if (!$.trim($('#edt-g-name').val()) || !$.trim($('#edt-g-time').val()) ||
		($('#selEdtMin').val() =="") || ($('#selEdtMax').val() =="")) 
		{
			$("#editPop").html("<h2>Alert!</h2><p style='color:red; text-align: center;'><b>No Values Can Be Left Empty!</b></p>"
			+'<a href="#edit-games" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a>').popup("open"); 
			setTimeout(function(){  $("#editPop").popup("close"); }, 5000);
		}
	else
		{
		try {
		console.log("Saving edited game data to local storage.");
		//check time input
		if(!isNormalInteger($('#edt-g-time').val().trim())){
		errorEdAdPop("The time value entered is not a positive number");
		return;
		}
		//define the new game Object
		var gamNam = $('#edt-g-name').val().trim();
		var gamLen = parseInt($('#edt-g-time').val().trim());
		var gamMin = $('#selEdtMin').val();
		var gamMax = $('#selEdtMax').val();
		var gameObject = new Game(gamNam,gamLen,gamMin,gamMax);
		//number of players validation
		if(gamMax < gamMin){
		errorEdAdPop("The minimum number of players is greater than the maximum number players");
		return;
		}
		//get existing array if it exists
		var storedGames = $.jStorage.get("games");
		if(storedGames != null)
			{
			//get the array and set to var gamesArray
			var gamesArray = JSON.parse(storedGames);
			console.log("found games array");
			}
		else{
			console.log("error didn't find games array to save edit to");
			}
		//add a game to the array if it doesnt already exista as another game.
		if (checkNewBG(gamesArray,gamNam) && gamNam.toLowerCase() != gamesArray[num].GameName.toLowerCase()){
		$("#editPop").html("<h2>Alert!</h2><p style='color:red; text-align: center;'><b> This Game Already Exists As Another Stored Game</b></p>"+
		'<a href="#add-new" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a>').popup("open"); 
		setTimeout(function(){  $("#editPop").popup("close"); }, 5000);}
		else{
		gamesArray.splice(num,1,gameObject);
		$.jStorage.set("games", JSON.stringify(gamesArray));
		RefreshAll();
		cancelEdit();
		$("#editPop").html("<h2>Info</h2><p style='color:blue; text-align: center;'><b>Game Edit Saved</b></p>"+
		'<a href="#add-new" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a>').popup("open"); 
		setTimeout(function(){  $("#editPop").popup("close"); }, 5000);
		}
		}
		catch (e) 
		{
		//deal with error using console log and error message popup
		console.log("Error: Saving to local storage. " + e.message);
		$("#editPop").html("<h2>Alert!</h2><p style='color:red; text-align: center;'><b>An Error Occured When Saving Edited Game</b></p>"+
		'<a href="#add-new" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a>').popup("open"); 
		setTimeout(function(){  $("#editPop").popup("close"); }, 5000);
		}}
	}

	//popup for error when adding a game
	function errorEdAdPop(message){
		$("#editPop").html("<h2>Alert!</h2><p style='color:red; text-align: center;'><b>"+message+"</b></p>"+
		'<a href="#add-new" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext ui-btn-a"></a>').popup("open"); 
		setTimeout(function(){  $("#editPop").popup("close"); }, 5000);
	}

//------------------------- View all games page code ----------------------------------

//Refreshes listview when view all page is intialised
	$(document).on("pageinit", "#show-games", function(){
	refreshSrchLV();
	});

//reloads listview
    function refreshSrchLV() {
		if ( $('#listSearch').data( "listview" ) === undefined ) 
		{
		// listview has not yet been turned into a listview widget so does this here.
		$('#listSearch').listview();
		}
		//get array
		try{
	    var brGames = JSON.parse($.jStorage.get("games"));
		var ul = $("#listSearch");
		ul.html('');
        if (brGames != null) {
			for (i = 0; i < brGames.length; i++) {
			var bGname2 = brGames[i].GameName;
			var bGlength2 = brGames[i].GameLength;
			var bGmin2 = brGames[i].MinPlayers;
			var bGmax2 = brGames[i].MaxPlayers;
			//
			ul.append('<li><p class="wrap">'+bGname2+': '+bGlength2+'mins, '+bGmin2+'-'+bGmax2+' players</p></li>');
			$('#listSearch').listview("refresh");
			}
		}}
		catch(e){
		//deal with error using console log and error message popup
		console.log("Error: Error populating search listview. " + e.message);
		$("#srch-gamepop").html("<h2>Alert!</h2><p style='color:red; text-align: center;'><b>An Error Occured When Loading Search Page</b></p>"+
		'<a href="#add-new" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext"></a>').popup("open"); 
		setTimeout(function(){  $("#srch-gamepop").popup("close"); }, 5000);
		}
	}

//------------------------- add fbgn games page code ----------------------------------

//uses post to FBGN website which sends username and returns games recommended by that user
	function getFBGNGames(){
	console.log("getting games from FBGN");
	var userName = $('#users-name').val();
	var siteUrl = 'https://jose.cs.herts.ac.uk/af16acf/public/GetRecs?UserName=' + userName;
	console.log(siteUrl);
	//fields are empty error popup
	if (!$.trim($('#users-name').val())) 
		{
		emptyfbgnPopUp();
	}else{
		$("#popUpFBGN").html("<p style='text-align: center;'>Please Wait While We Get The Games</p>").popup("open");
		$.ajax({
            url: siteUrl,
            type: "Post",
			timeout: 30000,
			dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log("Success returned:" + data);
				if (data == null) noGamesFbgnPopUp();
				addfbgnGames(data);
            },
            error: function () {
				
				errorfbgnPopUp();
                console.log("There was an error in post");
			}
		});
	}}

// Add games
	function addfbgnGames(newGames){
	if (newGames != null){
	try{
	    var brdGames = JSON.parse($.jStorage.get("games"));
        if (brdGames == null) {
		//create new array if one doesn't exist
		var brdGames = [];
		console.log("didn't find games array for fbgn games & created a new one");
		}
		console.log("new games length is = " + newGames.length);
		for (i = 0; i < newGames.length; i++) {
			//check if game already exists
				if (checkNewBG(brdGames,newGames[i].GameName)){
				console.log(" Error: " +newGames[i].GameName+ " game exists" );}
				else{
				//add a game to the array
				brdGames.push(newGames[i]);}
			}
		$.jStorage.set("games", JSON.stringify(brdGames));
		RefreshAll();
		$("#users-name").val("");
		DonefbgnPopUp();
		}
		catch(e){
		//deal with error using console log and error message popup
		console.log("Error: Error populating search listview. " + e.message);
		errorfbgnPopUp();
		}}
		else{
		errorfbgnPopUp();
		}
}

//popup for empty fields
	function emptyfbgnPopUp(){
		$("#popUpFBGN").html("<h2>Alert!</h2><p style='color:red; text-align: center;'><b>No Values Can Be Left Empty!</b></p>"
		+'<a href="#add-new" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext ui-btn-a"></a>').popup("open"); 
		setTimeout(function(){  $("#popUpFBGN").popup("close"); }, 5000);
	}
//popup for game added
	function DonefbgnPopUp(){
		$("#popUpFBGN").html("<h2>Info</h2><p style='color:blue; text-align: center;'><b>FBGN games added!</b></p>"
		+'<a href="#add-new" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext ui-btn-a"></a>').popup("open"); 
		setTimeout(function(){  $("#popUpFBGN").popup("close"); }, 5000);
	}
//popup for empty fields
	function errorfbgnPopUp(){
		$("#popUpFBGN").html("<h2 style='color:red;'>Alert!</h2><p style='text-align: center;'><b>An error occured"+
		" when trying to add games to your list. This could be due to one of the following: "+
		"<ul><li>The user name you entered may not exist on FBGN.</li><li>That user may have no game recommendations."+
		"</li><li>You may not be connected to the internet.</li></ul></b></p>" +
		'<a href="#add-new" data-rel="back" class="ui-btn ui-btn-right ui-btn-inline ui-icon-delete ui-btn-icon-notext'+
		' ui-btn-a"></a>').popup("open");
		setTimeout(function(){  $("#popUpFBGN").popup("close"); }, 15000);
	}

