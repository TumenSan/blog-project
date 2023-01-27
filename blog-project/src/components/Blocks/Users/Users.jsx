import React, {useState} from 'react';

export const Users = () => {
    const [data, setData] = useState();
    
    return(
        <>
            <button className='buttonGetUsers' id='buttonGetUsers' onClick={() => GetUsers()}>
                GetUsers
            </button>
            <h2>Users</h2>
            <pre>{JSON.stringify(data, null, 1)}</pre>
        </>
    );

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
}

export default Users;