# Currency Swapper

A modern, user-friendly interface for swapping digital currencies built with React, TypeScript, and Tailwind CSS.

![Currency Swapper](./src/images/currency_swapper.png)

## ✨ Key Features

- **Real-time Currency Exchange**
  - Live price updates from Switcheo API
  - Automatic rate calculations
  - Support for 30+ cryptocurrencies
  - Instant price conversion

- **Smart Token Management**
  - Automatic token icon loading
  - Fallback handling for missing icons
  - Latest price selection for each token
  - Price history tracking

- **Advanced UI/UX**
  - Responsive design for all devices
  - Interactive swap animation
  - Loading states and error handling
  - Form validation with clear feedback

- **Performance Optimized**
  - Efficient state management
  - Minimal re-renders
  - Lazy loading of assets
  - Optimized API calls

## 🛠 Tech Stack

- **Frontend:** React 18 with TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Icons:** Lucide React
- **State Management:** React Hooks
- **API Integration:** Fetch API
- **Type Safety:** TypeScript

## 📦 Project Structure

```
src/
├── api/
│   └── tokens.ts           # API integration & price fetching
├── components/
│   ├── ui/
│   │   └── Input.tsx       # Reusable input component
│   ├── SwapForm.tsx        # Main swap interface
│   ├── TokenIcon.tsx       # Token icon handling
│   └── TokenSelect.tsx     # Currency selection
├── types/
│   └── token.ts           # Common interfaces
├── utils/
│   └── tokenUtils.ts      # Currency calculations
└── App.tsx                # Root component
```

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/99techteam/code-challenge
   cd project-name
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 💱 Currency Swap Features

- **Token Selection**
  - Easy-to-use dropdown interface
  - Search functionality
  - Popular pairs quick selection
  - Recent pairs history

- **Price Calculation**
  - Real-time exchange rates
  - Price impact calculation
  - Slippage protection
  - Minimum received amount

- **Transaction Flow**
  - Simple one-click swap
  - Transaction preview
  - Confirmation modal
  - Success/Error feedback

## 🔌 API Integration

### Price API
- **Endpoint:** [Price API](https://interview.switcheo.com/prices.json)
- **Update Frequency:** Real-time
- **Data Format:** JSON with currency, date, and price
- **Error Handling:** Automatic retries and fallbacks

### Token Icons
- **Source:** [Switcheo GitHub Repository](https://github.com/Switcheo/token-icons/tree/main/tokens)
- **Format:** SVG icons
- **Fallback:** Automatic placeholder generation

## 🎯 Development Focus

1. **User Experience**
   - Intuitive interface
   - Responsive design
   - Clear feedback
   - Error prevention

2. **Performance**
   - Fast load times
   - Smooth animations
   - Efficient updates
   - Resource optimization

3. **Code Quality**
   - TypeScript for type safety
   - Component reusability
   - Clean architecture
   - Comprehensive testing

4. **Linting and Formatting**
   - To ensure a consistent and high-quality codebase, ESLint and Prettier are set up:
     - **ESLint:** Automatically checks for code quality issues, enforcing best practices for React, TypeScript, and JavaScript.

     - **Prettier:** Ensures consistent code formatting across the project by automatically applying predefined styling rules.

   - Both tools help maintain clean, error-free, and easily readable code throughout the development process.

## 🔜 Roadmap

- [ ]  Advanced trading features
- [ ]  Price charts integration
- [ ]  Multiple language support
- [ ]  Portfolio tracking
- [ ]  Transaction history
- [ ]  Price alerts
- [ ]  Mobile app version