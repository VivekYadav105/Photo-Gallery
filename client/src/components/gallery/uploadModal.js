const UploadModal = ({handleCloseModal,uploadPhoto,...props})=>{
    return(
        <div className="uploadModal">
            <form className="upload-form" encType='multipart/form-data' onSubmit={uploadPhoto}>
                <button className="close-btn" type="button" onClick={()=>{handleCloseModal()}}>
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
}