import React from 'react';
import { SignUpFieldsEnum } from "./constants";
import { useUser } from "../../../contexts/userContext";
import { SET_USER_ACTION } from '../../../actions/userActions';
import './UserProfile.css';

export const UserProfileAuth = ({onClose }) => {
  const [{ user }, dispatch] = useUser();

  console.log(user);

  const onSubmit = (event) => {
    event.preventDefault();

    const login = event.target[0].value;
    const password = event.target[1].value;

    const data = { login, password };

    fetch("http://localhost:5000/blog/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((payload) => {
        dispatch({ type: SET_USER_ACTION, payload});
        onClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="signUp">
      <h3>Регистрация</h3>
      <section>
        <form onSubmit={onSubmit}>
          <label htmlFor={SignUpFieldsEnum.name}>
            <input
              type="text"
              id={SignUpFieldsEnum.name}
              name={SignUpFieldsEnum.name}
              placeholder="Логин"
            />
          </label>

          <label htmlFor={SignUpFieldsEnum.password}>
            <input
              id={SignUpFieldsEnum.password}
              type="password"
              name={SignUpFieldsEnum.password}
              placeholder="Пароль"
            />
          </label>

          <input type="submit" value="Войти" />
        </form>
      </section>
    </div>
  );
}

export default UserProfileAuth;