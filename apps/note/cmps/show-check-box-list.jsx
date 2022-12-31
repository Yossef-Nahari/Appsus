const { useState, useEffect, useRef} = React

import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

import { AddCheckBox } from "./add-check-box.jsx"


export function ShowCheckListItem({noteToEdit}){

    
    const [checkList, setCheckList]=useState([])
    const [taskNumber, setTaskNumber]=useState('')
    
    
    useEffect (()=> {


    },[taskNumber])



    const handleCheck = (event) => {
        let updatedList = [...checked]
        if (event.target.checked) {
            updatedList = [...checked, event.target.value]
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1)
            console.log('updatedList:',updatedList )
        }
        setChecked(updatedList)
      }

    function onAddingItem(item){
        let show=noteService.getEmptyCheckBox()
        show.id=utilService.makeId(5)
        show.text=show.id
        console.log('checkList.length:', checkList.length)
        if (!checkList.length ) {setCheckList([show])
        }else{
            setCheckList((prevTaskList)=> [...prevTaskList, show.id])
        }
    }

    console.log('taskNumber:', taskNumber)

    return  (
        <section>
            <div className="checkList">
                <div className="title">Your CheckList:</div>
                    <div className="list-container">
                        {checkList.map(({id, done, text ,index}) => (
                           <div key ={id}>
                                <span onClick={()=>setTaskNumber(id)}>{text}</span>
                            </div>
                        ))}
                    </div>
            </div>
        <div>
            Items checked are:
        </div>
        {/* <div className="list-container">
                {checked.map((item, index) => ( 
                   <div key={index}>
                    <input value={item} type="checkbox"  onChange={handleCheck}/>
                     <span className={isChecked(item)}>{item}</span>
                                                
                    </div>

                ))} 
        </div> */}
            <AddCheckBox onAddingItem={onAddingItem} />
        </section>        
        
        )

        
    }