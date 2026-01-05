const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidenav a");
console.log(sections)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = document.querySelector(
        `.sidenav a[href="#${entry.target.id}"]`
      );

      if (entry.isIntersecting) {
        link.classList.add("active");
      } else {
        link.classList.remove("active"); 
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((section) => {
  observer.observe(section);
});
