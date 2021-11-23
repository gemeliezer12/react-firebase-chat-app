import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { firebase } from "../../../firebase"
import { useUser } from "../../Contexts/UserContext"

const db = firebase.firestore()

// const Server = ({id}) => {
const Server = ({id}) => {
    const [isHovering, setisHovering] = useState(false)
    const { joinedServer } = useUser()

    const [item, setitem] = useState(null)

    const current = id === joinedServer

    const getServerData = async (id) => {
        const server = (await db.collection("servers").doc(id).get())._delegate._document.data.value.mapValue.fields

        setitem(server)
    }

    useEffect(() => {
        getServerData(id)
    }, [])

    if (item === null) return ""

    const Thumbnail = () => {
        switch (item.icon.mapValue.fields.type.stringValue) {
            case "img":
                return (
                    <img className="img" src={`../../../images/${item.icon.mapValue.fields.name.stringValue}`} alt=""/>
                )
            case "icon":
                return (
                    <div className="img" style={{
                        backgroundColor: "var(--bg-color-3)"
                    }}>
                        <i className={`${item.icon.mapValue.fields.name.stringValue} c-green fs-20`}></i>
                    </div>
                )
            default:
                break
        }
    }

    return (
        <div className={`sidebar-item align-center justify-center pos-relative ${isHovering ? "hovering" : ""} ${current ? "current" : ""}`}>
            <div className="creo383q40" style={{
                left: "0%"
            }}>
            </div>
            <Link to={`../chats/${id}`} className="pos-relative cursor-pointer " onMouseOver={() => setisHovering(true)} onMouseLeave={() => setisHovering(false)}>
                <div className="img-50 ei9c3bga4m" style={{
                    borderRadius: "50%",
                }}>
                    <Thumbnail/>
                </div>
                <div className="badge-container" style={{
                    backgroundColor: "var(--bg-color-1)",
                    position: "absolute",
                    right: "0",
                    bottom: "0",
                    marginRight: "-2px",
                    marginBottom: "-2px",
                }}>
                    <p className="badge-20 bg-green">
                        1
                    </p>
                </div>
            </Link>
            <div className="triangle-label d4ip3hvk1x margin-left-10 z-1 align-center" style={{
                    whiteSpace: "nowrap",
                    left: "100%",
                    position: "absolute",
                    transform: "scale(0)",
                    transitionDuration: "0.1s"
                }}>
                <div>
                    <p>{item.name.stringValue}</p>
                    </div>
                <div className="triangle" style={{
                    left: "0%",
                    transform: "translateX(-50%)"
                }}>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Server
