import axios from '../../api/instance.ts';
import type { FuntionActionsApi } from '../../types/funtions.d.ts';
import { enums } from '../../types/constantes';

export const createReview: FuntionActionsApi['reviews']['createReview'] = (
  userId,
  dataReview
) => axios.post(`${enums.REVIEW}/${userId}`, dataReview);

export const updateReview: FuntionActionsApi['reviews']['updateReview'] = (
  reviewId,
  updateInfo
) => axios.put(`${enums.REVIEW}/${reviewId}`, updateInfo);

export const deleteReview: FuntionActionsApi['reviews']['deleteReview'] = (
  reviewId
) => axios.delete(`${enums.REVIEW}/${reviewId}`);
