import './App.css'
import {useState, useEffect} from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error =>
        console.error(`Error fetching products: ${error.message}`),
      )
  }, [])

  const handleProductClick = product => {
    setSelectedProduct(product)
  }

  const handleCloseDetails = () => {
    setSelectedProduct(null)
  }

  return (
    <div className="App">
      <h1>Products Grid</h1>
      {selectedProduct ? (
        <div className="product-details">
          <img
            className="product-img"
            src={selectedProduct.image}
            alt={selectedProduct.title}
          />
          <h2>{selectedProduct.title}</h2>
          <p>${selectedProduct.price}</p>
          <p>{selectedProduct.description}</p>
          <p>Category: {selectedProduct.category}</p>
          <p>
            Rating: {selectedProduct.rating.rate} (
            {selectedProduct.rating.count} reviews)
          </p>
          <button type="button" onClick={handleCloseDetails}>
            Close
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <button
              type="button"
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <img
                className="product-img"
                src={product.image}
                alt={product.title}
              />
              <h5>{product.title}</h5>
              <p>${product.price}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
