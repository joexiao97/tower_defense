import "./styles/index.scss";
import TowerDefenseGame from "./components/game"


const canvas = document.getElementById("gameCanvas");

document.addEventListener("DOMContentLoaded", () => {
  const game = new TowerDefenseGame(canvas);
  game.restart();

  const restart_btn = document.getElementById("restart-btn");
  restart_btn.addEventListener('click' , e => {
    game.restart();
  });
});


// const testObj = {
//   key1: "hi",
//   key2: {
//     key3: "Hello"
//   }
// };

// const greeting = testObj?.key2?.key3 || testObj.key1;
// window.addEventListener("DOMContentLoaded", () => {
//   document.body.classList.add("center");
//   const card = document.createElement("div");
//   card.classList.add("card", "center");
//   card.innerHTML = `<h2 class="hi" >${greeting} World!</h2>`;
//   document.body.append(card);
//   const imgCard = document.createElement("div");
//   imgCard.classList.add("card", "center", "image-card");
//   document.body.appendChild(imgCard);
  
// });

// const canvas = document.getElementById("gameCanvas");

// document.addEventListener("DOMContentLoaded", () => {
//   const game = new TowerDefenseGame(canvas);

//   document.body.classList.add("center");
//   const card = document.createElement("div");
//   card.classList.add("card", "center");
//   card.innerHTML = `<h2 class="hi" >${greeting} World!</h2>`;
//   document.body.append(card);
//   const imgCard = document.createElement("div");
//   imgCard.classList.add("card", "center", "image-card");
//   document.body.appendChild(imgCard);
  
// });