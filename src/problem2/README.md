# Currency Swap Interface

A modern, user-friendly interface for swapping digital currencies built with React, TypeScript, and Tailwind CSS.

![Currency Swap Interface](https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&q=80&w=1000)

## Features

- 🔄 Real-time currency swapping
- 💱 Live exchange rate calculations
- 🎨 Beautiful, responsive UI
- 🖼️ Token icons integration
- 💯 Input validation
- ⚡ Built with Vite for optimal performance

## Tech Stack

- **React** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Vite** - Build Tool
- **Lucide React** - Icons

## Project Structure

```
src/
├── api/
│   └── tokens.ts           # API integration
├── components/
│   ├── ui/
│   │   └── Input.tsx       # Common component
│   ├── SwapForm.tsx        # Main swap interface
│   ├── TokenIcon.tsx       # Token icon component
│   └── TokenSelect.tsx     # Token selection dropdown
├── types/
│   └── token.ts           # TypeScript definitions
├── utils/
│   └── tokenUtils.ts      # Utility functions
└── App.tsx                # Root component
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Key Features Explained

### Token Price Fetching
- Fetches real-time token prices from the Switcheo API
- Automatically uses the latest price when multiple entries exist
- Handles API errors gracefully

### Exchange Rate Calculation
- Real-time exchange rate calculations
- Automatic rate updates when tokens are changed
- Clear display of conversion rates

### User Interface
- Clean and intuitive design
- Responsive layout that works on all devices
- Loading states for better user experience
- Error handling and validation
- Token icons from Switcheo's repository

### Type Safety
- Full TypeScript implementation
- Proper type definitions for all components
- Interface definitions for API responses

## API Integration

The application integrates with two main external services:

1. **Price API**
   - Endpoint: `https://interview.switcheo.com/prices.json`
   - Returns current token prices
   - Updates regularly

2. **Token Icons**
   - Source: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/`
   - SVG format icons for supported tokens
   - Fallback handling for missing icons

## Development Decisions

1. **Component Structure**
   - Separated concerns into small, focused components
   - Reusable components for common elements
   - Clear component hierarchy

2. **State Management**
   - Local state with React hooks
   - Efficient state updates
   - Proper error handling

3. **Performance**
   - Optimized re-renders
   - Efficient data fetching
   - Proper loading states

4. **User Experience**
   - Immediate feedback for user actions
   - Clear error messages
   - Smooth animations
   - Intuitive interface

## Future Improvements

- [ ] Add transaction history
- [ ] Implement price charts
- [ ] Add more token pairs
- [ ] Implement wallet connection
- [ ] Add slippage tolerance settings

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.