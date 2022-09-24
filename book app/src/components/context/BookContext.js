import { createContext, useReducer } from "react";
export const BooksContext = createContext()
export const booksReducer = (state,action)=>{
   switch(action.type){
    case 'SET_FAVORITE':
        return{
            booksFav:action.payload
        }
    case 'CREATE_FAVORITE':
        return{
            booksFav:[...state.booksFav,action.payload]
        } 
    case 'REMOVE_FAVORITE':
        return{
           booksFav:state.booksFav.filter(book => book._id !== action.payload) 
        }
    default:
        return state    
    }
}
export const AuthReducer = (state,action)=>{
    switch (action.type) {
        case 'LOGIN': {
            state = true;
            return state;
        }
        case 'LOGOUT': {
            state = false;
            return state;
        }
        default :
        return state
    }
}
const initialAuth = localStorage.token ? true : false;
const booksFav = [];
export const BooksContextProvider = ({children}) =>{
    const [authState,authDispatch] = useReducer(AuthReducer,initialAuth)
    const [state,dispatch] = useReducer(booksReducer,{
        booksFav:[]
    })
    
    return (
        <BooksContext.Provider value={{...state,dispatch,authState,authDispatch}}>
            {children}
        </BooksContext.Provider>
    )
}