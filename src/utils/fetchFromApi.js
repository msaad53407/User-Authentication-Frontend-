async function fetchFromApi(endpoint, username, password) {
    try {
        const response = await fetch(`http://localhost:3000${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            }),
            // mode: 'no-cors'
        })
        return await response.json();
    } catch (error) {
        return {
            loginCondition: false,
            loginData: 'Some Error Occurred while logging in. Try again later.'
        }
    }

}

export default fetchFromApi;