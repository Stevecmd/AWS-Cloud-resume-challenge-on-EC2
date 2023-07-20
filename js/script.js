// JS code for visitor counter
// const counter = document.querySelector(".counter-number");

// async function updateCounter() {
//     try {
//         let response = await fetch("https://gcvbryl5r4exmiel6oba4r6ql40ktdqx.lambda-url.us-east-1.on.aws/");
//         let data = await response.json();

//         if (data && data['Visit_Count']) {
//             var visitCount = data['Visit_Count'];
//             counter.innerHTML = `Views: ${visitCount}`;
//         } else if (data && data['error']) {
//             var errorMessage = data['error'];
//             document.getElementById('counter-error').innerHTML = errorMessage;
//         } else {
//             document.getElementById('counter-error').innerHTML = 'Unknown error occurred.';
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         document.getElementById('counter-error').innerHTML = 'Error occurred while fetching counter data.';
//     }
// }

// updateCounter();

// JS code version 2
// JS code for visitor counter
// const counter = document.getElementById("Views");

// async function updateCounter() {
//     try {
//         let response = await fetch("https://gcvbryl5r4exmiel6oba4r6ql40ktdqx.lambda-url.us-east-1.on.aws/");
//         let data = await response.json();

//         if (data && data['Visit_Count']) {
//             var visitCount = data['Visit_Count'];
//             counter.innerHTML = visitCount;
//         } else if (data && data['error']) {
//             var errorMessage = data['error'];
//             console.error("Error:", errorMessage);
//         } else {
//             console.error("Unknown error occurred.");
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }

// updateCounter();

// JS code version 3
async function updateCounter() {
    try {
      let response = await fetch("https://gcvbryl5r4exmiel6oba4r6ql40ktdqx.lambda-url.us-east-1.on.aws/");
      let data = await response.json();
  
      if (data && data['Visit_Count']) {
        var visitCount = data['Visit_Count'];
        document.getElementById('counter').textContent = visitCount;
      } else {
        console.error("Unknown error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  updateCounter();  