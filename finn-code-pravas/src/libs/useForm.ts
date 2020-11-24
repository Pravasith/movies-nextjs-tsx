import { useState } from "react"

type Value = {
    movie_searched?: string
}

// My custom hook for handling input forms
export const useForm = (initialValue: Value) => {
    const [ values, setValues ] = useState(initialValue)

    return [
        values,
        e => {
            if(e.target.value.length >= 4)
            setValues({
                ...values,
                [e.target.name] : e.target.value
            })
        }
    ]
}