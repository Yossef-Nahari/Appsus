const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js'

import { EmailList } from '../cmps/mail-list.jsx'

export function MailIndex() {

    const [emails, setEmails] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        loadEmails()
    }, [])

    function loadEmails() {
        mailService.query()
            .then((emails) => {
                setEmails(emails)
                setIsLoading(false)
            })
    }

    return <section className="mail-index full main-layout">

        <div className="mail-header full main-layout">

            <div className="mail-header-left-area">
                <button className="btn-mail menu-btn"><span className="material-symbols-outlined">
                    menu
                </span></button>
                <button className="btn-mail" type="submit"><img className="img-gmail" src="../../../assets/img/gmail.png" alt="Submit" /></button>
                <h1 className='gmail-caption'>Gmail</h1>
            </div>

            <div className="mail-header-center-area">
                <form className="mail-header-search-form" onSubmit={console.log('search-form')}>
                    <button className="btn-mail"><span className="material-symbols-outlined">
                        search
                    </span></button>
                    <input className="mail-search-box" type="text"
                        id="mail-serach-box"
                        placeholder="Search mail"
                    // value={}
                    // onChange={handlePriceChange} 
                    />
                </form>
            </div>

            <div className="mail-header-right-area">
                <button className="btn-mail"><span className="material-symbols-outlined">
                    help
                </span></button>
                <button className="btn-mail"><span className="material-symbols-outlined">
                    settings
                </span></button>
                <button className="btn-mail"><span className="material-symbols-outlined">
                    apps
                </span></button>
                <img className='mail-img' src="../../../assets/img/mail-user.png" alt="" />
            </div>

        </div>

        <div className="mail-main full main-layout">

            <div className="mail-main-left-area">
                <button className="btn-mail"><span className="material-symbols-outlined">
                    edit
                </span></button>
                <ul className='mail-main-left-area-side-menu side-menu'>
                    <li className="li-mail-left-side"><span className="material-symbols-outlined">
                        inbox
                    </span>{isOpen && 'Inbox'}</li>
                    <li className="li-mail-left-side"><span className="material-symbols-outlined">
                        send
                    </span>{isOpen && 'Sent'}</li>
                    <li className="li-mail-left-side"><span className="material-symbols-outlined">
                        draft
                    </span>{isOpen && 'Draft'}</li>
                    <li className="li-mail-left-side"><span className="material-symbols-outlined">
                        star
                    </span>{isOpen && 'Stared'}</li>
                    <li className="li-mail-left-side"><span className="material-symbols-outlined">
                        report
                    </span>{isOpen && 'Spam'}</li>
                    <li className="li-mail-left-side"><span className="material-symbols-outlined">
                        delete
                    </span>{isOpen && 'Trash'}</li>
                    <li className="li-mail-left-side"><span className="material-symbols-outlined">
                        all_inbox
                    </span>{isOpen && 'All Maill'}</li>
                </ul>
            </div>

            <div className="mail-main-center-area">

                <div className="mail-main-action-nav">
                    mail main action nav
                </div>

                <div className="mail-main-emails-table">
                    {!isLoading && <EmailList emails={emails} />}
                    {isLoading && <div>Loading..</div>}
                    {!emails.length && <div>No emails to show..</div>}
                </div>

            </div>

            <div className="mail-main-right-area">
                <ul className='mail-main-right-area-side-menu side-menu'>
                    <li className='right-google-ul'><button className="btn-mail btn-li-right-mail" type="submit"><img src="../../../assets/img/google-calendar-icon.svg" alt="Submit" /></button></li>
                    <li className='right-google-ul'><button className="btn-mail btn-li-right-mail" type="submit"><img src="../../../assets/img/google-keep-icon.svg" alt="Submit" /></button></li>
                    <li className='right-google-ul'><button className="btn-mail btn-li-right-mail" type="submit"><img src="../../../assets/img/google-tasks-icon.png" alt="Submit" /></button></li>
                    <li className='right-google-ul'><button className="btn-mail btn-li-right-mail" type="submit"><img src="../../../assets/img/google-contacts-icon.png" alt="Submit" /></button></li>
                </ul>
            </div>

        </div>

    </section>
}
