import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export const Users = () => {
    const [data, setData] = useState();
    
    const cat = useLocation().search

    useEffect(() => {
        async function GetUsers(){
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
                        const res = await response.json();
                        setData(res);
                        console.log(res);
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
        GetUsers();
    }, [cat]);

    return(
        <>
            <h2>Users</h2>
            <pre>{data?.map((post, i) => (
                <div className="Post" key={i}>
                    <div className="TextPost">
                    <b>{post.login}</b>
                    </div>
                </div>
            ))}</pre>
        </>
    );
}

export default Users;