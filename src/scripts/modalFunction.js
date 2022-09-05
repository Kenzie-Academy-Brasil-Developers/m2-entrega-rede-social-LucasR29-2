import { Api } from "./requisition.js"

const username = document.getElementById('nameCadastro')
const work = document.getElementById('jobCadastro')
const img = document.getElementById('urlCadastro')
const register = document.getElementById('buttonRegister')


const emailLogin = document.getElementById('emailLogin')
const passwordLogin = document.getElementById('passwordLogin')
const login = document.getElementById('logar')



async function create(data){
    return await Api.createUser(data)

}  

async function userLogin(data){
    return await Api.userLogin(data)
}

login.addEventListener('click', async (event) => {
    event.preventDefault()
    const data = {
        email: emailLogin.value,
        password: passwordLogin.value
    }
    console.log(data)
    const res = await userLogin(data)
    window.location.replace('../../index.html')
})

register.addEventListener('click', async (event) => {
    event.preventDefault()
    const data = {
        username: username.value,
        email: emailLogin.value,
        password:passwordLogin.value,
        work_at:work.value,
        image: img.value
    }
    console.log(data)
    const res = await create(data)
})