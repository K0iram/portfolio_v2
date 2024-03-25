import { NextResponse, NextRequest } from "next/server";
import client from "@sendgrid/client";
import { redirect } from "next/navigation";

client.setApiKey(process.env.SENDGRID_API_KEY || ''); // Set your SendGrid API Key
const listId = process.env.SENDGRID_LIST_ID || ''; // Set your SendGrid List ID

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid or missing email address." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = {
      list_ids: [listId],
      contacts: [{ email }],
    };

    // Explicitly declare the method as HttpMethod type
    const sgRequest = {
      method: 'PUT',
      url: '/v3/marketing/contacts',
      body: data,
    };

    // SendGrid client request as before...
    const [response, body] = await client.request(sgRequest);

    return NextResponse.json(
      { message: response.body },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling POST request:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to process request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
