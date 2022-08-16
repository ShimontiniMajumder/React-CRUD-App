import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './api/posts';

function App() {

//const API_URL = 'https://jsonplaceholder.typicode.com/';

const [posts, setPosts] = useState([]);
const [postTitle, setPostTitle] = useState('');
const [postBody, setPostBody] = useState('');
const [editTitle, setEditTitle] = useState('');
const [editBody, setEditBody] = useState('');

const navigate = useNavigate(); 

useEffect( () => {

    const fetchItems = async () => {

      try{
        //const response = await fetch(`${API_URL}posts`);
        // if(!response.ok) {
        //   throw Error('Issue in fetching data from API');
        // }
        // const data = await response.json();
        const response = await api.get('/posts');
        console.log(response.data);
        if(response && response.data){
          const filteredPost = response.data.filter(val => val.userId === 1);
          setPosts(filteredPost);
        }
      } catch(err) {
            if(err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            } else {
              console.log(`Error :  ${err.message}`);
            }
       }
    }

    fetchItems();

}, []);




const handleSubmit = async (e) =>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 
    : 1;
    const newPost = { id, title:postTitle, body: postBody  };
    try {
      const response = await api.post('/posts' , newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts.reverse());
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error :  ${err.message}`);
    }

}

const handleEdit = async (id) => {
  const updatedPost = {id, title:editTitle, body:editBody};

    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? 
        {...response.data } : post));
        setEditTitle('');
        setEditBody('');
        navigate('/');
    } catch (err) {
        console.log(`Error :  ${err.message}`);
      }

}


const handleDelete = async (id) => {
  try {
    await api.delete(`/posts/${id}`);
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/');
    } catch (err) {
      console.log(`Error :  ${err.message}`);
    }
  
}



  return (
    <div className="App">
      
        <Header title="React CRUD APP" />
        
          <Nav />        
          <Routes>
            <Route exact path="/" element={<Home posts={posts} />} />
            <Route path="/post" element={<NewPost 
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}

            />} />
            <Route path="/edit/:id" element={<EditPost 
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}

            />} />
            <Route path="/post/:id" element={<PostPage 
            posts={posts} 
            handleDelete={handleDelete}
            />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
