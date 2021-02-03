//define function renderRides here
function renderRide (rideDetails){
  let outputElement = document.querySelector('.rides')
  let color = 'border-gray-900'
  if (levelOfService == 'Noober Purple') {
    color = 'border-purple-500'
  } 
  outputElement.insertAdjacentHTML('beforeEnd', `
 <div class="border-4 ${color} p-4 my-4 text-left">
  <div class="flex">
    <div class="w-1/2">
      <h2 class="text-2xl py-1">${rideDetails.passengerDetails.first} ${rideDetails.passengerDetails.last}</h2>
      <p class="font-bold text-gray-600">${rideDetails.passengerDetails.phoneNumber}</p>
    </div>
    <div class="w-1/2 text-right">
      <span class="rounded-xl bg-gray-600 text-white p-2">
      ${rideDetails.numberOfPassengers} passengers
      </span>
    </div>
  </div>
  <div class="mt-4 flex">
    <div class="w-1/2">
      <div class="text-sm font-bold text-gray-600">PICKUP</div>
      <p>${rideDetails.pickupLocation.address}</p>
      <p>${rideDetails.pickupLocation.city}, ${rideDetails.pickupLocation.state} ${rideDetails.pickupLocation.zip}</p>
    </div>
    <div class="w-1/2">
      <div class="text-sm font-bold text-gray-600">DROPOFF</div>
      <p>${rideDetails.dropoffLocation.address}</p>
      <p>${rideDetails.dropoffLocation.city}, ${rideDetails.dropoffLocation.state} ${rideDetails.dropoffLocation.zip}</p>
    </div>
  </div>
 </div>
 `)
}
async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)
  
  // 🔥 start here: write code to loop through the rides
  for (let i = 0; i < json.length; i++) {
    let ride = json[i]
    console.log(ride)
    if (ride.length > 1) {
      levelOfService = 'Noober Pool'
    } else if (ride[0].purpleRequested) {
      levelOfService = 'Noober Purple'
    } else if (ride[0].numberOfPassengers > 3) {
      levelOfService = 'Noober XL'
    } else {
      levelOfService = 'Noober X'
    }
    let outputElement = document.querySelector('.rides')
    outputElement.insertAdjacentHTML('beforeEnd', `<h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
    <i class="fas fa-car-side"></i>
    <span>${levelOfService}</span>
   </h1>`)
   
  
    for (let j = 0; j < ride.length; j++) {
      let eachRide = ride[j]
      renderRide(eachRide)
    }

  }
}

window.addEventListener('DOMContentLoaded', pageLoaded)

