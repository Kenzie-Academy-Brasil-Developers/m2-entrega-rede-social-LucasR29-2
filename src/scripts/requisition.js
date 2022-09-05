export const token = localStorage.getItem('userToken')


const instance = axios.create({
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
        return await instance.post('/users/login/', data)
        .then(res => {
            localStorage.setItem('userToken', res.data.token)
            localStorage.setItem('userID', res.data.user_uuid)
            console.log(res)
        })
    }

    static async searchUser(userID){
        return await instance.get(`/users/${userID}/`)
            .then(res => console.log(res.data))
    }

    static async getPosts(){
        const data = instance.get('/posts/')
        return data
    }

    static async likePost(data){
        return await instance.post('/likes/', data)
        .catch(err => console.log(err))
    }

    static async dislikePost(data){
        return await instance.delete(`/likes/${data}/`)
        .catch(err => console.log(err))
    }

    static async getUsers(page){
        return await instance.get(`/users/?page={${page}}`)
    }

    static async follow(data){
        return await instance.post('/users/follow/', data)
        .then(res => res.data)
    }

    static async unfollow(data){
        return await instance.delete(`users/unfollow/${data}/`)
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