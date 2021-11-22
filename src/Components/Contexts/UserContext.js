import React, { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router"

import { firebase } from "../../firebase"

const db = firebase.firestore()

const UserContext = React.createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const navigate = useNavigate()
    
    const getUser = async (user) => {

        const response =  (await db.collection("users").doc(user).get())._delegate._document.data.value.mapValue.fields

        
        setuser(
            {user: response, id: user}
        )
    }
    
    const includesObject = (array, key, value ) => {


        for (let i = 0; i < array.length; i++) {
            
            if(eval(`array[i].${key}`) === value) {
                return true
            }
            
        }

        return false
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async (user) => {
            if (user) {
                await getUser(user.uid)
            }
            else {
                navigate("/")
            }
        })
    }, [])

    const value = {
        user,
        includesObject
    }

    return (
        <UserContext.Provider value={value}>
            { user && children }
        </UserContext.Provider>
    )
}
