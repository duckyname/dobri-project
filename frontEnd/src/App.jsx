import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({
    user_id: '',
    title: '',
    content: ''
  });

  useEffect(() => {
    document.title = 'Dobri Project';
  }, []);

  useEffect(() => {
    fetch('http://localhost:8081/all')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setUsers(data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8081/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
      .then(res => res.json())
      .then(newData => {
        setData([...data, newData]);
        setShowForm(false);
        setNewPost({
          user_id: '',
          title: '',
          content: ''
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: '50px' }}>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Upload Data'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <div>
            <label>User ID:</label>
            <select name="user_id" value={newPost.user_id} onChange={handleInputChange} required>
              <option value="" disabled>Select user</option>
              {users.map(user => (
                <option key={user.user_id} value={user.user_id}>
                  {user.user_id}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>user</th>
            <th>title</th>
            <th>content</th>
            <th>modif</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.post_id}>
              <td>{d.post_id}</td>
              <td>{d.user_id}</td>
              <td>{d.title}</td>
              <td>{d.content}</td>
              <td>{d.last_modified_20118055}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
