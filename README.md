# StackFlow 📄

A modern web application for collecting, organizing, and merging PDF files with an intuitive drag-and-drop interface.

![StackFlow Demo](https://img.shields.io/badge/Status-Ready-green) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **🎯 Drag & Drop Interface**: Intuitive file upload by dragging PDF files directly into the app
- **📋 File Organization**: Reorder PDFs with simple drag-and-drop functionality
- **⚡ PDF Merging**: Combine multiple PDFs into a single document
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Clean, professional interface with smooth animations
- **🔒 Client-Side Processing**: All operations happen in your browser - no files are uploaded to servers
- **📊 File Information**: View file size and page count for each PDF
- **🚀 Fast Performance**: Powered by PDF-lib for efficient PDF processing

## 🚀 Getting Started

### Prerequisites

- Modern web browser with JavaScript enabled
- No additional software or installations required!

### Usage

1. **Open the App**: Simply open `index.html` in your web browser
2. **Add PDF Files**: 
   - Drag and drop PDF files into the upload area, or
   - Click "browse files" to select PDFs from your computer
3. **Organize**: Drag and drop PDFs in the list to reorder them
4. **Merge**: Click the "Merge PDFs" button to combine all files
5. **Download**: The merged PDF will automatically download to your device

### Live Demo

You can run StackFlow locally by:

```bash
# Clone the repository
git clone https://github.com/hoodhahmed/StackFlow.git

# Navigate to the directory
cd StackFlow

# Open in your browser
open index.html
# or
python -m http.server 8000  # Then visit http://localhost:8000
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **PDF Processing**: [PDF-lib](https://pdf-lib.js.org/) - A powerful PDF manipulation library
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Font**: Inter font family for optimal readability

## 📁 Project Structure

```
StackFlow/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality and PDF processing
├── README.md           # Project documentation
├── LICENSE             # MIT License
└── .gitignore         # Git ignore rules (Flutter-ready)
```

## 🎨 Design Principles

- **Minimalist**: Clean, distraction-free interface
- **Intuitive**: Self-explanatory user interactions
- **Responsive**: Optimized for all screen sizes
- **Accessible**: Semantic HTML and keyboard navigation support
- **Performance**: Lightweight and fast loading

## 🔧 Features in Detail

### File Upload
- Support for multiple PDF files
- Drag-and-drop from file explorer
- File type validation
- Visual feedback during drag operations

### PDF Organization
- Visual list of uploaded PDFs
- Drag-and-drop reordering
- File information display (size, page count)
- Individual file removal

### PDF Merging
- Client-side processing for privacy
- Progress indicator with status updates
- Automatic download of merged PDF
- Error handling and user feedback

### User Experience
- Smooth animations and transitions
- Loading states and progress feedback
- Success and error notifications
- Mobile-optimized touch interactions

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Keep the code simple and readable
- Maintain responsive design principles
- Test on multiple browsers and devices
- Follow existing code style and structure

## 📝 Browser Support

StackFlow works on all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- File API and ArrayBuffer
- PDF-lib compatibility

**Recommended browsers:**
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔐 Privacy & Security

- **No Data Collection**: No analytics or tracking
- **Client-Side Only**: All PDF processing happens in your browser
- **No Server Upload**: Files never leave your device
- **Secure**: No external API calls for PDF processing

## 📋 Roadmap

- [ ] **Add PDF Preview**: Thumbnail previews of PDF pages
- [ ] **Page Selection**: Choose specific pages to merge
- [ ] **PDF Splitting**: Split PDFs into separate files
- [ ] **Watermarking**: Add text or image watermarks
- [ ] **Encryption**: Password protection for merged PDFs
- [ ] **Cloud Integration**: Optional cloud storage support
- [ ] **Batch Processing**: Process multiple merge operations

## 🐛 Known Issues

- Large PDF files (>50MB) may take longer to process
- Very old browsers may not support all features
- Mobile browsers may have file size limitations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [PDF-lib](https://pdf-lib.js.org/) for excellent PDF manipulation capabilities
- [Inter Font](https://fonts.google.com/specimen/Inter) for beautiful typography
- The open-source community for inspiration and best practices

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/hoodhahmed/StackFlow/issues) page
2. Create a new issue with detailed information
3. Include browser version and steps to reproduce

---

**Made with ❤️ for the PDF-organizing community**

*StackFlow - Because organizing PDFs should be simple and enjoyable!*