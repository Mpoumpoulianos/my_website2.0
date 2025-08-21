// Typing Effect
document.addEventListener("DOMContentLoaded", () => {
  const text = "Welcome to My Website!!!";
  let index = 0;

  function type() {
    document.querySelector(".typing-effect").textContent = text.slice(0, index);
    index++;
    if (index <= text.length) setTimeout(type, 100);
  }
  type();
});

// Fetch GitHub Projects
let allProjects = [];
fetch("https://api.github.com/users/Mpoumpoulianos/repos")
  .then(res => res.json())
  .then(data => {
    allProjects = data.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));
    displayProjects(3);
  });

const projectsContainer = document.getElementById("projects");
const toggleBtn = document.getElementById("toggle-projects");
let showingAll = false;

function displayProjects(count) {
  projectsContainer.innerHTML = "";
  allProjects.slice(0, count).forEach(repo => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || "No description available."}</p>
      <a href="${repo.html_url}" target="_blank">View on GitHub</a>
    `;
    projectsContainer.appendChild(card);
  });
}

// Toggle view more / less
toggleBtn.addEventListener("click", () => {
  showingAll = !showingAll;
  if(showingAll) {
    displayProjects(allProjects.length);
    toggleBtn.textContent = "View Less";
  } else {
    displayProjects(3);
    toggleBtn.textContent = "View More";
  }
});

// Theme Toggle
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const icon = toggle.querySelector("i");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  const icon = toggle.querySelector("i");
  icon.classList.add("fa-sun");
  icon.classList.remove("fa-moon");
}
