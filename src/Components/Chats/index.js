

import Sidebar from "./Sidebar/"
import Conversation from "./Conversation/"
import Channels from "./Channels/"

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
                    <div className="users" style={{
                        backgroundColor: "var(--bg-color-3)"
                    }}>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
