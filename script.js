async function loadCode(file) {
  const response = await fetch(
    "https://raw.githubusercontent.com/Dbaird2/" + file,
  );

  const code = await response.text();
  document.getElementById("code-block").textContent = code;
  Prism.highlightAll();
  const big_card_size = document.querySelector(".big-cards.active");
  let code_block = document.getElementById("code-block");

  if (code_block) {
    document.querySelector(".code-snippet").style.display = "block";
    document.querySelector(".modal-blur").style.display = "block";
  }
}
async function loadRepo(repo) {
  const response = await fetch(
    "https://api.github.com/repos/Dbaird2/" +
      repo +
      "/git/trees/main?recursive=1",
  );

  const data = await response.json();

  return data;
}

async function createDirectoryStructure(repo) {
  const data = await loadRepo(repo);
  const tree = data.tree;
  console.log("running createDirectoryStructure for repo:", repo, data);
  tree.forEach((item) => {
    const path_parts = item.path.split("/");
    if (path_parts[0] === "vendor") {
      return;
    }
    const mode = item.mode; // '100644' for files, '040000' for directories

    if (mode === "040000") {
      // It's a folder
      let id = path_parts.slice(0, path_parts.length).join("-") + "-sub-list";
      let prev_id =
        path_parts.slice(0, path_parts.length - 1).join("-") + "-sub-list";

      if (path_parts.length === 1) {
        // Top Level

        document.querySelector("." + repo + "-sub-list").insertAdjacentHTML(
          "beforeend",
          `<li><a
              class="folder"
              href="#"
              onclick="toggleSubList(this)"
              id="${id}"
              >${path_parts[path_parts.length - 1]}</a
            >
            <ul class="${id} sub-list"></ul></li>`,
        );
      } else {
        document.querySelector("." + prev_id).insertAdjacentHTML(
          "beforeend",
          `<li><a
              class="folder"
              href="#"
              onclick="toggleSubList(this)"
              id="${id}"
              >${path_parts[path_parts.length - 1]}</a
            >
            <ul class="${id} sub-list"></ul></li>`,
        );
      }
    } else {
      // It's a file
      let id;
      if (path_parts.length === 1) {
        id = "." + repo + "-sub-list";
      } else {
        id =
          "." +
          path_parts.slice(0, path_parts.length - 1).join("-") +
          "-sub-list";
      }
      document.querySelector(id).insertAdjacentHTML(
        "beforeend",
        `<li>
                <a
                  class="file"
                  href="#"
                  onclick="loadCode('${repo}/main/${item.path}')"
                  >${item.path}</a
                >
              </li>`,
      );
    }
  });
}
function loadCard(file) {
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
  "small-contact-card.html",
  "small-future-cards.html",
  "big-proj-cards.html",
];
small_card_files.forEach((file) => loadCard(file));

showCard("intro-small-card");
sidebarActive(document.getElementById("intro"));
createDirectoryStructure("seniorproject");
createDirectoryStructure("blok");
createDirectoryStructure("Stock-Predictor");
createDirectoryStructure("ML-group-project");
createDirectoryStructure("games");
createDirectoryStructure("senior-mobile");
createDirectoryStructure("Database-Group-Project");
createDirectoryStructure("MariaDB-Research-Report");
createDirectoryStructure("Garmoth-Web-Scraper");
createDirectoryStructure("Label-Reader");

const side_clicks = document.querySelectorAll(".contents");

side_clicks.forEach((click) => {
  click.addEventListener("click", (e) => {
    e.preventDefault();
    const card_id = click.id + "-small-card";
    // console.log(card_id);
    showCard(card_id);
  });
});

function hideAllCards() {
  hideCodeSnippet();
  hideSmallCards();
  hideBigCards();
}

function hideCodeSnippet() {
  let code_block = document.getElementById("code-block");
  if (code_block) {
    document.querySelector(".code-snippet").style.display = "none";
  }
}

function hideBigCards() {
  const big_cards = document.querySelectorAll(".big-cards");
  big_cards.forEach((big_card) => {
    let card = big_card.id;
    if (card) {
      document.getElementById(card).classList.remove("active");
    }
  });
}

function hideSmallCards() {
  const articles = document.querySelectorAll(".small-cards");
  articles.forEach((article) => {
    let card = article.id;
    if (card) {
      document.getElementById(card).classList.remove("active");
    }
  });
}

function showCard(card_id) {
  hideAllCards();
  const small_cards = document.querySelectorAll(".small-card");
  small_cards.forEach((small_card) => {
    small_card.style.animation = "none";
    void small_card.offsetWidth;
    small_card.style.animation = "";
  });
  const card = document.getElementById(card_id);
  if (card) {
    card.classList.add("active");
  }
}

function sidebarActive(clicked) {
  // console.log(clicked);
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
}

function toggleSubList(event) {
  const subList = document.querySelector(`.${event.id}`);
  subList.style.display = subList.style.display === "block" ? "none" : "block";
  if (subList) {
  }
}

function resetModal() {
  const code_block = document.getElementById("code-block");
  if (code_block) {
    document.querySelector(".code-snippet").style.display = "none";
    document.getElementById("code-block").textContent = "";
    document.querySelector(".modal-blur").style.display = "none";

    code_block.textContent = "";
  }
}
