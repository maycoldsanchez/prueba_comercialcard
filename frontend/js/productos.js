class ProductServices {
	constructor() {
		this.products = [];
		this.productsFilter = [];
		this.currentProductId = null;
		this.response = {
			status: "",
			data: null,
		};
		this.url = "http://localhost/test_fullstack";
	}

	async getData() {
		try {
			const resp = await fetch(`${this.url}/productos`);
			if (!resp.ok) {
				this.response = {
					status: 500,
					data: resp.status,
				};
			}
			this.response = {
				status: 200,
				data: await resp.json(),
			};
		} catch (error) {
			this.response = {
				status: 500,
				data: error.message,
			};
		}

		return this.response;
	}

	async saveData(data) {
		try {
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			};
			const resp = await fetch(`${this.url}/productos`, options);
			if (!resp.ok) {
				this.response = {
					status: 500,
					data: resp.status,
				};
			}
			this.response = {
				status: 200,
				data: await resp.json(),
			};
		} catch (error) {
			this.response = {
				status: 500,
				data: error.message,
			};
		}

		return this.response;
	}

	async editData(id, data) {
		try {
			const options = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			};
			const resp = await fetch(`${this.url}/productos/${id}`, options);
			if (!resp.ok) {
				this.response = {
					status: 500,
					data: resp.status,
				};
			}
			this.response = {
				status: 200,
				data: await resp.json(),
			};
		} catch (error) {
			this.response = {
				status: 500,
				data: error.message,
			};
		}

		return this.response;
	}

	async deleteData(id) {
		try {
			const options = {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			};
			const resp = await fetch(`${this.url}/productos/${id}`, options);
			if (!resp.ok) {
				this.response = {
					status: 500,
					data: resp.status,
				};
			}
			this.response = {
				status: 200,
				data: await resp.json(),
			};
		} catch (error) {
			this.response = {
				status: 500,
				data: error.message,
			};
		}

		return this.response;
	}
}

let products = [];
let productService = new ProductServices();
let productsFilter = [];
let currentProductId = null;

function getData() {
	productService.getData().then((response) => {
		products = response.data;
		productsFilter = products.sort((a, b) => a.id - b.id);
		renderProducts();
	});
}

function saveProduct() {
	const nombre = document.getElementById("productName").value;
	const descripcion = document.getElementById("productDesc").value;
	const cantidad = document.getElementById("productCant").value;
	const precio = document.getElementById("productPrice").value;

	const newProduct = { nombre, descripcion, cantidad, precio };
	if (currentProductId) {
		productService.editData(currentProductId, newProduct).then(() => {
			getData();
		});
	} else {
		productService.saveData(newProduct).then(() => {
			getData();
		});
	}

	$("#productModal").modal("hide");
}

function infoInventario() {
	const invTotal = products.reduce(
		(sum, product) =>
			parseInt(sum) + parseInt(product.precio * product.cantidad),
		0
	);
	const maxProduct = products.sort((a, b) => b.precio - a.precio)[0];
	const minProduct = products.sort((a, b) => a.precio - b.precio)[0];
	document.getElementById("invTotal").innerHTML = `$ ${invTotal}`;
	document.getElementById(
		"maxProduct"
	).innerHTML = `${maxProduct.nombre} - $ ${maxProduct.precio}`;
	document.getElementById(
		"minProduct"
	).innerHTML = `${minProduct.nombre} - $ ${minProduct.precio}`;
}

function renderProducts() {
	const productList = document.getElementById("productList");
	productList.innerHTML = "";
	productsFilter.forEach((product) => {
		const row = document.createElement("tr");
		row.innerHTML = `
                <td class="text-center">${product.id}</td>
                <td>${product.nombre}</td>
				<td>${product.descripcion}</td>
                <td class="text-center">${product.precio}</td>
				<td class="text-center">${product.cantidad}</td>
                <td class="text-center">
                    <button class="btn btn-warning btn-sm" data-target="#productModal" onclick='openModal(${JSON.stringify(
											product
										)})'>Editar</button>
                    <button class="btn btn-danger btn-sm" data-target="#productModal" onclick='deleteProductModal(${
											product.id
										})'>Eliminar</button>
                </td>
            `;
		productList.appendChild(row);
	});
	infoInventario();
}

function deleteProduct() {
	productService.deleteData(currentProductId).then(() => {
		getData();
		$("#productModalDelete").modal("hide");
	});
}

function deleteProductModal(id) {
	currentProductId = id;
	let product = products.filter((product) => product.id === id)[0];
	document.getElementById("idProduct").innerText = product.id;
	document.getElementById("nameProduct").innerText = product.nombre;
	document.getElementById("descProduct").innerText = product.descripcion;
	$("#productModalDelete").modal();
}

function searchProduct() {
	const query = document.getElementById("search").value.toLowerCase();
	productsFilter = products.filter((product) =>
		product.nombre.toLowerCase().includes(query)
	);

	renderProducts();
}

function openModal(product = null) {
	if (product) {
		document.getElementById("productModalLabel").innerText = "Editar Producto";
		document.getElementById("productName").value = product.nombre;
		document.getElementById("productDesc").value = product.descripcion;
		document.getElementById("productPrice").value = product.precio;
		document.getElementById("productCant").value = product.cantidad;
		document.getElementById("productId").value = product.id;
		currentProductId = product.id;
	} else {
		document.getElementById("productModalLabel").innerText = "Añadir Producto";
		clearModal();
	}

	$("#productModal").modal();
}

function clearModal() {
	document.getElementById("productName").value = "";
	document.getElementById("productDesc").value = "";
	document.getElementById("productPrice").value = "";
	document.getElementById("productCant").value = "";
	document.getElementById("productId").value = "";
	currentProductId = null;
}

function sortTable(campo, element, type) {
	const isSort = $(element).data("sort");
	let sortOrder = $(element).data("order");
	sortOrder = sortOrder === "" ? "asc" : sortOrder === "asc" ? "desc" : "asc";
	const sortImg =
		sortOrder === "asc" ? "src/img/sort-down-alt.svg" : "src/img/sort-up.svg";

	$(element).data("order", sortOrder);
	$("thead th img").data("sort", false);
	$(element).data("sort", !isSort);
	$(element).attr("src", sortImg);

	if (type === "n") {
		productsFilter =
			sortOrder === "asc"
				? products.sort((a, b) => a[campo] - b[campo])
				: products.sort((a, b) => b[campo] - a[campo]);
	} else {
		productsFilter =
			sortOrder === "asc"
				? products.sort((a, b) => stringAsc(a, b, campo))
				: products.sort((a, b) => stringDesc(a, b, campo));
	}

	renderProducts();
}

function stringAsc(a, b, campo) {
	const nameA = a[campo].toUpperCase(); // ignore upper and lowercase
	const nameB = b[campo].toUpperCase(); // ignore upper and lowercase
	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}

	// names must be equal
	return 0;
}

function stringDesc(a, b, campo) {
	const nameA = a[campo].toUpperCase(); // ignore upper and lowercase
	const nameB = b[campo].toUpperCase(); // ignore upper and lowercase
	if (nameB < nameA) {
		return -1;
	}
	if (nameB > 1) {
		return 1;
	}

	// names must be equal
	return 0;
}

$(document).ready(() => {
	getData();
});
