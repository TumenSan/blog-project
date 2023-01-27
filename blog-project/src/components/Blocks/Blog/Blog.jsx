import {Route, Routes, Link
} from 'react-router-dom';
import './Blog.css';
import UserProfile from '../UserProfile/UserProfile';
import Users from '../Users/Users';
import Posts from '../Posts/Posts';

export const Blog = () => {
    return(
        <>
            <header>
                Блог
                <Link to="/">home</Link>
                <Link to="/blog/signup">signup</Link>
                <Link to="/blog/users">users</Link>
                <Link to="/blog/posts">posts</Link>
            </header>
            <Routes>
                <Route path="blog/signup" element={<UserProfile/>}></Route>
                <Route path="blog/users" element={<Users/>}></Route>
                <Route path="blog/posts" element={<Posts/>}></Route>
            </Routes>
        </>
      );
}

export default Blog;