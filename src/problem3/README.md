# Wallet Balance Component Refactoring

This project demonstrates the refactoring of a React TypeScript wallet balance component to improve code quality, performance, and maintainability.

## 🔍 Original Code Issues

### 1. Type Safety Issues
- Loose typing with `any` in `getPriority` function
- Inconsistent interface usage
- Missing proper type definitions for blockchain values

### 2. Performance Issues
- Unnecessary re-renders due to improper useMemo dependencies
- Inefficient filtering and sorting logic
- Multiple array iterations that could be combined

### 3. Code Structure Issues
- Mixed responsibilities in component
- Hardcoded priority values
- Inconsistent error handling
- Using index as key in mapped elements
- Prop spreading without type safety

### 4. Anti-patterns
- Direct mutation of state
- Unclear boolean logic in filter conditions
- Inconsistent return types
- Poor separation of concerns

## ✨ Improvements Made

### 1. Enhanced Type Safety
- Added proper TypeScript interfaces
- Implemented enum for blockchain types
- Removed any types
- Added proper type guards

```typescript
enum Blockchain {
  ETHEREUM = 'Ethereum',
  ARBITRUM = 'Arbitrum',
  OSMOSIS = 'Osmosis',
  NEO = 'Neo',
  ZILLIGA = 'Zilliqa',
}

interface IWalletBalance {
  currency: Currency;
  blockchain: Blockchain;
  amount: number;
}
```

### 2. Performance Optimizations
- Optimized useMemo dependencies
- Combined filtering and sorting operations
- Implemented proper memoization
- Reduced unnecessary re-renders

### 3. Code Structure Improvements
- Separated business logic into custom hooks
- Created utility functions for reusable logic
- Implemented proper constants
- Used proper key generation

### 4. Best Practices Implementation
- Implemented proper error handling
- Improved code readability
- Enhanced component composition
- Added proper documentation

## 🚀 Key Features

- Type-safe wallet balance management
- Efficient sorting and filtering of balances
- Proper formatting of currency values
- USD value conversion
- Priority-based blockchain sorting

## 💻 Technology Stack

- React 18.3.1
- TypeScript
- Vite
- TailwindCSS

## 🏗️ Project Structure

```
src/
├── components/
│   └── WalletRow.tsx       # Common component
├── hooks/                  # Custom React hooks
│   ├── usePrices.ts
│   └── useWalletBalances.ts
├── pages/                  # Pages of the app
│   └── wallet
│       ├── style.css       # Separate styling 
│       └── index.tsx       # Root file of page 
├── utils/
│   ├── common.interface.ts  # Common interfaces
│   └── common.enums.ts      # Common enums
└── App.tsx                  # Root component
```

## 🔧 Code Examples

### Before (Anti-pattern):
```typescript
const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}
```

### After (Improved):
```typescript
const getPriority = useMemo(() => {
    const priorityMap: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };

    return (blockchain: string): number => {
      return priorityMap[blockchain] ?? -99;
    };
  }, []);
```

## 🌟 Best Practices Implemented

1. **Single Responsibility Principle**
   - Each component and function has a single, well-defined purpose
   - Logic is properly separated into appropriate files

2. **Type Safety**
   - Proper TypeScript interfaces and types
   - Proper type guards

3. **Performance**
   - Efficient memoization
   - Optimized rendering
   - Proper dependency management

4. **Code Quality**
   - Clear naming conventions
   - Proper error handling
   - Consistent code style
   - Comprehensive documentation

5. **Linting and Formatting**
   - To ensure a consistent and high-quality codebase, ESLint and Prettier are set up:
     - **ESLint:** Automatically checks for code quality issues, enforcing best practices for React, TypeScript, and JavaScript.

     - **Prettier:** Ensures consistent code formatting across the project by automatically applying predefined styling rules.

   - Both tools help maintain clean, error-free, and easily readable code throughout the development process.

## 🔄 Future Improvements

1. Add unit tests for components and utilities
2. Implement error boundary components
3. Add loading states and skeleton screens
4. Implement proper error messaging
5. Add accessibility features
6. Implement proper logging