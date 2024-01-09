export interface ReviewList {
    u_id: string,
    u_name: string;
    menu_id: number,
    review_id: number,
    review_writing: string,
    review_star: number,
    review_time: Date,
    order_id: number,
    review_regist:number,
};

export interface ReviewWrite {
    review_writing: string;
    review_star: number;
    review_time: Date;
}