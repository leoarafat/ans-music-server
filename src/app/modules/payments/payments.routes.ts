import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { paymentController } from './payments.controller';

const router = express.Router();

router.post(
  '/add-payment',
  auth(ENUM_USER_ROLE.ADMIN),
  paymentController.makePayment,
);
router.post(
  '/withdraw-payment',
  auth(ENUM_USER_ROLE.ADMIN),
  paymentController.withdrawAmount,
);

export const paymentRoutes = router;
