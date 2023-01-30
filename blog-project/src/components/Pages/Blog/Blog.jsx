import {Route, Routes, Link, redirect 
} from 'react-router-dom';
import './Blog.css';
import UserProfile from '../UserProfile/UserProfile';
import UserProfileAuth from '../UserProfile/UserProfileAuth';
import Users from '../Users/Users';
import Posts from '../Posts/Posts';
import AddPost from '../AddPost/AddPost';
import EditPost from '../EditPost/EditPost';
import { useUser } from "../../../contexts/userContext";
import { LOGOUT_USER_ACTION } from "../../../actions/userActions";

export const Blog = () => {
    const [{ user }, dispatch] = useUser();

    const onCloseSignUp = () => {
        return redirect("/blog/posts");
    }

    const logout = () => {
        fetch("http://localhost:5000/blog/logout", {
          method: "POST",
          credentials: "include",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return "OK";
          })
          .then(() => {
            dispatch({ type: LOGOUT_USER_ACTION });
            //redirect("/blog/posts");???
          })
          .catch((e) => {
            console.log(e);
          });
      };

    return(
        <>
            <header>
                Блог
                <Link to="/">home</Link>
                <Link to="/blog/users">users</Link>
                <Link to="/blog/posts">posts</Link>
                <Link to="/blog/addposts">add post</Link>
                <Link to="/blog/editposts">edit post</Link>
                <Link to="/blog/signup">Регистрация</Link>
                <Link to="/blog/signin">Войти</Link>
                <button
                    type="button"
                    className="button"
                    onClick={logout}
                >
                    Выйти
                </button>
                {user && (
                <>
                  <div>{`${user.user?.login}`}</div>
                </>)}
            </header>
            <Routes>
                <Route path="/" element={(<h1>Здравствуйте, здесь наш блог</h1>)}></Route>
                <Route path="blog/signup" element={<UserProfile onClose={onCloseSignUp}/>}></Route>
                <Route path="blog/signin" element={<UserProfileAuth onClose={onCloseSignUp}/>}></Route>
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