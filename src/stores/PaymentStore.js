import { create } from "zustand";
import axios from "axios";

const usePaymentStore = create((set) => ({
  payments: [],

  getPayments: async () => {
    try {
      const accessToken = sessionStorage.getItem("ACCESS_TOKEN");

      const response = await axios.get(
        `http://${process.env.REACT_APP_BACK_URL}/payment/payment`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const paymentList = response.data.items;

      const payments = paymentList.map((payment) => ({
        paymentId: payment.paymentId,
        id: payment.id,
      }));

      set({ payments: payments });
    } catch (error) {
      console.error("Error fetching Members:", error);
    }
  },
}));

export default usePaymentStore;
