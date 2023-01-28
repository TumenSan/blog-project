import {Route, Routes, Link
} from 'react-router-dom';
import './Blog.css';
import UserProfile from '../UserProfile/UserProfile';
import Users from '../Users/Users';
import Posts from '../Posts/Posts';
import AddPost from '../AddPost/AppPost';
import EditPost from '../EditPost/EditPost';

export const Blog = () => {
    return(
        <>
            <header>
                Блог
                <Link to="/">home</Link>
                <Link to="/blog/signup">signup</Link>
                <Link to="/blog/users">users</Link>
                <Link to="/blog/posts">posts</Link>
                <Link to="/blog/addposts">add post</Link>
                <Link to="/blog/editposts">edit post</Link>
            </header>
            <Routes>
                <Route path="/" element={(<h1>Здравствуйте, здесь наш блог</h1>)}></Route>
                <Route path="blog/signup" element={<UserProfile/>}></Route>
                <Route path="blog/users" element={<Users/>}></Route>
                <Route path="blog/posts" element={<Posts/>}></Route>
                <Route path="blog/addposts" element={<AddPost/>}></Route>
                <Route path="blog/editposts" element={<EditPost/>}></Route>
                <Route path="*" element={(<h1>Ошибка (страница не найдена)</h1>)}></Route>
            </Routes>
        </>
      );
}

export default Blog;