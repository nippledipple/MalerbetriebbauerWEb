import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { name, email, phone, subject, message }: ContactRequest = await req.json();

    const emailBody = `
Neue Kontaktanfrage von der Website

═══════════════════════════════════════

Name: ${name}
E-Mail: ${email}
Telefon: ${phone || 'Nicht angegeben'}
Betreff: ${subject || 'Keine Betreffzeile'}

─────────────────────────────────────

Nachricht:
${message}

═══════════════════════════════════════
`;

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, message: 'E-Mail-Service nicht konfiguriert' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Malerbetrieb Bauer <onboarding@resend.dev>',
        to: ['malerbauer1468@gmx.de'],
        reply_to: email,
        subject: `Neue Kontaktanfrage: ${subject || 'Anfrage von ' + name}`,
        text: emailBody,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Resend API error:', error);
      throw new Error('E-Mail konnte nicht gesendet werden');
    }

    const data = await res.json();

    return new Response(
      JSON.stringify({ success: true, message: 'E-Mail erfolgreich gesendet', data }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in send-contact-email function:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
