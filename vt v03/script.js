let btn = document.getElementById("myButton");
btn.onclick = function (event) {
  console.log("Externt JavaScript säger: Klickade på knappen.");
};

let btn2 = document.getElementById("myButton2");
btn2.addEventListener("click", function (event) {
  console.log("Klickade på knappen igen.");
  console.log(event); // event-objektet innehåller en massa infomation
});

// lyssna till tangentbordstryckningar
window.addEventListener("keypress", (event) => {
  console.log("Tangent nedtryckt", event.key);
});

// Hämta referens till alla element med en klass.
// getElementsByClassName() returnerar en collection att loopa över.
let buttons = document.getElementsByClassName("buy");

// Loopa igenom alla knappar.
for (let i = 0; i < buttons.length; i++) {
  const button = buttons[i];
  // Lägg till eventlyssnare på knappen.
  button.addEventListener("click", function (event) {
    console.log("En köpknapp klickades.");
  });
}

// TODO: skriv ut muskoordinater i div:en med id "position"