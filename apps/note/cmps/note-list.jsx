const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx";

import { Dropdown } from "./dropDown.jsx";
import { AddImg } from "./add-img.jsx";


export function NoteList({notes, onRemoveNote, onChangeStyle, onSaveNote}) {

    function showImg(file, noteId) {
        const note=notes.find(note=> note.id===noteId)
        note.info.src=file
        onSaveNote(note)
    }
    

    return <ul className="noteList ">
    {
        notes.map(note => <li style={{ backgroundColor: note.style.bgc }} key={note.id}>
            <div className="notePresent">
                <NotePreview note={note} />
                <div className="optBtnNote">
                        <div className="edidNoteBtn flex justify-content align-center">
                            <span onClick={()=> onRemoveNote(note.id)} className="material-symbols-outlined">
                                delete
                            </span>
                            
                            <span className="material-symbols-outlined">
                                person_add
                            </span>

                            <Dropdown onChangeStyle={onChangeStyle} noteId={note.id}/>

                            <AddImg showImg={showImg} noteId={note.id}/>

                            {/* <span className="material-symbols-outlined">
                                archive
                            </span>
                            <span className="material-symbols-outlined">
                                more_vert
                            </span> */}
                                              
                        </div>
                </div>
            </div>
        </li>)
    }
    
</ul>
}



