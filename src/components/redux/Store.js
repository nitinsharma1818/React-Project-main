import { applyMiddleware, createStore } from "@reduxjs/toolkit"
import reduxThunk from "redux-thunk"
import root from "./RootReducer"
import logger from 'redux-logger'

const middlewares = [reduxThunk]

if(process.env.NODE_ENV === 'development')
  middlewares.push(logger)


export const store = createStore(root, applyMiddleware(...middlewares))


