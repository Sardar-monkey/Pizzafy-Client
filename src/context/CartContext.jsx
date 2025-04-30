import { createContext, useContext, useEffect, useState } from "react";


const CartContext = createContext();

export function useCart () {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    return useContext(CartContext);
}

export function CartProvider ({ children }) {
    const [CartItems, SetCartItem] = useState(() => {
        try {

            const LocalData = localStorage.getItem('CartItems');
            return LocalData ? JSON.parse(LocalData) : [];

        } catch(error) {
            console.error("Error : ", error)
            return [];
        }
    })

    useEffect(() => {
        try {

            localStorage.setItem('CartItems', JSON.stringify(CartItems));

        } catch(error) {
            console.error("Error : ", error)
            return [];
        }
    }, [CartItems]);
    
    function AddToCart (product) {
        SetCartItem(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item => 
                    item.id === product.id ? {...item, quantity: item.quantity + 1} : item
                )
            }
            else {
                return [...prevItems, {...product, quantity: 1}]
            }
        });
        alert(`${product.name} добавлен в корзину!`)
    }

    function RemoveFromCart (productId) {
        SetCartItem(prevItems => prevItems.filter(item => item.id !== productId));
        alert("Товар удален!")
    }

    function IncreaseQuantity (productId) {
        SetCartItem(prevItems => prevItems.map(item => item.id === productId ? {...item, quantity: item.quantity + 1} : item))
    }

    function DecreaseQuantity (productId) {
        SetCartItem(prevItems => prevItems.map(item => item.id === productId ? {...item, quantity: item.quantity - 1} : item)).filter(item => item.quantity > 0)
    }

    function ClearCart () {
        SetCartItem([]);
    }

    const TotalQuantity = CartItems.reduce((total, item) => total + item.quantity, 0);
    const TotalPrice = CartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const value = {
        CartItems,
        AddToCart,
        RemoveFromCart,
        IncreaseQuantity,
        DecreaseQuantity,
        ClearCart,
        TotalQuantity,
        TotalPrice
    };

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>


}