import React, {useState} from 'react'
import axios from 'axios';

export default 
    function PersonList() {
 
  const [form, setForm] = useState({
    name: ''
  });
  let handleChange = e => {
   setForm({   ...form,
    [e.target.name]: e.target.value });
  };

  let handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: form.name
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Person Name:
            <input   value={form.name} name="name" onChange={handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  
}