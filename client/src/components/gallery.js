import { useContext, useEffect, useRef, useState } from "react";
import { BounceLoader } from "react-spinners";
import axios from "axios";
import './gallery.css'
import { UserContext } from "../App";

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

export default function Gallery(){
    const [photos,setPhotos] = useState([]);
    const [loading,setLoading] = useState(false);
    const [modal,setModal] = useState(false);
    const {user} = useContext(UserContext)
    const fileInputRef = useRef(null)
    const [uploadProgress, setUploadProgress] = useState(0);


    async function UploadPhoto(e){
        e.preventDefault()
        console.log("inside")
        const origin = process.env.REACT_APP_BACKEND || "http://localhost:7000"
        console.log(origin)
        const {file} = e.target;
        console.log(file.files[0])
        const formData = new FormData();
        formData.append('files', file.files[0]);
        formData.append('fileName', file.files[0].name);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `bearer ${user}`
          },
          uploadProgress:(progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        };
        fileInputRef.current.value = ""
        const url = `${origin}/photo/upload`
        const post = await axios.post(url, formData, config)
        const response = post.data
        console.log(response)
        response.photos.forEach(ele => {
            const parseUrl = parsePhoto(ele.fileData.data)
            setPhotos(prev=>[...prev,{name:ele.name,uri:parseUrl,tags:ele.tags,originalName:ele.originalName,id:ele._id}])
        });
    }

    function parsePhoto(data){
        const imageUrl =  URL.createObjectURL(new Blob([new Uint8Array(data)]))
        return imageUrl
    }

    useEffect(()=>{
       async function getPhotos(){
            const origin = process.env.REACT_APP_BACKEND || "http://localhost:7000"
            const url = `${origin}/photo/getAllPhotos`
            const config = {
                headers:{
                    'Authorization': `bearer ${user}`
                }
            }
            const post = await axios.get(url,config)
            const response = post.data
            console.log(response)
            response.photos.forEach(ele => {
                const parseUrl = parsePhoto(ele.fileData.data)
                setPhotos(prev=>[...prev,{name:ele.name,uri:parseUrl,tags:ele.tags,originalName:ele.originalName,id:ele._id}])
            });
            console.log(response)
        }
        getPhotos()
    },[user])

    const uploadModal = (
        <div className="uploadModal">
            <form className="upload-form" encType='multipart/form-data' onSubmit={UploadPhoto}>
                <button className="close-btn" type="button" onClick={()=>{setModal(false)}}>
                    <img src="/close.svg" alt="close"/>
                </button>
                <div className="input-field">
                    <input
                        type="file"
                        id="photo-name"
                        name="file"
                        ref={fileInputRef}
                        placeholder="Upload your image here"
                        required
                    />
                </div>
                <div className="input-field">
                <button type="submit">Upload</button>
                    <button
                        type="button"
                        onClick={()=>{fileInputRef.current.value = ""}}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    )

    return(
        <section className="gallery-container">
            <div className="gallery-header">
                <h1 className="gallery-heading">
                    Your Photos
                </h1>
                <button className="header-btn" type="button" onClick={()=>{setModal(true)}}>Add New</button>
            </div>
            {photos.length===0&&<p className="header-text">Start by uploading new Photos here</p>}
            {modal&&uploadModal}
            <div className="photo-section">
                {loading&&<BounceLoader size={10} color="purple"/>}
                {photos&&photos.map((ele,index)=><Photo key={index} {...ele}/>)}
            </div>
        </section>
    )
}