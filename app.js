let map;
let markers = [];
let infoWindow;

/*
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });

    infoWindow = new google.maps.InfoWindow();

    loadLitterData();
}*/

//google.maps.MapTypeId.SATELLITE

//let mapMode = google.maps.MapTypeId.SATELLITE;

/*
let counter = 1;
document.getElementById("test_btn_changing_map_style").addEventListener("click", () => {
	counter++;
	if(counter % 2 == 0){
		mapMode = "HYBRID";
	}else{
		mapMode = "ROADMAP";
	}
	map.setMapTypeId(google.maps.MapTypeId[mapMode]);
	console.log(counter);
});
*/

let dataPoints = [];

let marker;

let redMarker;

let yellowMarker;

let markerLabel;

let intensityThreshold;

let mapMode = 'ROADMAP';

let mapImageDiv = document.getElementById('imageDisplayDiv');

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 13.395816, lng: 77.727015 },
        mapTypeId: google.maps.MapTypeId[mapMode],
        zoom: 20,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.stroke",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels.text.fill",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels.text.stroke",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    { "visibility": "off" }
                ]
            }
        ]
    });

    // Define an array of data points
    dataPoints = [];

    // Define the intensity threshold
    intensityThreshold = 100;

    // Define marker styles
        redMarker = {
        path: "M 0,0 m -25,0 a 25,25 0 1,0 50,0 a 25,25 0 1,0 -50,0",
        fillColor: "rgba(255, 0, 0, 0.4)",
        fillOpacity: 1,
        strokeColor: "red",
        strokeWeight: 1,
        scale: 1,
        labelOrigin: new google.maps.Point(0, 0)
    };

    yellowMarker = {
        path: "M 0,0 m -25,0 a 25,25 0 1,0 50,0 a 25,25 0 1,0 -50,0",
        fillColor: "rgba(255, 255, 0, 0.4)",
        fillOpacity: 1,
        strokeColor: "yellow",
        strokeWeight: 1,
        scale: 1,
        labelOrigin: new google.maps.Point(0, 0)
    };

    // Define marker label style
    markerLabel = {
        color: "white",
        fontSize: "12px",
        fontWeight: "bold",
        className: "custom-marker"
    };

    // Loop through the data points and create markers
    dataPoints.forEach(point => {
            marker = new google.maps.Marker({
            position: { lat: point.lat, lng: point.lng },
            map: map,
            icon: point.intensity > intensityThreshold ? redMarker : yellowMarker,
            label: markerLabel,
            title: point.intensity > intensityThreshold ? "Waste-Products-Accumilation, Hazard Area" : "Waste-Products-Accumilation, Critical Area"
    });
    
    /*marker.addListener('click', (e) => {
    	const position = marker.getPosition();
    	const lat = position.lat();
    	const lng = position.lng();
    	console.log("Marker Clicked at: ", lat, lng);
    	
    	for(let i = 0; i < dataPoints.length; i++){
    		if(lat == dataPoints[i]['lat'] && lng == dataPoints[i]['lng']){
    			const img = dataPoints[i]['filePath'];
    			mapImageDiv.style.display = "block";
    			mapImageDiv.style.backgroundImage = `url(${img})`;
    		}
    	}
    	
    });*/
});
}

// Ensure initMap is attached to the window object
window.initMap = initMap;

document.getElementById("closingDiv").addEventListener('click', () => {
	mapImageDiv.style.backgroundImage = "url()";
	mapImageDiv.style.display = "none";
});

let counter = 1;
document.getElementById("test_btn_changing_map_style").addEventListener("click", () => {
	counter++;
	if(counter % 2 == 0){
		mapMode = "HYBRID";
	}else{
		mapMode = "ROADMAP";
	}
	map.setMapTypeId(google.maps.MapTypeId[mapMode]);
	console.log(counter);
});

async function loadLitterData() {
    try {
        const response = await fetch('/api/litter-spots');
        const data = await response.json();

        clearMarkers();
        data.forEach((spot) => {
            addMarker(spot);
        });

        updateReportList(data);
    } catch (error) {
        console.error('Error loading litter data:', error);
    }
}

function addMarker(spot) {
    const marker = new google.maps.Marker({
        position: { lat: spot.latitude, lng: spot.longitude },
        map: map,
        title: spot.description,
    });

    marker.addListener('click', () => {
        showSpotDetails(spot, marker);
    });

    markers.push(marker);
}

