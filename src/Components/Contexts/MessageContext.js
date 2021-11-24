import React, { useContext, useState, useEffect } from "react"
import { useUser } from "./UserContext"

import { firebase } from "../../firebase"

const db = firebase.firestore()
const date = new Date()

const MessageContext = React.createContext()

export const useMessage = () => useContext(MessageContext)

export const MessageProvider = ({ children }) => {

    const { user, currentServer ,currentChannel } = useUser()
    const [messagesOfServer, setmessagesOfServer] = useState()
    const [usersOfServer, setusersOfServer] = useState()
    const [messagesOfChannel, setmessagesOfChannel] = useState()
    

    const sendMessage = async (e) => {
        // await db.collection("messages").add({
        //     userId: user.id,
        //     serverId: e.serverId,
        //     value: e.value,
        //     dateCreated: date.getTime()
        // })
        console.log(
            await db.collection("servers").doc(currentServer).collection("channels").doc(currentChannel).collection("messages").add({
                userId: user.id,
                value: e.value,
                dateCreated: date.getTime()
            })
        )
    }

    const getChannelData = async (channelId, serverId) => {
        const channelData = (await db.collection("servers").doc(serverId).collection("channels").doc(channelId).get())._delegate._document.data.value.mapValue.fields

        return(channelData)
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

    const getChannelMessage = async (channelId, serverId) => {
        const results = []

        const channelMessages = (await db.collection("servers").doc(serverId).collection("channels").doc(channelId).collection("messages").get()).docs
        
        for (let i = 0; i < channelMessages.length; i++) {
            const message = channelMessages[i]._delegate._document.data.value.mapValue.fields

            const user = (await db.collection("users").doc(message.userId.stringValue).get())._delegate._document.data.value.mapValue.fields

            results.push({message: message, id: channelMessages[i].id, user: user})
        }

        return results
    }

    useEffect( async () => {
        setmessagesOfChannel(
            await getChannelMessage(currentChannel, currentServer)
        )
        getUsersOfServer(currentServer)
    }, [])

    useEffect( async () => {
        setmessagesOfChannel(
            await getChannelMessage(currentChannel, currentServer)
        )
        getUsersOfServer(currentServer)
    }, [currentServer, currentChannel])

    const value = {
        sendMessage,
        messagesOfChannel,
        usersOfServer,
        getChannelData,
        getChannelMessage
    }

    return (
        <MessageContext.Provider value={value}>
            { children }
        </MessageContext.Provider>
    )
}
