const prices = {
  "Áo": 150000,
  "Quần": 200000,
  "Giày": 500000
};

const form = document.getElementById("orderForm");
const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const deliveryDate = document.getElementById("deliveryDate");
const address = document.getElementById("address");
const note = document.getElementById("note");
const noteCounter = document.getElementById("noteCounter");
const totalPrice = document.getElementById("totalPrice");
const summaryBox = document.getElementById("summaryBox");
const summaryContent = document.getElementById("summaryContent");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");
const successMessage = document.getElementById("successMessage");

function setError(id, message) {
  document.getElementById(id + "Error").textContent = message;
}

function clearError(id) {
  document.getElementById(id + "Error").textContent = "";
}

function validateProduct() {
  if (product.value === "") {
    setError("product", "Vui lòng chọn sản phẩm");
    return false;
  }
  clearError("product");
  return true;
}

function validateQuantity() {
  const value = Number(quantity.value);
  if (!Number.isInteger(value) || value < 1 || value > 99) {
    setError("quantity", "Số lượng phải là số nguyên từ 1 đến 99");
    return false;
  }
  clearError("quantity");
  return true;
}

function validateDeliveryDate() {
  const value = deliveryDate.value;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(value);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  maxDate.setHours(0, 0, 0, 0);

  if (!value) {
    setError("deliveryDate", "Vui lòng chọn ngày giao hàng");
    return false;
  }
  if (selectedDate < today) {
    setError("deliveryDate", "Ngày giao hàng không được trong quá khứ");
    return false;
  }
  if (selectedDate > maxDate) {
    setError("deliveryDate", "Ngày giao hàng không được quá 30 ngày từ hôm nay");
    return false;
  }

  clearError("deliveryDate");
  return true;
}

function validateAddress() {
  const value = address.value.trim();
  if (value === "") {
    setError("address", "Địa chỉ không được để trống");
    return false;
  }
  if (value.length < 10) {
    setError("address", "Địa chỉ phải có ít nhất 10 ký tự");
    return false;
  }
  clearError("address");
  return true;
}

function validateNote() {
  const value = note.value.trim();
  if (value.length > 200) {
    setError("note", "Ghi chú không được vượt quá 200 ký tự");
    return false;
  }
  clearError("note");
  return true;
}

function validatePayment() {
  const payment = document.querySelector('input[name="payment"]:checked');
  if (!payment) {
    setError("payment", "Vui lòng chọn phương thức thanh toán");
    return false;
  }
  clearError("payment");
  return true;
}

function updateCounter() {
  const length = note.value.length;
  noteCounter.textContent = `${length}/200`;
  noteCounter.style.color = length > 200 ? "red" : "black";
}

function updateTotal() {
  const selectedProduct = product.value;
  const qty = Number(quantity.value);

  if (prices[selectedProduct] && qty > 0) {
    const total = prices[selectedProduct] * qty;
    totalPrice.textContent = total.toLocaleString("vi-VN");
  } else {
    totalPrice.textContent = "0";
  }
}

product.addEventListener("change", () => {
  validateProduct();
  updateTotal();
});

quantity.addEventListener("input", () => {
  validateQuantity();
  updateTotal();
});

deliveryDate.addEventListener("blur", validateDeliveryDate);
address.addEventListener("blur", validateAddress);
note.addEventListener("input", () => {
  updateCounter();
  validateNote();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isValid =
    validateProduct() &
    validateQuantity() &
    validateDeliveryDate() &
    validateAddress() &
    validateNote() &
    validatePayment();

  if (isValid) {
    const payment = document.querySelector('input[name="payment"]:checked').value;
    summaryContent.innerHTML = `
      <p><strong>Sản phẩm:</strong> ${product.value}</p>
      <p><strong>Số lượng:</strong> ${quantity.value}</p>
      <p><strong>Tổng tiền:</strong> ${totalPrice.textContent} VNĐ</p>
      <p><strong>Ngày giao:</strong> ${deliveryDate.value}</p>
      <p><strong>Địa chỉ:</strong> ${address.value}</p>
      <p><strong>Thanh toán:</strong> ${payment}</p>
    `;
    summaryBox.style.display = "block";
  }
});

confirmBtn.addEventListener("click", function () {
  form.style.display = "none";
  summaryBox.style.display = "none";
  successMessage.textContent = "Đặt hàng thành công!";
});

cancelBtn.addEventListener("click", function () {
  summaryBox.style.display = "none";
});