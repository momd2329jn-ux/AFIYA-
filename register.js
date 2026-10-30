const accountButtons = document.querySelectorAll(".account-type");

const accountSelection = document.getElementById("accountSelection");
const formArea = document.getElementById("formArea");

const formTitle = document.getElementById("formTitle");
const dynamicFields = document.getElementById("dynamicFields");
const formNote = document.getElementById("formNote");

const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

const backToTypes = document.getElementById("backToTypes");

const pageHeading = document.getElementById("pageHeading");
const pageDescription = document.getElementById("pageDescription");

let selectedType = "";

const commonFields = `
    <div class="form-group full">
        <label>الاسم الكامل</label>
        <input type="text" name="fullName" required minlength="3" placeholder="اكتب الاسم الكامل">
    </div>

    <div class="form-group">
        <label>رقم الهاتف</label>
        <input type="tel" name="phone" required placeholder="07xxxxxxxxx" inputmode="tel">
    </div>

    <div class="form-group">
        <label>الجنس</label>
        <select name="gender" required>
            <option value="">اختر</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
        </select>
    </div>

    <div class="form-group full">
        <label>العنوان</label>
        <input type="text" name="address" required placeholder="المحافظة والمنطقة">
    </div>
`;

const passwordFields = `
    <div class="form-group">
        <label>كلمة المرور</label>
        <input type="password" name="password" required minlength="8" placeholder="8 أحرف أو أرقام على الأقل">
    </div>

    <div class="form-group">
        <label>تأكيد كلمة المرور</label>
        <input type="password" name="confirmPassword" required minlength="8" placeholder="أعد كتابة كلمة المرور">
    </div>
`;

const professionalFields = `
    <div class="form-group">
        <label>المؤهل العلمي</label>
        <input type="text" name="qualification" required placeholder="الشهادة الدراسية">
    </div>

    <div class="form-group">
        <label>سنوات الخبرة</label>
        <input type="number" name="experience" min="0" required placeholder="عدد السنوات">
    </div>

    <div class="form-group full">
        <label>الخدمات التي تقدمها</label>
        <textarea name="services" required placeholder="اكتب الخدمات التي تقدمها"></textarea>
    </div>

    <div class="form-group full">
        <label>أوقات التوفر</label>
        <textarea name="availability" required placeholder="مثلاً: السبت إلى الخميس، من 8 صباحاً إلى 4 عصراً"></textarea>
    </div>

    <div class="form-group full">
        <label>إرفاق الشهادات والوثائق</label>
        <input type="file" name="documents" accept=".pdf,.jpg,.jpeg,.png" multiple required>
    </div>
`;

const accountForms = {
    patient: {
        title: "تسجيل حساب مريض",
        fields: `
            <div class="form-group full">
                <label>الاسم الكامل</label>
                <input type="text" name="fullName" required minlength="3" placeholder="اكتب الاسم الكامل">
            </div>

            <div class="form-group full">
                <label>رقم الهاتف</label>
                <input type="tel" name="phone" required placeholder="07xxxxxxxxx" inputmode="tel">
            </div>
        `,
    },

    nurse: {
        title: "تسجيل حساب ممرض / ممرضة",
        fields: `
            ${commonFields}

            <div class="form-group full">
                <label>الاختصاص التمريضي</label>
                <input type="text" name="specialty" required placeholder="اكتب الاختصاص">
            </div>

            ${professionalFields}
            ${passwordFields}
        `,
        note: "سيتم إرسال طلبك إلى إدارة عافية لمراجعة الشهادات والوثائق. لن يتم تفعيل الحساب قبل موافقة المدير."
    },

    doctor: {
        title: "تسجيل حساب طبيب",
        fields: `
            ${commonFields}

            <div class="form-group full">
                <label>التخصص الطبي</label>
                <input type="text" name="specialty" required placeholder="مثلاً: طب عام أو اختصاص آخر">
            </div>

            ${professionalFields}
            ${passwordFields}
        `,
        note: "سيتم مراجعة بياناتك وشهاداتك من قبل إدارة عافية قبل تفعيل الحساب."
    },

    lab: {
        title: "تسجيل حساب مختبر / محلل",
        fields: `
            <div class="form-group full">
                <label>اسم المختبر</label>
                <input type="text" name="labName" required placeholder="اسم المختبر">
            </div>

            <div class="form-group full">
                <label>اسم المسؤول عن المختبر</label>
                <input type="text" name="fullName" required placeholder="الاسم الكامل">
            </div>

            <div class="form-group">
                <label>رقم الهاتف</label>
                <input type="tel" name="phone" required placeholder="07xxxxxxxxx">
            </div>

            <div class="form-group">
                <label>عنوان المختبر</label>
                <input type="text" name="address" required placeholder="المحافظة والمنطقة">
            </div>

            <div class="form-group full">
                <label>رقم إجازة أو ترخيص المختبر</label>
                <input type="text" name="license" required placeholder="رقم الترخيص">
            </div>

            <div class="form-group full">
                <label>الفحوصات المتوفرة</label>
                <textarea name="services" required placeholder="اكتب أنواع الفحوصات التي يوفرها المختبر"></textarea>
            </div>

            <div class="form-group full">
                <label>أوقات العمل</label>
                <input type="text" name="availability" required placeholder="أيام وساعات العمل">
            </div>

            <div class="form-group full">
                <label>إرفاق وثائق وترخيص المختبر</label>
                <input type="file" name="documents" accept=".pdf,.jpg,.jpeg,.png" multiple required>
            </div>

            ${passwordFields}
        `,
        note: "سيبقى حساب المختبر قيد المراجعة حتى تتحقق الإدارة من البيانات والترخيص."
    }
};


