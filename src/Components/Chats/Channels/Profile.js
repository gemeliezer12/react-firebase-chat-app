const Profile = ({user}) => {

    const image = () => {
        return user.profilePicture.stringValue.split(":")[0] !== "https" ? `../../images/${user.profilePicture.stringValue}` : user.profilePicture.stringValue
    }

    return (<div className="padding-x-10" style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        overflowX: "hidden",
        backgroundColor: "var(--bg-color-2)"
    }}>
        <div style={{
            display: "flex",
            overflow: "hidden"
        }}>
            <div className="pos-relative cursor-pointer">
                <div className="img-32" style={{
                    borderRadius: "50%"
                }}>
                    <img className="img" src={image()} alt=""/>
                </div>
                <div className="badge-container" style={{
                    backgroundColor: "var(--bg-color-2)",
                    position: "absolute",
                    right: "0",
                    bottom: "0",
                    marginRight: "-2px",
                    marginBottom: "-2px",
                }}>
                    <p className="bg-green badge-10" style={{
                        backgroundColor: "var(--green)",
                    }}>
                    </p>
                </div>
            </div>
            <div className="margin-left-6 fs-14 c-text-color-2">
                <p>{user.username.stringValue}</p>
            </div>
        </div>
        <div className="row align-center">
            <div className="img-26 cursor-pointer c4lwz2dn9f">
                <div className="img">
                    <i className="fas fa-cog"></i>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Profile
