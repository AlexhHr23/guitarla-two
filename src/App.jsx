import { useState } from "react"
import { Guitar } from "./components/Guitar"
import { Header } from "./components/Header"
import { db } from "./data/db"


function App() {


  const [data, setdata] = useState(db)
  const [cart, setcart] = useState([])

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

  return (
    <>
      <Header />
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
