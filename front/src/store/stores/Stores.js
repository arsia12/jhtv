import { useStores } from "../useStores";

export const Auth = () => {
    const { AuthStore } = useStores();
    return AuthStore;
}