/* globals require */
console.log("Hello, Airtable");

// load the airtable library, call it "Airtable"
var Airtable = require("airtable");

// use the airtable library to get a variable that represents one of our bases
// We needed to put in the right apiKey and
// base ID here!
var base = new Airtable({ apiKey: "keyibrh0lTCkjWYpl" }).base(
  "appi3IQyQjAyimk7n"
);

// Get the "songs" table from the base,
// specify the view (which should be SORTED by rating),
// and specify the callback functions that will receive each page of data
base("songs").select({
    view: "Gridview"
}).eachPage(gotPageOfData, gotAllData);

// an empty array to hold our songs data
const songs = [];

// callback function that receives each page of data (considered here as records) and adds them to our list of songs
function gotPageOfData(records, fetchNextPage) {
  console.log("gotPageOfData()");
  console.log("There are "+records.length+" items in records");
  // This takes the list of records and add them to the songs array
  songs.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when ALL pages are loaded
function gotAllData(err) {
  console.log("gotAllData()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  // call function to show the data
  showData();
}

// show the data on the page
function showData() {
  console.log("showData()");

  // find the shelf element
  const songsContainer = document.querySelector("#container");

  // loop through all the people listed in the Airtable data.
  // Inside is the code we are applying for EACH song in the list of songs.
  songs.forEach((song) => {

    // Print out what a single songs's data feidls looks like
    console.log("SHOWING THE SONG")
    console.log(song.fields);


    /** CREATE CONTAINER */
    const songContainer = document.createElement("div");
    songContainer.classList.add("songContainer");

    /*******************
    ADD THE TITLE
    *******************/

    const titleElement = document.createElement("h2");
    titleElement.innerText = song.fields.title;
    songContainer.appendChild(titleElement);

    /*******************
    ADD ARTIST TITLE
    *******************/

    const artistElement = document.createElement("p");
    artistElement.innerText = song.fields.artist;
    songContainer.appendChild(artistElement);

    /*******************
    ADD SONG RATING
    *******************/

    let ratingElement = document.createElement("p");
    ratingElement.innerText = "rating: "+ song.fields.rating;
    songContainer.appendChild(ratingElement);


    /*******************
    ADD GENRES
    *******************/

    let genresList = song.fields.genres;

    genresList.forEach(function(genre){
      const genreElement = document.createElement("span");
      genreElement.classList.add("genreTag");
      genreElement.innerText = genre;
      songContainer.appendChild(genreElement);
console.log(genre)
      songContainer.classList.add(genre);

    })


    /***********
     TODO: CREATE FILTER-BY-GENRE FUNCTIONALITY
     **********/
    let filterCountry = document.querySelector("#country");
    filterCountry.addEventListener("click", function(){

        if (songContainer.classList.contains("country")){
        songContainer.style.display = "block";
         }else{
        songContainer.style.display = "none"
    }

    });

    let filterPop = document.querySelector("#pop");
    filterPop.addEventListener("click", function(){

    if (songContainer.classList.contains("pop")){
        songContainer.style.display = "block";
    }else{
        songContainer.style.display = "none"
    }

    });


    let filterIndie = document.querySelector("#indie");
    filterIndie.addEventListener("click", function(){

    if (songContainer.classList.contains("indie")){
        songContainer.style.display = "block";
    }else{
        songContainer.style.display = "none"
    }
    });

    let filterElectronic = document.querySelector("#electronic");
    filterElectronic.addEventListener("click", function(){

    if (songContainer.classList.contains("electronic")){
        songContainer.style.display = "block";
    }else{
        songContainer.style.display = "none"
    }
    });

    // let filterNeosoul = document.querySelector("#neosoul");
    // filterNeosoul.addEventListener("click", function(){
    //
    // if (songContainer.classList.contains("neosoul")){
    //     songContainer.style.display = "block";
    // }else{
    //     songContainer.style.display = "none"
    // }
    // });

    let filterRap = document.querySelector("#rap");
    filterRap.addEventListener("click", function(){

    if (songContainer.classList.contains("rap")){
        songContainer.style.display = "block";
    }else{
        songContainer.style.display = "none"
    }
    });

    let filterReset = document.querySelector("#reset");
     filterReset.addEventListener("click", function(){
         songContainer.style.display = "block";
     });

     songsContainer.appendChild(songContainer);
     });
 }
