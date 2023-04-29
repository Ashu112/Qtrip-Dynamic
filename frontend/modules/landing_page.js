import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("from init()");
  console.log("cities",cities)
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let url = config.backendEndpoint+"/cities";
  const response = await fetch(url);
  const data = await response.json();
  return data;
  }
  catch(e){
    console.log(e)
    return null;
  }
  
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let container = document.createElement("div");
  container.className = "col-12 col-sm-6 col-lg-3 mb-4";
  container.innerHTML = `
                        <a id =${id} href = "pages/adventures/?cities=${id}">
                        <div class = "tile">
                        <div class = "tile-text text-centre">
                        <h5>${city}</h5>
                        <p>${description}</p>
                        </div>
                        <img class="img-responsive" src= ${image}>
                        </div>
                        </div>`
   document.getElementById("data").appendChild(container);
}

export { init, fetchCities, addCityToDOM };
