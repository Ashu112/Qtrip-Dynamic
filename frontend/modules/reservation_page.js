import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  let url = config.backendEndpoint + "/reservations";
  try {
    let resp = await fetch(url);
    let data = await resp.json();
    return data;
  } catch (error) {
    // Place holder for functionality to work in the Stubs
    console.log(error);
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  if (reservations.length > 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }

  reservations.map((key, idx) => {
    let ele = document.createElement("tr");
    // let bookingDate = key.time;
    // let formattedBookingDate = convertToLocale(bookingDate) 
    let foramttesBookinDateTime = dateTimeFormatter(key.time)
    ele.innerHTML = `<th scope="row">${key.id}</th>
                     <td >${key.name}</td>
                     <td >${key.adventureName}</td>
                     <td >${key.person}</td>
                     <td >${new Date(key.date).toLocaleDateString("en-In")}</td>
                     <td >${key.price}</td>
                     <td >${foramttesBookinDateTime}</td>
                     <td ><div class="reservation-visit-button" id=${key.id}><a href="../detail/?adventure=${key.adventure}">Visit Adventure</a></div></td>`;
                     document.getElementById("reservation-table").appendChild(ele);
  });
}

// function convertToLocale(dateString) {
//   let date = new Date(dateString);
//   let day = date.getDate();
//   let monthIndex = date.getMonth();
//   let year = date.getFullYear();
//   let time = date.toLocaleTimeString(undefined, {
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric",
//     hour12: true,
//   });

//   let monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   let month = monthNames[monthIndex];

//   let convertedDate = day + " " + month + " " + year + ", " + time;
//   return convertedDate;
// }

function dateTimeFormatter(dateString){
  let dateEle = new Date(dateString);

  let formattedDate = dateEle.toLocaleString("en-IN",{
    year:"numeric",
    day:"numeric",
    month:"long",
    hour:"numeric",
    minute:"numeric",
    second:"numeric",
    hour12:true,
  })

  let finalDate = formattedDate.replace(" at",",");
  return finalDate;
}

export { fetchReservations, addReservationToTable };
