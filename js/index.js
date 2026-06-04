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

const messageForm = document.querySelector('form[name="leave_message"]');

messageForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = event.target.usersName.value;
    const email = event.target.usersEmail.value;
    const message = event.target.usersMessage.value;

    console.log("Name:",name);
    console.log("Email:",email);
    console.log("Message:",message);

    const messageSection = document.getElementById("messages");
    const messageList = messageSection.querySelector("ul");
    const newMessage = document.createElement("li");

    newMessage.innerHTML = `<a href="mailto:${email}">${name}</a> <span>Message : ${message}</span>`;

    const removeButton = document.createElement("button");
    removeButton.innerHTML = "remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", function() {

        const entry = removeButton.parentNode;

        entry.remove();

    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    event.target.reset();

});

fetch("https://api.github.com/users/tiyafrancy/repos")
.then(response => {
    if(!response.ok){
        throw new Error(response.status);
    }
    return response.json();
})
.then(repositories => {
    console.log(repositories);

    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");

    for(let i=0; i< repositories.length; i++){

        const project = document.createElement("li");
        project.innerText = repositories[i].name;
        projectList.appendChild(project);
    }
})
.catch(error => {
    console.error("Fetch api failed", error);
});

