const { useState, useEffect, useRef } = React

export function AddImg({ showImg,noteId}) {



    const fileUpload = useRef(null);
    const uploadProfilePic = (e) => {
        showImg(URL.createObjectURL((e.target.files[0])), noteId)
    };

    const handleUpload = () => {
        event.preventDefault()
        console.log(fileUpload.current.click(), "fileUpload");

    };
    return (
        <div className="App">
            <input
                type="file"
                ref={fileUpload}
                onChange={uploadProfilePic}
                style={{ opacity: "0" ,width:0}}
            />
            <button className="btn" onClick={() => handleUpload()}>
                <span className="material-symbols-outlined">
                    image
                </span> 
            </button>
        </div>
    );
}