// الانتقال من اختيار الصنف إلى واجهة التسجيل
accountButtons.forEach(button => {
    button.addEventListener("click", () => {

        selectedType = button.dataset.type;

        const selectedForm = accountForms[selectedType];

        registerForm.reset();

        formTitle.textContent = selectedForm.title;
        dynamicFields.innerHTML = selectedForm.fields;
        formNote.textContent = selectedForm.note;

        registerMessage.className = "register-message";
        registerMessage.textContent = "";

        accountSelection.hidden = true;
        formArea.hidden = false;

        pageHeading.textContent = "إنشاء الحساب";
        pageDescription.textContent = "أكمل البيانات المطلوبة لإتمام التسجيل.";

        formArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


// العودة إلى واجهة اختيار الصنف
backToTypes.addEventListener("click", () => {

    selectedType = "";

    registerForm.reset();

    dynamicFields.innerHTML = "";

    registerMessage.className = "register-message";
    registerMessage.textContent = "";

    formArea.hidden = true;
    accountSelection.hidden = false;

    pageHeading.textContent = "إنشاء حساب جديد";
    pageDescription.textContent = "اختار نوع الحساب حتى نعرض لك استمارة التسجيل المناسبة.";

    accountSelection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


// التحقق من بيانات التسجيل
registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!selectedType) {
        showMessage("يرجى اختيار نوع الحساب.", "error");
        return;
    }

    const phone = registerForm.elements.phone.value.trim();

    if (!/^07\d{9}$/.test(phone)) {
        showMessage("يرجى إدخال رقم هاتف عراقي يبدأ بـ 07 ويتكون من 11 رقماً.", "error");
        return;
    }

    // التحقق من كلمة المرور للحسابات المهنية فقط
    if (selectedType !== "patient") {

        const password = registerForm.elements.password.value;
        const confirmPassword = registerForm.elements.confirmPassword.value;

        if (password.length < 8) {
            showMessage("كلمة المرور يجب أن تتكون من 8 أحرف أو أرقام على الأقل.", "error");
            return;
        }

        if (password !== confirmPassword) {
            showMessage("كلمتا المرور غير متطابقتين.", "error");
            return;
        }
    }

    if (selectedType === "patient") {

        showMessage(
            "تم التحقق من البيانات. واجهة التسجيل جاهزة، لكن إنشاء الحساب الفعلي يحتاج ربط الخادم وقاعدة البيانات.",
            "info"
        );

    } else {

        showMessage(
            "تم التحقق من البيانات. هذا طلب تسجيل مهني تجريبي، وسيحتاج ربط الخادم حتى يصل إلى المدير للمراجعة والموافقة.",
            "info"
        );
    }

});


// عرض رسائل التحقق
function showMessage(message, type) {

    registerMessage.textContent = message;

    registerMessage.className = "register-message show " + type;
}