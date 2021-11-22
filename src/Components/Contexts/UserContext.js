import React, { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router"

import { firebase } from "../../firebase"

const db = firebase.firestore()

const UserContext = React.createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [gettingUser, setgettingUser] = useState(true)
    const navigate = useNavigate()
    
    const getUser = async (user) => {

        const response =  (await db.collection("users").doc(user).get())._delegate._document.data.value.mapValue.fields

        
        setuser(
            {user: response, id: user}
        )
    }

    useEffect(() => {
        setgettingUser(true)
        firebase.auth().onAuthStateChanged( async (user) => {
            if (user) {
                await getUser(user.uid)
            }
            else {
                navigate("/")
            }
            setgettingUser(false)
        })
    }, [])

    const value = {
        user,
    }

    return (
        <UserContext.Provider value={value}>
            { !gettingUser && children }
        </UserContext.Provider>
    )
}
