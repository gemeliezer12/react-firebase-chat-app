import Category from "./Category"
import Channel from "./Channel"

const Channels = ({channels}) => {
    return (
        <div>
            {
                channels === null ?
                ""
                :
                channels.map((channel) => {
                    
                    if (channel.mapValue) return (
                        <Category channels={channel}/>
                    )
                    else return (
                        <Channel channel={channel}/>
                    )
                })
            }
        </div>
    )
}

export default Channels