function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

function showSpotDetails(spot, marker) {
    const contentString = `
        <div>
            <h3>${spot.description}</h3>
            <p>Location: (${spot.latitude}, ${spot.longitude})</p>
            <button onclick="verifySpot(${spot.id})">Verify</button>
        </div>
    `;
    infoWindow.setContent(contentString);
    infoWindow.open(map, marker);
}

async function verifySpot(spotId) {
    try {
        const response = await fetch(`/api/verify-spot/${spotId}`, {
            method: 'POST',
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error verifying spot:', error);
    }
}

function updateReportList(data) {
    const reportList = document.getElementById('report-list');
    reportList.innerHTML = '';

    data.forEach((spot) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${spot.description} (${spot.latitude}, ${spot.longitude})`;
        reportList.appendChild(listItem);
    });
}

document.getElementById('refresh-button').addEventListener('click', () => {
    loadLitterData();
});


function searchLocation(query) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': query }, (results, status) => {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            map.setZoom(14);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

/*Pushpak*/
document.getElementById('submit-suggestion-button').addEventListener('click', () => {
    const suggestionText = document.getElementById('suggestion-text').value;
    if (suggestionText.trim() !== '') {
        const suggestionList = document.getElementById('suggestion-list');
        const li = document.createElement('li');
        li.textContent = suggestionText;
        suggestionList.appendChild(li);
        document.getElementById('suggestion-text').value = '';
    }
});
/*Pushpak*/

document.getElementById("mainChatBot-SearchDiv-closeDiv").addEventListener("click", () => {
	document.getElementById("mainChatBot-SearchDiv").style.display = "none";
});

document.getElementById("aiBotDiv").addEventListener("click", () => {
	document.getElementById("mainChatBot-SearchDiv").style.display = "block";
	document.getElementById("mainChatBot-SearchDiv").style.animation = "0.2s dis forwards";
	let element = document.getElementById("ai-text");
	fadeInTextWordByWord(element);
});

let imageUploadLoading = document.getElementById("imageUploadLoading");

document.getElementById("imageUploadDiv").addEventListener("click", () => {
	const imageInput = document.getElementById("imageInput");
	if(imageInput.files.length > 0){
		console.log(imageInput.files[0]['name']);
		const formData = new FormData();
                formData.append('image', imageInput.files[0]);
                console.log(formData);
                imageUploadLoading.style.display = "block";
                fetch('http://127.0.0.1:5000/upload', {
                    method: 'POST',
            	    body: formData,
            	    // Set Content-Type explicitly for FormData
            	    /*headers: {
                    'Content-Type': 'multipart/form-data'
            	    }*/
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    // You can use the processed image data here
                    
                    let newObject = {lat: data['latitude'], lng: data['longitude'], intensity: data['percentage'], filePath: data['filePath']};
                    
                    console.log("The Data to be add to dataPoints Object is: ", newObject);
                    
                    dataPoints.push(newObject);
                    
                    console.log("The dataPoints is: ", dataPoints);
                    
                    imageUploadLoading.style.display = "none";
                    
        	marker = new google.maps.Marker({
                position: { lat: newObject['lat'], lng: newObject['lng'] },
                map: map,
                icon: newObject['intensity'] > intensityThreshold ? redMarker : yellowMarker,
                label: markerLabel,
                title: newObject['intensity'] > intensityThreshold ? "Waste-Products-Accumilation, Hazard Area" : "Waste-Products-Accumilation, Critical Area"
			});
			
		// Use a closure to create a new scope for each marker's click event
            marker.addListener('click', (() => {
                const position = marker.getPosition();
                const lat = position.lat();
                const lng = position.lng();
                return () => {
                    console.log("Marker Clicked at: ", lat, lng);
                    
                    for (let i = 0; i < dataPoints.length; i++) {
                        if (lat === dataPoints[i]['lat'] && lng === dataPoints[i]['lng']) {
                            const img = dataPoints[i]['filePath'];
                            mapImageDiv.style.display = "block";
                            mapImageDiv.style.backgroundImage = `url(${img})`;
                        }
                    }
                };
            })());
                    
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            } else {
                alert('Please select an image to upload.');
            }
                
	
});

let input = document.getElementById("mainChatBot-SearchDiv-input");
input.addEventListener('keydown', (e) => {
	if(e.key == "Enter"){
		//console.log("Enter Pressed in Input tag.");
		let outputData = input.value;
		console.log(outputData);
		input.value = '';
		
		let windowBody = document.getElementById("mainChatBot-SearchDiv");
		const user_test = document.createElement('div');
            user_test.classList.add('user-test');
            user_test.id = "user-test";
            
            const user_logo = document.createElement('span');
            user_logo.classList.add('user-logo');
            
            const user_text = document.createElement('p');
            user_text.classList.add('user-text');
            user_text.id = "user-text";
            user_text.innerText = outputData;
            user_test.appendChild(user_logo);
            user_test.appendChild(user_text);
            //windowBody.insertBefore(user_test, userSpeechTextDisplayDiv);
            windowBody.appendChild(user_test);
            superDumbIntelligence(outputData);
	}
});

let ai_textt;
let ai_text;
function superDumbIntelligence(outputData){
ai_textt = '';
const url = 'https://adityasaroha456.pythonanywhere.com/ML_WasteDetector';
//ai_text = 'How many map modes are there in the website and who is the president of INDIA.';
const data = {
  query: `${outputData}`
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
  //console.log('Response:', data['responses']);
  for(let i = 0; i < data['responses'].length - 1; i++){
  	ai_textt += data['responses'][i];
  }
  //console.log(ai_textt);
  const windowBody = document.getElementById('mainChatBot-SearchDiv');
  
  const ai_test = document.createElement('div');
  ai_test.classList.add('aiTextDiv');
  ai_test.id = "aiTextDiv";
  
  const ai_logo = document.createElement('span');
  ai_logo.classList.add('ai-logo');
  
  
  const ai_text = document.createElement('p');
  ai_text.classList.add('ai-text');
  ai_text.id = "ai-text";
  ai_text.innerText = ai_textt;
  
  ai_test.appendChild(ai_logo);
  ai_test.appendChild(ai_text);
  //windowBody.insertBefore(ai_test, userSpeechTextDisplayDiv);
  windowBody.appendChild(ai_test);
  fadeInTextWordByWord(ai_text);

  })
.catch(error => {
  console.error('Error:', error);
});


}

function fadeInTextWordByWord(element) {
    const text = element.innerText;
    element.innerHTML = '';

    // Split text into words and wrap each word in a span
    const words = text.split(' ').map(word => {
        const span = document.createElement('span');
        span.innerText = word + ' ';
        span.style.opacity = 0;
        return span;
    });

    // Append the spans to the element
    words.forEach(span => element.appendChild(span));

    // Calculate duration and delay based on the number of words
    const totalDuration = 1000; // Total duration of 1 second
    const wordCount = words.length;
    const duration = totalDuration / wordCount;
    const delay = duration;

    // Apply Anime.js animation to each word
    anime.timeline({ loop: false })
        .add({
            targets: words,
            opacity: [0, 1],
            easing: 'easeInOutQuad',
            duration: duration,
            delay: (el, i) => delay * i
        });
}

let uploadImageOption = document.getElementById("imageInput");
let uploadImageButton = document.getElementById("imageUploadDiv");
let suggestionBox = document.getElementById("suggestion-box");
let side1 = document.getElementById("sideHeaderContent1");
let side2 = document.getElementById("sideHeaderContent2");
let styleUploadImageText = document.getElementById("styleUploadImageText");
let styleUploadDesign = document.getElementById("styleUploadDesign");
/*More To Come!!*/

side1.addEventListener("click", () => {
	side1.style.backgroundColor = "white";
	side1.style.color = "black";
	side2.style.backgroundColor = "";
	side2.style.color = "white";
	suggestionBox.style.display = "none";
	uploadImageOption.style.display = "block";
	uploadImageButton.style.display = "block";
	styleUploadImageText.style.display = "block";
	styleUploadDesign.style.display = "block";
});

side2.addEventListener("click", () => {
	side1.style.backgroundColor = "";
	side1.style.color = "white";
	side2.style.backgroundColor = "white";
	side2.style.color = "black";
	suggestionBox.style.display = "block";
	uploadImageOption.style.display = "none";
	uploadImageButton.style.display = "none";
	styleUploadImageText.style.display = "none";
	styleUploadDesign.style.display = "none";
});