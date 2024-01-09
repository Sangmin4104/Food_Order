export interface Orders {
    order_id: number,
    u_id: string,
    total_quantity: number,
    total_price: number,
    order_date: string,
}

export interface OrderDetail {
    map(arg0: (detail: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    length: number;
    order_id: number,
    order_detail_id: number,
    u_id:string,
    menu_id: number,
    quantity: number,
    price: number,
    is_packed: number,
    menu_name: string,
    menu_corner: string,
    menu_price: number,
    menu_image: string,
}