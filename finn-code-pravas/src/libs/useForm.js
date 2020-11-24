import { useState } from "react"

// My custom hook for handling input forms
export const useForm = (initialValue) => {
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