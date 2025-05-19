const $ = document.querySelector.bind(document);

function trigger(_this) {
	const ID = _this.getAttribute("data-id");
	if (ID) {
		$(".form-confirm").classList.remove("dialog--hide");
		$(".delete-dialog").setAttribute(
			"action",
			`./anison/${ID}?_method=DELETE`
		);
	}
}

function cancelTrigger(e) {
	$(".form-confirm").classList.add("dialog--hide");
}
