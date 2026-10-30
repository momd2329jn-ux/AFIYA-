const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const accountType = document.getElementById("accountType").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    registerMessage.className = "register-message show";

    if (fullName.length < 3) {
        showMessage("يرجى كتابة الاسم الكامل بصورة صحيحة.", "error");
        return;
    }

    if (!/^07\d{9}$/.test(phone)) {
        showMessage(
            "يرجى إدخال رقم هاتف عراقي يبدأ بـ 07 ويتكون من 11 رقمًا.",
            "error"
        );
        return;
    }

    if (!accountType) {
        showMessage("يرجى اختيار نوع الحساب.", "error");
        return;
    }

    if (password.length < 8) {
        showMessage("كلمة المرور يجب أن تتكون من 8 أحرف أو أرقام على الأقل.", "error");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("كلمتا المرور غير متطابقتين، تأكدي منهما.", "error");
        return;
    }

    showMessage(
        "تم التحقق من البيانات بنجاح. هذه تجربة للواجهة فقط؛ لم يتم إنشاء حساب حقيقي بعد.",
        "info"
    );
});

function showMessage(message, type) {
    registerMessage.textContent = message;
    registerMessage.className = "register-message show " + type;
}