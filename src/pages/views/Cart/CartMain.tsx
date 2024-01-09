import { Button, Empty } from "antd";
import '../../css/cartCss.css'
import { ChangeEvent, ReactNode, useEffect, useState} from "react";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi"
import CartList from "./CartList";
import { Cart, Orders } from "./state/cart.state";
import { IoHomeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import MenuStyle from '../../css/Menu.module.css';
import WrongApproach from "../WrongApproach";

export const CartMain = (): JSX.Element => {
    const userId = localStorage.getItem('user_id');
    return (
        <>
        {userId ? (
            <div className="body">
                <div className="cartTop">
                    <Link className={MenuStyle.link} to="/Menu"> 
                        <BiArrowBack className={MenuStyle.faArrowLeft} />
                    </Link>
                    <p className="topTxt"> 장바구니</p>
                    <Link className={MenuStyle.link} to="/Menu">
                        <IoHomeSharp className={MenuStyle.faArrowLeft}/>
                    </Link>
                </div>
                <div className="content">
                    <CartList />
                </div>
            </div>
            ) : (
        <WrongApproach />
      )}
        </>
    )
}

export default CartMain;