function VaLiDaTion() {
    // Rỗng
    this.checkSpace = function (value, spthongbao, mess) {
        if (value === "") {
            getEle(spthongbao).innerHTML = mess;
            getEle(spthongbao).style.display = "block";
            return false;
        } else {

            getEle(spthongbao).innerHTML = "";
            getEle(spthongbao).style.display = "none";
            return true;
        };
    };
    // Check Name
    this.checkName = function (value, spthongbao, mess) {
        var check = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(check)) {
            getEle(spthongbao).innerHTML = "";
            getEle(spthongbao).style.display = "none";
            return true;
        } else {
            getEle(spthongbao).innerHTML = mess;
            getEle(spthongbao).style.display = "block";
            return false;
        };
    };

    // Check password
    this.checkPassword = function (value, spthongbao, mess) {
        var check = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if (value.match(check)) {
            getEle(spthongbao).innerHTML = "";
            getEle(spthongbao).style.display = "none";
            return true;
        } else {
            getEle(spthongbao).innerHTML = mess;
            getEle(spthongbao).style.display = "block";
            return false;
        };
    };

    // Check Mail
    this.checkEmail = function (value, spthongbao, mess) {
        var check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(check)) {
            getEle(spthongbao).innerHTML = "";
            getEle(spthongbao).style.display = "none";
            return true;
        } else {
            getEle(spthongbao).innerHTML = mess;
            getEle(spthongbao).style.display = "block";
            return false;
        };
    };

    // check Option
    this.checkOption = function (idSelect, spthongbao, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            getEle(spthongbao).innerHTML = "";
            getEle(spthongbao).style.display = "none";
            return true;
        } else {

            getEle(spthongbao).innerHTML = mess;
            getEle(spthongbao).style.display = "block";
            return false;
        };
    };

    // Không quá 60 ký tự
    this.kyTu = function (value, spthongbao, mess, max) {
        if (value.trim().length <= max) {
            getEle(spthongbao).innerHTML = "";
            getEle(spthongbao).style.display = "none";
            return true;
        } else {
            getEle(spthongbao).innerHTML = mess;
            getEle(spthongbao).style.display = "block";
            return false;
        };
    };

    // check Trùng
    this.trungTK = function (value, spthongbao, mess, dsnv) {
        var check = false;
        for (var i = 0; i < dsnv.length; i++) {
            var nv = dsnv[i];
            if (nv.taiKhoan === value) {
                check = true;
                break;
            };
        };
        if (check) {
            getEle(spthongbao).innerHTML = mess;
            getEle(spthongbao).style.display = "block";
            return false;
        } else {
            getEle(spthongbao).innerHTML = "";
            getEle(spthongbao).style.display = "none";
            return true;
        };
    };
};














