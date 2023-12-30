const productsService = require('../services/productsService');

module.exports = {
    findAllProducts: async (request, response) => {
        try {
            const products = await productsService.findAll();
            response.status(200).json(products);
        } catch (error) {
            response.status(500).json({ error });
        }
    },
    findProductById: async (request, response) => {
        const productId = request.params.id;

        try {
            const product = await productsService.find(productId);
            if (product === null) {
                return response.status(404).json({ error: 'Product not found.' });
            }

            return response.json(product);
        } catch (error) {
            response.status(500).json({ error })
        }
    },
    insertProduct: async (request, response) => {
        const { name, code, description, price } = request.body;
        if (!name || !code || !description || !price) {
            return response.status(400).json({ error: 'Required fields are missing.' })
        }

        try {
            const productId = await productsService.insert(name, code, description, price);
            response.status(201).json({ id: productId, name, code, description, price });
        } catch (error) {
            response.status(500).json({ error })
        }
    },
    updateProduct: async (request, response) => {
        const productId = request.params.id;
        const { name, code, description, price } = request.body;

        if (!productId || !name || !code || !description || !price) {
            return json.status(400).response({ error: 'Required fields are missing.' })
        }

        try {
            await productsService.update(productId, name, code, description, price);
            response.status(200).json({ id: productId, name, code, description, price });
        } catch (error) {
            response.status(500).json({ error })
        }
    },
    deleteProduct: async (request, response) => {
        const productId = request.params.id;
        if (!productId) {
            return json.response({ error: 'Product ID is missing.' })
        }

        try {
            await productsService.delete(productId);
            response.status(200).send();
        } catch (error) {
            response.status(500).json({ error })
        }

    }
}

