// identifiera HTML-element och spara som JavaScript-variabler
let minText = document.getElementById("minText");
let röd = document.getElementById("röd");
let blå = document.getElementById("blå");
let svart = document.getElementById("svart");

// skapa händelsehanterare
röd.onclick = function (event) {
  // när man klickar på knappen "Röd" anropas funktionen...
  console.log("Klickade på den röda knappen!");
  minText.style.color = "red"; // ändra en CSS-egenskap
};
blå.onclick = function (event) {
  // när man klickar på knappen "Blå" anropas funktionen...
  console.log("Klickade på den blåa knappen!");
  minText.style.color = "blue"; // ändra en CSS-egenskap
};
svart.onclick = function (event) {
  // när man klickar på knappen "Svart" anropas funktionen...
  console.log("Klickade på den svarta knappen!");
  minText.style.color = "black"; // ändra en CSS-egenskap
};