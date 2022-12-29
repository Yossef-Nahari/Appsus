import { mailService } from '../services/mail.service.js'

export function EmailPreview({ email, setIsEmailOpen, setMailToOpen, loadEmails }) {

    function updateStaredStatus(email, event) {
        email = { ...email, isStared: !email.isStared }
        event.target.className = email.isStared ? 'material-symbols-outlined' : 'material-symbols-outlined stared-btn'
        mailService.save(email)
        loadEmails()
    }

    return <tr onClick={() => setMailToOpen(email)} className="emails-table-row" key={email.id} >
        <td className="td-email-table"><button className="btn-mail raw-gmail-icons"><span className="material-symbols-outlined">
            check_box_outline_blank
        </span></button></td>
        <td className="td-email-table" onClick={(event) => { updateStaredStatus(email, event) }}><button className="btn-mail raw-gmail-icons"><span className="material-symbols-outlined">
            star
        </span></button></td>
        <td className="td-email-table"><button className="btn-mail raw-gmail-icons"><span className="material-symbols-outlined">
            label_important
        </span></button></td>
        <td onClick={() => setIsEmailOpen(true)} className="td-email-table">{email.from === 'Jhon@gmail.com' ? email.to : email.from}</td>
        <td onClick={() => setIsEmailOpen(true)} className="td-email-table">{email.subject} - <span className="mail-body">{email.body}</span></td>
        <td onClick={() => setIsEmailOpen(true)} className="td-email-table">{email.from === 'Jhon@gmail.com' ? email.sentAt : email.recievedAt}</td>
    </tr >
}