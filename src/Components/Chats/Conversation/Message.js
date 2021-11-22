const Message = ({ message, user }) => {

    const image = () => {
        return user.profilePicture.stringValue.split(":")[0] !== "https" ? `../../images/${user.profilePicture.stringValue}` : user.profilePicture.stringValue
    }

    return (
        <div className="row gap-10 ws-pre-wrap ow-anywhere">
            <div>
                <div className="img-40" style={{
                    borderRadius: "50%"
                }}>
                    <img src={image()} alt=""/>
                </div>
            </div>
            <div>
                <div className="row align-end gap-6">
                    <p className="c-text-color-2">{user.username.stringValue}</p>
                </div>
                <p>{message.value.stringValue}</p>
            </div>
        </div>
    )
}

export default Message
