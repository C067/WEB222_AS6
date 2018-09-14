//Callum Dodge
//Aug 3, 2018
//100229178
//Assignment 6 - AJAX


// set a global httpRequest object

var httpRequest;
		
// TODO: when the page (window) has loaded, make a
// request for page 1
window.onload = makeRequest;

function makeRequest(pageNum) {
	
    // TODO: create a variable "url" to store the request to 
	// the current pageNum, ie:
	// 		"https://reqres.in/api/users?page=1" // for page 1
	// 		"https://reqres.in/api/users?page=2" // for page 2
	// 		etc...
    var url= "https://reqres.in/api/users?page=" + pageNum;
	
	// make an HTTP request object
	
	httpRequest = new XMLHttpRequest();

	// execute the "showContents" function when
	// the httprequest.onreadystatechange event is fired
	
	httpRequest.onreadystatechange = showContents;
	
	// open a asynchronous HTTP (GET) request with the specified url
	
	httpRequest.open('GET', url, true);
	
	// send the request
	
	httpRequest.send();
}

// the function that handles the server response

function showContents() {

//  check for response state
//  0      The request is not initialized
//  1      The request has been set up
//  2      The request has been sent
//  3      The request is in process
//  4      The request is complete

	if (httpRequest.readyState === 4) {
		// check the response code
		if (httpRequest.status === 200) { // The request has succeeded
		    // Just for debugging. 
			//console.log(httpRequest.responseText);
			
			// Javascript function JSON.parse to parse JSON data
			var jsData = JSON.parse(httpRequest.responseText);
			
			// TODO: use the jsData object to populate the correct
			// table cells, ie <tr><td>...</td></tr>
			// in the <tbody> element with id="data"
			
			//Get the tbody element by using the id "data"
            var myTable = document.getElementById("data");
			
			//Clear the table
			myTable.innerHTML = "";
			
			//Looping through the data from the requested page
			for (var cnt = 0; cnt < jsData.data.length; cnt++) {
				
				//Create a "tr" element. Table row.
				var row = document.createElement("tr");
			
				//Append the ID into the row.
				row.appendChild(getNameORID(jsData.data[cnt].id));
				//Append the First Name into the row.
				row.appendChild(getNameORID(jsData.data[cnt].first_name));
				//Append the Last Name into the row.
				row.appendChild(getNameORID(jsData.data[cnt].last_name));
				//Append the Avatar img into the row.
				row.appendChild(getAvatar(jsData.data[cnt].avatar, 250, 80, "Avatar"));
				
				//Append the row into the table(tbody) id.
				myTable.appendChild(row);
                                
            }
            
			
		} else {
			console.log('There was a problem with the request.');
		}
	}
}	

//Acquire a string and store it into a newly created "td" element.
//Return the element afterwards. 
function getNameORID(text) {
	var cell = document.createElement("td");
	var userRow = document.createTextNode(text)
	cell.appendChild(userRow);
	return cell;
}

//Acquire a url, a height, a width and an alternate name to create an 
//img element. 
//Return the element.
function getAvatar(url, height, width, alt) {
	var cell = document.createElement("td");
	var img = document.createElement("IMG");
	img.setAttribute("src", url);
	img.setAttribute("height", height);
	img.setAttribute("width", width);
	img.setAttribute("alt", alt);
	
	cell.appendChild(img);
	return cell;
}