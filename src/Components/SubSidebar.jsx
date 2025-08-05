// src/components/SubSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const SubSidebar = ({ items, parentLabel, onMouseLeave }) => {
    return (
        <div
            className="text-white"
            style={{
                width: "240px",
                height: "100vh",
                position: "fixed",
                top: '8%',
                right: "80px",
                overflowY: "auto",
                overflowX: "hidden",
                direction: "rtl",
                zIndex: 999,
                boxShadow: "-3px 0 8px rgba(0, 0, 0, 0.2)",
                borderLeft: "1px solid #ccc",
                backgroundColor: '#02365B', // ✅ اللون الكحلي المعتمد
            }}
            onMouseLeave={onMouseLeave}
        >

            {/* العنوان العلوي للمجموعة الفرعية */}
            <div
                className="p-3 fw-bold text-white text-center "
                style={{ backgroundColor: "#02365B", borderBottom: "1px solid #444"}}
            >
                {parentLabel}
            </div>

            {/* قائمة العناصر الفرعية */}
            <ul className="list-unstyled m-0">
                {items.map((item) => (
                    <li key={item.id}>
                        <NavLink
                            to={item.to || "#"} // fallback in case of missing `to`
                            className="d-block px-3 py-2 text-white text-decoration-none"
                            activeClassName="fw-bold text-primary"
                            style={{
                                transition: "background 0.2s",
                            }}
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubSidebar;
