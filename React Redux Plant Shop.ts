// Main file structure:
// - /src
//   - /components
//     - Header.jsx
//     - LandingPage.jsx
//     - ProductList.jsx
//     - CartPage.jsx
//     - ProductCard.jsx
//   - /redux
//     - store.js
//     - cartSlice.js
//   - App.jsx
//   - index.js

// redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find(p => p.id === action.payload.id);
      if (!item) {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find(p => p.id === action.payload);
      if (item) item.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find(p => p.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter(p => p.id !== action.payload);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;

// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import Header from './components/Header';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

// All component files like LandingPage, ProductList, CartPage, Header, and ProductCard
// will be added upon your request in the next step to complete the UI and interactivity.
