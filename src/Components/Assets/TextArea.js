const TextArea = ({textarea}) => {
    const onChange = (e) => {
        e.style.height = "5px";
        
        e.style.height = (e.scrollHeight)+"px";
    }

    return (
        <div className={`input-label ${textarea.value !== "" && "focus-within"}`}>
            {textarea.isRequired ? 
            <div>
                <label htmlFor={textarea.name} className="label">
                    {textarea.label}
                    <span style={{
                        color: "var(--red)"
                    }}>*</span>
                </label>
                <textarea name={textarea.name} required onChange={(e) => onChange(e.target)}></textarea>
            </div>
            :
            <div>
                <label htmlFor={textarea.name} className="label">
                    {textarea.label}
                </label>
                <textarea name={textarea.name} required onChange={(e) => onChange(e.target)}></textarea>
            </div>
            }
        </div>
    )
}

export default TextArea
