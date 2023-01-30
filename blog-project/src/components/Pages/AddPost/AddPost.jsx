import React, { useState } from 'react';
//import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../../contexts/userContext";

export const AddPost = () => {
    const [{ user }, dispatch] = useUser();//!

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    //const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (event) => {
        event.preventDefault();
        try {
            //const data = new FormData()
            const preData = {
                title: title,
                text: text
            };
            const data = {
                //Login: title,
                Login: user.user?.login,//!
                Post: JSON.stringify(preData)
            };
            //data.push('title', title)
            //data.push('text', text)
            //data.push('image', image)
            console.log(`data: ${JSON.stringify(data)}`);
            fetch("http://localhost:5000/blog/addpost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
                })
                .then((response) => response.json())
                .catch((e) => {
                    console.log(e);
                });
            //dispatch(createPost(data))
            console.log('e!!!!!');
            navigate('/blog/posts')
        } catch (error) {
            console.log(error)
        }
    }
    const clearFormHandler = () => {
        setText('')
        setTitle('')
    }

    return (
        <form
            className='w-1/3 mx-auto py-10'
            onSubmit={(e) => e.preventDefault()}
        >
            <label className='text-xs text-white opacity-70'>
                Заголовок поста:
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Заголовок'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
                />
            </label>

            <label className='text-xs text-white opacity-70'>
                Текст поста:
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder='Текст поста'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
                />
            </label>

            <div className='flex gap-8 items-center justify-center mt-4'>
                <button
                    onClick={submitHandler}
                    className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
                >
                    Добавить
                </button>

                <button
                    onClick={clearFormHandler}
                    className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'
                >
                    Отменить
                </button>
            </div>
        </form>
    )
}

export default AddPost;
