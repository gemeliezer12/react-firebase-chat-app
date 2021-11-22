const User = ({user, id}) => {

    const image = () => {
        return user.profilePicture.stringValue.split(":")[0] !== "https" ? `../../images/${user.profilePicture.stringValue}` : user.profilePicture.stringValue
    }

    

    return (
        <div className="row gap-10 align-center padding-x-10" style={{
            height: "40px",
        }}>
            <div className="img-26" style={{
                borderRadius: "50%"
            }}>
                <img src={image()} alt=""/>
            </div>
            <div className="ws-no-wrap">
                <div>
                    <p className="fs-14">{user.username.stringValue}</p>
                </div>
            </div>
        </div>
    )
}

export default User
