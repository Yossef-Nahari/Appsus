import { EmailPreview } from './mail-preview.jsx'

export function EmailList({ emails }) {

    return <table className="emails-table-list">
        <tbody>
            {emails.map(email =>
                <EmailPreview email={email} key={email.id} />
            )}
        </tbody>
    </table>

}
