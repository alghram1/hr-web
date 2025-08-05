import React from "react";
import { useTranslation } from "react-i18next";

function Notification({ type }) {
    const { t } = useTranslation();

    return (
        <div className={`notification ${type}`}>
            {type === "success" ? t("notifications.success") : t("notifications.error")}
        </div>
    );
}

export default Notification;
