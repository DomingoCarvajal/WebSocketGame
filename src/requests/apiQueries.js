async function getPlayers() {
    try {
        const environment = 'local'
        const apiAddress = environment === 'local' ? 'localhost': '192.168.1.183';
        const apiURL = 'http://' + apiAddress + ':8000';
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