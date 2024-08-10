class CombinationsServices {
	constructor() {
		this.products = [];
		this.response = {
			status: "",
			data: null,
		};
		this.url = "http://localhost/test_fullstack/backend/combinations";
	}

	async searchProductCombinacion(maxValue) {
		try {
			const resp = await fetch(`${this.url}/${maxValue}`);
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
let combinationsServices = new CombinationsServices();

function searchProductCombinacion() {
	const maxValue = document.getElementById("searchCombination").value;
	combinationsServices.searchProductCombinacion(maxValue).then((response) => {
		products = response.data;
		renderProducts();
	});
}

function renderProducts() {
	const productList = document.getElementById("productList");
	productList.innerHTML = "";

	products.forEach((product) => {
		const row = document.createElement("tr");
		const nameProducts =
			product.length <= 3
				? `<li>${product[0]}</li><li>${product[1]}</li>`
				: `<li>${product[0]}</li><li>${product[1]}</li><li>${product[2]}</li>`;
		row.innerHTML = `
                <td><ol>${nameProducts}</ol></td>
				<td class="text-center">${product[product.length - 1]}</td>
            `;
		productList.appendChild(row);
	});
}
