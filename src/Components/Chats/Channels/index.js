import { useEffect, useState } from "react"

import { useUser } from "../../Contexts/UserContext"
import Profile from "./Profile"
import { firebase } from "../../../firebase"
import Channels from "./Channels"

const db = firebase.firestore()

const Index = () => {
    const { user, joinedServer } = useUser()
    const [channels, setchannels] = useState(null)

    const channelsOfServer = async () => {

        const channels = (await db.collection("servers").doc(joinedServer).get())._delegate._document.data.value.mapValue.fields.channels.arrayValue.values


        setchannels(channels)
    }

    useEffect(() => {
        channelsOfServer(joinedServer)
    }, [])

    return (
        <div className="channels" style={{
            backgroundColor: "var(--bg-color-3)"
        }}>
            <div style={{
                display: "grid",
                gridTemplateRows: "50px 1fr 50px",
                height: "100%",
                position: "relative",
            }}>
                
                <div style={{
                     borderBottom: "1px solid rgba(0, 0, 0, 0.2)"
                }}>
                    
                </div>
                <Channels channels={channels}/>
                <Profile user={user.user}/>
            </div>
        </div>
    )
}

export default Index
