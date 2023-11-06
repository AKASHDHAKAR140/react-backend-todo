import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Demo() {
  const data = {
    task: ''
  };
 

  const [input, setInput] = useState(data);
  const [editInput, setEditInput] = useState(data);
  const [editingIndex, setEditingIndex] = useState(null);
  const [dataget, setDataget] = useState([]);
   console.log("editInput",editInput)
  const handlechange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  
  const handleEditchange = (e) => {
    setEditInput({ ...editInput, [e.target.name]: e.target.value });
  };
  

  useEffect(() => {
    handleGet();
  }, []);
  const handleEditClick = (item,index) => {
   // setInput({ task: dataget[index].task });
   // console.log("input11111",input)
    
    setEditingIndex(index);
    setEditInput(item)
    //setEditInput({ task: item.task });
    console.log("index11111",index)
  };
console.log('editingIndex',editingIndex)
  const handleSaveClick = (_id) => {
    axios
      .put('http://localhost:5000/todos/' + _id, editInput)
      .then((res) => {
        console.log(res.data);
        handleGet();
        setEditingIndex(null); 
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancelClick = () => {
    setEditInput(data);
   //setInput(data)
    setEditingIndex(null); 
    
  };

  const handleDelete = (_id) => {
    axios.delete("http://localhost:5000/todos/" + _id)
      .then((res) => {
        console.log(res)
        handleGet();

      })
  }
  const handleGet = () => {
    axios.get('http://localhost:5000/todos')
      .then((res) => {
        console.log(res)
        setDataget(res.data)
      })
  }
  const handlesubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/todos', input)
      .then((res) => {
        console.log("111111", res)
        handleGet();

      }).catch((res) => {
        console.log(res)
      })

    // setNew1((new1) => {
    //   const update = [...new1, input]
    //   // setInput('');
    //   return update;
    // })
    // setNew1(input)
  }
console.log(dataget)
  return (
    <div>
    <form onSubmit={handlesubmit}>
    <input style={{ marginTop: 100 }} type='text' value={input.task} name="task" onChange={handlechange} />
    <input type='submit' />
  </form>
   <table className='border' style = {{marginLeft:700}}>
    <thead>
      <tr>
        <th>Task</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {dataget.length > 0 &&
          dataget.map((item, index) => (
            <tr key={item._id}>
              <td>
                {editingIndex === index ? (
                  <input
                    type='text'
                    value={editInput.task}
                    name='task'
                    onChange={handleEditchange}
                  />
                ) : (
                  item.task
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <button
                    className='btn'
                    onClick={() => handleSaveClick(item._id)}
                  >
                    Save
                  </button>
                ) : (
                  <button className='btn' onClick={() => handleEditClick(item,index)}>
                    Edit
                  </button>
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <button className='btn' onClick={handleCancelClick}>
                    Cancel
                  </button>
                ) : (
                  <button className='btn' onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
      </tbody>
      </table>
    </div>
  );
}

export default Demo;
