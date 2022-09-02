const buttonLogin = document.getElementById('buttonLogin')
const buttonRegister = document.getElementById('buttonCadastro')
const modalLogin = document.getElementById('modalLogin')
const modalCadastro = document.getElementById('modalCadastro')
const voltar = document.getElementById('back')

buttonLogin.addEventListener('click', (event) => {
    modalLogin.classList.toggle('hide')
    modalCadastro.classList.toggle('hide')
})

buttonCadastro.addEventListener('click', (event) => {
    modalLogin.classList.toggle('hide')
    modalCadastro.classList.toggle('hide')
})

voltar.addEventListener('click', (event) => {
    event.preventDefault()
    modalLogin.classList.toggle('hide')
    modalCadastro.classList.toggle('hide')
})


