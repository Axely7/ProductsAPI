import { createContext } from "react";
import { Product } from '../interfaces/product';

interface ProductContextProps {
    isLoading: boolean,
    data: Product[]
}



export const ProductContext = createContext({} as ProductContextProps)