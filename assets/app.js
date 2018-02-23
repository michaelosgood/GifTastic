//Michael Osgood / GifTastic 

$(function(){
	populateButtons(searchArray, 'searchButton', '#buttonsArea');
	console.log('Page Loaded');
})

var searchArray = ['Batman','Pulp Fiction','Danny Devito'];

function populateButtons(searchArray,classToAdd,areaToAddTo){ //function to populate buttons 
	$(areaToAddTo).empty(); //empties the text box after button is clicked
	for(var i=0; i<searchArray.length; i++){ //for loop to go through our search array
		var a = $('<button>'); //variable a is used to modify our button
		a.addClass(classToAdd); //adds a class to the button
		a.attr('data-type', searchArray[i]); //adds data type to the button
		a.text(searchArray[i]); //adding a type of data that is equal to a value in our array
		$(areaToAddTo).append(a); //appends our button 
	}
}

//display gifs when button is clicked on
$(document).on('click','.searchButton',function(){
	$('#searches').empty(); 
	$('#searches').prepend('<h2>Click on the Gif to play it!</h2>');
	var type = $(this).data('type'); //gathers the data from our buttons
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=0c9a3a752e1346f7b0c2bc714127e701&limit=10'; //our url that will get data from giphy.api
	$.ajax({url:queryURL,method: 'GET'}) //puts the request in for our data
		.done(function(response){ //return the response within a function
			for (var i=0;i<response.data.length;i++){
				var searchDiv = $('<div class="search-item">');
				var rating = response.data[i].rating; //variable to store the rating of the gif
				var p = $('<p>').text('Rating: '+rating); //creates a <p> tag to display our rating
				var animated = response.data[i].images.fixed_height.url; //variable for aqcuiring still images
				var still = response.data[i].images.fixed_height_still.url; //variable for acquiring animated images
				var image = $('<img>'); //variable for our image
				image.attr('src',still); //setting the src attribute of <img> as still variable
				image.attr('data-still',still); //data-still attribute is set to still variable
				image.attr('data-animated',animated); //data-animated attr is equal to our animated variable
				image.attr('data-state','still'); //this attr is equal to the string of 'still' 
				image.addClass('searchImage'); //adding a 'searchImage' class
				searchDiv.append(p); //adding in our paragraph that gives us rating of gif 
				searchDiv.append(image); //adding in our image of the gif
				$('#searches').append(searchDiv); //adding the searchDiv
			}
		})	
}) 

//This allows a still image to animate if clicked on and an animated image to become still 
$(document).on('click','.searchImage',function(){ //execute the function when an image is clicked
	var state = $(this).attr('data-state'); //setting our image state to the state of the image (either still or animated)
	if(state === 'still'){
		$(this).attr('src', $(this).data('animated'));
		$(this).attr('data-state','animated');
	} 
	else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state','still');
	}
})

//This allows us the user to add new buttons when clicking submit
$('#addSearch').on('click',function(){
	var newSearch = $('input').eq(0).val(); //looking for the first version of an input (so it doesnt grab value of submit from our button)
	searchArray.push(newSearch);
	populateButtons(searchArray,'searchButton','#buttonsArea');
	return false; //this prevents our submit button from refreshing the page 
})



