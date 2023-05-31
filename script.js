const color = document.querySelector(".color");
const hexColor = document.querySelector(".value");
const toast = document.querySelector(".toast");
const copyBtn = document.querySelectorAll("[data-copy]");
const rangeInput = document.querySelectorAll("[data-color-range]");

window.addEventListener("load", () => finalColor());

let handleCopy = function () {
	let action = this.dataset.copy;
	if (action == "rgb") {
		navigator.clipboard.writeText(color.textContent);
		let previousText = this.textContent;
		this.textContent = "Copied";
		setTimeout(() => (this.textContent = previousText), 1000);
	} else if (action == "hex") {
		navigator.clipboard.writeText(hexColor.textContent);
		toast.classList.add("open");
		setTimeout(() => toast.classList.remove("open"), 1000);
	}
};

let finalColor = function () {
	let values = [...rangeInput].map((input) => input.value);
	let changedColor = `rgb(${values[0]},${values[1]},${values[2]})`;
	color.textContent = changedColor;
	hexColor.textContent = toHex(values);
	document.body.style.background = changedColor;
};

let toHex = (color) => {
	let hexOfColor = color
		.map((clr) => {
			if (clr == 0) {
				return "00";
			}
			return Number(clr).toString(16);
		})
		.join("");
	return `#${hexOfColor}`;
};

copyBtn.forEach((btn) => {
	btn.addEventListener("click", handleCopy);
});

rangeInput.forEach((input) => {
	input.addEventListener("input", finalColor);
});
