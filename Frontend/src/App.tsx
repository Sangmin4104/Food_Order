
import './App.css';
import Menu from './pages/views/Menu';
import Main from './pages/views/Main';
import MenuDetail from './pages/views/MenuDetail';
import Login from './pages/views/Login';
import MyPage from './pages/views/MyPage';
import MyOrderList from './pages/views/MyOrderList';
import MyReview from './pages/views/MyReview';
import CartMain from './pages/views/Cart/CartMain';
import OrderComplete from './pages/views/Order/OrderComplete';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminMenuListPage from './pages/views/AdminMenuListPage';
import AdminMenuInsert from './pages/views/AdminMenuInsert';
import AdminMenuDetail from './pages/views/AdminMenuDetail';
import WrongApproach from './pages/views/WrongApproach';
import { MenuReviewTab } from './pages/views/MenuReviewTab';
import { ReviewListPage } from './pages/views/Review/ReviewListPage';
import { ReviewWritePage } from './pages/views/Review/ReviewWritePage';
import CartList from './pages/views/Cart/CartList';
import OrderCheck from './pages/views/Order/OrderCheck';
import { AdminLastMenuListPage } from "./pages/views/AdminLastMenuListPage";
import AdminMyPage from './pages/views/AdminMyPage';

export const App =  ():JSX.Element => {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        {/* <Route path="/menuDetail" element={<MenuDetail />} /> */}
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/myOrderList" element={<MyOrderList />} />
        <Route path="/myReview" element={<MyReview />} />
        <Route path="/cart" element={<CartList />} />
        <Route path="/order" element={<OrderComplete />} />
        <Route path="/order/check" element={<OrderCheck />} /> 
        <Route path="/order/complete" element={<OrderComplete />} /> 
        <Route path="/adminMenu" element={<AdminMenuListPage />} /> {/* 메뉴관리 */}
        <Route path="/adminMyPage" element={<AdminMyPage/>} />
        <Route path="/adminMenu/menuInsert" element={<AdminMenuInsert />} /> {/* 메뉴등록 */}
        <Route path="/adminMenu/menuDetail" element={<AdminMenuDetail />} /> {/* 메뉴정보(수정, 삭제) */}
        <Route path="/lastmenu" element={<AdminLastMenuListPage />} /> {/* 지난메뉴관리 */}

        <Route path='/wrongApproach' element={<WrongApproach/>} />
        <Route path="/MenuDetail" element={<MenuReviewTab />} />
        <Route element={<MenuReviewTab />} >
          <Route path="/menuDetail" element={<MenuDetail />} />
          <Route path="/reviewList" element={<ReviewListPage />} />
        </Route>
        <Route path="/review/write" element={<ReviewWritePage />} />
      </Routes>
    </Router>
    </>
);
}

export default App;