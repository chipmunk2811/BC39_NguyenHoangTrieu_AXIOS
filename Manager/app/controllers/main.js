var userService = new UserService();
var vaLiDaTion = new VaLiDaTion();

function getEle(id) {
    return document.getElementById(id);
};

// InerHTML form API
function getListUser() {
    userService.getListUserAPI()
        .then(function (result) {
            renderHTML(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}; getListUser();



function renderHTML(data) {
    var result = "";
    data.forEach(function (user, index) {
        result += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editUser('${user.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        </tr>
        `;
    });
    getEle("tblDanhSachNguoiDung").innerHTML = result;
};

// Tạo thẻ button
getEle("btnThemNguoiDung").onclick = function () {
    var result = `<button id="addUser" class="btn btn-success" onclick="addUser()">Thêm Người Dùng</button>`;
    getEle("addButton").innerHTML = result;
    var title = "Thêm Người Dùng";
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
};

// ClearData
document.getElementsByClassName("close")[0].onclick = function () {
    clearData();
};
function clearData() {
    getEle("TaiKhoan").value = "";
    getEle("HoTen").value = "";
    getEle("MatKhau").value = "";
    getEle("Email").value = "";
    getEle("HinhAnh").value = "";
    getEle("loaiNguoiDung").value = "Chọn loại người dùng";
    getEle("loaiNgonNgu").value = "Chọn ngôn ngữ";
    getEle("MoTa").value = "";

    getEle("spTaiKhoan").innerHTML = "";
    getEle("spHoTen").innerHTML = "";
    getEle("spMatKhau").innerHTML = "";
    getEle("spEmail").innerHTML = "";
    getEle("spHinhAnh").innerHTML = "";
    getEle("spLoaiND").innerHTML = "";
    getEle("spNgonNgu").innerHTML = "";
    getEle("spMoTa").innerHTML = "";

    if (getEle("addUser")) {
        getEle("addUser").style.display = "none";
    };
    getEle("TaiKhoan").disabled = false;
};

function DSNV() {
    var promise = new Promise(function (resolve, reject) {
        userService.getListUserAPI()
            .then(function (result) {
                resolve(result.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    })
    return promise;
};

async function layThongTin(TrueOrFalse,id) {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;


    // Validation
    var isValid = true;
    isValid &= vaLiDaTion.checkSpace(hoTen, "spHoTen", "(*) Vui lòng nhập Họ và Tên")
        && vaLiDaTion.checkName(hoTen, "spHoTen", "(*) Tên Không Được Có Ký Tự Đặc Biệt");

    isValid &= vaLiDaTion.checkSpace(matKhau, "spMatKhau", "(*) Không Để Mật Khẩu Trống")
        && vaLiDaTion.checkPassword(matKhau, "spMatKhau", "(*) Mật Khẩu (Chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)");

    isValid &= vaLiDaTion.checkSpace(email, "spEmail", "(*) Không Để Email Trống")
        && vaLiDaTion.checkEmail(email, "spEmail", "(*) Nhập Đúng Định Dạng Mail");

    isValid &= vaLiDaTion.checkSpace(hinhAnh, "spHinhAnh", "(*) Không Để Hình Ảnh Trống");

    isValid &= vaLiDaTion.checkOption("loaiNguoiDung", "spLoaiND", "(*) Vui lòng chọn Người Dùng");

    isValid &= vaLiDaTion.checkOption("loaiNgonNgu", "spNgonNgu", "(*) Vui lòng chọn Loại Ngôn Ngữ");

    isValid &= vaLiDaTion.checkSpace(moTa, "spMoTa", "(*) Không Để Mô Tả Trống")
        && vaLiDaTion.kyTu(moTa, "spMoTa", "(*) Mô Tả Quá 60 Ký Tự", 61);

    isValid &= vaLiDaTion.checkSpace(taiKhoan, "spTaiKhoan", "(*) Không Để Tài Khoản Trống");

    var dsnv = await DSNV();
    if (TrueOrFalse) {
        isValid &= vaLiDaTion.trungTK(taiKhoan, "spTaiKhoan", "Tài Khoản Của Bạn Bị Trùng", dsnv);
    };


    if (!isValid) return;
    // ADD User
    var user = new FormUser(id, taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);
    return user
};

async function addUser() {
    var user = await layThongTin(true,"");
    
    if (user) {
        userService
            .addUserAPI(user)
            .then(function (result) {
                alert("Add Success!");
                getListUser();
                document.getElementsByClassName("close")[0].click();
            })
            .catch(function (error) {
                alert(error);
            });
    };
}

// delete user
function deleteUser(id) {
    userService.deleteListUserAPI(id)
        .then(function (result) {
            alert("Delete Success!");
            getListUser();
        })
        .catch(function (error) {
            alert(error);
        });
};

// Edit
function editUser(id) {
    var result = `<button id="updataUser" class="btn btn-info" onclick="updataUser(${id})">Cập Nhật</button>`;
    getEle("addButton").innerHTML = result;
    var title = "Cập Nhật Người Dùng";
    document.getElementsByClassName("modal-title")[0].innerHTML = title;

    userService.getIDListUserAPI(id)
        .then(function (result) {
            var user = result.data;
            getEle("TaiKhoan").value = user.taiKhoan;
            getEle("HoTen").value = user.hoTen;
            getEle("MatKhau").value = user.matKhau;
            getEle("Email").value = user.email;
            getEle("HinhAnh").value = user.hinhAnh;
            getEle("loaiNguoiDung").value = user.loaiND;
            getEle("loaiNgonNgu").value = user.ngonNgu;
            getEle("MoTa").value = user.moTa;

            getEle("TaiKhoan").disabled = true;
        })
        .catch(function (error) {
            alert(error);
        });

};
// Updata
async function updataUser(id) {
    var user = await layThongTin(false,id);
    userService.updateUserAPI(user)
        .then(function (result) {
            alert("Updata Success!");
            getListUser();
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            alert(error);
        });
};

