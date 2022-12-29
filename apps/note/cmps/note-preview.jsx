const {Link } = ReactRouterDOM

// const navigate = useNavigate();


export function NotePreview({ note }) {

    // return <article className="noteTxts" onClick={()=>navigate(`/not${note.id}`)}>
    return <article className="noteTxts">
        <Link to={`/note/${note.id}`}>
        <h2 className="txtTitle" onClick={()=>console.log('who me event:', note.id)}>{note.info.title}</h2>
        <pre className="txtBody">{note.info.txt}</pre>
        </Link>
    </article>
}