import { Router } from 'express';
import {
  createReview,
  updateReview,
  deleteReview,
} from '../../controllers/api/reviews.controllers.js';
import { checkAuthorizade } from '../../middleware/validateTokens.midleware.js';
import { validateSchema } from '../../middleware/validateSchemas.midleware.js';
import {
  reviewSchema,
  updateReviewSchema
} from '../../schemas/reviews.schema.js';

const reviewsRouter = Router();

const routeReviews = '/review';

// * Crear una reseña
reviewsRouter.post(
  `${routeReviews}/:userId`,
  checkAuthorizade('user'),
  validateSchema(reviewSchema),
  createReview
);

// * Actualizar una reseña
reviewsRouter.put(
  `${routeReviews}/:id`,
  checkAuthorizade('user'),
  validateSchema(updateReviewSchema),
  updateReview
);

// * Eliminar una reseña
reviewsRouter.delete(
  `${routeReviews}/:id`,
  checkAuthorizade('user'),
  deleteReview
);

export default reviewsRouter;
