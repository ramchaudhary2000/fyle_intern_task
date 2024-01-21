import { fetcher } from "./js/fetcher.js";
import { Repository } from "./js/component.repository.js";

const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user')



const profile_picture = document.getElementById('avatar')
const profile_name = document.getElementById('name')
const profile_username = document.getElementById('username')
const profile_bio = document.getElementById('bio')
const profile_twitter = document.getElementById('twitter_url')
const profile_location = document.getElementById('location')
const change_user = document.getElementById('diff-user-button')



fetcher({ uri: `users/${user}` }, false)
.then(result => {
    console.log(result)
    profile_name.innerText = result?.name
    profile_username.innerText = result?.login
    profile_bio.innerText = result?.bio
    profile_location.innerText = result?.location
    profile_twitter.innerText = `@${result?.twitter_username}`
    profile_twitter.href = `https://x.com/${result?.twitter_username}`
    profile_twitter.target = `_blank`
    profile_picture.src = result?.avatar_url ?? 'src/images/loading_image.png'
})
.catch(error => {
    document.getElementById('user-profile').innerHTML=`User Profile ${error.name}: ${error.message}<br>Press Browser Back Button`;
    document.getElementById('user-profile')?.classList.add('error-class')
})


const repos_list = document.getElementById('repos')
const from_record = document.getElementById('from-record')
const to_record = document.getElementById('to-record')
const total_records = document.getElementById('total-records')
const row_per_page_element = document.getElementById('row-per-page')
const page_number_element = document.getElementById('current')
const search_box_element = document.getElementById('searchbox')
const next_button = document.getElementById('btn-next')
const prev_button = document.getElementById('btn-prev')
const loader = document.getElementById('loader')

function fetchRepositories(row_per_page = 10, page_no = 1, search_value = "") {
    loader.style.display = 'block'
    repos_list.classList.add('content-blur')
    fetcher({ uri: `search/repositories?q=user:${user}+${search_value} in:name,description&per_page=${row_per_page}&page=${page_no}` })
        .then(result => {
            repos_list.innerHTML = result?.items.map(repo => Repository(repo?.name, repo?.description, repo?.topics)).join('')
            page_number_element.value = page_no
            to_record.innerText = row_per_page * page_no > result?.total_count ?
                (() => {
                    next_button.disabled = true;
                    return result?.total_count
                })() :
                (() => {
                    next_button.disabled = false;
                    return row_per_page * page_no
                })()
            page_no > 1 ? (() => { prev_button.disabled = false })() : (() => { prev_button.disabled = true })()

            from_record.innerText = (page_no - 1) * (row_per_page) + 1
            total_records.innerText = result?.total_count
            loader.style.display = 'none';
        })
        .catch(error => {
            loader.style.display = 'block';
            loader.innerHTML = `Repository Load ${error.name}: ${error.message}`
            loader.classList.add('error-class')
        })
        .finally(() => {
            repos_list.classList.remove('content-blur')
        })
}

fetchRepositories()


//   repos_list.innerHTML = Repository(repos.name, repos.description, repos.topics)


change_user.addEventListener('click', () => { document.location.assign(document.location.origin) })

row_per_page_element.addEventListener('change', (e) => { fetchRepositories(e.target.value, 1, search_box_element?.value) })
next_button.addEventListener('click', () => { fetchRepositories(row_per_page_element?.value, parseInt(page_number_element?.value ?? 1) + 1, search_box_element?.value ?? "") })
prev_button.addEventListener('click', () => { fetchRepositories(row_per_page_element?.value, parseInt(page_number_element?.value ?? 1) - 1, search_box_element?.value ?? "") })
search_box_element.addEventListener('input', (e) => { fetchRepositories(row_per_page_element?.value, 1, e.target.value) })