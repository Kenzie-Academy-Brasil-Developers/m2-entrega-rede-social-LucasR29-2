export const token = localStorage.getItem('userToken')


const api = axios.create({
    baseURL:'https://m2-rede-social.herokuapp.com/api',
    timeout: 60000,
    headers: {
        "Content-Type" : "application/json",
        Authorization: `Token ${token}`,
    }
})

class Api{
    static async createUser(data){
        const email = data.email
        const password = data.password
        return await fetch('https://m2-rede-social.herokuapp.com/api/users/',{
            method:'POST',
            headers:{'Content-type': 'application/json'},
            body:JSON.stringify(data)
        })
        .then(async()  => {
            const obj = {
                email: email,
                password: password
            }
            await this.userLogin(obj)
            window.location.replace('../../index.html')
        })
    }

    static async userLogin(data){
        return await api.post('/users/login/', data)
        .then(res => {
            localStorage.setItem('userToken', res.data.token)
            localStorage.setItem('userID', res.data.user_uuid)
            console.log(res)
        })
    }

    static async searchUser(userID){
        return await api.get(`/users/${userID}/`)
            .then(res => console.log(res.data))
    }

    static async getPosts(){
        const data = api.get('/posts/')
        return data
    }

    static async likePost(data){
        return await api.post('/likes/', data)
        .catch(err => console.log(err))
    }

    static async dislikePost(data){
        return await api.delete(`/likes/${data}/`)
        .catch(err => console.log(err))
    }

    static async getUsers(page){
        return await api.get(`/users/?page={${page}}`)
    }

    static async follow(data){
        return await api.post('/users/follow/', data)
        .then(res => res.data)
    }

    static async unfollow(data){
        return await api.delete(`users/unfollow/${data}/`)
        .catch(err => console.log(err))
    }

    static async post(data){
        return await fetch('https://m2-rede-social.herokuapp.com/api/posts/',{
            method:'POST',
            headers:{
                'Content-type': 'application/json', 
                Authorization: `Token ${token}`    
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
    }
}

export {Api}