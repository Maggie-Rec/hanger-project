import { Next, ParameterizedContext } from 'koa';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

interface PaymentRequestBody {
  amount: number;
}

const stripeTransaction = async (ctx: ParameterizedContext, next: Next) => {
  const { amount } = ctx.request.body as PaymentRequestBody;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'gbp',
    });

    ctx.status = 200;
    ctx.body = { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error('[Stripe] Error:', error);
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while processing the payment.' };
    throw error;
  }
};

export { stripeTransaction };
