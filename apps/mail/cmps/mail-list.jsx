import { EmailPreview } from './mail-preview.jsx'

export function EmailList({ emails, setIsEmailOpen, setMailToOpen, loadEmails }) {

    return <table className="emails-table-list">
        <tbody>
            {emails.map(email =>

                <EmailPreview email={email} setIsEmailOpen={setIsEmailOpen} setMailToOpen={setMailToOpen} loadEmails={loadEmails} key={email.id} />
            )}
        </tbody>
    </table>

}
