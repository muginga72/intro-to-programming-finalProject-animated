// Add Footer and Copyright Element
let today = new Date();
let thisYear = today.getFullYear();
let footer = document.querySelector('footer');
let copyright = document.getElementById('copyright');

// Set the inner HTML of your copyright element to display: name & Year.
copyright.innerHTML = "&copy; Eli James " + thisYear;
// Append the copyright element to the footer
// footer.appendChild(copyright);

// Add Skills Section into web
let skills = [
  "GitHub",
  "JavaScript",
  "CSS",
  "C",
  "Python",
  "HTML",
  "Google Cloud",
  "Customer Services",
  "ArcGis",
  "Multilingual"
];

// Create List of Skills
let skillsSection = document.querySelector('#skills');
// Create ul element and set attributes
let skillsList = skillsSection.getElementsByTagName('ul')[0];
for (let i = 0; i < skills.length; i++) {
  let skill = document.createElement('li'); // Create li element
  skill.innerText = skills[i]; // Assignning text to li using array value
  skillsList.appendChild(skill); // Append li to ul
}
// Handler messages form user interation.
let messageForm = document.querySelector('form');
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let name = document.querySelector('input[name="name"]');
  let email = document.querySelector('input[name="email"]');
  let message = document.querySelector('textarea[name="message"]');

  // log the three variables: name, email and message.
  console.log({
    name,
    email,
    message,
  });

  // Handler messages form user interation.
  let messageSection = document.querySelector('#messages');
  messageSection.removeAttribute('hidden'); // added for hidden message
  let messageList = messageSection.querySelector('ul');
  let newMessage = document.createElement('li');
  newMessage.innerHTML = `<a href="mailto: ${email.value}"> ${name.value}</a>
    wrote: <span> ${message.value} </span>`;

  let removeButton = document.createElement('button');
  removeButton.innerHTML = 'Remove';
  removeButton.type = 'button';
  removeButton.className = "removeButton"; // For css style color code

  // Set event listener to handle the "click" event.
  removeButton.addEventListener('click', (e) => {
    const li = e.target.parentNode; // changed entry to li
    li.remove();
    if (URL.childElementCount == 0) {
      messageSection.setAttribute('hidden', true);
    }
  });
  newMessage.appendChild(removeButton);

  // Add "edit" button after messagewas submitted
  const editSaveButton = document.createElement('button');
  editSaveButton.innerHTML = 'Edit';
  editSaveButton.addEventListener('click', (e) => {
    const li = e.target.parentNode;
    if(editSaveButton.innerHTML == 'Edit') {
      makeMessageEditable(li);
      editSaveButton.innerHTML = 'Save';
    } else {
      saveEditedMessage(li);
      editSaveButton.innerHTML = 'Edit';
    }
  });
  newMessage.appendChild(editSaveButton);
  messageList.appendChild(newMessage);
  messageForm.reset();

// Refactoring the code
function makeMessageEditable(li) {
  // Swap out the <span> element for an <input> element
  const message = li.querySelector('span');
  const input = document.createElement('input');
  input.value = message.innerHTML;
  // ReplaceChild method(newChild, oldChild) in li
  li.replaceChild(input, message);
}
function saveEditedMessage(li) {
  // Swap the <input> element back to a <span> element.
  const input = li.querySelector('input');
  const message = document.createElement('span');
  message.innerHTML = input.value;
  li.replaceChild(message, input);
}
});

// Add Project Section to web page fetch function
const eliRepoAPI = 'https://api.github.com/users/muginga72/repos'

fetch(eliRepoAPI)
  .then(response => {
    if (response.status != 200) {
      throw new Error(`Failed to fetch ${eliRepoAPI}. Status:
        ${response.status}, Status Text: ${response.stutusText}`)
    }
    return response.json();
  })
  .then(addReposToProjectSection)
  .catch((err) => {
    console.error({ err: err })
  });

function addReposToProjectSection(repositories) {
  console.log({ repositories: repositories})
  const projectSection = document.getElementById('projects');
  const projectList = projectSection.querySelector('ul');

  for (let i = 0; i < repositories.length; i++) {
    const repo = repositories[i];
    console.log(repo);
    const project = document.createElement('li');
    const repoURL = document.createElement('a')
    repoURL.setAttribute('href', repo.html_url);
    repoURL.target = '_blank';
    repoURL.innerText = repo.name;

    const projectLanguage = document.createElement('li');
    projectLanguage.innerText = repositories[i].language;
    // it's not passing Python language! why?
    projectLanguage.style.fontStyle = 'italic';

    project.appendChild(repoURL);
    project.appendChild(projectLanguage);
    projectList.appendChild(project);
  }
}