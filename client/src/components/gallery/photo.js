import './photo.css'

const Photo = (props)=>{
    return(
        <div className="gallery-card">
            <div className="options-wrapper">
                <div className='button-wrapper'>
                    <button className='hamburger' onClick={()=>props.expandOptions(props.index)}>
                        <img src="/more_vert.svg" alt=""/>
                    </button>
                    {props.expand&&(<ul className='options'>
                        <li>
                            <button>
                                Share
                            </button>
                        </li>
                        <li>
                            <button>
                                Delete
                            </button>
                        </li>
                        <li>
                            <button>
                                Edit
                            </button>
                        </li>
                    </ul>)}
                </div>
            </div>
            <img src={props.uri} className="gallery-image" alt={props.name}/>
            <div className="photo-name-wrapper">
                <p className="photo-name">{props.originalName}</p>
            </div>
            <article className="gallery-tags">
                {props.tags.map((ele,index)=>(
                    <span className="tag-chip" key={index}>{ele}</span>
                ))}
            </article>
        </div>
    )
}


export default Photo