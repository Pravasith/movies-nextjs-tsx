import Axios from 'axios'
import { API_AUTH_TOKEN } from '../configs/apiConfig'


export const getDataFromAPI = url => {

    const requestData = {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            "Content-Type": "application/json",
            "Authorization": API_AUTH_TOKEN,
        },

        // withCredentials: true // for cookie Auth
    }

    return new Promise((resolve, reject) => {

        let data

        Axios.get(
            url,
            requestData
        )
        .then(res => {
            data = res.data
            resolve(data)
        })
        .catch(e => {
            console.error(e)
            reject(e)
        })
    })

    
}