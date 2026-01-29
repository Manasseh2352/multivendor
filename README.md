# MultiVendor Marketplace Platform

A modern, responsive multivendor e-commerce platform built with Next.js, featuring vendor storefronts, product catalogs, and seamless shopping experiences.

## 🚀 Features

- **Multivendor Support**: Multiple vendors can showcase their products on individual storefronts
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Theme**: Built-in theme toggle for user preference
- **Product Filtering**: Advanced filtering options for products
- **Search Functionality**: Search through products and vendors
- **SEO Optimized**: Server-side rendering and static generation for better SEO
- **Fast Performance**: Built with Next.js for optimal performance
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern styling with utility-first CSS framework

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom component library
- **API**: Next.js API Routes
- **Deployment**: Vercel-ready

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd multivendor
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Project Structure

```
multivendor/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── vendors/       # Vendor-related APIs
│   ├── [vendorSlug]/      # Dynamic vendor pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── ...               # Feature components
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🏪 Vendor Categories

The platform currently supports vendors in the following categories:

- **Electronics**: Premium gadgets and tech products
- **Fashion**: Trendy clothing and lifestyle items
- **Home & Garden**: Home improvement and garden supplies

## 🔌 API Endpoints

- `GET /api/vendors` - Get all vendors
- `GET /api/vendors/[slug]` - Get specific vendor details

## 🎨 Customization

### Adding New Vendors

Vendors are defined in `app/api/vendors/data.ts`. Add new vendor objects to the `mockVendors` array:

```typescript
{
  id: 'vendor-id',
  name: 'Vendor Name',
  slug: 'vendor-slug',
  description: 'Vendor description',
  category: 'Category',
  img: '/path/to/image.jpg',
  products: [...],
  rating: 4.5,
  totalProducts: 10
}
```

### Styling

The project uses Tailwind CSS for styling. Customize themes in `app/globals.css` or modify component styles directly.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

### Other Platforms

The app can be deployed to any platform supporting Node.js:

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@multivendor.com or join our Discord community.

---

Built with ❤️ using Next.js
