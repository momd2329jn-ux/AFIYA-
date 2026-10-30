const express = require("express");

const app = express();
const PORT = 3000;

// السماح للخادم بقراءة بيانات JSON
app.use(express.json());

// الصفحة الرئيسية لاختبار الخادم
app.get("/", (req, res) => {
    res.send("عافية AFIYA - الخادم يعمل بنجاح 🌿");
});

// اختبار واجهة برمجية
app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "خادم عافية جاهز لاستقبال الطلبات"
    });
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`AFIYA server: http://localhost:${PORT}`);
});