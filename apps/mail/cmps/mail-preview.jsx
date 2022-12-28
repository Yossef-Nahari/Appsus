
export function EmailPreview({ email }) {

    return <tr className="emails-table-row" key={email.id} >
        <td className="td-email-table"><button className="btn-mail raw-gmail-icons"><span className="material-symbols-outlined">
            check_box_outline_blank
        </span></button></td>
        <td className="td-email-table"><button className="btn-mail raw-gmail-icons"><span className="material-symbols-outlined">
            star
        </span></button></td>
        <td className="td-email-table"><button className="btn-mail raw-gmail-icons"><span className="material-symbols-outlined">
            label_important
        </span></button></td>
        <td className="td-email-table">{email.from}</td>
        <td className="td-email-table">{email.subject} - <span className="mail-body">{email.body}</span></td>
        <td className="td-email-table">{email.sentAt}</td>
    </tr >
}