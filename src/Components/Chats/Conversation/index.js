import MessageBox from "./MessageBox";
import Chat from "./Chat"
import { useMessage } from "../../Contexts/MessageContext";
import { useUser } from "../../Contexts/UserContext";

const Index = () => {
    const { messagesOfChannel } =  useMessage()
    const { currentServer } = useUser()

    return (
        <div className="conversations" style={{
            overflowX: "hidden",
            backgroundColor: "var(--bg-color-4)"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                height: "calc(100vh - 50px)"
            }}>
                <Chat messages={messagesOfChannel}/>
                <MessageBox currentServer={currentServer}/>
            </div>
        </div>
    )
}

export default Index
