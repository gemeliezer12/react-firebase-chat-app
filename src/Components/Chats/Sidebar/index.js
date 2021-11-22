import { useServer } from "../../Contexts/ServerContext"
import Item from "./Item"

const Index = () => {
    const { joinedServers } = useServer()

    return (
        <div className="sidebar padding-y-10" style={{
            backgroundColor: "var(--bg-color-1)"
        }}>
            <div className="column gap-10">
                <div className="column gap-10">
                    {joinedServers.map((item, index) => (
                        <Item index={index} key={item.id} item={item.server} id={item.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Index
