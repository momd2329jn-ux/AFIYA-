const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

const accountType = document.getElementById("accountType");
const passwordGroup = document.getElementById("passwordGroup");
const passwordInput = document.getElementById("loginPassword");

accountType.addEventListener("change", function () {

    if (this.value === "patient") {
        passwordGroup.style.display = "none";
        passwordInput.required = false;
        passwordInput.value = "";
    } else {
        passwordGroup.style.display = "flex";
        passwordInput.required = true;
    }

});
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const phone = document.getElementById("loginPhone").value.trim();
    const type = accountType.value;
    const password = passwordInput.value;

    if (!type) {
        showLoginMessage("يرجى اختيار نوع الحساب.", "error");
        return;
    }

    if (!/^07\d{9}$/.test(phone)) {
        showLoginMessage(
            "يرجى إدخال رقم هاتف عراقي صحيح.",
            "error"
        );
        return;
    }

    if (type !== "patient" && password.length < 8) {
        showLoginMessage(
            "يرجى إدخال كلمة المرور بشكل صحيح.",
            "error"
        );
        return;
    }

    if (type === "patient") {
        showLoginMessage(
            "تم التحقق من رقم الهاتف شكلياً. تسجيل الدخول الفعلي يحتاج إرسال رمز تحقق وربط النظام بالخادم.",
            "info"
        );
    } else {
        showLoginMessage(
            "تم التحقق من صيغة البيانات. تسجيل الدخول الفعلي يحتاج ربط قاعدة البيانات.",
            "info"
        );
    }
});

function showLoginMessage(message, type) {
    loginMessage.textContent = message;
    loginMessage.className = "login-message show " + type;
}