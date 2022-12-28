const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js'

import { EmailList } from '../cmps/mail-list.jsx'

export function MailIndex() {

    const [emails, setEmails] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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
                <button><span className="material-symbols-outlined">
                    menu
                </span></button>
                <button type="submit"><img src="../../../assets/img/gmail.png" alt="Submit" /></button>
                <h1>Gmail</h1>
            </div>

            <div className="mail-header-center-area">
                <form className="mail-header-search-form" onSubmit={console.log('search-form')}>
                    <button><span className="material-symbols-outlined">
                        search
                    </span></button>
                    <input className="mail-serach-box" type="text"
                        id="mail-serach-box"
                        placeholder="Search mail"
                    // value={}
                    // onChange={handlePriceChange} 
                    />
                </form>
            </div>

            <div className="mail-header-right-area">
                <button><span className="material-symbols-outlined">
                    help
                </span></button>
                <span className="material-symbols-outlined">
                    settings
                </span>
                <button><span className="material-symbols-outlined">
                    apps
                </span></button>
                <img src="../../../assets/img/mail-user.png" alt="" />
            </div>

        </div>

        <div className="mail-main full main-layout">

            <div className="mail-main-left-area">
                <button><span class="material-symbols-outlined">
                    edit
                </span></button>
                <ul className='mail-main-left-area-side-menu'>
                    // To-do: create side-menu.map for li
                    <li><span class="material-symbols-outlined">
                        inbox
                    </span>Inbox</li>
                    <li><span class="material-symbols-outlined">
                        send
                    </span>Sent</li>
                    <li><span class="material-symbols-outlined">
                        draft
                    </span>Draft</li>
                    <li><span class="material-symbols-outlined">
                        star
                    </span>Stared</li>
                    <li><span class="material-symbols-outlined">
                        report
                    </span>Spam</li>
                    <li><span class="material-symbols-outlined">
                        delete
                    </span>Trash</li>
                    <li><span class="material-symbols-outlined">
                        all_inbox
                    </span>All Mail</li>
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
                <ul className='mail-main-right-area-side-menu'>
                    <li><button type="submit"><img src="../../../assets/img/google-calendar-icon.svg" alt="Submit" /></button></li>
                    <li><button type="submit"><img src="../../../assets/img/google-keep-icon.svg" alt="Submit" /></button></li>
                    <li><button type="submit"><img src="../../../assets/img/google-tasks-icon.png" alt="Submit" /></button></li>
                    <li><button type="submit"><img src="../../../assets/img/google-contacts-icon.png" alt="Submit" /></button></li>
                </ul>
            </div>

        </div>

    </section>
}
