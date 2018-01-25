// @flow weak
export const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Username is required';
    } else if (values.username.length < 6) {
        errors.username = 'Username is at least 6 character';
    }
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password is at least 6 characters';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Password and confirm password does not match';
    }
    return errors;
};
