# 🌟 Reena's Portfolio Website

A modern, responsive portfolio website showcasing my projects, skills, and photography work.

## ✨ Features

- **🖥️ Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Clean and professional design with smooth animations and glass morphism effects
- **📂 Project Showcase**: Detailed project cards with descriptions and technologies used
- **📊 Skills Section**: Visual representation of technical skills with progress bars
- **📷 Photography Gallery**: Filterable gallery showcasing my photography work
- **👩‍💻 About Me**: Professional background and personal interests
- **📱 Contact Form**: Easy way to get in touch directly from the website
- **⬇️ Downloadable CV**: One-click resume download option

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with CSS variables, flexbox/grid layouts, and animations
- **JavaScript** - Interactive elements, filtering, animations, and form validation
- **Font Awesome** - High-quality icons throughout the site
- **Google Fonts** - Poppins font family for clean typography

## 🚀 Setup Instructions

1. **Clone or download this repository**

   ```bash
   git clone https://github.com/ReenaBharath/portfolio.git
   ```

2. **Open the project folder**

   ```bash
   cd portfolio
   ```

3. **Launch the website**

   - Simply open the `index.html` file in your browser
   - Alternatively, you can use a local development server:

     ```bash
     # Using Python
     python -m http.server
     
     # Using Node.js and npx
     npx serve
     ```

## ✏️ Customization

### 👤 Updating Personal Information

- Edit the `index.html` file to update your name, bio, and contact information
- Replace `Reena Resume_2024.pdf` with your own updated resume
- Update social media links in the header and footer sections

### 🆕 Adding New Projects

1. Duplicate an existing project card in the projects section of `index.html`
2. Update the project title, description, image, and links
3. Modify the technology tags to reflect the tech stack used
4. Add project screenshots to the `images/projects/` directory

### 📸 Adding Photography

1. Add new images to the `images/Photography/` directory
2. Create new gallery items in `photography.html` following the existing pattern
3. Assign appropriate category classes (architecture, street, nature, events)

### 🎨 Changing Colors and Styling

- The color scheme and key design variables are defined at the top of the `styles.css` file in the `:root` selector
- Modify these variables to change the overall look and feel of the website:

  ```css
  :root {
    --color-background: #0f172a;
    --color-primary: #6e57e0;
    --color-accent: #c084fc;
    /* and more... */
  }
  ```

## 📁 File Structure

```plaintext
SimplePortfolio/
├── index.html              # Main portfolio page
├── photography.html        # Photography gallery page
├── styles.css              # Main CSS styles
├── script.js               # JavaScript functionality
├── images/                 # All website images
│   ├── projects/           # Project screenshots
│   ├── Photography/        # Photography gallery images
│   └── service-*.png       # Service offering images
├── Reena Resume_2024.pdf   # Downloadable resume
└── README.md               # This documentation
```

## 🌐 Pages

- **Home Page**: Main portfolio with hero section, projects, skills, and contact form
- **Photography Page**: Gallery of photography work with filtering by category

## 💻 Browser Compatibility

- Chrome (latest) ✓
- Firefox (latest) ✓
- Safari (latest) ✓
- Edge (latest) ✓
- Opera (latest) ✓

## 📱 Responsive Breakpoints

- Mobile: 480px and below
- Tablet: 481px to 768px
- Desktop: 769px and above

## 🔮 Future Enhancements

- Blog section for sharing tech articles and photography tips
- Dark/Light theme toggle
- Project detail pages with case studies
- Integration with a backend for the contact form

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📬 Contact

Feel free to reach out if you have any questions or suggestions:

- ✉️ Email: <reenabharath1581@gmail.com>
- 🔗 GitHub: [ReenaBharath](https://github.com/ReenaBharath)
- 👔 LinkedIn: [Reena Bharath](https://www.linkedin.com/in/reena-bharath-1b59481b8)
- 📷 Instagram: [15_reena_81](https://instagram.com/15_reena_81)
