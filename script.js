// const sections = document.querySelectorAll("section");
// const navLinks = document.querySelectorAll(".sidenav a");

// console.log(sections);
// const observer = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       const link = document.querySelector(
//         `.sidenav a[href="#${entry.target.id}"]`
//       );
//       const card = document.querySelector(
//         `.all-info section[id="${entry.target.id}"]`
//       );

//       if (entry.isIntersecting) {
//         link.classList.add("active");
//         card.classList.add("active-card");
//         console.log(card)
//       } else {
//         link.classList.remove("active");
//         card.classList.remove("active-card");
//       }
//     });
//   },
//   { threshold: 0.2 }
// );

// sections.forEach((section) => {
//   observer.observe(section);
// });
function loadCard(file) {
  console.log("Loading card:", file);
  fetch(file)
    .then((response) => response.text())
    .then((html) => {
      document.querySelector(".articles").innerHTML += html;
    })
    .catch((error) => {
      console.warn("Error loading card:", error);
    });
}
small_card_files = [
  "small-proj-cards.html",
  "small-edu-cards.html",
  "small-exp-cards.html",
  "big-proj-cards.html",
];
small_card_files.forEach((file) => loadCard(file));

showCard("intro-small-card");
sidebarActive(document.getElementById("intro"));

const side_clicks = document.querySelectorAll(".contents");

side_clicks.forEach((click) => {
  click.addEventListener("click", (e) => {
    e.preventDefault();
    const card_id = click.id + "-small-card";
    console.log(card_id);
    showCard(card_id);
  });
});

function hideAllCards() {
  let code_block = document.getElementById("code-block");
  if (code_block) {
    document.querySelector(".code-snippet").style.display = "none";
  }

  const articles = document.querySelectorAll(".small-cards");
  articles.forEach((article) => {
    let card = article.id;
    if (card) {
      document.getElementById(card).classList.remove("active");
    }
  });
  const big_cards = document.querySelectorAll(".big-cards");
  big_cards.forEach((big_card) => {
    let card = big_card.id;
    if (card) {
      document.getElementById(card).classList.remove("active");
    }
  });
}

function showCard(cardId) {
  hideAllCards();
  const card = document.getElementById(cardId);
  if (card) {
    card.classList.add("active");
    console.log(card);
  }
}

function sidebarActive(clicked) {
  console.log(clicked);
  const side_clicks = document.querySelectorAll(".contents");
  side_clicks.forEach((click) => {
    click.classList.remove("active");
  });
  clicked.classList.add("active");
}

function showBigCard(card_id) {
  hideAllCards();
  const big_card = document.getElementById(card_id);
  if (big_card) {
    big_card.classList.add("active");
  }
  const big_card_size = document.querySelector(".big-cards.active");
  let code_block = document.getElementById("code-block");

  if (code_block) {
    document.querySelector(".code-snippet").style.display = "block";
    code_block.style.top =
      big_card_size.offsetTop + big_card_size.offsetHeight + 5 + "px";
  }
}

function toggleSubList(event) {
  console.log("Toggling sublist for:", event.id);
  const subList = document.querySelector(`.${event.id}`);
  console.log("Sublist element:", subList);
  if (subList) {
    subList.style.display =
      subList.style.display === "block" ? "none" : "block";
    const big_card_size = document.querySelector(".big-cards.active");
    let code_block = document.getElementById("code-block");

    if (code_block) {
      document.querySelector(".code-snippet").style.display = "block";
      code_block.style.top =
        big_card_size.offsetTop + big_card_size.offsetHeight + 5 + "px";
    }
  }
}
