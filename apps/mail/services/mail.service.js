import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

const MAIL_KEY = 'mailDB'

_createEmails()

export const mailService = {
    query
}

function query() {
    return storageService.query(MAIL_KEY)
        .then(emails => {
            return emails
        })
}

function _createEmails() {
    let emails = utilService.loadFromStorage(MAIL_KEY)
    if (!emails || !emails.length) {
        emails = _createDemoEmails
        utilService.post(MAIL_KEY, emails)
    }
}

function _createDemoEmails() {
    return demoEmails
}

const demoEmails = [{
    id: utilService.makeId(),
    subject: 'Tel Aviv white night invitation',
    body: 'Dear Jhon, We would like to invite you to the best night ever!',
    isRead: false,
    isTrash: false,
    isStared: false,
    sentAt: 1551133930800,
    to: 'Jhon@gmail.com',
    from: 'TelAviv@gmail.com',
    labels: ['personal']
},
{
    id: utilService.makeId(),
    subject: 'Electricity bill',
    body: 'Dear Jhon, attached your monthly electricity bill to pay, please reply.',
    isRead: false,
    isTrash: false,
    isStared: true,
    sentAt: 1551133930700,
    to: 'Jhon@gmail.com',
    from: 'Electricity-corp@org.com',
    labels: ['important', 'personal']
},
{
    id: utilService.makeId(),
    subject: 'Ebay order confirm and receipt',
    body: 'Dear Jhon, your order from Ebay has been successfully received!',
    isRead: true,
    isTrash: false,
    isStared: false,
    sentAt: 1551133930600,
    to: 'Jhon@gmail.com',
    from: 'Ebay@ebay.com',
    labels: ['personal']
}]

