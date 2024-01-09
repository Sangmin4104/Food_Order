import React, { useState, useEffect, KeyboardEvent } from 'react';
import style from '../css/Login.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsFillPersonFill } from "react-icons/bs";
import { useCookies } from 'react-cookie';
import ysuLogo from '../img/MainLogo.png';

export const Login = (): JSX.Element => {
    const [u_id, setUid] = useState(""); // 사용자 ID 상태
    const [u_pw, setUpw] = useState(""); // 메뉴 ID 상태 (숫자)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["rememberUserId"]);
    const [isRemember, setIsRemember] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showErrorText, setShowErrorText] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        console.log(localStorage.getItem('user_name'));
        const storedInformation = localStorage.getItem("isLoggedIn");

        if (storedInformation) {
            setIsLoggedIn(true);

            const storedUserId = localStorage.getItem("user_id");
            const storedUserName = localStorage.getItem("user_name");
            const storedUserDept = localStorage.getItem("user_dept");
            setShowModal(true);

            if (storedUserDept === "admin") {
                navigate('/adminmenu', {
                    state: {
                        u_id: storedUserId,
                        u_name: storedUserName,
                        u_dept: storedUserDept
                    }
                });
            } else {
                navigate('/Menu', {
                    state: {
                        u_id: storedUserId,
                        u_name: storedUserName,
                        u_dept: storedUserDept
                    }
                });
            }
        }

        if (cookies.rememberUserId !== undefined) {
            setUid(cookies.rememberUserId);
            setIsRemember(true);
        }

    }, [cookies.rememberUserId])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userId = e.target.checked ? u_id : undefined;

        setIsRemember(e.target.checked);
        if (e.target.checked) {
            setCookie('rememberUserId', userId, { maxAge: 2000 });
            console.log(cookies.rememberUserId);
            console.log(u_id);
        } else {
            removeCookie('rememberUserId');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleLogin(u_id, u_pw);
        }
      };

    const [userInfo, setUserInfo] = useState<{
        u_id: String,
        u_pw: String,
        u_name: String,
        u_dept: String
    }>();

    const handleLogin = (userId: string, password: string) => {
        const userInfoDTO = {
            u_id: userId,
            u_pw: password,
            u_name: null,
            u_dept: null
        };

        localStorage.setItem("isLoggedIn", "LOGGED_IN");
        setIsLoggedIn(true);

        // 서버로 데이터를 보냄
        axios.post(`/user/${userId}`, userInfoDTO)
            .then((res) => {
                console.log(res);
                console.log("res.data.userId :: ", res.data.u_id);
                console.log("res.data.u_pw :: ", res.data.u_pw);
                console.log("res.data.u_name :: ", res.data.u_name);
                console.log("res.data.u_dept :: ", res.data.u_dept);

                if (res.data.u_id == userId && res.data.u_pw == password) {
                    // id, pw 모두 일치 userId = userId1, msg = undefined
                    console.log("======================", "로그인 성공");
                    localStorage.setItem("user_id", userId);
                    localStorage.setItem("user_name", res.data.u_name);
                    localStorage.setItem("user_dept", res.data.u_dept);
                    if (res.data.u_dept === "admin") {
                        navigate('/adminMenu', {
                            state: {
                                u_id: userId,
                                u_name: res.data.u_name,
                                u_dept: res.data.u_dept
                            }
                        });
                    } else {
                        navigate('/menu', {
                            state: {
                                u_id: userId,
                                u_name: res.data.u_name,
                                u_dept: res.data.u_dept
                            }
                        });
                    }
                } else if (password != res.data.pwd) {
                    setShowErrorText(true);
                }
            })
            .catch(() => {
                setShowErrorText(true);
            });
    };

    return (
        <>
            <body className={style.bodyCSS}>
                <div className={style.logoDiv}>
                    <img id="logo" className={style.logo} src={ysuLogo} alt={"logo"} />
                </div>
                
                <div id={style.loginDiv}>
                    <div className={style.loginWrapper}>
                        <div id={style.loginForm}>
                            <h2 id={style.loginH2}>Login</h2>
                            <input type="text" name="userName" placeholder="아이디" value={u_id} onKeyDown={handleKeyPress} onChange={(e) => {
                                setUid(e.target.value);
                            }} />
                            <input type="password" name="userPassword" placeholder="비밀번호" value={u_pw} onKeyDown={handleKeyPress}  onChange={(e) => setUpw(e.target.value)} />
                            {showErrorText && (
                    <p className={style.errorText}>
                        아이디 또는 비밀번호를 잘못 입력했습니다. <br></br>입력하신 내용을 다시 확인해주세요.
                    </p>

                )}
                            <label htmlFor="saveId">
                                <input
                                    type="checkbox"
                                    className="saveId-cb"
                                    id="saveId"
                                    name="saveId"
                                    onChange={(e) => {
                                        handleOnChange(e);
                                    }}
                                checked={isRemember}
                                />{" "}
                                아이디 저장하기
                            </label>
                            <input type="submit" value="Login" onClick={() => handleLogin(u_id, u_pw)} />
                        </div>
                    </div>
                </div>
            </body>

        </>
    );
}

export default Login;