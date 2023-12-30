const BASE_URL = 'http://localhost:3000/api';

async function findAllProducts() {
    const response = await fetch(`${BASE_URL}/products`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json;charset=UTF-8'
        }
    });

    if (!response.ok) {
        throw new Error(
            `${response.status} - ${response.statusText}`
        );
    }

    return await response.json();
}

async function insertProduct(data) {
    const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json;charset=UTF-8'
        }
    });

    if (!response.ok) {
        throw new Error(
            `${response.status} - ${response.statusText}`
        );
    }

    return await response.json();;
}

async function updateProduct(data, id) {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json;charset=UTF-8'
        }
    });

    if (!response.ok) {
        throw new Error(
            `${response.status} - ${response.statusText}`
        );
    }

    return await response.json();
}

async function deleteProduct(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(
            `${response.status} - ${response.statusText}`
        );
    }

    return true;
}