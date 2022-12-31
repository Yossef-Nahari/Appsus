const {Link } = ReactRouterDOM

export function NotePreview({ note }) {
    return <article className="noteTxts">
        <div className="content">
            {note.info.src && <img className="noteImg"
            src= {note.info.src}
            alt="img"
            />}
            <Link to={`/note/${note.id}`}>
            <h2 className="txtTitle" onClick={()=>console.log('who me event:', note.id)}>{note.info.title}</h2>
            <pre className="txtBody">{note.info.txt}</pre>
            </Link>
        </div>
    </article>
}


