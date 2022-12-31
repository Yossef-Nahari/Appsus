import { mailService } from '../services/mail.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'

export function EmailOpen({ mailToOpen, loadEmails, setIsEmailOpen, onSetFilter, setIsNewEmail, setIsReply }) {

    function updateStaredStatus(email, event) {
        email = { ...email, isStared: !email.isStared }
        event.target.classList.toggle('stared-btn')
        mailService.save(email)
        loadEmails()
    }

    function mailToTrash(email) {
        if (!email.status === 'trash') {
            email = { ...email, status: 'trash' }
            mailService.save(email)
            onSetFilter('trash')
        } else {
            asyncStorageService.remove('mailDB', email.id)
            onSetFilter('inbox')
        }
        setIsEmailOpen(false)
        loadEmails()
    }

    function mailReply() {
        setIsReply(true)
        setIsNewEmail(true)
    }

    return <section className="email-open">
        <div className="email-open-header">
            <h2 className="email-subject-heading">{mailToOpen.subject}</h2>
            <button onClick={() => window.print()} className="material-symbols-outlined email"><span className="material-symbols-outlined">
                print
            </span></button>
        </div>
        <div className="email-open-nav">
            <div className="user-from">
                <img className="email-user" src="././assets/img/email-user.png" alt="" />
                <h3 className="">{mailToOpen.from}</h3>
            </div>
            <div className="icons-nav">
                <h3 className="h3-email-open">{mailToOpen.recievedAt}</h3>
                <button onClick={(event) => { updateStaredStatus(mailToOpen, event) }} className="material-symbols-outlined email"><span className="material-symbols-outlined">
                    star
                </span></button>
                <button onClick={mailReply} className="material-symbols-outlined email"><span className="material-symbols-outlined">
                    reply
                </span></button>
                <button onClick={() => { mailToTrash(mailToOpen) }} className="material-symbols-outlined email"><span className="material-symbols-outlined">
                    delete
                </span></button>
            </div>
        </div>
        <div className="email-open-body">{mailToOpen.body}</div>
        <button onClick={mailReply} className="email-open-button">↰ Reply</button>
    </ section >
}