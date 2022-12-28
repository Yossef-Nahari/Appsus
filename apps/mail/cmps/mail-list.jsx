import { EmailPreview } from './mail-preview.jsx'

export function EmailList(emails) {

    return <table className="emails-table-list">
        {emails.map(email =>
            <EmailPreview email={email} />
        )}
    </table>

}
