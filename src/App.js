import { Route, Routes } from "react-router-dom"

import { UserProvider } from "./Components/Contexts/UserContext"
import { MessageProvider } from "./Components/Contexts/MessageContext"

import Chats from "./Components/Chats/"
import Login from "./Components/Login/"

import "./styles/utility.css"
import "./styles/lib.css"
import "./styles/style.css"


function App() {

    

    return (                
        <div className="App">
            <Routes>
                <Route path="/" element={
                    <UserProvider>
                        <Login/>
                    </UserProvider>
                    }/>
                <Route path="/chats/:currentServer/:currentChannel" element={
                    <UserProvider>
                            <MessageProvider>
                                <Chats/>
                            </MessageProvider>
                    </UserProvider>
                }/>
            </Routes>
        </div>
                
    );
}

export default App;