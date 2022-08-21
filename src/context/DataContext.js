import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../api/posts';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
const [postTitle, setPostTitle] = useState('');
const [postBody, setPostBody] = useState('');
const [editTitle, setEditTitle] = useState('');
const [editBody, setEditBody] = useState('');
const navigate = useNavigate(); 
const { width } = useWindowSize();
const {data, fetchError, isLoading} = useAxiosFetch('https://jsonplaceholder.typicode.com/posts');

// useEffect( () => {

//     const fetchItems = async () => {

//       try{
//         //const response = await fetch(`${API_URL}posts`);
//         // if(!response.ok) {
//         //   throw Error('Issue in fetching data from API');
//         // }
//         // const data = await response.json();
//         const response = await api.get('/posts');
//         console.log(response.data);
//         if(response && response.data){
//           const filteredPost = response.data.filter(val => val.userId === 1);
//           setPosts(filteredPost);
//         }
//       } catch(err) {
//             if(err.response) {
//             console.log(err.response.data);
//             console.log(err.response.status);
//             } else {
//               console.log(`Error :  ${err.message}`);
//             }
//        }
//     }

//     fetchItems();

// }, []);

  useEffect(() => {

    setPosts(data);
    
  }, [data]);

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
        <DataContext.Provider value = {{
            width, posts, fetchError, isLoading,
            handleSubmit,postTitle,setPostTitle,postBody,setPostBody,
            handleEdit, editBody, setEditBody, editTitle, setEditTitle,
            handleDelete
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;