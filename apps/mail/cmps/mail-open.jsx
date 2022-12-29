

export function EmailOpen({ mailToOpen }) {

    return <section className="email-open">
        <div className="email-open-header">
            <h2 className="email-subject-heading">{mailToOpen.subject}</h2>
            <button className="material-symbols-outlined email"><span class="material-symbols-outlined">
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
                <button className="material-symbols-outlined email"><span class="material-symbols-outlined">
                    star
                </span></button>
                <button className="material-symbols-outlined email"><span class="material-symbols-outlined">
                    reply
                </span></button>
                <button className="material-symbols-outlined email"><span class="material-symbols-outlined">
                    delete
                </span></button>
            </div>
        </div>
        <div className="email-open-body">{mailToOpen.body}</div>
        <button className="email-open-button">↰ Reply</button>
    </ section>
}