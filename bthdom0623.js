// Biến toàn cục mảng 2 chiều chứa thông tin 
let listStudent = [
    ["SV001", "Nguyễn A", "abc@gmail.com", "1002998770","Hà Nội", "Nam"]
];
let action = "create";
// Hàm render dữ liệu listStudent ra table
function renderData (){
    // lấy ra phần tử được render dữ liệu
    // Truy cập vào phần tử tbody
    let tbody = document.getElementById("content");
    // Đặt tbody chưa chứa dữ liệu trước khi render
    tbody.innerHTML = "";
    for (let index = 0; index < listStudent.length; index++) {
        // render dữ liệu từng tbody, cộng chuỗi
        tbody.innerHTML+=`<tr>
                <td>${index + 1} </td>
                <td>${listStudent[index][0]}</td>
                <td>${listStudent[index][1]}</td>
                <td>${listStudent[index][2]}</td>
                <td>${listStudent[index][3]}</td>
                <td>${listStudent[index][4]}</td>
                <td>${listStudent[index][5]}</td>
                <td>
                <button onclick="editStudent('${listStudent[index][0]}')">Edit</button>
                <button onclick="deleteStudent('${listStudent[index][0]}')">Delete</button>
                </td>
            </tr>`
        
    }
}
// Hàm validate dữ liệu khách hàng khi thêm mới hoặc cập nhật
function validateForm() {
    // 1.Lấy dữ liệu từ form
    let studentId = document.getElementById("studentId").value;
    let studentName = document.getElementById("studentName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let gender = document.querySelector("input[name='gender']:checked").value;
    // 2. Thực hiện validate, nếu thỏa mãn thì trả về true, có lỗi thì thông báo false
    // Validate email
    // Validate cho studentID
    if (studentId == "") {
        alert("Vui lòng nhập mã sinh viên"); 
        return false;       
    }
    // validate tên
    if (studentName == "") {
        alert("Vui lòng nhập họ tên sinh viên");        
        return false;
    }
    // Validate email
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(emailPattern)) {
        alert("vui lòng nhập email đúng định dạng");
        return false;        
    }
    // Validate phone
    let phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!phone.match(phonePattern)) {
        alert("Vui lòng nhập số điện thoại đúng");
        return false;        
    }
    // Validate address
    if (address=="") {
        alert("Vui lòng nhập địa chỉ");
        return false;
        
    }
    return true;
}
// Hàm thực hiện thêm mới hoặc cập nhật sinh viên
// Truy cập vào phần tử và gắn sự kiện click
function createOrEdit() {
    if (validateForm()) {    
        // 1.Lấy dữ liệu từ form
        let studentId = document.getElementById("studentId").value;
        let studentName = document.getElementById("studentName").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let address = document.getElementById("address").value;
        let gender = document.querySelector("input[name='gender']:checked").value;   
    
    if (action == "create") {
        // Thực hiện thêm mới sinh viên
        
        // 2.push sinh viên vào mảng 2 chiều listStudent
        listStudent.push([studentId, studentName, email, phone, address, gender]);
      
    }else{
        // Thực hiện cập nhật sinh viên
        // 2.Lấy chỉ số sinh viên trong mảng
        let index = getStudentByStudentId(studentId);
        // 3.Tiến hành cập nhật
        listStudent[index][1] = studentName;
        listStudent[index][2] = email;
        listStudent[index][3] = phone;
        listStudent[index][4] = address;
        listStudent[index][5] = gender;
        // Cho phép nhập studentId
        document.getElementById("studentId").readOnly = false;

    }
      // Xóa dữ liệu trên form
    document.getElementById("studentId").value ="";
    document.getElementById("studentName").value ="";
    document.getElementById("email").value ="";
    document.getElementById("phone").value ="";
    document.getElementById("address").value ="";
    document.getElementById("male").checked =true;

    // Render lại dữ liệu trên table
    renderData();
    }
    
}
// Hàm lấy ra chỉ số SV trong listStudentId

function getStudentByStudentId(studentId) {
    for (let index = 0; index < listStudent.length; index++) {
        if (studentId==listStudent[index][0]) {
    return index;            
        }
        
    }    
    return -1;
}
// Hàm thực hiện lấy studentID từ table
function editStudent(studentId){
    // 1.Lấy chỉ số SV trong mảng
    let index = getStudentByStudentId(studentId);
    if(index>=0){
        // 2.fill thông tin sinh viên ra form
        document.getElementById("studentId").value =listStudent[index][0];
        document.getElementById("studentName").value =listStudent[index][1];
        document.getElementById("email").value =listStudent[index][2];
        document.getElementById("phone").value =listStudent[index][3];
        document.getElementById("address").value =listStudent[index][4];
        if(listStudent[index][5]=="Nam"){
            document.getElementById("male").checked = true;
        }else{
            document.getElementById("female").checked = true;
             
        }
        // Đổi action = edit
        action = "edit";       
        
    }

}
// Hàm thực hiện xóa sinh viên
function deleteStudent(studentId) {
    // 1.Lấy index sinh viên trong mảng
    let index = getStudentByStudentId(studentId);
    // 2.Thực hiện xóa theo index
    listStudent.splice(index,1);
    // 3.Render lại dữ liệu
    renderData();
    
}
document.onload = renderData();
let btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click", function(event){
// Chặn sự kiện submit của form
event.preventDefault();
createOrEdit();
});

