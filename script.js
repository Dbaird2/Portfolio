const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidenav a");

console.log(sections);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = document.querySelector(
        `.sidenav a[href="#${entry.target.id}"]`
      );
      const card = document.querySelector(
        `.all-info section[id="${entry.target.id}"]`
      );

      if (entry.isIntersecting) {
        link.classList.add("active");
        card.classList.add("active-card");
        console.log(card)
      } else {
        link.classList.remove("active");
        card.classList.remove("active-card");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => {
  observer.observe(section);
});
