require("dotenv").config();
import { DUser, IUser } from "../models/user-model";
var nodemailer = require("nodemailer");
var nodemailerSendgrid = require("nodemailer-sendgrid");
var jwt = require("jsonwebtoken");
var fs = require("fs");
//import logo from "../assets/images/icon.png";

export namespace EmailService {
  const emailHeader = `<!DOCTYPE html> <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,initial-scale=1"> <meta name="x-apple-disable-message-reformatting"> <title></title> <!--[if mso]> <noscript> <xml> <o:OfficeDocumentSettings> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> </noscript> <![endif]--> <style> table, td, div, h1, p {font-family: Arial, sans-serif;} </style> </head> <body style="margin:0;padding:0;"> <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;"> <tr> <td align="center" style="padding:0;"> <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;"> <tr> <td align="center" style="padding:40px 0 10px 0;background:#fff;">  </td> </tr>`;
  const emailFooter = `<tr> <td style="padding:30px;background:#fc2c83;"> <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;"> <tr> <td style="padding:0;width:50%;" align="left"> <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;"> &copy; 
  Compatible1<br/><a href="" style="color:#ffffff;text-decoration:none;">All rights reserved.</a> </p> </td> <td style="padding:0;width:50%;" align="right"> <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;"> <tr> <td style="padding:0 0 0 10px;width:38px;"> <a href="" style="color:#ffffff;"><img src="https://mylavni.com/static/assets/img/social/linkedin.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a> </td> <td style="padding:0 0 0 10px;width:38px;"> <a href="" style="color:#ffffff;"><img src="https://mylavni.com/static/assets/img/social/facebook.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a> </td> <td style="padding:0 0 0 10px;width:38px;"> <a href="" style="color:#ffffff;"><img src="https://mylavni.com/static/assets/img/social/instagram.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </body> </html>`;

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  export async function sendWelcomeEmail(
    email: string,
    subject: string,
    bodyText1: string,
    bodyText2: string
  ) {
    try {
      const c = await transport.sendMail({
        from: process.env.MAIL_FROM_ADDRESS,
        to: `${email}`,
        subject: subject,
        html:
          emailHeader +
          `<tr>

            <td style="padding:36px 30px 42px 30px;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                <tr>
                  <td style="padding:0 0 36px 0;color:#153643;">     
                    <img src="https://i.ibb.co/xmBhPhV/compatible1-logo.png" style="width:15%;margin:0 0 25px 0;display:block;margin-left:auto;margin-right:auto;"/>             
                    <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;text-align:center;">${bodyText1}</h1>                  
                    <p style="margin:0 0 0px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;text-align:center;">${bodyText2}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>` +
          emailFooter,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  export async function sendVerifyEmail(
    email: string,
    subject: string,
    verificationCode: string,
    bodyText1: string,
    bodyText2: string
  ) {
    try {
      await transport.sendMail({
        from: process.env.MAIL_FROM_ADDRESS,
        to: `${email}`,
        subject: subject,
        html:
          emailHeader +
          `<tr>

            <td style="padding:36px 30px 42px 30px;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                <tr>
                  <td style="padding:0 0 36px 0;color:#153643;">     
                    <img src="https://i.ibb.co/xmBhPhV/compatible1-logo.png" style="width:15%;margin:0 0 25px 0;display:block;margin-left:auto;margin-right:auto;"/>             
                    <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">${bodyText1}</h1>                  
                    <p style="margin:0 0 0px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">${bodyText2}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;">
                    <div style="width: 100%; background: #efefef; font-family: Lucida Grande,Lucida Sans Unicode,Lucida Sans,Geneva,Verdana,sans-serif; font-weight: bold; text-align: center; padding: 50px 0px;">
                      <span style="color: #153643; font-size:20px;">${verificationCode}</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>` +
          emailFooter,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  export async function sendTestEmail(email: string, subject: string) {
    try {
      transport.sendMail({
        from: process.env.MAIL_FROM_ADDRESS,
        to: `${email}`,
        subject: subject,
        html:
          emailHeader +
          `<tr>
          <td style="padding:36px 30px 42px 30px;">
            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
              <tr>
                <td style="padding:0 0 36px 0;color:#153643;">
                  <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Welcome To Lavni</h1>
                  <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                    Test

                    <br/><br/>

                    Test 2
                  </p>
                  <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                    <a href="" style="color:#FF8000;text-decoration:underline; font-weight: bold;">Compatible1</a></p>
                  </td>
              </tr>
              <tr>
                <td style="padding:0;">
                  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                    
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>` +
          emailFooter,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
