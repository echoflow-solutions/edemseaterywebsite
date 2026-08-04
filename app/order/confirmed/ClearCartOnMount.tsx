'use client';

import { useEffect } from 'react';

/**
 * The buyer lands here after paying on Square, outside the OrderProvider tree,
 * so the cart is cleared straight from storage. Without this they would return
 * to the menu with the order they just paid for still sitting in the cart.
 */
const ClearCartOnMount = () => {
  useEffect(() => {
    window.localStorage.removeItem('edems.cart.v1');
  }, []);

  return null;
};

export default ClearCartOnMount;
