//-----------clerk route------------
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const evt = await verifyWebhook(req);

		// Do something with payload
		const { id } = evt.data;
		const eventType = evt.type;

		// Log webhook received
		console.log(
			`Received webhook with ID ${id} and event type of ${eventType}`
		);
		console.log("Webhook payload:", evt.data);

		// Handle different event types
		if (eventType === "user.deleted") {
			console.log("user deleted!!");
			// Handle user deletion logic here
		}

		if (eventType === "user.updated") {
			console.log("user updated!!");
			// Handle user update logic here
		}

		if (eventType === "user.created") {
			console.log("user created!!");
			console.log("userId:", evt.data.id);
			// Handle user creation logic here
		}

		// Return successful response after handling the webhook
		return new Response("Webhook received", { status: 200 });
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error verifying webhook", { status: 400 });
	}
}
