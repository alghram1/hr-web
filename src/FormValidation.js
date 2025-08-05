import React from "react";
import { useTranslation } from "react-i18next";

function FormValidation({ errors }) {
    const { t } = useTranslation();

    return (
        <div>
            {errors.required && <p>{t("validation.required")}</p>}
            {errors.email && <p>{t("validation.email")}</p>}
        </div>
    );
}

export default FormValidation;
