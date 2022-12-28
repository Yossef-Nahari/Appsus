const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js"


export  function NoteFilter({onSetFilter}) {

    const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFilter())
    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit.txt='')
    }
    return <section className="note-filter full main-layout">
        <h2>Search</h2>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="txtFilter"></label>
            <input type="text"
                id="txtFilter"
                name="txt"
                placeholder="Insert"
                autoCorrect="off"
                autoComplete="off"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />

            <button>X</button>
        </form>
    </section>
}
