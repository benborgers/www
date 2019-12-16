import "./global"

fetch("https://hurricane-eggnog.glitch.me/stats")
  .then(res => res.json())
  .then(json => {
    $(".data-blocks-users").innerHTML = json.users
  })