import { useUser } from "../../Contexts/UserContext"
import Item from "./Item"

const Index = () => {
    const { user } = useUser()

    return (
        <div className="sidebar padding-y-10" style={{
            backgroundColor: "var(--bg-color-1)"
        }}>
            <div className="column gap-10">
                <div className="column gap-10">
                    {user.user.joinedServers.arrayValue.values.map((item) => (
                        <Item key={item.stringValue} id={item.stringValue}></Item>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Index
