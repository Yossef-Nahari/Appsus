const { Route, Routes, Link } = ReactRouterDOM
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
            {/* <AppHeader /> */}
            {/* <main> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />

                <Route element={<NoteIndex />} path="/note"  >
                    <Route element={<NoteEdit />} path="/note/:noteId"  />
                </Route>
             
            </Routes>
          
           
        </section>
    </Router>
}