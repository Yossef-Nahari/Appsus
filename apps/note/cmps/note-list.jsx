const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx";


export function NoteList({notes, onRemoveNote}) {
    

    return <ul className="noteList ">
    {
        notes.map(note => <li key={note.id}>
            <div className="notePresent">
                <NotePreview note={note} />
                <div className="optBtnNote">
                    {/* <div className="bottomAddNoteLine flex  space-between align-center"> */}
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
                            <span className="material-symbols-outlined">
                                image
                            </span>
                            <span className="material-symbols-outlined">
                                archive
                            </span>
                            <span className="material-symbols-outlined">
                                more_vert
                            </span>
                        </div>
                    {/* <button onClick={() => onRemoveNote(note.id)}>Remove</button> */}
                    {/* <Link to={`/note/${note.id}`}> Edit</Link> */}
                </div>
            </div>
        </li>)
    }
</ul>

}
