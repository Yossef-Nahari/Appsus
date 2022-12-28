const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"

export function NoteEdit() {
    const [noteToEdit, setnoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const { noteId } = useParams()


    useEffect(() => {
        if (!noteId) return
        loadnote()
    }, [])

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
            { ...prevNote, ...prevNote.info[field]=value},
            { ...prevNote, ...prevNote.info.lastUpdate=Date.now()}
            ))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit).then((note) => {
            console.log('note saved', note);
            showSuccessMsg('note saved!')
            navigate('/note')
        })
    }

    return <section className="note-edit">
        <h2>{noteToEdit.id ? 'Edit this note' : 'Add a new note'}</h2>

        <form onSubmit={onSaveNote}>
            <label htmlFor="title">title : </label>
            <input type="text"
                name="title"
                id="title"
                placeholder="Enter title txt"
                value={noteToEdit.info.title}
                onChange={handleChange}
            />
            <label htmlFor="noteTxt">Note text : </label>
            <input type="text"
                name="txt"
                id="noteTxt"
                placeholder="Enter note txt"
                value={noteToEdit.info.txt}
                onChange={handleChange}
            />
           
            <div>
                <button>{noteToEdit.id ? 'Save' : 'Add'}</button>
                <Link to="/note">Cancel</Link>
            </div>
        </form>
    </section>
}