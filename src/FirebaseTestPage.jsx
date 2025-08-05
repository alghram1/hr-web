// src/Pages/Test/FirebaseTestPage.jsx
import React, { useEffect } from 'react';
import { db } from '../src/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const FirebaseTestPage = () => {
    useEffect(() => {
        const runTest = async () => {
            try {
                // إضافة وثيقة (رسالة)
                const docRef = await addDoc(collection(db, "test"), {
                    message: "تجربة اتصال Firebase 🔥",
                    createdAt: new Date()
                });
                console.log("✅ أُضيفت الرسالة، ID:", docRef.id);

                // قراءة البيانات
                const snapshot = await getDocs(collection(db, "test"));
                snapshot.forEach(doc => {
                    console.log("📥", doc.id, doc.data());
                });
            } catch (err) {
                console.error("❌ Firebase Error:", err);
            }
        };

        runTest();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h3>🚀 اختبار Firebase</h3>
            <p>راجع console.log في المتصفح لرؤية النتائج</p>
        </div>
    );
};

export default FirebaseTestPage;
