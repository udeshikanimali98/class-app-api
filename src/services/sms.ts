export namespace SMSService {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_NUMBER;
    const client = require("twilio")(accountSid, authToken);
    export async function sendSMS(phoneNumber: string, text: string) {
      try {
        const message = await client.messages.create({
          body: text,
          from: twilioNumber,
          to: phoneNumber,
        });
  
        console.log("Message sent successfully. SID:", message.sid);
        return true;
      } catch (error: any) {
        console.error("Error sending message:", error.message);
        return false;
      }
    }
  }
  