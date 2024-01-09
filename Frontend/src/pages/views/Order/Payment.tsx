import { useEffect } from "react";

  export interface RequestPayAdditionalParams {
    digital?: boolean
    vbank_due?: string
    m_redirect_url?: string
    app_scheme?: string
    biz_num?: string
  }
  
  export interface Display {
    card_quota?: number[]
  }
  
  export interface RequestPayParams extends RequestPayAdditionalParams {
    pg?: string
    pay_method: string
    escrow?: boolean
    merchant_uid: string
    name?: string
    amount: number
    custom_data?: any
    tax_free?: number
    currency?: string
    language?: string
    buyer_name?: string
    buyer_tel: string
    buyer_email?: string
    buyer_addr?: string
    buyer_postcode?: string
    notice_url?: string | string[]
    display?: Display
  }

  export interface RequestPayAdditionalResponse {
    apply_num?: string
    vbank_num?: string
    vbank_name?: string
    vbank_holder?: string | null
    vbank_date?: number
  }
  
  export interface RequestPayResponse extends RequestPayAdditionalResponse {
    success: boolean
    error_code: string
    error_msg: string
    imp_uid: string | null
    merchant_uid: string
    pay_method?: string
    paid_amount?: number
    status?: string
    name?: string
    pg_provider?: string
    pg_tid?: string
    buyer_name?: string
    buyer_email?: string
    buyer_tel?: string
    buyer_addr?: string
    buyer_postcode?: string
    custom_data?: any
    paid_at?: number
    receipt_url?: string
  }

  export type RequestPayResponseCallback = (response: RequestPayResponse) => void

  export interface Iamport {
    init: (accountID: string) => void
    request_pay: (
      params: RequestPayParams,
      callback?: RequestPayResponseCallback,
    ) => void
  }
  
  declare global {
    interface Window {
      IMP: Iamport
    }
  }

export const Payment = ():JSX.Element => {

	useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/v1/iamport.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
        	document.head.removeChild(jquery);
        	document.head.removeChild(iamport);
        }
    }, []);

    const onClickPayment = () => {
        var IMP = window.IMP;
    	IMP.init('imp28705024');

    	const data = {
    		pg: 'tosspayments',
    		pay_method: 'card',
    		merchant_uid: `mid_${new Date().getTime()}`,
    		name: '결제 테스트',
    		amount: 1000,
    		custom_data: {
                name: '부가정보',
                desc: '세부 부가정보'
    		},
    		buyer_name: '홍길동',
    		buyer_tel: '01012345678',
    		buyer_email: '14279625@gmail.com',
    		buyer_addr: '구천면로 000-00',
    		buyer_postalcode: '01234'
    	};

    	IMP.request_pay(data);
    }

    const callback = (response: { success: any; error_msg: any; imp_uid: any; merchant_uid: any; pay_method: any; paid_amount: any; status: any; }) => {
    	const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} =response;

    	if (success){
    		alert('결제 성공');
    	} else {
    		alert(`결제 실패: ${error_msg}`);
    	}
    }

    return (
        <div>
        <button onClick={onClickPayment}>결제하기</button>
      </div>
    );
}
export default Payment;