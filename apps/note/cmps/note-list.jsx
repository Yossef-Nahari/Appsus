const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx";

import { Dropdown } from "./dropDown.jsx";


export function NoteList({notes, onRemoveNote, onChangeStyle}) {


    

    return <ul className="noteList ">
    {
        notes.map(note => <li style={{ backgroundColor: note.style.bgc }} key={note.id}>
            <div className="notePresent">
                <NotePreview note={note} />
                <div className="optBtnNote">
                        <div className="edidNoteBtn flex justify-content align-center">
                            <span className="material-symbols-outlined">
                                add_alert
                            </span>
                            
                            <span className="material-symbols-outlined">
                                person_add
                            </span>

                            <Dropdown onChangeStyle={onChangeStyle} noteId={note.id}/>

                            {/* </button> */}
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
                </div>
            </div>
        </li>)
    }
</ul>
}



