import {combineReducers} from 'redux'
import userReducer from './UserReducer/userReducer'


export default combineReducers({
    user : userReducer
})