import { useRef } from "react"

const UploadModal = ({handleCloseModal,uploadPhoto,...props})=>{
    const fileInputRef = useRef()
    return(
        <div className="uploadModal">
            <form className="upload-form" encType='multipart/form-data' onSubmit={uploadPhoto}>
                <button className="close-btn" type="button" onClick={()=>{handleCloseModal()}}>
                    <img src="/close.svg" alt="close"/>
                </button>
                <div className="input-field">
                    <input
                        accept="image/*"
                        type="file"
                        id="photo-name"
                        name="file"
                        ref={fileInputRef}
                        placeholder="Upload your image here"
                        required
                    />
                </div>
                <div className="input-field">
                    <input name="name" placeholder="enter the file name" />
                </div>
                <div className="input-field">
                <button type="submit">Upload</button>
                    <button
                        type="button"
                        onClick={()=>{console.log('clicked');fileInputRef.current.value = ""}}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UploadModal