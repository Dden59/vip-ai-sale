
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const shopId = process.env.YOOKASSA_SHOP_ID;
  const secretKey = process.env.YOOKASSA_SECRET_KEY;

  if (!shopId || !secretKey) {
    return new Response(JSON.stringify({ error: 'YooKassa credentials missing' }), { status: 500 });
  }

  try {
    const { amount, description, metadata } = await req.json();
    const idempotenceKey = crypto.randomUUID();

    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${shopId}:${secretKey}`),
        'Idempotence-Key': idempotenceKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: {
          value: amount,
          currency: 'RUB',
        },
        capture: true,
        confirmation: {
          type: 'redirect',
          return_url: `${new URL(req.url).origin}/success`,
        },
        description: description,
        metadata: metadata
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.description || 'YooKassa API error' }), { status: response.status });
    }

    return new Response(JSON.stringify({ confirmation_url: data.confirmation.confirmation_url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
