import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
function Todo() {
  //const[isEdit,setIsEdit] = useState("")
  const data = {
    task: ""
  }

  const [input, setInput] = useState(data)
  const [editingIndex, setEditingIndex] = useState(null)
  const [editInput, setEditInput] = useState(data)
  //const [new1, setNew1] = useState([]);
  const [dataget, setDataget] = useState([]);
  const handlechange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })

  }
  const handleEditchange = (e) => {
    setEditInput({ ...editInput, [e.target.name]: e.target.value })
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
  console.log('input', input)
  //console.log('new1', new1)

  const handleDelete = (_id) => {
    axios.delete("http://localhost:5000/todos/" + _id)
      .then((res) => {
        console.log(res)
        handleGet();

      })
  }
  const handleSave = (_id) => {
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
  }
  const handleEdit = (index, item) => {
    setEditingIndex(index)
    setEditInput(item)
  }
  const handleCancel = () => {
    setEditInput(null)
    setEditInput(data)
  }
  const handleGet = () => {
    axios.get('http://localhost:5000/todos')
      .then((res) => {
        console.log(res)
        setDataget(res.data)
      })
  }

  console.log(dataget, '1111111111111111222222344444444445')
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <input style={{ marginTop: 100 }} type='text' value={input.task} name="task" onChange={handlechange} />
        <input type='submit' />
      </form>
      <table className='border' style={{ marginLeft: 700 }}>
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
                <td>{editingIndex === index? (
                  <input type='text' name='task' value={editInput.task} onChange={handleEditchange} />) : (

                  item.task )}</td>
                <td>
                  {editingIndex === index? (<button className='btn' onClick={() => handleSave(item._id)}>save</button>) :(

                    <button className='btn' onClick={() => handleEdit(item, index)}>Edit</button>
                    )}
                </td>
                <td>
                  {editingIndex === index ? (<button className='btn' onClick={() => handleCancel()}>Cancel</button>) : (<button className='btn' onClick={() => handleDelete(item._id)}>Delete</button>)}

                </td>
              </tr>
            ))}
        </tbody>
      </table>


    </div>
  )
}

export default Todo