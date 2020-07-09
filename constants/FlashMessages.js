import { showMessage } from 'react-native-flash-message';

export const showError = (title, error) => { 
	showMessage({
		message: title,
		description: error,
		type: "warning",
		backgroundColor: "#C62828",
		color: "white"
	})
}