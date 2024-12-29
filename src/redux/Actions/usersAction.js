import axios from "axios";
import * as types from './actionTypes';

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: types.GET_ALL_USER_LOADING
        })

        const res = await axios.get(`${process.env.BACKEND_URL}/users/`,
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        );
        dispatch({
            type: types.GET_ALL_USER_SUCCESS, payload: res
        });
    } catch (error) {
        dispatch({
            type: types.GET_ALL_USER_FAIL, payload: error
        });
    }
}

export const registerUser = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: types.REGISTER_USER_LOADING
        })

        const res = await axios.post(`${process.env.BACKEND_URL}/users/new`, formData,
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        );
        dispatch({
            type: types.REGISTER_USER_SUCCESS, payload: res
        });

        dispatch(getAllUsers());
    } catch (error) {
        dispatch({
            type: types.REGISTER_USER_FAIL, payload: error
        });

    }

}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: types.DELETE_USER_LOADING
        })

        const res = await axios.delete(`${process.env.BACKEND_URL}/users/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )

        dispatch({
            type: types.DELETE_USER_SUCCESS, payload: res
        })

        dispatch(getAllUsers());
    } catch (error) {
        dispatch({
            type: types.DELETE_USER_FAIL, payload: error
        })

    }
}

export const changePassword = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: types.CHANGE_PASSWORD_LOADING
        })

        const res = await axios.patch(`${process.env.BACKEND_URL}/auth/changepassword`, formData,
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )

        dispatch({
            type: types.CHANGE_PASSWORD_SUCCESS, payload: res
        })
    } catch (error) {
        dispatch({
            type: types.CHANGE_PASSWORD_FAIL, payload: error
        })

    }
}

export const updateUser = (id, formData) => async (dispatch) => {
    try {
        dispatch({
            type: types.UPDATE_USER_LOADING
        })

        const res = await axios.put(`${process.env.BACKEND_URL}/users/${id}`, formData,
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )

        dispatch({
            type: types.UPDATE_USER_SUCCESS, payload: res
        })
    } catch (error) {
        dispatch({
            type: types.UPDATE_USER_FAIL, payload: error
        })
    }
}

export const getUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: types.GET_ONE_USER_LOADING
        })

        const res = await axios.get(`${process.env.BACKEND_URL}/users/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )
        dispatch({
            type: types.GET_ONE_USER_SUCCESS, payload: res
        })
    } catch (error) {
        dispatch({
            type: types.GET_ONE_USER_FAIL, payload: error
        })
    }
}

export const uploadImage = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: types.UPLOAD_IMAGE_LOADING
        })

        const res = await axios.patch(`${process.env.BACKEND_URL}/users/upload_profile_picture/upload`, formData,
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )

        dispatch({ type: types.UPLOAD_IMAGE_SUCCESS, payload: res })
    } catch (error) {
        dispatch({
            type: types.UPLOAD_IMAGE_FAIL, payload: error
        })
    }
}
