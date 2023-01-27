import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import './Posts.css';
import {Post} from './Post'

export const Posts = () => {
    const [posts, setPosts] = useState();

    const cat = useLocation().search

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.post("http://localhost:5000/blog/users");
            setPosts(res.data);
            //let Text1 = document.getElementById("Post2");
            //document.getElementById("TextPost2").innerHTML = res.data[0].Token;
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
    }, [cat]);

    return(
        <>
            <div className="Post">
                <b> Some header </b>
                <div className="TextPost" id="TextPost2">
                {posts[0].Token}
                {posts.map((post) => (
                <div key={post.id}>
                    <div>
                    <p>{post.Token}</p>
                    </div>
                </div>
                ))}
                </div>
				<div className="Line"> </div>
			</div>
			<div className="Post">
				<b> Some header </b>
				<div className="Line"> </div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				<div className="Line"> </div>
			</div>
			<div className="Post">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				<div className="Line"> </div>
			</div>
			<div className="Post">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				<div className="Line"> </div>
			</div>
        </>
      );

      
      //async function GetPosts(){
        /*
        try{
            const response = await fetch("http://localhost:5000/blog/users", {
                method: "POST",
                headers: { "Accept": "application/json" },
                mode: 'cors',
                credentials: "include",
            });

            // если запрос прошел нормально
            if (response.ok === true) {
                // получаем данные
                try{
                    //const res = await response.json();
                    const res = await response.json();
                    //JSON.stringify(posts, null, 1)
                    setPosts(res);
                    console.log(res);
                    console.log(res.filter(obj => obj.Token !== ""));
                    console.log(res.Token);
                    //return res;
                }
                catch{
                    throw new Error("Ошибка: запрос прошел неправильно");
                }
            }
            //ошибка
            else {
                throw new Error("Ошибка: пустое тело");
            }
        }
        catch{
            throw new Error("Ошибка: сервер не работает");
        }
        */
    //}
}

export default Posts;