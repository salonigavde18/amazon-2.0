const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    price_data: {
      currency: "gbp", // Set the currency
      unit_amount: Math.round(item.price * 100), // Stripe accepts amount in cents, so multiply by 100
      product_data: {
        name: item.title, // Product name
        description: item.description, // Optional, but recommended
        images: [item.image], // Include image for the product
      },
    },
    quantity: 1, // Set the quantity of the product
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["GB","US"], // Specify allowed countries for shipping
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 500, // Shipping amount in the smallest currency unit (e.g., 500 cents = 5 GBP)
            currency: "gbp", // Specify the currency
          },
          display_name: "Standard Shipping", // Name for the shipping option
          delivery_estimate: {
            minimum: {
              unit: "business_day", // Specify the unit for the time estimate
              value: 1, // Minimum delivery estimate
            },
            maximum: {
              unit: "business_day",
              value: 3, // Maximum delivery estimate
            },
          },
        },
      },
    ],
    line_items: transformedItems, // Your line items (products)
    mode: "payment", // Payment mode
    success_url:`${process.env.HOST}/success`, // Redirect URL on success
    cancel_url: `${process.env.HOST}/checkout`, // Redirect URL on cancellation
    metadata: {
      email, // Include customer email in metadata
      images: JSON.stringify(items.map((item) => item.image)), // Add product images in metadata
    },
  });

  res.status(200).json({ id: session.id });
};