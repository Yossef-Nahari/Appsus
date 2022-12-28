
export function EmailPreview({ email }) {

    return < tr className="emails-table-row" key={email.id} >
        <td><button><span className="material-symbols-outlined">
            check_box_outline_blank
        </span></button></td>
        <td><button><span className="material-symbols-outlined">
            star
        </span></button></td>
        <td><button><span className="material-symbols-outlined">
            label_important
        </span></button></td>
        <td>{email.from}</td>
        <td>{email.subject}</td>
        <td>{email.body}</td>
        <td>{email.sentAt}</td>
    </tr >
}