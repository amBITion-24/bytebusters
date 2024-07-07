document.getElementById("mainChatBot-SearchDiv-closeDiv").addEventListener("click", () => {
	document.getElementById("mainChatBot-SearchDiv").style.display = "none";
  document.getElementById('mainChatBot-SearchDiv-input').style.display = "none";
  document.getElementById("buyButton").style.display = "none";
});

document.getElementById("aiBotDiv").addEventListener("click", () => {
	document.getElementById("mainChatBot-SearchDiv").style.display = "block";
	document.getElementById("mainChatBot-SearchDiv").style.animation = "0.2s dis forwards";
  document.getElementById('mainChatBot-SearchDiv-input').style.display = "block";
  document.getElementById("buyButton").style.display = "flex";
	let element = document.getElementById("ai-text");
	fadeInTextWordByWord(element);
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

/*
function superDumbIntelligence(outputData){
ai_textt = '';
const url = 'https://adityasaroha456.pythonanywhere.com/groq_example';
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
  ai_text.style.height = `${ai_text.scrollHeight}vw`;
  ai_text.innerText = ai_textt;
  
  ai_test.appendChild(ai_logo);
  ai_test.appendChild(ai_text);
  //windowBody.insertBefore(ai_test, userSpeechTextDisplayDiv);
  windowBody.appendChild(ai_test);
  //fadeInTextWordByWord(ai_text);

  })
.catch(error => {
  console.error('Error:', error);
});


}
*/


let ai_logo = document.getElementById('ai-logo');

function superDumbIntelligence(outputData) {
  ai_textt = '';
  const url = 'https://adityasaroha456.pythonanywhere.com/Bargain_API';
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
      // Concatenate all responses into a single string
      for (let i = 0; i < data['responses'].length - 1; i++) {
          ai_textt += data['responses'][i];
      }

      // Create new elements for AI response
      const windowBody = document.getElementById('mainChatBot-SearchDiv');
      
      // Create a container div for each AI response
      const aiTextDiv = document.createElement('div');
      aiTextDiv.classList.add('aiTextDiv'); // Ensure this class is defined in your CSS

      const ai_logo = document.createElement('span');
      ai_logo.classList.add('ai-logo'); // Ensure this class is defined in your CSS

      const ai_text = document.createElement('p');
      ai_text.classList.add('ai-text'); // Ensure this class is defined in your CSS
      ai_text.innerText = ai_textt;

      aiTextDiv.appendChild(ai_logo);
      aiTextDiv.appendChild(ai_text);

      // Append the new AI response div to the chat window
      windowBody.appendChild(aiTextDiv);

      // Optionally, you can call your animation function here
      fadeInTextWordByWord(ai_text);

      // Scroll to the bottom of the chat window
      windowBody.scrollTop = windowBody.scrollHeight;
      superDumbIntelligence2(ai_textt);
      setTimeout(() => {ai_logo.style.backgroundImage = "url(images/static-ai-logo.png)";}, 1500)

  })
  .catch(error => {
      console.error('Error:', error);
  });
}
let ai_textt2;
function superDumbIntelligence2(outputData2) {
  console.log("SuperDumbIntelligence2", outputData2);
  ai_textt2 = '';
  const url = 'https://adityasaroha456.pythonanywhere.com/Rate_After_Bargain_API';
  const data = {
      query: `From this Give me Just the Discounted Price, Just Number: ${outputData2}`
  };
  console.log(data);
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
      // Concatenate all responses into a single string
      for (let i = 0; i < data['responses'].length - 1; i++) {
        ai_textt2 += data['responses'][i];
      }
      console.log(ai_textt2);
      document.getElementById("buyButton").innerHTML = ai_textt2;
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

/*
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            console.log('SpeechRecognition is supported');

            const recognition = new SpeechRecognition();
            const output = document.getElementById('output');
            const startButton = document.getElementById('start-recognition');
            const stopButton = document.getElementById('stop-recognition');

            recognition.continuous = true; // Keep recognition going continuously
            recognition.interimResults = true; // Show interim results

            // Start speech recognition
            startButton.addEventListener('click', () => {
                recognition.start();
                output.textContent = 'Listening...';
            });

            // Stop speech recognition
            stopButton.addEventListener('click', () => {
                recognition.stop();
                output.textContent = 'Recognition stopped.';
            });

            // Handle the recognition result
            recognition.addEventListener('result', (event) => {
                let transcript = '';
                for (let i = 0; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                output.textContent = transcript;
            });

            // Handle errors
            recognition.addEventListener('error', (event) => {
                console.error('Speech recognition error detected: ' + event.error);
                output.textContent = 'Error: ' + event.error;
            });

            // Handle speech recognition end
            recognition.addEventListener('end', () => {
                output.textContent += ' (Speech recognition ended)';
            });
        } else {
            console.log('SpeechRecognition is not supported');
            document.getElementById('output').textContent = 'Speech recognition is not supported in this browser.';
        }*/