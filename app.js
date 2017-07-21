console.log("html is connected to app.js")


$("button").on("click", function() { //click event listener for all buttons
	//button clicked
	console.log("you clicked me");

	//grabbing and storing data-hero property from button
	var hero = $(this).attr("data-hero"); 

	//our queryURL has a hero's name concatenated in
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+hero+"&api_key=0c9a3a752e1346f7b0c2bc714127e701&limit=10";
	
	//this performs the ajax request using my queryURL
	$.ajax({
		url: queryURL,
		method: "GET"
	})

	//this function is ran after data comes back from our query
	.done(function(response) {
		console.log(queryURL);
		console.log(response);
	})
});