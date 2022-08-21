import Feed from "./Feed"
import { useContext } from 'react';
import DataContext, { DataProvider } from './context/DataContext';

const Home = () => {
  const {posts, fetchError, isLoading} = useContext(DataContext);
  
    return (
      <main className="Home">
          {/* {posts.length ? (
            <Feed posts={posts} />
          ) : (
            <p style={{ marginTop: "2rem"}}></p>
          )} */}
          
          {isLoading && <p className="statusMsg">Loading Posts...</p>}
          {!isLoading && fetchError && <p className="statusMsg" style={{color: "red"}}>
            {fetchError}</p>}
          { !isLoading && !fetchError && (posts.length ? <Feed posts={posts}></Feed>
          : <p className="statusMsg">No Posts to display.</p> )}
      </main>
    )
  }
  
  export default Home