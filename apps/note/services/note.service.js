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
    changeStyle,
    getEmptyCheckBox

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


function getEmptyNote(type = 'note', isPinnd = true, info = { txt: '', title: '' ,src:"", task:[]}, style = { bgc: '', font: '', fontSize: '' }) {
    return { type, isPinnd, info, style }
}
function getEmptyCheckBox(id="", done=false, text='') {
    return { id, done, text }
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
        notes.push(_createNote('note-txt', true, 
        { txt: "chack in say scanner", title: "Book flight to NYC",
            img:'' }, 
            {bgc:"#b142c7",
            font:'',
            fontSize:''}))
        notes.push(_createNote('note-txt', true, 
        { txt: " sort the bulting issue", title: "Call a meeting",
            img:'' }, 
            {bgc:"#1b851b",
            font:'',
            fontSize:''}))
        notes.push(_createNote('note-txt', true, 
        { 
            title: "Life are advencher",
            txt: "In the last few years we seen the biggest change in humen life rock are flying everywhere. rain make us drowing and we are going head by hand", 
            src:'' }, 
            {bgc:"#f2f5f0",
            font:'',
            fontSize:''}))
        notes.push(_createNote('note-txt', true, 
        { txt: "", title: "Make sure to take the keys",
            src:'https://cdn.w600.comps.canstockphoto.com/handing-over-the-key-stock-photos_csp0140063.jpg'}, 
            {bgc:"#f2f5f0",
            font:'',
            fontSize:''}))
        notes.push(_createNote('note-txt', true, 
        { txt: "by the 16.2", title: "Make invitation for valentine day week",
            src:'https://www.grace.edu/wp-content/uploads/2020/02/Valentines-Day-Blog-P00290-2-1536x1024.jpg'}, 
            {bgc:"#73d126",
            font:'',
            fontSize:''}))
        notes.push(_createNote('note-txt', true, 
        { txt: "leguend", title: "His birthday",
            src:'https://media.gettyimages.com/id/79024391/photo/sport-football-highbury-england-league-division-one-8th-april-1989-arsenal-2-v-everton-0.jpg?s=1024x1024&w=gi&k=20&c=psdo-IqAy0KURgMcVt8CUgszPXu976U5SAsQpw7yJag='}, 
            {bgc:"#d1268d",
            font:'',
            fontSize:''}))
        notes.push(_createNote('note-txt', true, 
        { txt: " must must must", title: "Buy tickets to the opera",
            src:'https://images.csmonitor.com/csm/2014/06/opera.jpg?alias=standard_900x600nc'}, 
            {bgc:"#d14526",
            font:'',
            fontSize:''}))
        notes.push(_createNote('note-txt', true, 
        { txt: "MaMathechet 16 TLV", title: "Take the car to fix",
            src:''}, 
            {bgc:"#d14526",
            font:'',
            fontSize:''}))
        notes.push(_createNote('note-txt', true, 
        { txt: " get head on this dog", title: "Smile even for a moment",
            src:'https://media.istockphoto.com/id/1279308976/photo/happy-dog-puppy-winking-an-eye-and-smiling-on-colored-blue-backgorund-with-closed-eyes.webp?s=612x612&w=is&k=20&c=mWEjZ5agblkVykE9BZUvmXE4rXYHj4n2h0hSqYH3JGw='}, 
            {bgc:"#d14526",
            font:'',
            fontSize:''}))
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(type, isPinnd, info, style) {
    const note = getEmptyNote(type, isPinnd, info, style)
    note.info.createdAt = Date.now(),
        note.info.lastUpdate = Date.now(),
        note.id = utilService.makeId(4)
    return note
}