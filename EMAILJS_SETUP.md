# EmailJS Setup Guide for Booking Confirmation Emails

This guide will help you configure EmailJS to send booking confirmation emails when customers complete the booking review step.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. Log in to your EmailJS dashboard: [https://dashboard.emailjs.com/admin](https://dashboard.emailjs.com/admin)
2. Go to **Email Services** in the left sidebar
3. Click **Add New Service**
4. Choose your email provider (Gmail, Outlook, etc.)
5. Follow the setup instructions for your email provider
6. Note down your **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the left sidebar
2. Click **Create New Template**
3. Use the following template:

### Template Subject:
```
Booking Confirmation - Vision Hotel

### Template Body (HTML):
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .booking-details { background-color: white; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .detail-row { margin: 10px 0; padding: 10px; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #1b2b65; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Vision Hotel</h1>
            <h2>Booking Confirmation</h2>
        </div>
        <div class="content">
            <p>Dear {{customer_name}},</p>
            <p>Thank you for choosing Vision Hotel! We have received your booking request and are pleased to confirm the following details:</p>
            
            <div class="booking-details">
                <h3>Booking Details</h3>
                <div class="detail-row">
                    <span class="label">Guest Name:</span> {{customer_name}}
                </div>
                <div class="detail-row">
                    <span class="label">Email:</span> {{customer_email}}
                </div>
                <div class="detail-row">
                    <span class="label">Phone:</span> {{customer_phone}}
                </div>
                <div class="detail-row">
                    <span class="label">Check-In Date:</span> {{check_in_date}}
                </div>
                <div class="detail-row">
                    <span class="label">Check-Out Date:</span> {{check_out_date}}
                </div>
                <div class="detail-row">
                    <span class="label">Number of Guests:</span> {{number_of_guests}}
                </div>
                <div class="detail-row">
                    <span class="label">Number of Nights:</span> {{number_of_nights}} night(s)
                </div>
                <div class="detail-row">
                    <span class="label">Special Requests:</span> {{special_requests}}
                </div>
                <div class="detail-row">
                    <span class="label">Booking Date:</span> {{booking_date}}
                </div>
            </div>
            
            <p>Our team will review your booking and send you a confirmation within 24 hours. If you have any questions or need to make changes, please contact us at:</p>
            <ul>
                <li>Phone: +255 123 456 789</li>
                <li>Email: info@hotelname.com</li>
            </ul>
            
            <p>We look forward to hosting you at Vision Hotel!</p>
            <p>Best regards,<br>The Vision Hotel Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Vision Hotel. All rights reserved.</p>
            <p>Mbeya, Tanzania</p>
        </div>
    </div>
</body>
</html>
```

4. Note down your **Template ID** (e.g., `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the EmailJS dashboard
2. Find your **Public Key** under "API Keys"
3. Copy your **Public Key**

## Step 5: Configure the Website

Open `script.js` file and find the following lines (around line 486-490):

```javascript
// Initialize EmailJS with your Public Key
emailjs.init({
  publicKey: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS Public Key
});
```

Replace `'YOUR_PUBLIC_KEY'` with your actual Public Key.

Then find these lines (around line 510-511):

```javascript
const SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS Service ID
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS Template ID
```

Replace:
- `'YOUR_SERVICE_ID'` with your Service ID from Step 2
- `'YOUR_TEMPLATE_ID'` with your Template ID from Step 3

## Step 6: Test the Email Functionality

1. Open your website
2. Go through the booking process
3. Fill in all details and reach the review step
4. Click "Confirm Booking"
5. Check the email address you entered in the booking form
6. You should receive a confirmation email with all booking details

## Troubleshooting

### Email not sending?
1. Check browser console for errors (F12 → Console tab)
2. Verify all three IDs are correctly set in `script.js`
3. Make sure EmailJS library is loaded (check Network tab)
4. Verify your email service is active in EmailJS dashboard
5. Check your email service provider's spam folder

### Template variables not showing?
- Make sure the template variable names match exactly (case-sensitive)
- Variables should be wrapped in double curly braces: `{{variable_name}}`

### Getting rate limit errors?
- Free tier allows 200 emails per month
- Consider upgrading to a paid plan if needed

## Important Notes

- The email is sent to the customer's email address entered during booking
- All booking details from the review step are included in the email
- The email sending happens when the user clicks "Confirm Booking" on the review step
- If email sending fails, the booking is still processed (with a warning message)

## Security Note

**DO NOT** commit your actual EmailJS credentials to version control. Consider:
- Using environment variables for production
- Keeping credentials in a separate config file that's in `.gitignore`
- Using different credentials for development and production

