const { useState, useEffect, useRef} = React

import { noteService } from "../services/note.service.js"
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"




export function AddNote({onSaveNote}) {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [isActive, setIsActive]=useState(false)
    const wrapperRef = useRef(null);
    const [cmpType, setCmpType] = useState('txt')
    const [selectedFile, setSelectedFile] = useState(null);


    console.log('cmpType:', cmpType)

    useOutsideAlerter(wrapperRef)

    useEffect (()=> {
        if (isActive) return
        onSaveNote(noteToEdit)
        setNoteToEdit(noteService.getEmptyNote())

    },[isActive])


    function useOutsideAlerter(ref) {
        useEffect(() => {
          function handleClickOutside(event) {
              if (ref.current && !ref.current.contains(event.target)) {
                setIsActive(false)

            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside)
             
            
          };
        
        }, [ref]);
      }
    

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setNoteToEdit((prevNote) => (
            { ...prevNote, ...prevNote.info[field] = value },
            { ...prevNote, ...prevNote.info.lastUpdate = Date.now()}            
        ))

    }


    function DynamicCmp(props) {
        console.log('props:', props)
        switch (props.cmpType){
            case 'txt':
                return <Text/>
            case 'img':
                return <LoadImg/>
        }
    }

    function Text() {
        return <textarea name="txt"
        className="txtBody"
        placeholder="Take a note..."
        value={noteToEdit.info.txt}
        onChange={handleChange}
    />
    }

    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
          return;
        }

    function LoadImg(){
        return <input 
        type="file"
        value={selectedFile}
        onChange={handleFileChange}

        />
        
    }


    return <section onClick={()=>{setIsActive(true)}} ref={wrapperRef} className={isActive ? "addNote container flex justify-content space-between align-center writeOpt": "addNote container flex justify-content space-between align-center"}>
        <form className="addNotForm" >
            <input type="text"
                className="addText"
                name="title"
                placeholder="Take a note..." 
                value={noteToEdit.info.title}
                    onChange={handleChange}/>
            <DynamicCmp cmpType={cmpType} /> 
            {/* <textarea name="txt"
                className="txtBody"
                placeholder="Take a note..."
                value={noteToEdit.info.txt}
                onChange={handleChange}
            /> */}
    {/* <button>{noteToEdit.id ? 'Save' : 'Add'}</button> */}

        </form>

        <div className="addNoteBtn flex justify-content align-center">
            <span className="material-symbols-outlined">
                check_box
            </span>
            <span className="material-symbols-outlined">
                brush
            </span>
            <span className="material-symbols-outlined">
                image
            </span>
        </div>

 
        <div className="bottomAddNoteLine flex  space-between align-center">
            <div className="edidNoteBtn flex justify-content align-center">
                <span className="material-symbols-outlined">
                    add_alert
                </span>
                <span className="material-symbols-outlined">
                    person_add
                </span>
                <span className="material-symbols-outlined">
                    palette
                </span>
                <span className="material-symbols-outlined"
                onClick={ev => setCmpType("img")}>
                    image
                </span>
                <span className="material-symbols-outlined">
                    archive
                </span>
                <span className="material-symbols-outlined">
                    more_vert
                </span>
                <span className="material-symbols-outlined">
                    undo
                </span>
                <span className="material-symbols-outlined">
                    redo
                </span>
            </div>

            <div className="closeBtn">
                Close
            </div>
        </div>


    </section>
}