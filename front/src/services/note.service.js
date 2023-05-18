const apiUrl = import.meta.env.VITE_API_URL;
export const postNote = async (encryptedText) => {
    const response = await fetch(apiUrl + '/note', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({encryptedText})
    });
    return await response.json();
}

export const getNote = async (id, key) => {
    const response = await fetch(apiUrl + `/note/${id}`);
    return await response.json();
}
