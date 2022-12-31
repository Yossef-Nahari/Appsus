const { useState, useEffect, useRef} = React

import { noteService } from "../services/note.service.js"
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"
import { AddImg } from "./add-img.jsx"
import { Dropdown } from "./dropDown.jsx"



export function AddNote({onSaveNote}) {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [bgc,setBgc]=useState("#fffff")
    const [isActive, setIsActive]=useState(false)
    const wrapperRef = useRef(null);
    const bgcRef=useRef(null)

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
    
    function handleChangeStyle(value ,name) {
        setNoteToEdit((prevNote) => (
            { ...prevNote, ...prevNote.style[name] = value },
            { ...prevNote, ...prevNote.info.lastUpdate = Date.now()}            
        ))
        setBgc(value)
    }




    function showImg(file) {
        setNoteToEdit((prevNote) => (
            { ...prevNote, ...prevNote.info.src = file },
            { ...prevNote, ...prevNote.info.lastUpdate = Date.now()}            
        ))
    }

 
    return <section onClick={()=>{setIsActive(true)}} ref={wrapperRef}  className={isActive ? "addNote container flex justify-content space-between align-center writeOpt": "addNote container flex justify-content space-between align-center"}>
        <form className="addNoteForm" >
            <div className='content'>
            {noteToEdit.info.src && <img className="noteImg"
            src= {noteToEdit.info.src}
            alt="img"
            />}
            <input type="text"
                className="addText"
                name="title"
                placeholder="Take a note..." 
                value={noteToEdit.info.title}
                    onChange={handleChange}/>
            {isActive && 
                <textarea name="txt"
                className="txtBody"
                placeholder="Take a note..."
                value={noteToEdit.info.txt}
                onChange={handleChange}
                />
            }   
            </div>
        </form>
        

        <div className="addNoteBtn flex justify-content align-center">
       
            {/* <span className="material-symbols-outlined">
                check_box
            </span>
            <span className="material-symbols-outlined">
                brush
            </span> */}
            {/* <span className="material-symbols-outlined"> */}
                {/* image */}
            <AddImg showImg={showImg}/>
            {/* </span> */}
        </div>

 
        <div className="bottomAddNoteLine flex  space-between align-center">
            <div className="edidNoteBtn flex justify-content align-center">
                {/* <span className="material-symbols-outlined">
                    add_alert
                </span>
                <span className="material-symbols-outlined">
                    person_add
                </span> */}

                <Dropdown onChangeStyle={handleChangeStyle} noteId={''}/>

                <span className="material-symbols-outlined">
                    <AddImg showImg={showImg}/>
                </span>
                
                {/* <span className="material-symbols-outlined">
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
                </span> */}
            </div>

            <div className="closeBtn">
                Close
            </div>
        </div>

    </section>
}