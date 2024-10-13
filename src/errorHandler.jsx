export function handleAxiosError(error, handleLogout) {
    if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
            alert('Authentication failed');
            if (handleLogout) handleLogout();
        } else {
            alert(`Server error: ${error.response.status} ${error.response.statusText}`);
        }
    } else if (error.request) {
        alert('Network error: No response from the server');
    } else {
        alert('Error: ' + error.message);
    }
}
