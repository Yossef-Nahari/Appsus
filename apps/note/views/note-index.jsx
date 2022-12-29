const { useState, useEffect } = React
const { Outlet, Link, NavLink } = ReactRouterDOM


import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { GoogleHeader } from "../cmps/google-header.jsx"
import { AddNote } from "../cmps/add-note.jsx"
import { NoteList } from "../cmps/note-list.jsx"





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

    function onSaveNote(newNote, noteId='') {
        if (newNote.info.txt ==="" && newNote.info.title ==="" ) return
        noteService.save(newNote).then((note) => {
            setNotes(prevNots=> [...prevNots, note])
        })
    }



    return <section className="note-index">
            <GoogleHeader onSetFilter={onSetFilter}/>

            <main className=".main-layout">

                <AddNote onSaveNote={onSaveNote}/>

            


                {/* <Link to="/note/">Add Note</Link> */}

                {isLoading && <div>Loading..</div>}

                {!isLoading && <NoteList notes={notes} onRemoveNote={onRemoveNote} />}

                <div className="nested-route">
                    <Outlet />
                </div>

            </main>
    </section>

}
