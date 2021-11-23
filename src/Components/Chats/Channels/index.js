import { useEffect } from "react"

import { useUser } from "../../Contexts/UserContext"
import Profile from "./Profile"
import Channel from "./Channel"
import { firebase } from "../../../firebase"

const db = firebase.firestore()

const Index = () => {
    const { user, joinedServer } = useUser()

    const channelsOfServer = async () => {
        const channels = (await db.collection("servers").doc(joinedServer).collection("channels").get()).docs

        console.log(channels)
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
                <Channel/>
                <Profile user={user.user}/>
            </div>
        </div>
    )
}

export default Index
