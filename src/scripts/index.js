import { Api } from "./requisition.js"
import axios from 'axios'

Vue.use(axios)

if(localStorage.getItem('userID') == undefined || localStorage.getItem('userToken') == undefined){
    window.location.replace('./cadastro.html')
}


const postList = document.querySelector(".post-list")
const logout = document.getElementById('logout')
const modalClose = document.getElementById('close')
const buttonPost = document.getElementById('post')

buttonPost.addEventListener('click', async (event) => {
    const title = document.getElementById('textTitle')
    const content = document.getElementById('textPost')

    const data = {
        title: title.value,
        description: content.value
    }
    await Api.post(data)
})

function like(HTMLelement, data, arrayElement, likesCount, post){
    let likeNumber = arrayElement.length
    arrayElement.forEach(x => {
        if(x.user.uuid == localStorage.getItem('userID')){
            HTMLelement.classList.toggle('heart-red')
            HTMLelement.id = x.uuid
        }
    })

    HTMLelement.addEventListener('click', async (event) => {
        
        if(HTMLelement.classList.contains('heart-red')){
            await Api.dislikePost(HTMLelement.id)
            .then(res => console.log(res))
            HTMLelement.classList.toggle('heart-red')
            likeNumber--
            likesCount.innerText = likeNumber

        }else if(!HTMLelement.classList.contains('heart-red')){
            await Api.likePost({post_uuid: post})
            console.log(arrayElement.length)
            HTMLelement.classList.toggle('heart-red')
            likeNumber++
            likesCount.innerText = likeNumber
            HTMLelement.id
        } 
    })
}

function openModal(button, user, work, titulo, cont){
    const username = document.getElementById('username')
    const workAt = document.getElementById('work')
    const title = document.getElementById('title')
    const content = document.getElementById('content')
    const modal = document.getElementById('modal_background')


    button.addEventListener('click', (event) =>{
        username.innerText = user
        workAt.innerText = work
        title.innerText = titulo
        content.innerText = cont

        modal.style.display = 'flex'
    })
}

async function renderCards(){
    const array = await Api.getPosts()

    array.data.results.forEach(x => {
        const postListElement = document.createElement('li')
        postListElement.classList.add('post-list__element')
    
        const divElementInfo = document.createElement('div')
        divElementInfo.classList.add('post-list__element__info')

        const userIMG = document.createElement('img')
        userIMG.src = x.author.image

        const divElementInfoProfile = document.createElement('div')
        divElementInfoProfile.classList.add('profile-info__all')

        const profileName = document.createElement('h2')
        profileName.innerText = x.author.username

        const profileWork = document.createElement('span')
        profileWork.innerText = x.author.work_at

        divElementInfoProfile.append(profileName, profileWork)

        divElementInfo.append(userIMG, divElementInfoProfile)


        const divElementContent = document.createElement('div')
        divElementContent.classList.add('post-list__element__content')

        const title = document.createElement('p')
        const strong = document.createElement('strong')
        title.appendChild(strong)
        strong.innerText = x.title
        title.classList.add('title-card')

        const content = document.createElement('p')
        content.innerText = x.description
        content.classList.add('content-card')

        divElementContent.append(title,content)


        const divElementButton = document.createElement('div')
        divElementButton.classList.add('post-list__element__button')

        const openButton = document.createElement('button')
        openButton.classList.add('open')
        openButton.innerText = 'Abrir Post'

        openModal(openButton, x.author.username, x.author.work_at, x.title, x.description)

        const divButtonHeart = document.createElement('div')
        const heartButton = document.createElement('button')
        heartButton.classList.add('heart')
        
        const spanLikes = document.createElement('span')
        spanLikes.innerText = x.likes.length

        like(heartButton, x.uuid, x.likes, spanLikes, x.uuid)

        divButtonHeart.append(heartButton, spanLikes)

        divElementButton.append(openButton,divButtonHeart)

        postListElement.append(divElementInfo, divElementContent, divElementButton)

        postList.appendChild(postListElement)
    })
}

renderCards()

logout.addEventListener('click', (event) => {
    localStorage.clear()
    window.location.replace('../../cadastro.html')
})

modalClose.addEventListener('click', (event) => {
    const modal = document.getElementById('modal_background')
    modal.style.display = 'none'
    
})

