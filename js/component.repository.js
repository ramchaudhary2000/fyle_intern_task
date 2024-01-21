export function Repository(heading, description, tags=[]){
    return `
        <div class="repo_box">
            <div class="repo_name">${heading}</div>
            <div class="repo_description">${description}</div>
            ${tags?.length ? 
            `<div class="hashtag_boxes">
                ${tags.map(tag=>`<div class="hashtag_box">${tag}</div>`).join('')}
            </div>` : ''
            }
        </div>`
}