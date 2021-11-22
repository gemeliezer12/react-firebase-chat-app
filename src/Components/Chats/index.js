

import Sidebar from "./Sidebar/"
import Conversation from "./Conversation/"
import Channels from "./Channels/"
import Users from "./Users/"

const Index = () => {

    

    return (
        <div className="qyoz1u5ip9">
            <div className="txoqixfkc5">
                <Sidebar/>
                <Channels/>
            </div>
            <div className="pqxxdp7bgq">
                <div className="topbar" style={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                    backgroundColor: "var(--bg-color-4)"
                }}>
                    
                </div>
                <div className="btaavqorla">
                    <Conversation/>
                    <Users/>
                </div>
            </div>
        </div>
    )
}

export default Index
