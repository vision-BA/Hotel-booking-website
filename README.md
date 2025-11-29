# Hotel Booking System

A modern, responsive web-based hotel booking platform that allows guests to explore rooms, read testimonials, and book accommodations with an elegant user interface.

## Features

- **Navigation Bar** - Easy access to Home, Rooms, Testimonials, Contact, and About sections
- **User Authentication** - Sign Up and Login modals for secure user registration
- **Homepage Section** - Welcoming interface with time-based greetings (Good Morning, Afternoon, Evening, Night)
- **Room Showcase** - Display of luxury rooms with detailed descriptions and features:
  - Deluxe Room
  - Family Room
  - Single Room
  - Double Room
- **Search Functionality** - Search box in navigation bar for room searches
- **Testimonials Carousel** - Auto-rotating carousel displaying guest reviews with 5-star ratings
- **Contact Section** - Location information and contact details
- **Responsive Design** - Fully mobile-responsive layout

## Room Types & Pricing

- **Deluxe Room** - 125,000 TZS / 24hrs - Premium 5-star amenities
- **Family Room** - 85,000 TZS / 24hrs - Spacious with multiple beds
- **Double Room** - 65,000 TZS / 24hrs - Perfect for couples
- **Single Room** - 45,000 TZS / 24hrs - Budget-friendly option

## Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Flexbox and animations
- **JavaScript (ES6+)** - Interactive features and carousel functionality
- **Font Awesome** - Icon library for enhanced UI
- **Responsive Design** - Mobile-first approach

## File Structure

```
Hotel-booking-website/
├── dashboard.html          # Main homepage with navigation, rooms, testimonials
├── style.css               # Global styles and responsive design
├── script.js               # JavaScript functionality (modals, carousel, greeting)
├── includes/               # Reusable HTML components
│   ├── header.html         # Navigation header
│   ├── footer.html         # Footer component
│   └── load-includes.js    # Script loader for includes
├── README.md               # Project documentation
└── Room Images/            # Hotel room photography assets
```

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/vision-BA/Hotel-booking-website.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Hotel-booking-website
   ```

3. Open `dashboard.html` in your web browser to view the website

4. No installation or build process required - it's a static website

## Features Breakdown

### Navigation
- Sticky header with green theme (#4CAF50)
- Responsive navigation menu
- Search functionality for rooms
- Sign Up and Login buttons

### Modals
- **Sign Up Modal** - Email and password validation
- **Login Modal** - User authentication interface
- Backdrop overlay that covers entire homepage
- Smooth fade-in animations

### Room Cards
- Displays 5 luxury room options
- Image, title, pricing, and features
- "Book Now" call-to-action buttons
- Box shadow effects for depth

### Carousel
- Auto-rotating testimonials every 5 seconds
- Manual navigation with previous/next buttons
- Dot indicators for slide selection
- Smooth fade transitions
- Guest reviews with 5-star ratings

### Responsive Breakpoints
- Mobile (< 600px) - Vertical layout, full-width elements
- Tablet & Desktop (> 600px) - Multi-column layout with side-by-side content

## Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## Color Scheme

- **Primary Green**: #4CAF50
- **Secondary Blue**: #120be2
- **Text Colors**: #ffffff (white), #555 (gray)
- **Background**: #f1f1f1, #f9f9f9

## Future Enhancements

- Backend booking system integration
- Payment gateway integration (Stripe/PayPal)
- User account management
- Booking history and management
- Advanced search and filtering
- Photo gallery section
- Blog/News section
- Email confirmation for bookings
- Guest reviews and ratings system

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

- **vision-BA** - Project Owner

## Support

For issues or questions, please open an issue on the GitHub repository or contact us through the Contact section on the website.
