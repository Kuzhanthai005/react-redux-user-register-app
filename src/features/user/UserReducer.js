
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    staticId: 0,
    editFlg: false,
    editUserData: [''],
    userList: [ ]
}


const UserReducer = createSlice({
    name: 'userRedux',
    initialState,
    reducers: {
        addUser(state, action) {
            state.staticId = state.staticId + 1;
            action.payload.id = state.staticId;
            state.userList.push(action.payload)

            console.log(state.userList);

        },
        removeUser: (state, action) => {
            let id = action.payload;
            state.userList = state.userList.filter(user => {
                return user.id !== id
            })

             state.ucont -= 1;
        },
        updateUser: (state, action) => {
            let userInfo = action.payload;
            console.log(userInfo);
            state.userList = state.userList.map(user => {
                return parseInt(user.id) === parseInt(userInfo.id) ? userInfo : user;
            })
            console.log( state.userList);
            state.editFlg = false;
        },
        getUser: (state, action) => {
            state.editFlg = true;
        }

    }
});

export const userEditFlg = (state) => state.userRedux.editFlg;
export const selectEditUserData = (state) => state.userRedux.editUserData;

export const selectUsers = (state) => state.userRedux.userList;

export const { addUser, removeUser, updateUser, getUser } = UserReducer.actions
export default UserReducer.reducer;
