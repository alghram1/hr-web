// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { SessionProvider } from './contexts/SessionContext'; // ✅ استدعاء مزود الجلسة

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <SessionProvider> {/* ✅ تغليف التطبيق لتمرير بيانات الجلسة للجميع */}
                <App />
            </SessionProvider>
        </BrowserRouter>
    </React.StrictMode>
);
