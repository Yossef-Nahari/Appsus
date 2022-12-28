
export function NotePreview({ note }) {

    return <article className="notePreview">
        <h2>{note.info.title}</h2>
        <h3>{note.info.txt}</h3>
    </article>
}