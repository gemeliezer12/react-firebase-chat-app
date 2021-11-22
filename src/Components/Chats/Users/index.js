import { useMessage } from "../../Contexts/MessageContext"
import User from "./User"

const Index = () => {

    const { usersOfServer } = useMessage()

    if(usersOfServer === undefined) return ""

    return (
        <div>
            <div className="column" style={{
                backgroundColor: "var(--bg-color-3)",
                height: "calc(100%)"
            }}>
                {usersOfServer.map((user) => (
                    <User id={user.id} key={user.id} user={user.user}/>
                ))}
            </div>
        </div>
    )
}

export default Index
