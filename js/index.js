document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("github-form").addEventListener("submit", getUsers);

});


function getUsers(event) {
  const user = event.target.search.value;
  const configObj = {
    headers: {
      Accept: "application / vnd.github.v3 + json"
    }
  }

  event.preventDefault();
  fetch(`https://api.github.com/search/users?q=${user}`, configObj)
  .then(resp => resp.json())
  .then(result => renderUsers(result.items))
}

function renderUsers(users) {

  const ul = document.getElementById("user-list");
  ul.innerHTML = "";
  
  users.forEach(user => {
    const li = document.createElement("li");
    li.innerHTML = `<p><img id=${user.login} class="image" src="${user.avatar_url}"><br>${user.id} | <a href="${user.html_url}">${user.login}<a></p>`;
    ul.append(li);
    li.querySelector("img").addEventListener("click", renderRepos);
  })
  
}

function renderRepos(e) {
  const ul = document.getElementById("repos-list");
  const login = event.target.id;

  ul.innerHTML = `<h3>Repos for ${login}<h3>`;

  const configObj = {
    headers: {
      Accept: "application / vnd.github.v3 + json"
    }
  }

  fetch(`https://api.github.com/users/${login}/repos`, configObj)
  .then(resp => resp.json())
  .then(repos => {
    repos.forEach(repo => {
      const li = document.createElement("li");
      li.textContent = repo.name;
      ul.append(li);
    });
  });

}
