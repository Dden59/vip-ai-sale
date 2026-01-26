
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const shopId = process.env.YOOKASSA_SHOP_ID?.trim();
  const secretKey = process.env.YOOKASSA_SECRET_KEY?.trim();

  if (!shopId || !secretKey) {
    return new Response(JSON.stringify({ error: 'Ключи ЮKassa не найдены в настройках Vercel' }), { status: 500 });
  }

  try {
    const { amount, description, metadata } = await req.json();
    const idempotenceKey = crypto.randomUUID();
    const origin = req.headers.get('origin') || new URL(req.url).origin;
    const returnUrl = `${origin}/success.html`;

    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${shopId}:${secretKey}`),
        'Idempotence-Key': idempotenceKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: {
          value: String(amount),
          currency: 'RUB',
        },
        capture: true,
        confirmation: {
          type: 'redirect',
          return_url: returnUrl,
        },
        description: description || 'Обучение AI-COMMUNITY',
        metadata: {
          name: String(metadata?.name || 'Guest'),
          email: String(metadata?.email || 'No email')
        },
        // ДОБАВЛЕН ОБЪЕКТ ЧЕКА (ФИСКАЛИЗАЦИЯ)
        receipt: {
          customer: {
            email: String(metadata?.email)
          },
          items: [
            {
              description: description || 'Обучение AI-COMMUNITY',
              quantity: "1.00",
              amount: {
                value: String(amount),
                currency: 'RUB'
              },
              vat_code: "1", // 1 — без НДС. 2 — 0%, 3 — 10%, 4 — 20%
              payment_mode: "full_payment",
              payment_subject: "service"
            }
          ]
        }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Yookassa Error Detail:', JSON.stringify(data, null, 2));
      return new Response(JSON.stringify({ 
        error: `ЮKassa: ${data.description || data.code || 'Ошибка запроса'}` 
      }), { status: response.status });
    }

    return new Response(JSON.stringify({ confirmation_url: data.confirmation.confirmation_url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера: ' + error.message }), { status: 500 });
  }
}