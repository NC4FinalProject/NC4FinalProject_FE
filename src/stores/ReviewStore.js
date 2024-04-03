import { create } from "zustand";
import axios from "axios";

const useReviewStore = create((set) => ({
  loginMemberId: "",
  loginMemberNickname: "",
  reviews: [],
  paymentList: [],
  getReviews: async (contentsId) => {
    try {
      const accessToken = sessionStorage.getItem("ACCESS_TOKEN");

      const response = await axios.get(`http://localhost:9090/review/review`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { contentsId: contentsId },
      });
      console.log("Response:", response.data.reviewList);
      set({
        reviews: response.data.reviewList,
        loginMemberId: response.data.loginMemberId,
        loginMemberNickname: response.data.loginMemberNickname,
        paymentList: response.data.paymentList,
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  },

  postReview: async (
    reviewContent,
    reviewRating,
    paymentId,
    contentsId,
    cartId
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:9090/review/review`,
        {
          paymentId,
          reviewContent,
          reviewRating,
          contentsId,
          cartId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding review:", error);
    }
  },

  modifyReview: async (
    reviewId,
    reviewContent,
    reviewRating,
    paymentId,
    contentsId,
    cartId
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:9090/review/review`,
        {
          reviewId,
          reviewContent,
          reviewRating,
          paymentId,
          contentsId,
          cartId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
      console.log(response);
      set({ reviews: response.data.items });
    } catch (error) {
      console.error("Error changing review:", error);
    }
  },

  deleteBoard: async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:9090/review/review`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
          params: { id: id },
        }
      );
      set({ reviews: response.data.items });
    } catch (error) {
      console.error("Error removing review:", error);
    }
  },
}));

export default useReviewStore;
