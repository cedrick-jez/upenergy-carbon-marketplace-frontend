import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      const existingItem = state.items.find(item => item.tokenId === action.payload.tokenId);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.tokenId === action.payload.tokenId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.tokenId !== action.payload),
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.tokenId === action.payload.tokenId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload || [],
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('upenergy-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('upenergy-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Cart actions
  const addToCart = (token, quantity = 1) => {
    const cartItem = {
      tokenId: token.tokenId,
      name: `${token.projectType || 'Clean Cooking'} Project`,
      price: parseFloat(token.pricePerTon || 10),
      quantity,
      creditType: token.creditType || 'FCT',
      isFCT: token.isFCT || false,
      vintage: token.vintage || '2024',
      location: `${token.village}, ${token.country}`,
      methodology: token.methodology || 'VCS-VM0007',
      registry: token.registry || 'VCS',
      availableTons: token.availableTons || 100,
      image: null, // Could add project images later
    };
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: cartItem });
  };

  const removeFromCart = (tokenId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: tokenId });
  };

  const updateQuantity = (tokenId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { tokenId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Cart calculations
  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getFees = () => {
    const subtotal = getSubtotal();
    return subtotal * 0.05; // 5% platform fee
  };

  const getTotal = () => {
    return getSubtotal() + getFees();
  };

  const getFCTItems = () => {
    return state.items.filter(item => item.isFCT);
  };

  const getVerifiedItems = () => {
    return state.items.filter(item => !item.isFCT);
  };

  const isInCart = (tokenId) => {
    return state.items.some(item => item.tokenId === tokenId);
  };

  const getItemQuantity = (tokenId) => {
    const item = state.items.find(item => item.tokenId === tokenId);
    return item ? item.quantity : 0;
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal,
    getFees,
    getTotal,
    getFCTItems,
    getVerifiedItems,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
