const loginForm = document.getElementById("loginForm");

const loginMessage = document.getElementById("loginMessage");
const accountType = document.getElementById("accountType");

const passwordGroup = document.getElementById("passwordGroup");
const passwordInput = document.getElementById("loginPassword");


// إظهار كلمة المرور للحسابات المهنية فقط
accountType.addEventListener("change", function () {

    loginMessage.className = "login-message";
    loginMessage.textContent = "";

    if (accountType.value === "patient") {

        passwordGroup.hidden = true;
        passwordInput.required = false;
        passwordInput.value = "";

    } else if (
        accountType.value === "nurse" ||
        accountType.value === "doctor" ||
        accountType.value === "lab"
    ) {

        passwordGroup.hidden = false;
        passwordInput.required = true;

    } else {

        passwordGroup.hidden = true;
        passwordInput.required = false;
        passwordInput.value = "";

    }

});


// التحقق من بيانات تسجيل الدخول
loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const type = accountType.value;

    const phone = document.getElementById("loginPhone").value.trim();

    const password = passwordInput.value;

    if (!type) {
        showLoginMessage("يرجى اختيار نوع الحساب.", "error");
        return;
    }

    if (!/^07\d{9}$/.test(phone)) {
        showLoginMessage(
            "يرجى إدخال رقم هاتف عراقي صحيح يبدأ بـ 07 ويتكون من 11 رقماً.",
            "error"
        );
        return;
    }

    // التحقق من كلمة المرور للحسابات المهنية فقط
    if (type !== "patient") {

        if (password.length < 8) {
            showLoginMessage(
                "يرجى إدخال كلمة مرور تتكون من 8 أحرف أو أرقام على الأقل.",
                "error"
            );
            return;
        }

    }

    showLoginMessage(
        "تم التحقق من صيغة البيانات، لكن تسجيل الدخول الحقيقي يحتاج ربط الخادم وقاعدة بيانات الحسابات.",
        "info"
    );

});


// عرض الرسائل
function showLoginMessage(message, type) {

    loginMessage.textContent = message;

    loginMessage.className = "login-message show " + type;

}