import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  //console.log("search id",search)
  let param = new URLSearchParams(search);
  // console.log("param",param.get('adventure'))
  let id = param.get("adventure");
  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  //console.log(config.backendEndpoint)
  try {
    let url =
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
 // console.log(adventure);
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  document.getElementById("adventure-content").innerHTML = adventure.content;
  let imageDOM = document.getElementById("photo-gallery");
  let imageArray = adventure.images;
  for (let i = 0; i < imageArray.length; i++) {
    let imageElement = document.createElement("img");
    imageElement.src = imageArray[i];
    imageElement.className = "activity-card-image";
    imageDOM.appendChild(imageElement);
  }
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  //console.log(images,typeof(images))
  let carouselElement = document.getElementById("photo-gallery");
  carouselElement.innerHTML = getButtonComponent();
  let carouselParent = document.getElementById("carousel-item-parent");
  addCarouselElement(carouselParent,images)
}

function getButtonComponent() {
  return `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel"> 
  <div class="carousel-inner" id="carousel-item-parent"></div>
  <div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>
</button>
`;
}

function addCarouselElement(carouselParent,images) {
    images.forEach((element,idx) => {
      const carouselItemElement = document.createElement("div");

      idx ===0 ? carouselItemElement.classList.add("carousel-item","active","h-100")
                :carouselItemElement.className = "carousel-item h-100";
      carouselItemElement.innerHTML = `<img src=${element} class=" activity-card-image" alt="..." style="object-fit:cover"></img>`;
      carouselParent.append(carouselItemElement);
    });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  //console.log(adventure);
  if(adventure.available){
      document.getElementById("reservation-panel-sold-out").style.display = "none";
      document.getElementById("reservation-panel-available").style.display ="block";
      document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display ="block"
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  
  let formData = document.getElementById("myForm");
  formData.addEventListener("submit",async(event)=>{
    event.preventDefault();
   // console.log(event);
    let url = config.backendEndpoint + "/reservations/new";
    let formElements = formData.elements;
    
    let bodyString = JSON.stringify({
      name : formElements["name"].value,
      date: formElements["date"].value,
      person: formElements["person"].value,
      adventure : adventure.id
    })

    try{
      let res = await fetch(url,{
        method: "POST",
        body: bodyString,
        headers:{
          "Content-type":"application/json"
        }
      })

      if(res.ok){
        alert("Success!")
      }
      else{
        let data = await res.json();
        alert(`Failed - ${data.message}`)
      }
    }catch(err){
      console.log(err);
      alert("Failed")
    }
    
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
    console.log(adventure)
    if(adventure.reserved){
      document.getElementById("reserved-banner").style.display = "block"
    }
    else{
      document.getElementById("reserved-banner").style.display = "none"
    }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
