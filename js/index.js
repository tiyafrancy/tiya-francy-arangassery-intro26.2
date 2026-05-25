const body = document.querySelector("body");

const footer = document.createElement("footer");

// footer.textContent = "my webpage footer";

body.appendChild(footer);

const today = new Date();

const thisYear = today.getFullYear();

const footerText = document.querySelector("footer");

const copyright = document.createElement("p");

copyright.innerHTML = `&copy; Tiya Francy Arangassery ${thisYear}`;

footerText.appendChild(copyright);

const skills = ["JavaScript", "HTML", "CSS", "Adobe Photoshop", "GitHub"];

const skillsSection = document.getElementById("skills");

const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++){

    const skill = document.createElement("li");
    skill.innerHTML = skills[i];
    skillsList.appendChild(skill);

}