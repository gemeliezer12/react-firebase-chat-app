import React, { useContext, useEffect, useState } from "react"


import { useUser } from "./UserContext"
import { firebase } from "../../firebase"
import { useParams } from "react-router-dom"

const ServerContext = React.createContext()

const db = firebase.firestore()

export const useServer = () => useContext(ServerContext)

export const ServerProvider = ({ children }) => {
    const { user } = useUser()

    const { joinedServer } = useParams()
    const [joinedServers, setjoinedServers] = useState([])
    const [gettingJoinedServer, setgettingJoinedServer] = useState(true)

    const getJoinedServers = async (user) => {
        let results = []

        if (user.user.joinedServers) {
            for (let i = 0; i < user.user.joinedServers.arrayValue.values.length; i++){
                const joinedServer = user.user.joinedServers.arrayValue.values[i].stringValue
                const response = (await db.collection("servers").doc(joinedServer).get())._delegate
    
                const server = response._document.data.value.mapValue.fields
    
                
                results.push({server: server, id: response.id})
            }
        }
        

        setjoinedServers(results)
        setgettingJoinedServer(false)
    }

    useEffect( () => {
        getJoinedServers(user)
    }, [])

    const value = {
        joinedServers,
        joinedServer
    }

    return (
        <ServerContext.Provider value={value}>
            { !gettingJoinedServer && children }
        </ServerContext.Provider>
    )
}
