import { useContext, useEffect, useState } from "react";
import "./App.css";
import { ProductState } from "./context/ProductProvider";

function App() {
  const INITIAL_STATE: ProductState = {
    data: [],
    isLoading: false,
  };

  const [state, setState] = useState(INITIAL_STATE);

  const loadProducts = async () => {
    setState({ ...state, isLoading: true });
    const resp = await fetch("https://fakestoreapi.com/products");
    const data = await resp.json();

    setState({ ...state, data, isLoading: false });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center">
        {state.isLoading && (
          <div className="">
            <p className="text-4xl">Cargando...</p>
          </div>
        )}
        <div>
          {state.data.map((product) => (
            <div
              className=" bg-slate-200 border my-10 rounded-xl p-10 hover:bg-slate-300 hover:cursor-pointer"
              key={product.id}
            >
              <div className="flex justify-center mx-auto w-40">
                <img
                  src={product.image}
                  alt="image product"
                  className="rounded-xl"
                />
              </div>
              <div>
                <p className="text-2xl">{product.title}</p>
                <p>{product.description}</p>
                <p className="text-center">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
