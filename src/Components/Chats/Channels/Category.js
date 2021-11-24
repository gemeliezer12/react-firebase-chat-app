import Channel from "./Channel"

const Category = ({channels}) => {

    const channel = channels.mapValue.fields.category.mapValue.fields.channels.arrayValue.values

    const category = channels.mapValue.fields.category.mapValue.fields.name.stringValue

    return (
        <div className="margin-top-20">
            <div className="row">
                <div className="row align-center">
                    <div className="padding-x-6">
                        <i className="fas fa-angle-down fs-14"></i>
                    </div>
                    <p className="uppercase fs-16">{category}</p>
                </div>
            </div>
            {channel.map((channel) => (
                <Channel key={channel.stringValue} channelId={channel}/>
            ))}
        </div>
    )
}

export default Category
