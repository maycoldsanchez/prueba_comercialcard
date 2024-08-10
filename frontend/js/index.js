class IndexServices {
	constructor() {
		this.response = {
			status: "",
			data: null,
		};
		this.urlCats = "https://meowfacts.herokuapp.com/?count=2&lang=esp-mx";
		this.urlTipDay = "https://uselessfacts.jsph.pl/api/v2/facts/today";
	}

	async showTipsCats() {
		try {
			const resp = await fetch(`${this.urlCats}`);
			if (!resp.ok) {
				this.response = {
					status: 500,
					data: resp.status,
				};
			}
			this.response = await resp.json();
		} catch (error) {
			this.response = {
				status: 500,
				data: error.message,
			};
		}

		return this.response;
	}

	async showTipsDays() {
		try {
			const resp = await fetch(`${this.urlTipDay}`);
			if (!resp.ok) {
				this.response = {
					status: 500,
					data: resp.status,
				};
			}
			this.response = await resp.json();
		} catch (error) {
			this.response = {
				status: 500,
				data: error.message,
			};
		}

		return this.response;
	}
}

let tipsCats = [];
let indexServices = new IndexServices();

function loadTipsCats() {
	indexServices.showTipsCats().then((tips) => {
		tipsCats = tips.data;
		renderTips();
		$("#tipsModal").modal();
	});
}

function loadTipsDays() {
	indexServices.showTipsDays().then((tips) => {
		document.getElementById("tipsDay").innerText = tips.text;
		document.getElementById("tipsDaySource").innerText = tips.source;
	});
}

function renderTips() {
	const elTtips = document.getElementById("tips");
	elTtips.innerHTML = "";

	tipsCats.forEach((tip) => {
		const li = document.createElement("li");
		li.innerHTML = `${tip}`;
		li.style.marginTop = "10px";
		elTtips.appendChild(li);
	});
}

$(document).ready(() => {
	loadTipsCats();
	loadTipsDays();
});
