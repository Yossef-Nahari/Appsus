const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js'
import { showSuccessMsg } from "../../../services/event-bus.service.js"

export function EmailCompose({ SetIsNewEmail, loadEmails }) {

    const [mailToSend, setMailToSend] = useState(mailService.getEmptyToSendMail())

    function handleChange({ target }) {
        let { value, name: field } = target
        setMailToSend((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function onSendMail(ev) {
        ev.preventDefault()
        mailService.sent(mailToSend).then((mail) => {
            console.log('mail sent', mail);
            showSuccessMsg('mail sent!')
            SetIsNewEmail(false)
            loadEmails()
        })
    }

    function onExitComposeModal() {
        const mailToDraft = { ...mailToSend, status: 'draft', from: '' }
        mailService.sent(mailToDraft, true)
        SetIsNewEmail(false)
    }

    return <section className="mail-compose">
        <header className='compose-header'>
            <h3 className='compose-heading'>New Message</h3>
            <button className='x-button' onClick={onExitComposeModal}>x</button>
        </header>
        <main>
            <form className="mail-new-form" onSubmit={onSendMail}>
                <input className="form-input" type="text"
                    name="to"
                    id="to"
                    placeholder="Recipients"
                    // value={bookToEdit.title}
                    onChange={handleChange}
                />
                <input className="form-input" type="text"
                    name="subject"
                    id="subject"
                    placeholder="subject"
                    // value={bookToEdit.subtitle}
                    onChange={handleChange}
                />
                <input className="form-input" type="text"
                    name="body"
                    id="body"
                    // value={bookToEdit.authors}
                    onChange={handleChange}
                />
                <button className='btn-send'>Send</button>
            </form>
        </main>
    </section>
}