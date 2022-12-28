
export function EmailPreview(email) {

    const date = new Date(email.sentAt)

    return <tr className="emails-table-row">
        <td><button><span class="material-symbols-outlined">
            check_box_outline_blank
        </span></button></td>
        <td><button><span class="material-symbols-outlined">
            star
        </span></button></td>
        <td><button><span class="material-symbols-outlined">
            label_important
        </span></button></td>
        <td>{email.from}</td>
        <td>{email.subject}</td>
        <td>{email.body}</td>
        <td>{date.toString}</td>
    </tr>
}