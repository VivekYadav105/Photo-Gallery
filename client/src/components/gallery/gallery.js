import { useContext, useEffect, useRef, useState } from "react";
import { BounceLoader } from "react-spinners";
import axios from "axios";
import '../gallery.css'
import { UserContext } from "../../App";
import Photo from './photo'
import UploadModal from './uploadModal'
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

export default function Gallery(){
    const [photos,setPhotos] = useState([]);
    const [expanded,setExpanded] = useState(-1);
    const [loading,setLoading] = useState(false);
    const [modal,setModal] = useState(false);
    const {user} = useContext(UserContext)
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(()=>{
        console.log(user)
        if(!user||!user.length) return <Navigate to={'/login'} replace/>
    },[user])

    async function uploadPhoto(e){
        e.preventDefault()
        console.log("inside")
        const origin = process.env.REACT_APP_BACKEND || "http://localhost:7000"
        console.log(origin)
        const {file,name} = e.target;
        const fileType = file.files[0].type
        console.log(fileType)
        if(fileType.split('/')[0]!='images'){
            toast.error('given file is not an image')
            return;
        }
        let fileName;
        if(name.value) fileName = name.value
        else fileName = file.files[0].name
        const formData = new FormData();
        formData.append('files', file.files[0]);
        formData.append('fileName', fileName);
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
        // console.log(fileInputRef.current.value)
        // fileInputRef.current.value = null
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

    function expandOptions(i){
        console.log(i)
        setExpanded(prev=>prev===i?-1:i)
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

    return(
        <section className="gallery-container">
            <div className="gallery-header">
                <h1 className="gallery-heading">
                    Your Photos
                </h1>
                <div className="buttons">
                    <button className="header-btn" type="button" onClick={()=>{setModal(true)}}>Add New</button>
                    <button className="header-btn" type="button">View Shared</button>
                </div>
            </div>
            {photos.length===0&&<p className="header-text">Start by uploading new Photos here</p>}
            {modal&&<UploadModal handleCloseModal={()=>setModal(false)} uploadPhoto={uploadPhoto}/>}
            <div className="photo-section">
                {loading&&<BounceLoader size={10} color="purple"/>}
                {photos&&photos.map((ele,index)=><Photo expandOptions={expandOptions} index={index} expand={index===expanded} key={index} {...ele}/>)}
            </div>
        </section>
    )
}