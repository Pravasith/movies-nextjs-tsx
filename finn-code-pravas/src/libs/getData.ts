import { Movie } from './../../interfaces/movies';
import Axios, { AxiosRequestConfig } from 'axios'
import { API_AUTH_TOKEN } from '../configs/apiConfig'


export const getDataFromAPI = (url: string) => {


    interface IGet {
        movies : Movie[] | []
    }

    const requestData: AxiosRequestConfig = {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            "Content-Type": "application/json",
            "Authorization": API_AUTH_TOKEN,
        },

        // withCredentials: true // for cookie Auth
    }

    return new Promise<IGet>((resolve, reject) => {

        let data


        Axios.get<IGet>(
            url,
            requestData
        )
        .then(res => {
            data = res.data

            // console.log(data, "pravas")
            resolve(data)
        })
        .catch(e => {
            console.error(e)
            reject(e)
        })
    })

    
}