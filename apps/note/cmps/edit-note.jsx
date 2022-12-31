const { useState, useEffect, useRef } = React
const { useNavigate, useParams, useOutletContext } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

import { AddImg } from "./add-img.jsx"

export function NoteEdit() {
    const [noteToEdit, setnoteToEdit] = useState(noteService.getEmptyNote())
    const [isActive, setIsActive] = useState(true)

    const navigate = useNavigate()
    const { noteId } = useParams()
    const {onSaveNote, onRemoveNote} = useOutletContext()
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


    function showImg(file) {
        setnoteToEdit((prevNote) => (
            { ...prevNote, ...prevNote.info.src = file },
            { ...prevNote, ...prevNote.info.lastUpdate = Date.now() }
        ))
        
    }


    function toRemoveNote() {
        onRemoveNote(noteId)
        navigate('/note')
    }



    return <section className="mainEditNote">
        <div className="note-edit addNote flex column justify-center align-center writeOpt"
            ref={wrapperRef}
        // onClick={()=>{setIsActive(true)}}
        >
            <form className="addNoteForm" onSubmit={toSaveNote}

            >
                 {noteToEdit.info.src && <img className="noteImg"
                    src= {noteToEdit.info.src}
                    alt="img"
                    />}
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
                       
                        <AddImg showImg={showImg}/>

                        <span onClick={toRemoveNote} className="material-symbols-outlined">
                                delete
                            </span>
                    
                    </div>


                    <button className="closeBtn" forhtml="formEdit">
                        Close
                    </button>
                </div>

            </form>
        </div>
    </section>
}