import React, { useContext, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { firebase } from "../../firebase"

const db = firebase.firestore()

const UserContext = React.createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const navigate = useNavigate()
    const { currentServer, currentChannel } = useParams()
    
    const getUser = async (user) => {
        const response =  (await db.collection("users").doc(user).get())._delegate._document.data.value.mapValue.fields

        setuser(
            {user: response, id: user}
        )
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
        currentServer,
        currentChannel
    }

    return (
        <UserContext.Provider value={value}>
            { user && children }
        </UserContext.Provider>
    )
}
