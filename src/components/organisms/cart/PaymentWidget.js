import { useCallback, useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import {Button} from '@mui/material';
import {useLocation} from 'react-router-dom';

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

export default function PaymentWidget() {
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const agreementWidgetRef = useRef(null);
  const location = useLocation();
  const {selectedItem, userNickname, userEmail, totalPrice} = location.state;
  const [price, setPrice] = useState(totalPrice ? totalPrice : 0);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget("test_ck_ma60RZblrqjv1QBB0j1z8wzYWBn1",  ANONYMOUS); // 비회원 customerKey

      if (paymentWidgetRef.current == null) {
        paymentWidgetRef.current = paymentWidget;
      }

      /**
       * 결제창을 렌더링합니다.
       * @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods%EC%84%A0%ED%83%9D%EC%9E%90-%EA%B2%B0%EC%A0%9C-%EA%B8%88%EC%95%A1
       */
      const paymentMethodsWidget = paymentWidgetRef.current.renderPaymentMethods(
        "#payment-method",
        { value: price },
        { variantKey: "DEFAULT" }
      );

      /**
       * 약관을 렌더링합니다. 
       * @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement%EC%84%A0%ED%83%9D%EC%9E%90-%EC%98%B5%EC%85%98
       */
      agreementWidgetRef.current = paymentWidgetRef.current.renderAgreement('#agreement', { variantKey: 'DEFAULT' });

      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  const handlePayment = useCallback(async () => {
    const paymentWidget = paymentWidgetRef.current;
    try {
        await paymentWidget?.requestPayment({
          orderId: generateRandomString(),
          companyName: 'aaa',
          orderName: selectedItem.lenth <= 1 ? selectedItem[0].contentsTitle : selectedItem[0].contentsTitle + " 외 " + parseInt(selectedItem.lenth - 1) + "건",
          customerName: userNickname,
          customerEmail: userEmail,
          successUrl: window.location.origin + "/payment/success" + window.location.search,
          failUrl: window.location.origin + "/payment/fail" + window.location.search
        });
      } catch (error) {
        // TODO: 에러 처리
      }
  }, []);

  return (
    <div className="wrapper w-100">
      <div className="max-w-540 w-100">
        <div id="payment-info" className="w-100">
            <h3>결제 정보</h3>
            <p>주문내용: {selectedItem.lenth <= 1 ? selectedItem[0].contentsTitle : selectedItem[0].contentsTitle + " 외 " + (selectedItem.length - 1) + "건"}</p>
        </div>
      </div>
      <div className="max-w-540 w-100">
        <div id="payment-method" className="w-100" />
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper w-100">
          <Button onClick={handlePayment} variant="contained" fullWidth>
            결제하기
          </Button>
        </div>
      </div>
    </div>
  );
}