import { AUTH } from "../constants/actionTypes";
import * as api from '../api/index'

export const signIn = ({ formData, history }) => async (dispatch) => {
    try {
        //log in the user 
        const { data } = await api.signIn(formData)
        dispatch({ type: 'AUTH', data })
        history.push('/')
    } catch (error) {
        console.log('error', error);
    }

}
export const signUp = ({ formData, history }) => async (dispatch) => {
    try {
        //sign Up in the user 
        const { data } = await api.signUp(formData)
        dispatch({ type: 'AUTH', data })
        history.push('/')
    } catch (error) {
        console.log('error', error);
    }

}