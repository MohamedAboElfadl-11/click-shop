import Stripe from "stripe";

export const payWithCardDirectly = async (amount, card) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
        payment_method: 'pm_card_visa',
        confirm: true,
        automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never'
        }
    });

    return paymentIntent;
}