const { useState, useEffect, useRef} = React


export function AddCheckBox({onAddingItem}){

    return (
        <section>
            <button className="btn" onClick={()=>onAddingItem()}>
                <input type="text" placeholder="+ Add item.."  />
            </button>

            
</section>        
        

    //      <hr />
    //         + <input type="text" placeholder="Insert item" onChange={()=>insertItem()} />
    // </div>
    )
    
}