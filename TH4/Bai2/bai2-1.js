const form = document.getElementById("registerForm");
const successMessage = document.getElementById("successMessage");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const fullnameCounter = document.getElementById("fullnameCounter");
const togglePassword = document.getElementById("togglePassword");
const passwordStrengthText = document.getElementById("passwordStrengthText");
const passwordStrengthBar = document.getElementById("passwordStrengthBar");

function showError(field, message) {
  document.getElementById(field.id + "Error").textContent = message;
  field.classList.add("invalid");
  field.classList.remove("valid");
}

function clearError(field) {
  document.getElementById(field.id + "Error").textContent = "";
  field.classList.remove("invalid");
  field.classList.add("valid");
}

function validateFullname() {
  const value = fullname.value.trim();
  const regex = /^[a-zA-ZÀ-ỹ\s]+$/;

  if (value === "") {
    showError(fullname, "Họ tên không được để trống");
    return false;
  }
  if (value.length < 3) {
    showError(fullname, "Họ tên phải có ít nhất 3 ký tự");
    return false;
  }
  if (!regex.test(value)) {
    showError(fullname, "Họ tên chỉ được chứa chữ cái và khoảng trắng");
    return false;
  }

  clearError(fullname);
  return true;
}

function validateEmail() {
  const value = email.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === "") {
    showError(email, "Email không được để trống");
    return false;
  }
  if (!regex.test(value)) {
    showError(email, "Email không đúng định dạng");
    return false;
  }

  clearError(email);
  return true;
}

function validatePhone() {
  const value = phone.value.trim();
  const regex = /^0[0-9]{9}$/;

  if (value === "") {
    showError(phone, "Số điện thoại không được để trống");
    return false;
  }
  if (!regex.test(value)) {
    showError(phone, "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0");
    return false;
  }

  clearError(phone);
  return true;
}

function validatePassword() {
  const value = password.value;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (value === "") {
    showError(password, "Mật khẩu không được để trống");
    return false;
  }
  if (!regex.test(value)) {
    showError(password, "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số");
    return false;
  }

  clearError(password);
  return true;
}

function validateConfirmPassword() {
  const value = confirmPassword.value;

  if (value === "") {
    showError(confirmPassword, "Vui lòng xác nhận mật khẩu");
    return false;
  }
  if (value !== password.value) {
    showError(confirmPassword, "Mật khẩu xác nhận không khớp");
    return false;
  }

  clearError(confirmPassword);
  return true;
}

function validateGender() {
  const gender = document.querySelector('input[name="gender"]:checked');
  const genderError = document.getElementById("genderError");

  if (!gender) {
    genderError.textContent = "Vui lòng chọn giới tính";
    return false;
  }

  genderError.textContent = "";
  return true;
}

function validateTerms() {
  const termsError = document.getElementById("termsError");

  if (!terms.checked) {
    termsError.textContent = "Bạn phải đồng ý với điều khoản";
    return false;
  }

  termsError.textContent = "";
  return true;
}

fullname.addEventListener("blur", validateFullname);
email.addEventListener("blur", validateEmail);
phone.addEventListener("blur", validatePhone);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);

fullname.addEventListener("input", () => clearError(fullname));
email.addEventListener("input", () => clearError(email));
phone.addEventListener("input", () => clearError(phone));
password.addEventListener("input", () => clearError(password));
confirmPassword.addEventListener("input", () => clearError(confirmPassword));

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isValid =
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirmPassword() &
    validateGender() &
    validateTerms();

  if (isValid) {
    form.style.display = "none";
    successMessage.textContent = `Đăng ký thành công! Xin chào, ${fullname.value.trim()}!`;
  }
});
