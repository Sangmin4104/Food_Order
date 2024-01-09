import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import wrongAstyle from '../css/WrongApproach.module.css';

export const WrongApproach = (): JSX.Element => {
    const navigate = useNavigate();

    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");
    const userDept = localStorage.getItem("user_dept");


    const goToMain = () => {
        navigate('/');
    }

    return (
        <>
            <div className={wrongAstyle.wrongApproachDiv} style={{ padding: '0px', margin: '0' }}>
                <img src={require(`../img/WrongApproach.png`)} className={wrongAstyle.wrongApproach} alt={'잘못된 접근'} />
                <div className={wrongAstyle.wrongApproachP}>
                    <span style={{ fontWeight: 'bold', fontSize: '25px', marginBottom: '5px' }}>비정상적인 접근입니다.</span>
                    <span style={{ fontSize: '20px', marginBottom: '10px' }}>올바른 경로를 통해 이용 부탁드립니다.</span>
                    <button onClick={goToMain}>메인 페이지로 이동하기</button>
                </div>
            </div>
        </>
    );
}

export default WrongApproach;