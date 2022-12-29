const { useState, useEffect, useCallback, useRef} = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"




export function AddNote({onSaveNote}) {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [active, setActive]=useState(false)
    console.log('active:', active)

    function useOutsideAlerter(ref) {
        useEffect(() => {
          function handleClickOutside(event) {
              if (ref.current && !ref.current.contains(event.target)) {
                if (active) return
                // const note=noteService.getEmptyNote()
                onSaveNote(noteToEdit)
                setActive(false)

            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        
        }, [ref]);
      }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);


    function handleChange({ target }) {
        console.log('target:', target)
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setNoteToEdit((prevNote) => (
            { ...prevNote, ...prevNote.info[field] = value },
            { ...prevNote, ...prevNote.info.lastUpdate = Date.now()}
        ))

    }

    function openModel(){
        setActive(true)
    }


    // function onSaveNote() {
    //     if (noteToEdit.info.txt ==="" && noteToEdit.info.title ==="" ) return
    //     noteService.save(noteToEdit).then((note) => {
    //         console.log('note saved', note);
    //         // showSuccessMsg('note saved!')
    //         // navigate('/note')
    //     })
    // }
    return <section onClick={openModel} ref={wrapperRef} className={active ? "addNote container flex justify-content space-between align-center writeOpt": "addNote container flex justify-content space-between align-center"}>
        <form className="addNotForm" >
            <input type="text"
                className="addText"
                name="title"
                placeholder="Take a note..." 
                value={noteToEdit.info.title}
                    onChange={handleChange}/>

            <textarea name="txt"
                className="txtBody"
                placeholder="Take a note..."
                value={noteToEdit.info.txt}
                onChange={handleChange}
            />
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
                <span class="material-symbols-outlined">
                    add_alert
                </span>
                <span class="material-symbols-outlined">
                    person_add
                </span>
                <span class="material-symbols-outlined">
                    palette
                </span>
                <span class="material-symbols-outlined">
                    image
                </span>
                <span class="material-symbols-outlined">
                    archive
                </span>
                <span class="material-symbols-outlined">
                    more_vert
                </span>
                <span class="material-symbols-outlined">
                    undo
                </span>
                <span class="material-symbols-outlined">
                    redo
                </span>
            </div>

            <div className="closeBtn">
                Close
            </div>
        </div>

        {/* <div className="attachPin">
        <span class="material-symbols-outlined">
                push_pin
                </span>
        </div> */}

    </section>
}