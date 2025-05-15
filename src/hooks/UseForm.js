import { useState } from "react";

export const UseForm = (initiaValue = {}) => {
    const [formData, setformData] = useState(initiaValue);

    const [error, setError] = useState(initiaValue)


    const handleChange = ({ target }) => {
        const { name, value } = target;

        setformData((prev) => ({

            ...prev,
            [name]: value


        }))
        setError((prev) => ({
            ...prev,
            [name]: ""
        }))




    }


    const reset = () => {
        setformData(initiaValue)
        setError({})
    };
    const validate = () => {
        const newError = {}
        if (!formData.email) newError.email = "El email es obligatorio"
        if (!formData.password) newError.password = "La contraseña es obligatoria"
        setError(newError)
        return Object.keys(newError).length === 0;

    }


    return {

        formData,
        handleChange,
        reset,
        validate,
        error



    }

}
