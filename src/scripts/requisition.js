class Api{
    static async createUser(data){
        return await fetch('https://m2-rede-social.herokuapp.com/api/users/',{
            method:'POST',
            headers:{'Content-type': 'application/json'},
            body: data
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
}

export {Api}