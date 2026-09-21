import { useState } from "react"
import { Guitar } from "./components/Guitar"
import { Header } from "./components/Header"
import { db } from "./data/db"


function App() {


  const [data, setdata] = useState(db)
  const [cart, setcart] = useState([])

  const MAX_ITEMS = 5


  const addToCart = (item) => {

    const itemExist = cart.findIndex(guitar => guitar.id === item.id)


    if (itemExist >= 0) {
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

  // const increaseQuantity = (id) => {
  //   const updatedCart = cart.map(item => {
  //     if (item.id === id && item.quantity < MAX_ITEMS) {
  //       return {
  //         ...item,
  //         quantity: item.quantity + 1
  //       }
  //     }
  //     return item
  //   })

  //   setcart(updatedCart)
  // }

  return (
    <>
      <Header cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setcart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
