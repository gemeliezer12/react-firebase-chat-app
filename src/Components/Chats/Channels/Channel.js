import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { useMessage } from "../../Contexts/MessageContext"
import { useUser } from "../../Contexts/UserContext"

const Channel = ({channelId}) => {

    const { currentServer, currentChannel } = useUser()
    const { getChannelData } = useMessage()

    const [channel, setchannel] = useState(null)
    const [hovering, setHovering] = useState(false)

    const current = channelId.stringValue === currentChannel

    useEffect( async () => {
        setchannel(
            await getChannelData(channelId.stringValue, currentServer)
        )
    }, [])

    if (!channel) return ""

    return (
        <Link to={`../chats/${currentServer}/${channelId.stringValue}`} className={`${hovering || current ? " hovering" : ""} cursor-pointer padding-x-10 justify-center column width-100pc padding-top-2 pos-relative`} onMouseOver={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <div className="creo383q40" style={{
                left: "0%",
            }}></div>
            <div className="jdubx7nlm7 row space-between gap-10 fs-18 padding-all-6 border-radius-4">
                <div className="row gap-6" style={{
                }}>
                    <p className="ff-cubano c-text-color-1">#</p>
                    <p>{channel.name.stringValue}</p>
                </div>
            </div>
        </Link>
    )
}

export default Channel
