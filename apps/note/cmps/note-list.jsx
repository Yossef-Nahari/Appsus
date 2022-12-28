const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx";


export function NoteList({notes, onRemoveNote}) {
    

    return <ul className="noteList ">
    {
        notes.map(note => <li key={note.id}>
            <NotePreview note={note} />
            <div className="optBtnNote">
                <button onClick={() => onRemoveNote(note.id)}>Remove</button>
                {/* <Link to={`/note/${note.id}`}>Details</Link> |  */}
                <Link to={`/note/edit/${note.id}`}> Edit</Link>
            </div>
        </li>)
    }
</ul>

}
