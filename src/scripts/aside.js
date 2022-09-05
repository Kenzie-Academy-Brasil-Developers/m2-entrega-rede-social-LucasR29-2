import { Api } from "./requisition.js";

const sugestionsList = document.getElementById('sugestionsList')



async function selectSugestions(){
    const page = Math.floor((Math.random() * 10))
    const data = await Api.getUsers(page)
    const selected = []
    const usedNumbers = []
    while(selected.length < 3){
        const number = Math.floor((Math.random() * 10))
        if(!usedNumbers.includes(number)){
            selected.push(data.data.results[number])
            usedNumbers.push(number)
        }
    }

    return selected
}

async function checkFollow(arrayElement, button){
    arrayElement.followers.forEach(x => {
        let includes = false

        if(x.followers_users_id.uuid.includes(localStorage.getItem('userID'))){
            button.id = x.uuid
            button.innerText = 'Seguindo'
            button.classList.add('buttonFollow')
            includes = true
            

        }else if(includes === false && arrayElement.followers.indexOf(x) == arrayElement.followers.length - 1){
            button.innerText = 'Seguir'
            button.classList.add('buttonNoFollow')
        }
    })
    

    button.addEventListener('click', async (event) => {
        const data = arrayElement.uuid
        if(button.classList.contains('buttonFollow')){
            await Api.unfollow(button.id)
            button.classList.remove('buttonFollow')
            button.classList.add('buttonNoFollow')
            button.innerText = 'Seguir'

        }else if(button.classList.contains('buttonNoFollow')){
            const obj = {following_users_uuid : data}
            const res = await Api.follow(obj)
            console.log(res)
            button.classList.add('buttonFollow')
            button.classList.remove('buttonNoFollow')
            button.innerText = 'Seguindo'
            button.id = res.uuid
            //button.id = 
        }
    })
}

async function rederSugestions(){
    const data = await selectSugestions()
    
    data.forEach(x => {
        const listElement = document.createElement('li')
        
        const listElementDiv = document.createElement('div')
        listElementDiv.classList.add('post-list__element__info')

        const imgElement = document.createElement('img')
        imgElement.src = x.image

        const divContainerAside = document.createElement('div')
        divContainerAside.classList.add('container__aside__element')
        
        const divElementMainInfo = document.createElement('div')
        divElementMainInfo.classList.add('main-info__aside')
        const elementUsername = document.createElement('p')
        elementUsername.innerText = x.username
        const elementWork = document.createElement('span')
        elementWork.innerText = x.work_at
        
        divElementMainInfo.append(elementUsername, elementWork)

        divContainerAside.append(imgElement, divElementMainInfo)
        
        const followButton = document.createElement('button')

        checkFollow(x, followButton)

        listElementDiv.append(divContainerAside, followButton)

        listElement.appendChild(listElementDiv)

        sugestionsList.appendChild(listElement)
    })

}

rederSugestions()