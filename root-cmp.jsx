const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { NoteEdit } from "./apps/note/cmps/edit-note.jsx"

import { UserMsg } from './cmps/user-msg.jsx'

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            {/* <main> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                {/* email service
                            a: defult model (empty)
                            b: demo data (3 emails) start with single caritira
                            c: basic user (hard code)
                            d: create query funcation with caritira (filter)
                            e: curdel
                            */}
                {/* email app (index)
                                a: load email data*
                                b: filter by filterby */}
                {/* email-list *
                                a: Renders a list of <email-preview> pass down an email <prop></prop>*/}
                {/* email privew *
                                    a: Present an email preview
                                    b:  Renders the subject (with text size limit)
                                    c:  Gives visual indication for read/unread
                                    d:  Support hover state */}
                {/* email details
                                        a: Routable component (page)
                                        b: Show the entire email
                                        c: Allow deleting an email (using the service)
                                        d: Allow navigating back to list*/}
                {/* email-filter
                                    a: Allow filtering
                                    b: Start with Search and Read / Unread*/}
                {/* email-folder-list
                                    a: Allow filtering by different folders: inbox / sent / trash/ draft */}
                {/* email-compose
                                    a: Has a form with: to, subject and body
                                    b: Use the service to send an email (add email to the list)*/}
                <Route element={<NoteIndex />} path="/note"  >
                    {/* <Route path="/note/edit" element={<NoteEdit />} /> */}
                    <Route element={<NoteEdit />} path="/note/:noteId"  />
                </Route>
                {/* note service
                                -defuale model
                              V  a: demo data (3 nots) only text
                                b: add note
                                c:remove note
                                d: edit note
                                e: defualt filter
                                */}
                {/* note index */}
                {/* note list */}
                {/* note preview
                                        a: show note
                                        b: edit note:
                                        --*** text
                                        *title
                                        -color
                                        -type
                                        -pin
                                        -send to email
                                        */}
                {/* note filter */}
            </Routes>
            {/* </main> */}

            {/* <UserMsg /> */}
        </section>
    </Router>
}