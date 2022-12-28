const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';


import { NoteList } from "../cmps/note-list.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"




export function NoteIndex() {

    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [notes, setNotes] = useState([])




    useEffect(() => {
        loadNots()
    }, [filterBy])

    function loadNots() {
        setIsLoading(true)
        noteService.query(filterBy)
            .then((notes) => {
                setNotes(notes)
                setIsLoading(false)

            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                const updatednotes = notes.filter(note => note.id !== noteId)
                setNotes(updatednotes)
                showSuccessMsg('note removed')
            })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not remove note')
            })
    }



    return <section className="note-index">
            <NoteFilter onSetFilter={onSetFilter}/>


            <Link to="/note/edit">Add Note</Link>

            {isLoading && <div>Loading..</div>}

            {!isLoading && <NoteList notes={notes} onRemoveNote={onRemoveNote} />}
    </section>

}
