import React, { useContext, useState, useEffect } from "react"
import { useServer } from "./ServerContext"
import { useUser } from "./UserContext"

import { firebase } from "../../firebase"

const db = firebase.firestore()
const date = new Date()

const MessageContext = React.createContext()

export const useMessage = () => useContext(MessageContext)

export const MessageProvider = ({ children }) => {

    const { user, includesObject } = useUser()
    const { joinedServer } = useServer()
    const [messagesOfServer, setmessagesOfServer] = useState()
    const [usersOfServer, setusersOfServer] = useState()
    

    const sendMessage = async (e) => {
        await db.collection("messages").add({
            userId: user.id,
            serverId: e.serverId,
            value: e.value,
            dateCreated: date.getTime()
        })
    }


    const getMessagesOfServer = async (serverId) => {
        let results = []

        const messages = (await db.collection("messages").where("serverId", "==", serverId).get()).docs

        for (let i = 0; i < messages.length; i++) {
            const message = messages[i]._delegate._document.data.value.mapValue.fields

            const promise = await Promise.all([db.collection("users").doc(message.userId.stringValue).get(), db.collection("servers").doc(message.serverId.stringValue).get()])

            const user = promise[0]._delegate._document.data.value.mapValue.fields
            const server = promise[1]._delegate._document.data.value.mapValue.fields

            results.push({message: message, user: user, server: server, id: messages[i].id})
        }
        
        if (serverId !== window.location.pathname.split("/")[2]) return

        
        setmessagesOfServer(results)
    }

    const getUsersOfServer = async (serverId) => {
        const results = []

        const users = (await db.collection("users").where("joinedServers", "array-contains", serverId).get()).docs

        for (let i = 0; i < users.length; i++) {
            const user = users[i]._delegate._document.data.value.mapValue.fields

            results.push({user: user, id: users[i].id})
            
        }

        setusersOfServer(results)
    }

    useEffect( () => {
        getMessagesOfServer(joinedServer)
        getUsersOfServer(joinedServer)
    }, [])

    useEffect(() => {
        getMessagesOfServer(joinedServer)
        getUsersOfServer(joinedServer)
    }, [joinedServer])

    useEffect( () => {
        const unsubscribe = db.collection("messages").onSnapshot( (snap) => {
            getMessagesOfServer(joinedServer)
        })

        return () => unsubscribe()
    }, [])

    const value = {
        sendMessage,
        messagesOfServer,
        usersOfServer
    }

    return (
        <MessageContext.Provider value={value}>
            { children }
        </MessageContext.Provider>
    )
}
