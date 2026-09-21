
import { useState, useEffect } from "react"
import { db } from "../data/db"

export const useCart = () => {


    const intialCart = () => {
        const localStorageCart = localStorage.getItem('cartla')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setcart] = useState(intialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem('cartla', JSON.stringify(cart))
    }, [cart])


    const addToCart = (item) => {

        const itemExist = cart.findIndex(guitar => guitar.id === item.id)

        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++;
            setcart(updatedCart)
        } else {
            item.quantity = 1;
            setcart([...cart, item])
        }
    }

    const removeFromCart = (id) => {
        setcart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    const increaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })

        setcart(updatedCart)
    }

    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })

        setcart(updatedCart)
    }

    const cleanCart = () => {
        setcart([])
    }

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity, 
        decreaseQuantity,
        cleanCart
    }
}