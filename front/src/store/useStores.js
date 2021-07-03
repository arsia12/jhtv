import { createContext, useContext } from 'react';
import AuthStore from './AuthStore';

export const sotres = {
    AuthStore
}

export const storesContext = createContext({
    ...sotres,
})

export const useStores = () => {
    const store = useContext(storesContext);
    if(!store) {
        throw new Error('스토어 없음.');
    }
    return store;
}