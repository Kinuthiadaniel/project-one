document.addEventListener("DOMContentLoaded", async (event) => {
  let baseUrl = "https://project-1-json.onrender.com/vehicles"
  clickFaq()
  const vehi = await getData()
  firstVehicle(vehi[0])
  displayVehicle(vehi)
moreInformation(vehi)
  const searched = document.getElementById("searched")

  const form = document.getElementById("form")
  const search = document.getElementById("search")
 




  function clickFaq() {
    const faq = document.querySelector("#faqs")
    faq.addEventListener("click", (e) => {
      alert("Still New in the Business we don't have FAQs yet")
    })
    return faq;
  }

  function getData() {
    return fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(res => res.json())
      .then(vehicles => vehicles)

  }

  function displayVehicle(vehicles) {
    const vehiCard = vehicles.map(vehicle => {
      return `
    <div class="card">
          <img
            src="${vehicle.image}"
            class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${vehicle.model}</h5>
            <p class="card-text"> Year : ${vehicle.YoM}</p>
             <form >
              <div>
                <input type="number" value="100" min="1" class="col-10"/>
              </div>
              <button type="submit" class="btn btn-success btn-sm mx-auto">By Price</button>
              <button type="button" id = "${vehicle.model}"class="btn btn-primary btn-sm mx-auto btn-more ">More Info</button>
             </form>
          </div>

        </div>
  `
    })
    const vehicleContainer = document.querySelector("#all-vehicles")
    vehicleContainer.innerHTML = vehiCard

  }

  function moreInformation(vehiclesContainer) {
    const viewDetails = document.querySelector("#view-vehicles")
   
    const ul = document.createElement("ul")

    const moreInfoBtn = document.querySelectorAll(".btn-more")
    moreInfoBtn.forEach(btn => {
      btn.addEventListener("click", (event) => {
      viewDetails.innerHTML=""
        const found = vehiclesContainer.find((element) => element.model === event.target.id)
        ul.innerHTML = `
    <li> ${found.model}</li>
    <li> ${found.YoM}</li>
    <li> ${found.price}</li>
    <li> ${found.description}</li>
    <li> <img width = "70% class="mx-auto" src= "${found.image}"/>""</li>
    `
        viewDetails.appendChild(ul)

      })
    })
  }

  form.addEventListener('submit', (event) => {
    searched.innerHTML = ""
    event.preventDefault()
    const foundCars = vehi.filter((found) => {

      return found.model.toLowerCase().includes(search.value.toLowerCase());
    })

    foundCars.forEach((vehicle) => {
      const div = document.createElement('div');
      div.className = "card";
      div.innerHTML = `
    <img
            src="${vehicle.image}"
            class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${vehicle.model}</h5>
            <p class="card-text"> Year : ${vehicle.YoM}</p>
             <form >
              <div>
                <input type="number" value="100" min="1" class="col-10"/>
              </div>
              <button type="submit" class="btn btn-success btn-sm mx-auto">By Price</button>
              <button type="button" id = "${vehicle.model}"class="btn btn-primary btn-sm mx-auto btn-more ">More Info</button>
             </form>
          </div>
    `
      searched.appendChild(div)
    })
    moreInformation(foundCars)
  })
  function firstVehicle(vehicle) {
    const viewDetails = document.querySelector("#view-vehicles")
    const ul = document.createElement("ul")
    ul.innerHTML = `
    <li> ${vehicle.model}</li>
    <li> ${vehicle.YoM}</li>
    <li> ${vehicle.price}</li>
    <li> ${vehicle.description}</li>
    <li> <img width = "70% class="mx-auto" src= "${vehicle.image}"/>""</li>
    `
    viewDetails.appendChild(ul)

  }
})
