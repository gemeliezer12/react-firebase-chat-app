import { useMessage } from "../../Contexts/MessageContext"
import Message from "./Message"

const Chat = ({messages}) => {

    const { gettingMessagesOfServer } = useMessage()

    return (
        <div className="height-100pc padding-y-10" style={{
            overflowY: "auto",
            overflowX: "hidden",
            whiteSpace: "normal",
        }}>
            <div className="padding-x-15">
                <div className="column gap-10">
                    {gettingMessagesOfServer ? "" : 
                        messages.map((message) => (
                            <Message key={message.id} message={message.message} user={message.user} server={message.server}/>
                        ))
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Chat
