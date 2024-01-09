
export interface Cart {
    menu_id: number,
    u_id: string,
    quantity:number,
    menu_name: string,
    menu_price: number,
    menu_corner: string,
    menu_image: string, 
    is_packed: number,
    cart_price: number
}

export interface Orders {
    order_id: number,
    u_id: string,
    total_quantity: number,
    total_price: number,
    order_date: string

    order_detail_id: number,
    menu_id: number,
    menu_price: number,
    menu_quantity: number,
}