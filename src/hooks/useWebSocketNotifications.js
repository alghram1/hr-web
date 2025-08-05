
//'../hooks/useWebSocketNotifications'
import { useState, useEffect } from 'react';
const useWebSocketNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4000');

        ws.onopen = () => {
            console.log("📡 WebSocket connected");
        };

        ws.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data);

                if (msg.type === "notification") {
                    setNotifications((prev) => {
                        // ✅ منع التكرار عبر فحص ID
                        const exists = prev.some((n) => n.id === msg.data.id);
                        if (!exists) {
                            return [...prev, msg.data];
                        }
                        return prev;
                    });
                }

                if (msg.type === "welcome") {
                    console.log("✅ Welcome message from server:", msg.data.message);
                }
            } catch (error) {
                console.error("❌ Error parsing WebSocket message:", error);
            }
        };

        ws.onerror = (error) => {
            console.error("❌ WebSocket Error:", error);
        };

        ws.onclose = () => {
            console.log("🔌 WebSocket closed");
        };

        return () => ws.close();
    }, []);

    return notifications;
};

export default useWebSocketNotifications;
