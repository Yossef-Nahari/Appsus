const { useState, useEffect, useRef } = React
const { useNavigate, useParams, useOutletContext } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"

export function NoteEdit() {
    const [noteToEdit, setnoteToEdit] = useState(noteService.getEmptyNote())
    const [isActive, setIsActive] = useState(true)

    const navigate = useNavigate()
    const { noteId } = useParams()
    const onSaveNote = useOutletContext()
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef)


    useEffect(() => {
        if (isActive) return
        onSaveNote(noteToEdit)
        navigate('/note')

    }, [isActive])

    useEffect(() => {
        if (!noteId) return
        loadnote()
    }, [])


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



    function loadnote() {
        noteService.get(noteId)
            .then((note) => setnoteToEdit(note))
            .catch((err) => {
                console.log('Had issues in note details', err)
                navigate('/note')
            })
    }


    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setnoteToEdit((prevNote) => (
            { ...prevNote, ...prevNote.info[field] = value },
            { ...prevNote, ...prevNote.info.lastUpdate = Date.now() }
        ))
    }

    function toSaveNote(ev) {
        ev.preventDefault()
        onSaveNote(noteToEdit, false)
        navigate('/note')
    }

    return <section className="mainEditNote">
        <div className="note-edit addNote flex column justify-center align-center writeOpt"
            ref={wrapperRef}
        // onClick={()=>{setIsActive(true)}}
        >
            <form className="addNoteForm" onSubmit={toSaveNote}
            >
                <input type="text"
                    className="addText"
                    name="title"
                    placeholder="Take a note..."
                    value={noteToEdit.info.title}
                    onChange={handleChange} />

                <textarea name="txt"
                    className="txtBody"
                    placeholder="Take a note..."
                    value={noteToEdit.info.txt}
                    onChange={handleChange}
                />

                <div className="bottomAddNoteLine flex  space-between align-center">
                    <div className="edidNoteBtn flex edidNoteBtn-content align-center space-between" >
                        <span className="material-symbols-outlined">
                            add_alert
                        </span>
                        <span className="material-symbols-outlined">
                            person_add
                        </span>
                        <span className="material-symbols-outlined">
                            palette
                        </span>
                        <span className="material-symbols-outlined">
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


                    <button className="closeBtn" forhtml="formEdit">
                        Close
                    </button>
                </div>


                {/* <form  className="addNote" onSubmit={onSaveNote}>
                <input type="text"
                    name="title"
                    className="txtTitle active"
                    placeholder="Title"
                    value={noteToEdit.info.title}
                    onChange={handleChange}
                />
                <textarea name="txt"
                    className="txtBody active"
                    placeholder="Take a note..."
                    value={noteToEdit.info.txt}
                    onChange={handleChange}
                /> */}

                {/* <input type="text"
                    name="txt"
                    className="txtBody"
                    placeholder="Enter note txt"
                    value={noteToEdit.info.txt}
                    onChange={handleChange}
                /> */}
                {/* <div className="optBtnNote active">
            <button>{noteToEdit.id ? 'Save' : 'Add'}</button>
            <Link to="/note">Cancel</Link>
        </div> */}
            </form>
        </div>
    </section>
}