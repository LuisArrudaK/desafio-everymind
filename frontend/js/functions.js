let products = [];
let currentProductIndex = null;

window.onload = async () => {
    await loadProducts();
    renderProducts();
}


const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const truncate = (source, size) => {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
}

const loadProducts = async () => {
    products = await findAllProducts();
}

const renderProducts = async () => {
    const tableBody = document.querySelector('.divTable tbody');
    tableBody.innerHTML = '';

    products.forEach((product, index) => {
        addProductToTable(product, index);
    });
}

const addProductToTable = (product, index) => {
    const tableBody = document.querySelector('.divTable tbody');
    tableBody.innerHTML += `
        <tr>
            <td>${product.name}</td>
            <td>${product.code}</td>
            <td>${truncate(product.description, 30)}</td>
            <td>${BRL.format(product.price)}</td>
            <td class="acao">
                <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
            </td>
            <td class="acao">
                <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
            </td>
        </tr>
    `;
}


const editItem = (index) => {
    openModal(true, index);
}

const deleteItem = async (index) => {
    if (confirm('Deseja mesmo deletar este item?')) {
        const productId = products[index].id;
        const deleted = await deleteProduct(productId);

        if (deleted) {
            products.splice(index, 1);
            renderProducts();
            alert('Produto deletado com sucesso!')
        }
    }
}

const openModal = (edit = false, index = null) => {
    currentProductIndex = index;

    const modal = document.querySelector('.modal-container')
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    const productNameInput = document.querySelector('#product-name');
    const productCodeInput = document.querySelector('#product-code');
    const productDescriptionInput = document.querySelector('#product-description');
    const productPriceInput = document.querySelector('#product-price');

    if (edit && index != null) {
        const product = products[index];

        productNameInput.value = product.name;
        productCodeInput.value = product.code;
        productDescriptionInput.value = product.description;
        productPriceInput.value = product.price;

        return;
    }

    productNameInput.value = '';
    productCodeInput.value = '';
    productDescriptionInput.value = '';
    productPriceInput.value = '';
}

const saveButton = document.querySelector('#button-save');
saveButton.onclick = async (event) => {
    const productNameInput = document.querySelector('#product-name');
    const productCodeInput = document.querySelector('#product-code');
    const productDescriptionInput = document.querySelector('#product-description');
    const productPriceInput = document.querySelector('#product-price');

    if (!productNameInput.value || !productCodeInput.value || !productDescriptionInput.value || !productPriceInput.value) {
        return;
    }

    event.preventDefault();

    const productData = {
        name: productNameInput.value,
        code: productCodeInput.value,
        description: productDescriptionInput.value,
        price: productPriceInput.value
    };

    if (currentProductIndex !== null) {
        const product = await updateProduct(productData, products[currentProductIndex].id);
        products[currentProductIndex] = product;
    } else {
        const product = await insertProduct(productData);
        products.push(product);
    }

    const modal = document.querySelector('.modal-container')
    modal.classList.remove('active');

    currentProductIndex = null;
    renderProducts();
}
