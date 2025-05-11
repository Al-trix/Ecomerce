import axios from 'axios';
import type { AxiosResponse } from 'axios';

type Review = {
  productId: string;
  userId: string;
  rating: number;
  comment: string;
};

type PartialReview = Partial<Review>;

type FuntionActions = {
  createReview: (userId: string, dataReview: Review) => Promise<AxiosResponse>;
  updateReview: (
    reviewId: string,
    updateInfo: PartialReview
  ) => Promise<AxiosResponse>;
  deleteReview: (reviewId: string) => Promise<AxiosResponse>;
};

const enums = {
  REVIEW: 'review',
};

export const createReview: FuntionActions['createReview'] = (
  userId,
  dataReview
) => axios.post(`${enums.REVIEW}/${userId}`, dataReview);

export const updateReview: FuntionActions['updateReview'] = (
  reviewId,
  updateInfo
) => axios.put(`${enums.REVIEW}/${reviewId}`, updateInfo);

export const deleteReview: FuntionActions['deleteReview'] = (reviewId) =>
  axios.delete(`${enums.REVIEW}/${reviewId}`);
