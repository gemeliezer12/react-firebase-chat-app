import Category from "./Category"
import Channel from "./Channel"

const Channels = ({channels}) => {
    return (
        <div className="column">
            {
                channels === null ?
                ""
                :
                channels.map((channel, index) => {
                    if (channel.mapValue) return (
                        <Category key={index} channels={channel}/>
                    )
                    else return (
                        <Channel key={channel.stringValue} channelId={channel}/>
                    )
                })
            }
        </div>
    )
}

export default Channels
