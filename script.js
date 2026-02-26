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
async function loadCode(file) {
  const response = await fetch(
    "https://raw.githubusercontent.com/Dbaird2/" + file,
  );

  const code = await response.text();
  document.getElementById("code-block").textContent = code;
  Prism.highlightAll();
}
async function loadRepo(repo) {
  const response = await fetch(
    "https://api.github.com/repos/Dbaird2/" +
      repo +
      "/git/trees/main?recursive=1",
  );

  const data = await response.json();
  console.log(data.tree);

  return data;
}
async function createDirectoryStructure(repo) {
  const data = await loadRepo(repo);
  const tree = data.tree;

  tree.forEach((item) => {
    const path_parts = item.path.split("/");
    if (path_parts[0] === "vendor") {
      return; // Skip the 'vendor' directory and its contents
    }
    const mode = item.mode; // '100644' for files, '040000' for directories

    if (mode === "040000") {
      // It's a folder
      let id = path_parts.slice(0, path_parts.length).join("-") + "-sub-list";
      let prev_id =
        path_parts.slice(0, path_parts.length - 1).join("-") + "-sub-list";
      /*
      console.log(
        document.querySelector("." + repo + "-sub-list"),
        id,
        prev_id,
        mode,
        path_parts,
      );
      */
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
        // console.log("folder", path_parts, prev_id, id);

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
      /* console.log(
        document.querySelector("." + repo + "-sub-list"),
        id,
        mode,
        path_parts,
      );
      */
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

function showCard(card_id) {
  hideAllCards();
  console.log(card_id)
  const card = document.getElementById(card_id);
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
