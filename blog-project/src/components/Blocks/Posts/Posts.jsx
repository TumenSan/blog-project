import React, {useState} from 'react';
import './Posts.css';

export const Posts = () => {
    const [posts, setPosts] = useState();

    return(
        <>
            <button className='buttonGetUsers' id='buttonGetUsers' onClick={() => GetPosts()}>
                GetPosts
            </button>
            <div class="Post">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				<div class="Line"> </div>
				<font size="3" color="#507299"> Like Comment </font>
			</div>
            {JSON.stringify(posts, null, 1)}
			<div class="Post">
				<div class="Line"> </div>
				<div class="DownBlock">
					<p class="Like"> Like </p> <p class="Comment"> Comment </p>
				</div>
			</div>
			<div class="Post">
				<b> Some header </b>
				<div class="Line"> </div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				<div class="Line"> </div>
				<div class="DownBlock">
					<p class="Like"> Like </p> <p class="Comment"> Comment </p>
				</div>
			</div>
			<div class="Post">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				<div class="Line"> </div>
				<div class="DownBlock">
					<p class="Like"> Like </p> <p class="Comment"> Comment </p>
				</div>
			</div>
			<div class="Post">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				<div class="Line"> </div>
				<div class="DownBlock">
					<p class="Like"> Like </p> <p class="Comment"> Comment </p>
				</div>
			</div>
        </>
      );

      
      async function GetPosts(){
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
    }
}

export default Posts;