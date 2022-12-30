import { asyncStorageService as storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"


const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    changeStyle

}



function query(filterBy = getDefaultFilter()) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                // search by title and txt
                notes = notes.filter(note => regex.test(note.info.txt) ||
                    regex.test(note.info.title))
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}



function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }

}


function getEmptyNote(type = '', isPinnd = true, info = { txt: '', title: '' }, style = { bgc: '', font: '', fontSize: '' }) {
    return { type, isPinnd, info, style }
}

function getDefaultFilter() {
    return { txt: '' }
}

function changeStyle(noteId, field,style){
    return get(noteId).then((note)=>showmy(note))

  function showmy(note){
    note.style[field]=style
    const editStyle=note
    return save(editStyle)
  }
  
  
        
    
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.push(_createNote('note-txt', true, { txt: 'First msg', title: 'First title' }))
        notes.push(_createNote('note-txt', false, { txt: 'Second msg', title: 'Second title' }))
        notes.push(_createNote('note-txt', true, { txt: 'Third msg', title: 'Third title' }))
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(type, isPinnd, info) {
    const note = getEmptyNote(type, isPinnd, info)
    note.info.createdAt = Date.now(),
        note.info.lastUpdate = Date.now(),
        note.id = utilService.makeId(4)
    return note
}