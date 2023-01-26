import { createContext, useContext, useReducer } from "react";
import AuthContext from "./AuthContext";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const initialState = {
        user: {},
        chatId: "null"
    }

    const userReducer = (state, action) => {
        if (action.type === "USER_CHANGED") {
            return {
                user: action.payload,
                chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
            }
        }
    }

    const [state, dispatch] = useReducer(userReducer, initialState);
    return <UserContext.Provider value={{ userData: state, dispatch }}>
        {children}
    </UserContext.Provider>
}

export default UserContext;
export { UserContextProvider };