const Photo = (props)=>{
    return(
        <div className="gallery-card">
            <img src={props.uri} className="gallery-image" alt={props.name}/>
            <p className="photo-name">{props.originalName}</p>
            <article className="gallery-tags">
                {props.tags.map((ele,index)=>(
                    <span className="tag-chip" key={index}>{ele}</span>
                ))}
            </article>
        </div>
    )
}

export default Photo