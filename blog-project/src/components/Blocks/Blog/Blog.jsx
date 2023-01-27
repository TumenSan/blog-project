import {Route, Routes, Link
} from 'react-router-dom';
import './Blog.css';
import UserProfile from '../UserProfile/UserProfile';
import Users from '../Users/Users';

export const Blog = () => {
    return(
        <>
            <header>
                Блог
                <br/>
                <Link to="/">home</Link>
                <br/>
                <Link to="/blog/signup">signup</Link>
                <br/>
                <Link to="/blog/users">users</Link>
            </header>
            <Routes>
                <Route path="blog/signup" element={<UserProfile/>}></Route>
                <Route path="blog/users" element={<Users/>}></Route>
            </Routes>
        </>
      );
}

export default Blog;