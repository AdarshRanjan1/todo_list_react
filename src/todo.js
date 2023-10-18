import React, {useEffect, useState} from 'react'
import './style.css'

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState('');
    const [toggleButton, setToggleButton] = useState(false);

    const addItem = () => {
        if(!inputData){
            alert('please write something');
        }
        else if(inputData && toggleButton){
            setItems(
                items.map((curElem) => {
                    if(curElem.id === isEditItem){
                        return {...curElem, name: inputData}
                    }
                    return curElem;
                })
            )
            setInputData('');
            setIsEditItem(null);
            setToggleButton(false);
        }
        else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, myNewInputData]);
            setInputData('');
        }
    };

    const editItem = (index) => {
        const edited = items.find((curElem) => {
            return curElem.id === index;
        })
        setInputData(edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    };

    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
          return curElem.id !== index;
        });
        setItems(updatedItems);
    };

    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src='./images/todo.png' alt='todologo' />
                    <figcaption>Add Your List Here.</figcaption>
                </figure>
                <div className='addItems'>
                    <input 
                        type='text' 
                        placeholder='Add Items...📝' 
                        className='form-control'
                        value = {inputData}
                        onChange = {(event) => setInputData(event.target.value)}/>
                        {
                            toggleButton ? (<i className= "fa fa-pen-to-square add-btn " onClick={addItem}/>) : 
                                (<i className= "fa fa-plus add-btn" onClick={addItem}/>)
                        }
                </div>

                {/* Show the list of tasks */}
                <div className='showItems'>
                    {
                        items.map( (curElem) => {
                            return(
                                <div className='eachItem' key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className='todo-btn'>
                                        <i className="fa fa-pen-to-square add-btn edit-hu"
                                        onClick={() => editItem(curElem.id)}></i>
                                        <i className="fa fa-trash add-btn" 
                                        onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>


                {/* Remove All */}
                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}>
                        <span>Checklist</span>
                    </button>
                </div>
            </div>
        
        </div>    
    </>
  )
}


export default Todo
