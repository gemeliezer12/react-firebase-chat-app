import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { useMessage } from "../../Contexts/MessageContext";

function onlySpaces(str) {
    return str.trim().length === 0;
}

const MessageBox = ({ currentServer }) => {

    const { sendMessage } = useMessage()

    const [message, setmessage] = useState({name: "message", value: "", isValid: false, label: "#Message", isRequired: true})

    // Onchage Form
    const onChange = (e) => {
        switch (e.name) {
            case "message":
                setmessage({...message, value: e.value, isValid: e.value !== "" && !onlySpaces(e.value)})
                break
            default:
                break
        }
    }
    
    // Validates all Inputs
    const allInputIsValid = () => {
        return message.isValid
    }

    // Submit Form to Context
    const onSubmit = (e) => {
        e.preventDefault()

        if(message.isValid){
            sendMessage({...message })
            setmessage({...message, value: "", })
        }
    }

    // On Enter Textarea
    const onKeyDown = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            onSubmit(e)
        }
    }

    return (
        <form className="padding-x-15 column padding-bottom-20" onSubmit={(e) => onSubmit(e)}>
            <div className="row padding-x-15 fs-20 gap-10" style={{
                backgroundColor: "var(--bg-color-5)",
                borderRadius: "6px",
            }}>
                
                <div className="flex cursor-pointer align-center" style={{
                    height: "40px"
                }}>
                    <i className="fas fa-plus-circle"></i>
                </div>
                <div className="align-center row" style={{
                    width: "100%",
                }}>
                    <TextareaAutosize maxRows="15" name={message.name} className="fs-16 ff-sofia-pro width-100pc" placeholder={message.label} onChange={(e) => onChange(e.target)} onKeyDown={(e) => onKeyDown(e)} value={message.value}/>
                </div>
                <div className="row gap-10" style={{
                        height: "40px"
                    }}>
                    <div className="flex cursor-pointer align-center">
                        <div style={{
                            height: "20px",
                        }}>
                            <img src="../../images/gif.png" alt="" style={{
                                height: "100%",
                                filter: "grayscale(100%)"
                            }}/>
                        </div>
                    </div>
                    <div className="flex cursor-pointer align-center">
                        <div style={{
                            height: "20px",
                        }}>
                            <img src="../../images/emoji.png" alt="" style={{
                                height: "100%",
                                filter: "grayscale(100%)"
                            }}/>
                        </div>
                    </div>
                    <button disabled={!allInputIsValid()} className="flex cursor-pointer align-center">
                        <i className={`fas fa-paper-plane ${allInputIsValid() ? "c-green" : ""}`}></i>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default MessageBox
