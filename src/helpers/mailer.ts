import nodemailer from 'nodemailer';
import User from '../models/userModel';
import bcryptjs from 'bcryptjs';


type SendEmailParams ={
   email: string;
   emailType: "VERIFY" | "RESET";
   userId: string;
};

export const sendEmail = async ({emailType,userId}:SendEmailParams) => {
   try{
        //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

       if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(userId, 
            {
                verifyToken: hashedToken,
                verifyTokenExpiry:Date.now() + 3600000 // 1 hour
            }
        //   {new:true, runValidators:true}
        )
       } else if (emailType === "RESET") {
        await User.findByIdAndUpdate(userId, 
            {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry:Date.now() + 3600000 // 1 hour
            }
        //   {new:true, runValidators:true}
        )
       }
       
       // Looking to send emails in production? Check out our Email API/SMTP product!
     const  transport = nodemailer.createTransport({
        host: "live.smtp.mailtrap.io",
        port: 587,
        auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS 
        
        //add to .env file
        }
    });

    const mailOptions = {
        from: '"Demo App"<no-reply@demomailtrap.co>', //'ndungudavidmuchoki@gmail.com'
        to: "ndungudavidmuchoki@gmail.com",
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: 
        `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetPassword"}?token=${hashedToken}">
        here</a>
        to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        </p>
        
        <p>
        or copy paste the link below in your browser:
        <br>${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetPassword"}?token=${hashedToken}
        </p>
        <p>This link is valid for 1 hour</p>
        <p>If you did not request this email, please ignore it.</p>
        <p>Thanks,</p>
        <p>Team Awesome</p>
        `
    }
     const mailresponse = await transport.sendMail
     (mailOptions);
     return mailresponse;
   } catch (error: unknown) {
    if(error instanceof Error) 
        throw new Error(error.message);
   }
}