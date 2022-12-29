const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js'

import { EmailList } from '../cmps/mail-list.jsx'
import { EmailCompose } from '../cmps/mail-compose.jsx'
import { EmailOpen } from '../cmps/mail-open.jsx'


export function MailIndex() {

    const [emails, setEmails] = useState([])
    const [filterBy, setFilterBy] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [searchList, setSearchList] = useState([])
    const [isNewEmail, setIsNewEmail] = useState(false)
    const [isEmailOpen, setIsEmailOpen] = useState(false)
    const [mailToOpen, setMailToOpen] = useState('')

    useEffect(() => {
        console.log('render')
        loadEmails()
    }, [filterBy])

    function loadEmails() {
        mailService.query(filterBy)
            .then((emails) => {
                setEmails(emails)
                setIsLoading(false)
            })
    }

    function onSetFilter(filterBy, isTxt) {
        let criteria = {
            status: '',
            txt: '',
            isRead: '',
            isStared: '',
            lables: []
        }
        if (filterBy === 'inbox' || filterBy === 'sent' || filterBy === 'trash' || filterBy === 'draft' || filterBy === 'spam') {
            criteria = { ...criteria, status: filterBy }
        }
        if (filterBy === 'isStared') criteria = { ...criteria, isStared: true }
        if (isTxt) criteria = { ...criteria, txt: filterBy }
        setFilterBy({ criteria })
    }

    function onSearchEmail(ev) {
        console.log(ev)
        const searchValue = ev.target.value
        if (ev.key === 'Enter') {
            setSearchList([...searchList, searchValue])
            onSetFilter(searchValue, true)
            ev.target.value = ''
        }
    }

    function dataListPreview() {
        return searchList.map((searchKey) => <option key={searchKey}>{searchKey}</option>)
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
                        list="mail-serach-box"
                        placeholder="Search mail"
                        onKeyUp={onSearchEmail}
                    />
                    <datalist id='mail-serach-box'>
                        {searchList && dataListPreview()}
                    </datalist>
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
                <button onClick={() => setIsNewEmail(true)} className="btn-mail btn-edit-google" title='New email'><span className="material-symbols-outlined">
                    edit
                </span></button>
                <ul className='mail-main-left-area-side-menu side-menu'>
                    <li onClick={() => { onSetFilter('inbox'), setIsEmailOpen(false) }} className="li-mail-left-side" title='Inbox'><span className="material-symbols-outlined">
                        inbox
                    </span>{isOpen && 'Inbox'}</li>
                    <li onClick={() => { onSetFilter('sent'), setIsEmailOpen(false) }} className="li-mail-left-side" title='Sent'><span className="material-symbols-outlined">
                        send
                    </span>{isOpen && 'Sent'}</li>
                    <li onClick={() => { onSetFilter('draft'), setIsEmailOpen(false) }} className="li-mail-left-side" title='Draft'><span className="material-symbols-outlined">
                        draft
                    </span>{isOpen && 'Draft'}</li>
                    <li onClick={() => { onSetFilter('isStared'), setIsEmailOpen(false) }} className="li-mail-left-side" title='Stared'><span className="material-symbols-outlined">
                        star
                    </span>{isOpen && 'Stared'}</li>
                    <li onClick={() => { onSetFilter('spam'), setIsEmailOpen(false) }} className="li-mail-left-side" title='Spam'><span className="material-symbols-outlined">
                        report
                    </span>{isOpen && 'Spam'}</li>
                    <li onClick={() => { onSetFilter('trash'), setIsEmailOpen(false) }} className="li-mail-left-side" title='Trash'><span className="material-symbols-outlined">
                        delete
                    </span>{isOpen && 'trash'}</li>
                    <li onClick={() => { onSetFilter(''), setIsEmailOpen(false) }} className="li-mail-left-side" title='All emails'><span className="material-symbols-outlined">
                        all_inbox
                    </span>{isOpen && 'All Maill'}</li>
                </ul>
            </div>

            <div className="mail-main-center-area">

                <div className="mail-main-action-nav">
                    mail main action nav
                </div>

                <div className="mail-main-emails-table">
                    {!isLoading && !isEmailOpen && <EmailList emails={emails} setIsEmailOpen={setIsEmailOpen} setMailToOpen={setMailToOpen} loadEmails={loadEmails} />}
                    {isEmailOpen && <EmailOpen mailToOpen={mailToOpen} />}
                    {isLoading && <div>Loading..</div>}
                    {!emails.length && <div>No emails to show..</div>}
                </div>

            </div>

            <div className="mail-main-right-area">
                <ul className='mail-main-right-area-side-menu side-menu'>
                    <li onClick={() => location.href = "https://calendar.google.com/calendar/u/0/r?pli=1"} className='right-google-ul' title='Google calendar'><button className="btn-mail btn-li-right-mail" type="submit"><img src="../../../assets/img/google-calendar-icon.svg" alt="Submit" /></button></li>
                    <li onClick={() => location.href = ""} className='right-google-ul'><button className="btn-mail btn-li-right-mail" type="submit" title='Google keep'><img src="../../../assets/img/google-keep-icon.svg" alt="Submit" /></button></li>
                    <li onClick={() => location.href = "https://tasksboard.com/"} className='right-google-ul' title='Google tasks'><button className="btn-mail btn-li-right-mail" type="submit"><img src="../../../assets/img/google-tasks-icon.png" alt="Submit" /></button></li>
                    <li onClick={() => location.href = "https://contacts.google.com/"} className='right-google-ul' title='Google contacts'><button className="btn-mail btn-li-right-mail" type="submit"><img src="../../../assets/img/google-contacts-icon.png" alt="Submit" /></button></li>
                </ul>
            </div>

            {isNewEmail && <EmailCompose SetIsNewEmail={setIsNewEmail} loadEmails={loadEmails} />}

        </div>

    </section >
}
