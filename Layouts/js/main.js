window.onscroll = function () {
	if (document.body.scrollTop > 200 ||
		document.documentElement.scrollTop > 200) {
		document.getElementById("header").style.position = "fixed";
		document.getElementById("header").style.backgroundColor = "#fff";
		document.getElementById("header").style.height = "48px";
		document.querySelector(".navbar-brand").style.display = "none";
		document.querySelector(".header__button").style.padding = "10px 20px";

		for (var i = 0; i < document.getElementsByClassName("navbar-nav")[0].getElementsByClassName("nav-item").length; i++) {
			document.getElementsByClassName("navbar-nav")[0].getElementsByClassName("nav-item")[i].getElementsByClassName("nav-link")[0].style.lineHeight = "48px";
		};
	} else {
		document.getElementById("header").style.position = "absolute";
		document.getElementById("header").style.backgroundColor = "transparent";
		document.querySelector(".navbar-brand").style.display = "block";
		document.querySelector(".header__button").style.padding = "15px 20px";

		for (var i = 0; i < document.getElementsByClassName("navbar-nav")[0].getElementsByClassName("nav-item").length; i++) {
			document
				.getElementsByClassName("navbar-nav")[0]
				.getElementsByClassName("nav-item")
			[i].getElementsByClassName("nav-link")[0].style.lineHeight = "80px";
		};
	};
};

function getEle(id) {
	return document.getElementById(id);
};

var userService = new UserService();


function getListOurTeach() {
	userService.getListUserAPI()
		.then(function (result) {
			renderOurTeach(result.data);
		})
		.catch(function (error) {
			console.log(error);
		});
}; getListOurTeach();

function renderOurTeach(data) {
	var result = "";
	data.forEach(function (teach, index) {
		let check = teach.loaiND;
		if (check === "GV") {
			result += `
        <div class="col-lg-3 col-sm-6 col-12">
			<div class="card user__card animate__animated animate__fadeIn">
				<div class="user__img">
					<img class="card-img-top" src="./image/${teach.hinhAnh}" alt="" />
				</div>
				<div class="card-body text-center">
					<h1 class="user__language">${teach.ngonNgu}</h6>
					<h1 class="card-title user__name">${teach.hoTen}</h1>
					<p class="card-text user__info">${teach.moTa}</p>
				</div>
			</div>
		</div>
        `;
		}
	});
	getEle("userList").innerHTML = result;
};


