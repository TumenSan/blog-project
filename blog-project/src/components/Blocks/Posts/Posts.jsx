import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import './Posts.css';

export const Posts = () => {
    const [posts, setPosts] = useState([]);

    const cat = useLocation().search

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.post("http://localhost:5000/blog/getposts");
            setPosts(res.data);
            console.log(res);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
    }, [cat]);

    return(
        <div className='Container'>
			<div className="Post">
				<b> Some header </b>
                <div className="Line"> </div>
                <div className="TextPost">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
			</div>
            {posts?.map((post, i) => (
                <div className="Post" key={i}>
                    <div className="TextPost">
                    <b>{post.login}</b>
                    <div className="Line"> </div>
                    <p>{post.post}</p>
                    </div>
                </div>
            ))}
        </div>
      );
}

export default Posts;