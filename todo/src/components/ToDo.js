import React, { useState } from "react";
import ToDoImage from "../images/ToDoImage.png";
import "../App.css"

const ToDo = () => {

  const [inputData, setInputData]  = useState("")
  const [items,setItems] =useState([])
  const [toggleSubmit, setToggleSubmit]  = useState(true)
  const [isEditItem, setIsEditItem]= useState(null)

  // Add Items -Blank inputs will not be added
  const addItem=()=>{
      if(!inputData){
        alert("You cannot add Empty Todo")

      }
      else if(inputData && !toggleSubmit){
        setItems(
          items.map((element) =>{
            if(element.id === isEditItem){
              return{...element,name:inputData}
            }
            return element
          })
        )

      }
      else{
        const allInputData ={id: new Date().getTime().toString(), name:inputData}   // destructuring -getting id and name 

        setItems([...items,allInputData])
        setInputData("")
      }
  }

  //add todo Via ENTER KEY
const handleKeyPress = (e) =>{
  if(e.key ==="Enter") {
    console.log("ToDo added by Pressing Enter");
    addItem()
  }
}



//Delete Item
const deleteItem=(index) =>{
  // console.log(id);
  const updatedItems = items.filter((element)=>{
    return index !== element.id;
  })
  setItems(updatedItems)
  
}

// edit item
const editItem =(id) =>{
  let newEditItems = items.find((element) => {
    return element.id === id 
  })
  console.log(newEditItems);

  setToggleSubmit(false)
  setInputData(newEditItems.name)
  setIsEditItem(id)
}


//remove all items

const removeAll = () => {
  setItems([])
}


  return (
    <>
      <div className="main-div">
        <div className="child-div">
          
          <figure>
            <img src={ToDoImage} alt="todoLogo"></img>
            <h1>To Do List Maker</h1>
        </figure>




        <div className="addItems"> 
          <input type="text"   placeholder="Add Items..." value={inputData} onKeyPress={handleKeyPress}     //taking input from the text field
            onChange={(e)=>{setInputData(e.target.value)}}  / >  

            {
              toggleSubmit? <i className="fa fa-plus add-btn" title="Add Item"  onClick={addItem}   > </i> :   <i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>    //toggle edit button

            }
 
        </div>
                  



        <div className="showItems">  
          {
            items.map((element)=>{
         return (

                  <div className="eachItem" key={element.id}>
                    <h3>{element.name}</h3>
                  
                    <div className ="todo-btn">  
                          <i className="far fa-edit add-btn" title="Edit Item" onClick={()=>editItem(element.id)  }></i>

                          <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={()=>deleteItem(element.id)  }></i>

                    </div>
                  </div>
               )
            })
          }
        </div>




              {/* remove all items button */}

          <div className="showItems">  
            <button className="btn" onClick={removeAll} >Remove All To Do </button>
          </div>

      </div>
    </div>
    </>
  );
};
export default ToDo;
