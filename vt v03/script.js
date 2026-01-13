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

// identifiera en div i DOM:en och skriv ut till denna
// lyssna till mushändelsen mousemove
window.addEventListener("mousemove", (event) => {
  //console.log(`Musen är nu på koordinaterna (${event.clientX},${event.clientY})`);
  let position = document.getElementById("position");
  // Skriv ut.
  position.innerHTML = `Musen är nu på koordinaterna (${event.clientX},${event.clientY})`;
});
