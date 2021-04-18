import { postUserData,logoutAction } from "../actions/actions.users";

const initialState = {
	email: "",
	fname: "",
    lname: "",
    id: ""
};

function userReducers(state = initialState, action) {
	switch (action.type) {
		case postUserData:
			return {
				email: action.email,
				fname: action.fname,
				lname: action.lname,
				id: action.id,
			};
		case logoutAction:
			return {
				initialState
			};
		default:
			return state;
	}
}

export default userReducers;
