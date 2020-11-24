import Axios from "axios"
import { useEffect, useLayoutEffect, useState } from "react"
import { API_URL } from "../configs/apiConfig"
import { getDataFromAPI } from "./getData"


export const useMovies = (movie_searched) => {

    const [ mState, setMState ] = useState(
        {
            data : [],
            loading : true
        }
    )

    const url = `${ API_URL }?q=${ movie_searched }`

    // useEffect(() => {
    //     console.log(mState)
    // }, [mState])


    useEffect(() => {
        // Don't request data if user hasn't searched anything
        setMState({
            ...mState,
            loading : true
        })

        if(movie_searched.length > 3){
            getDataFromAPI(url)
            .then(res => {
    
                // console.log(
                //     {
                //         data : res.movies,
                //         loading : false
                //     }
                // )
                setMState({
                    data : res.movies,
                    loading : false
                })
            })
            .catch(e => console.error("Something wrong with useMovies Hook dude.", e))
        }

        // else{
        //     setMState({
        //         data: [],
        //         loading : false
        //     })
        // }
       

    }, [url])

    

   

    return mState
}