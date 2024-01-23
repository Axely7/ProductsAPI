import { useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
import { Product } from "../interfaces/product";

export interface ProductState {
  isLoading: boolean;
  data: Product[];
}

const INITIAL_STATE: ProductState = {
  data: [],
  isLoading: false,
};

interface Props {
  children: JSX.Element;
}

export const ProductProvider = ({ children }: Props) => {
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
    <ProductContext.Provider value={{ ...state }}>
      {children}
    </ProductContext.Provider>
  );
};
