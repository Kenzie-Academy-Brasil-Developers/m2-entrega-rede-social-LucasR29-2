import { Api } from "./requisition.js"

const username = document.getElementById('nameCadastro')
const emailCadastro = document.getElementById('emailCadastro')
const passwordCadastro = document.getElementById('passwordCadastro')
const work = document.getElementById('jobCadastro')
const img = document.getElementById('urlCadastro')
const register = document.getElementById('buttonRegister')


const emailLogin = document.getElementById('emailLogin')
const passwordLogin = document.getElementById('passwordLogin')
const login = document.getElementById('logar')



async function create(username,email,password,work,image){
    return await Api.createUser(username,email,password,work,image)

}  

login.addEventListener('click', (event) => {
    event.preventDefault()
})

register.addEventListener('click', async (event) => {
    event.preventDefault()
    const data = {
        username: username.value,
        email:emailCadastro.value,
        password:passwordCadastro.value,
        work_at:work.value,
        image:  img.value
    }
    console.log(data)

    const res = await create(JSON.stringify(data))
    console.log(await res)
})