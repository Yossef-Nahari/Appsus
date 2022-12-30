const { useState, useEffect, useRef} = React


const colorsOption=[
    {color:"green"},
    {color:"blue"},
    {color:"pink"},
    {color:"yellow"},
    {color:"orange"},
]

export function Dropdown({onChangeStyle, noteId}){

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    useOutsideAlerter(dropdownRef)

    

    function useOutsideAlerter(ref) {
        useEffect(() => {
          function handleClickOutside(event) {
              if (ref.current && !ref.current.contains(event.target)) {
                setIsActive(false)

            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside)
             
            
          };
        
        }, [ref]);
      }



      function setImportceColor(color, name){
        onChangeStyle(color, name, noteId)
        

      }
    return <button  ref={dropdownRef} className="btn-container" onClick={()=>{setIsActive(true)}}>

    <span className="material-symbols-outlined">
        palette
    </span>
       {isActive && <nav className={`menu ${isActive ? 'active' : 'inactive'}`}>
            <ul>
           { colorsOption.map(color =><li key={color.color} onClick={()=>setImportceColor(color.color, "bgc")} style={{ backgroundColor: color.color}}></li> )}
                
            </ul>
        </nav>} 

</button>
    
}