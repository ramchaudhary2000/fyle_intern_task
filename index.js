import { fetcher } from "./js/fetcher.js";
import { Repository } from "./js/component.repository.js";


const profile_picture = document.getElementById('avatar')
const profile_name = document.getElementById('name')
const profile_username = document.getElementById('username')
const profile_bio = document.getElementById('bio')
const profile_twitter = document.getElementById('twitter_url')
const profile_location = document.getElementById('location')
const total_records = document.getElementById('total-records')


fetcher({uri: 'users/mbj36'})
.then(result => {
    console.log(result)
    profile_name.innerText = result?.name
    profile_username.innerText = result?.login
    profile_bio.innerText = result?.bio
    profile_location.innerText = result?.location
    profile_twitter.innerText = `@${result?.twitter_username}`
    profile_twitter.href = `https://x.com/${result?.twitter_username}`
    profile_twitter.target = `_blank`
    profile_picture.src = result?.avatar_url
    total_records.innerText = result?.public_repos
})
.catch(error => console.log(error))
  

  const repos_list = document.getElementById('repos')

  fetcher({uri: 'users/mbj36/repos?per_page=10&page=1'})
.then(result => {
    repos_list.innerHTML = result.map(repo => Repository(repo?.name, repo?.description, repo?.topics)).join('')
})
.catch(error => console.log(error))

//   repos_list.innerHTML = Repository(repos.name, repos.description, repos.topics)