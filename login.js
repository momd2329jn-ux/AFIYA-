const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const phone = document.getElementById("loginPhone").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!/^07\d{9}$/.test(phone)) {
        showLoginMessage(
            "يرجى إدخال رقم هاتف عراقي صحيح يبدأ بـ 07 ويتكون من 11 رقمًا.",
            "error"
        );
        return;
    }

    if (password.length < 8) {
        showLoginMessage(
            "يرجى إدخال كلمة مرور تتكون من 8 أحرف أو أرقام على الأقل.",
            "error"
        );
        return;
    }

    showLoginMessage(
        "تم التحقق من صيغة البيانات، لكن تسجيل الدخول الحقيقي غير متاح بعد؛ لأن الموقع لم يُربط بقاعدة بيانات الحسابات.",
        "info"
    );
});

function showLoginMessage(message, type) {
    loginMessage.textContent = message;
    loginMessage.className = "login-message show " + type;
}