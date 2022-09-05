const cadastro = document.querySelectorAll('.cadastro')
const login = document.querySelectorAll('.loginApagar')
const buttonLogin = document.getElementById('buttonLogin')
const buttonCadastro = document.getElementById('buttonCadastro')
const buttonVoltar = document.getElementById('back')

buttonLogin.addEventListener('click', (event) => {
    login.forEach(x => {
        x.classList.toggle('hide')
    })
    cadastro.forEach(x => {
        x.classList.toggle('hide')
    })
    buttonVoltar.classList.toggle('hide')
})

buttonCadastro.addEventListener('click', (event) => {
    login.forEach(x => {
        x.classList.toggle('hide')
    })
    cadastro.forEach(x => {
        x.classList.toggle('hide')
    })
    buttonVoltar.classList.toggle('hide')
})

buttonVoltar.addEventListener('click', (event) => {
    login.forEach(x => {
        x.classList.toggle('hide')
    })
    cadastro.forEach(x => {
        x.classList.toggle('hide')
    })
    buttonVoltar.classList.toggle('hide')
})