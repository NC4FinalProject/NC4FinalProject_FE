import { create } from "zustand";
import axios from "axios";

const useReviewStore = create((set) => ({
  loginMemberId: "",
  loginMemberNickname: "",
  loginMemberRole: "",
  reviews: [],
  paymentList: [],
  setReviews: (reviews) => set({ reviews }),
  getReviews: async (contentsId) => {
    try {
      const accessToken = sessionStorage.getItem("ACCESS_TOKEN");

      const response = await axios.get(`http://${process.env.REACT_APP_BACK_URL}/review/review`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { contentsId: contentsId },
      });
      console.log("Response:", response.data.reviewList);

      set({
        reviews: response.data.reviewList,
        loginMemberRole: response.data.loginMemberRole,
        loginMemberId: response.data.loginMemberId,
        loginMemberNickname: response.data.loginMemberNickname,
        paymentList: response.data.paymentList,
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  },

  postReview: async (reviewContent, reviewRating, paymentId, contentsId) => {
    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_BACK_URL}/review/review`,
        {
          paymentId,
          reviewContent,
          reviewRating,
          contentsId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );

      return response.data.items;
    } catch (error) {
      console.error("Error adding review:", error);
    }
  },

  modifyReview: async (
    reviewId,
    reviewContent,
    reviewRating,
    paymentId,
    contentsId
  ) => {
    try {
      const response = await axios.put(
        `http://${process.env.REACT_APP_BACK_URL}/review/review`,
        {
          reviewId,
          reviewContent,
          reviewRating,
          paymentId,
          contentsId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log(response);

      return response.data.items;
    } catch (error) {
      console.error("Error changing review:", error);
    }
  },

  deleteReview: async (reviewId, contentsId) => {
    try {
      const response = await axios.delete(
        `http://${process.env.REACT_APP_BACK_URL}/review/review/${reviewId}`,
        {
          params: {
            contentsId: contentsId,
          },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log(response);

      return response.data.items;
    } catch (error) {
      console.error("Error removing review:", error);
    }
  },
}));

export default useReviewStore;
