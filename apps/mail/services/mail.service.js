import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

const demoEmails = [{
    id: utilService.makeId(),
    subject: 'Tel Aviv white night invitation',
    body: 'Dear Jhon, We would like to invite you to the best night ever!',
    status: 'inbox',
    isRead: false,
    isStared: false,
    recievedAt: getDateTime('155113445200'),
    to: 'Jhon@gmail.com',
    from: 'TelAviv@gmail.com',
    labels: ['personal']
},
{
    id: utilService.makeId(),
    subject: 'Electricity bill',
    body: 'Dear Jhon, attached your monthly electricity bill to pay, please reply.',
    status: 'inbox',
    isRead: false,
    isStared: true,
    recievedAt: getDateTime('1551133930700'),
    to: 'Jhon@gmail.com',
    from: 'Electricity-corp@org.com',
    labels: ['important', 'personal']
},
{
    id: utilService.makeId(),
    subject: 'Ebay order confirm and receipt',
    body: 'Dear Jhon, your order from Ebay has been successfully received!',
    status: 'trash',
    isRead: true,
    isStared: false,
    recievedAt: getDateTime('1551133930600'),
    to: 'Jhon@gmail.com',
    from: 'Ebay@ebay.com',
    labels: ['personal']
},
{
    id: utilService.makeId(),
    subject: 'Sign for newsletter',
    body: 'I would like to get your newsletter for 1 year please. Please call me back',
    status: 'sent',
    isRead: false,
    isStared: false,
    sentAt: getDateTime('1551133935420'),
    to: 'Israel-hayom@gmail.com',
    from: 'Jhon@gmail.com',
    labels: ['work']
},
{
    id: utilService.makeId(),
    subject: 'soup receipt',
    body: 'Hi dear hellen, how are you? I will love to know the receipt of your great soup...',
    status: 'draft',
    isRead: false,
    isStared: false,
    sentAt: '',
    to: '',
    from: '',
    labels: ['personal']
},
{
    id: utilService.makeId(),
    subject: 'Sale for your next vecation',
    body: 'Hi Jhon, how are you? We have a great offer to show you!!!',
    status: 'spam',
    isRead: true,
    isStared: false,
    recievedAt: getDateTime('1551133945020'),
    to: 'Jhon@gmail.com',
    from: 'el-al@el-al.com',
    labels: ['personal']
}]

_createEmails()

export const mailService = {
    query,
    getDefaultFilter,
    getEmptyToSendMail,
    sent,
    save
}

function query(filterBy) {
    if (filterBy) filterBy = filterBy.criteria
    if (!filterBy) filterBy = getDefaultFilter()
    return asyncStorageService.query(MAIL_KEY)
        .then(emails => {
            console.log('emails', emails)
            console.log('filterBy', filterBy)
            if (filterBy.status) {
                emails = emails.filter(email => email.status === filterBy.status)
            }
            if (filterBy.isStared) {
                emails = emails.filter(email => email.isStared)
            }
            if (filterBy.txt) {
                const lowerCaseFilter = filterBy.txt.toLowerCase()
                emails = emails.filter((email) => {
                    return email.subject.toLowerCase().includes(lowerCaseFilter) || email.body.toLowerCase().includes(lowerCaseFilter)
                })
            }
            return emails
        })
}

function _createEmails() {
    let emails = utilService.loadFromStorage(MAIL_KEY)
    if (!emails || !emails.length) {
        let emails = _createDemoEmails()
        storageService.saveToStorage(MAIL_KEY, emails)
    }
}

function _createDemoEmails() {
    return demoEmails
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: '',
        isStared: '',
        lables: []
    }
}

function getEmptyToSendMail() {
    return {
        id: '',
        subject: '',
        body: '',
        status: 'sent',
        isRead: false,
        isStared: false,
        sentAt: '',
        to: '',
        from: 'Jhon@gmail.com',
        labels: ['personal']
    }
}

function sent(mail, isDraft = false) {
    if (!isDraft) mail.sentAt = getDateTime()
    if (mail.id) {
        return asyncStorageService.put(MAIL_KEY, mail)
    } else {
        return asyncStorageService.post(MAIL_KEY, mail)
    }
}

function save(mail) {
    if (mail.id) {
        return asyncStorageService.put(MAIL_KEY, mail)
    } else {
        return asyncStorageService.post(MAIL_KEY, mail)
    }
}

function getDateTime(date = new Date()) {
    if (typeof date === 'string') date = new Date(+date)
    const currentDate = `${date.getDate()}-${(date.getMonth() + 1)}-${date.getFullYear()}`
    const currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return `${currentTime} ${currentDate}`

}