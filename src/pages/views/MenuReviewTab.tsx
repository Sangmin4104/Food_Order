// ... (기존 코드)

import { Tabs } from "antd";
import { TabContent, TabMenu } from "./components/Tab";
import { MenuDetail } from "./MenuDetail";
import { ReviewListPage } from "./Review/ReviewListPage";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import styled from "styled-components";

export const MenuReviewTab = (): JSX.Element => {
    const [menu_id, setMenu_id] = useState < {
        menu_id: number,
    } > ();
    const [user_id, setUser_id] = useState('')

    const navigate = useNavigate();
    const location = useLocation();

    const menuId = location.state.menu_id;
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        setMenu_id(menuId);
    });

    const items = [
        { key: 1, name: '메뉴', content: <MenuDetail />, id: 1 },
        { key: 2, name: '리뷰', content: <ReviewListPage />, id: 2 }
    ];

    const [activeTab, setActiveTab] = useState(1); // Initialize with 1

    const selectMenuHandler = (key: number) => {
        setActiveTab(key);
    };

    const handleItemClick = (id: number) => {
        if (id === 1) {
            navigate('/menuDetail', {
                state: {
                    menu_id: menuId,
                    user_id: userId
                }
            });

        } else if (id === 2) {
            navigate(`/reviewList`, {
                state: {
                    menu_id: menuId,
                    user_id: userId
                }
            })
        };
    };

    const StyledTabsWrapper = styled.div`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
`;


    return (
        <li style={{ height: '50px', boxShadow: '0 4px 12px rgba(0, 0, 0, .2)' }}>
            <Tabs>
                <div>
                    <TabMenu>
                        {items.map((tab, index) => (
                            <div
                                id="tab"
                                key={tab.key}
                                className={activeTab === index + 1 ? 'submenu focused' : 'submenu'}
                                onClick={() => {
                                    selectMenuHandler(index + 1);
                                    handleItemClick(index + 1);
                                }}
                            >
                                {tab.name}
                            </div>
                        ))}
                    </TabMenu>
                </div>
                <TabContent>
                    {items[activeTab - 1].content}
                </TabContent>
            </Tabs>
        </li>
    );
};
