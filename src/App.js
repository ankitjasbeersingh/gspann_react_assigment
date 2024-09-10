import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="products">
        {products.slice(page * 10 - 10, page * 10).map((product) => {
          return (
            <span className="products__single" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <span>{product.title}</span>
            </span>
          );
        })}
      </div>
      {products.length > 0 && (
        <div className="pagination">
          <span onClick={() => selectPageHandler(page - 1)}>Prev</span>
          {[...Array(products.length / 10)].map((__, i) => {
            return (
              <span
                className={page === i + 1 ? 'pagination__selected' : ''}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}

          <span onClick={() => selectPageHandler(page + 1)}>Next</span>
        </div>
      )}
    </div>
  );
}

export default App;
