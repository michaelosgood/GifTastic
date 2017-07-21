console.log("html is connected to app.js")

//click event listener for all buttons
$("button").on("click", function() { 
	//button clicked
	console.log("you clicked me");

	//grabbing and storing data-hero property from button
	var hero = $(this).attr("data-character"); 

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

		//stores the data from the request in the results variable
		var results = response.data;

		//we loop through each result
		for(var i = 0; i < results.length; i++){

			//creating and storing a div
			var characterDiv = $("<div>");
			console.log("characterDiv created");

			//creating a paragraph div tag with the results' ratings
			var p = $("<p>").text("Rating: " + results[i].rating);

			//creating and storing an image tag
			var characterImage = $("<img>")

			//setting the src attribute to a property pulled from the results
			characterImage.attr("src", results[i].images.fixed_height.url);

			//appending paragraph div to the rating
			characterDiv.append(p);
			characterDiv.append(characterImage);

			//prepending the characterDiv to the HTML page (my div with id "gifs-appear-here")
			$("#gifs-appear-here").prepend(characterDiv);
		}
	})
});



