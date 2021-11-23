import { useUser } from "../../Contexts/UserContext"
import Profile from "./Profile"

const Index = () => {
    const { user } = useUser()

    return (
        <div className="channels" style={{
            backgroundColor: "var(--bg-color-3)"
        }}>
            <div style={{
                display: "grid",
                gridTemplateRows: "50px 1fr 50px",
                height: "100%",
                position: "relative",
            }}>
                
                <div style={{
                     borderBottom: "1px solid rgba(0, 0, 0, 0.2)"
                }}>
                    
                </div>
                <div>
                    
                </div>
                <Profile user={user.user}/>
            </div>
        </div>
    )
}

export default Index
