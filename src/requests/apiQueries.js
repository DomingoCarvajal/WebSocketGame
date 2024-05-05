async function getPlayers() {
    try {
        const apiURL = 'http://3.147.55.140';
        const response = await fetch(apiURL + '/players', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error; // Optionally handle or log the error
    }
}

module.exports = { getPlayers };