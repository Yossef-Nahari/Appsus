const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"


export function GoogleHeader({onSetFilter}) {

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
        ev.preventDefault()
        onSetFilter(filterByToEdit.txt='')
    }

    return <section className="googleHeader">
        <nav>
            <div className="log-area">
                <div className="tooltip">
                    <Link to="/">
                    <span className="material-symbols-outlined menuBar">menu</span> 
                    </Link>
                    <span className="tooltip-text">Main Menu</span>
                        
                </div>
                    <img
                        className="gb_uc gb_7d"
                        aria-hidden="true"
                        alt="Keep"
                        title="keep"
                        src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                    />
                    <span className="logo-text">Keep</span>
                {/* </div> */}
            </div>


            <div className="search-area">
                <div className="tooltip">
                    <span className="material-symbols-outlined">search</span>
                    <span className="tooltip-text">Serach</span>
                </div>
                <input type="text" 
                placeholder="Search" 
                id="txtFilter"
                name="txt"
                autoCorrect="off"
                autoComplete="off"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
                /> 
                <span className="material-symbols-outlined closeOps" onClick={()=>onSetFilter(filterByToEdit.txt='')}>close</span>
                <span className="tooltip-text">Close</span>
                </div>  
            <div className="settings-area">
                <div className="tooltip">
                    <span className="material-symbols-outlined">refresh</span>
                    <span className="tooltip-text">refresh</span>

                </div>
                <div className="tooltip">
                    <span className="material-symbols-outlined">settings</span>
                    <span className="tooltip-text">apps</span>
                </div>
                <div className="tooltip">
                    <span className="material-symbols-outlined">view_agenda</span>
                    <span className="tooltip-text">List View</span>
                </div>
            </div>
            <div className="profile-actions-area">
                <div className="tooltip profile">
                    <span className="  profile material-symbols-outlined">apps</span>
                    <span className="  profile tooltip-text">apps</span>
                </div>
                <div className="tooltip">
                    <span className="material-symbols-outlined ">account_circle</span> 
                    <span className="tooltip-text ">Account</span>
                </div>
            </div>
        </nav>

    </section>

}