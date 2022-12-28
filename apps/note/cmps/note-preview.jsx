

export function NotePreview({ note }) {

    return <article className="notePreview">
        <h2 className="txtTitle" onClick={()=>console.log('who me event:', note.id)}>{note.info.title}</h2>
        <pre className="txtBody">{note.info.txt}</pre>
    </article>
}