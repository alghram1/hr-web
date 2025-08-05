import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarMenu } from "../Data/sidebarMenu";
import SubSidebar from "./SubSidebar";
import "bootstrap-icons/font/bootstrap-icons.css";
import variables from '../Styles/variables.scss'

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState(null);
    const SIDEBAR_WIDTH = 80; // ✅ تعريف عرض الشريط الجانبي

    const handleItemEnter = (id) => setActiveItem(id);
    const handleItemLeave = () => setActiveItem(null);
    const activeSidebarItem = sidebarMenu.find((item) => item.id === activeItem);
    
    return (
        <>
            {/* ✅ Sidebar الرئيسي */}
            <div
                className="sidebar text-white d-flex flex-column align-items-center py-3 px-2"
                style={{
                    backgroundColor: '#02365B', // ✅ كحلي معتمد
                    width: `${SIDEBAR_WIDTH}px`,
                    height: "100vh",
                    position: "fixed",
                    top: 0,
                    right: 0,
                    overflowY: "auto",
                    overflowX: "hidden",
                    direction: "rtl",
                    zIndex: 1000,
                    scrollbarWidth: "thin",
                    scrollbarColor: "#666 #222",
                }}
            >

               {/* <div className="mb-4 fw-bold fs-5 text-center">✨ تمهيل</div>*/}

                {sidebarMenu.map((item) => (
                    <div
                        key={item.id}
                        className="text-center py-3 position-relative w-100"
                        onMouseEnter={() => handleItemEnter(item.id)}
                        onClick={() => handleItemEnter(item.id)} // دعم النقر
                    >
                        <NavLink
                            to={`/${item.id}`}
                            className="d-flex flex-column align-items-center text-white position-relative"
                            style={{ textDecoration: "none" }}
                        >
                            {/* ✅ الدائرة الخاصة بالإشعار */}
                            {item.HTMLSpanElement && (
                                <div
                                    className="position-absolute"
                                    style={{
                                        top: 8,
                                        right: 35,
                                        width: 8,
                                        height: 8,
                                        backgroundColor: '#00BAC6', // ✅ تركوازي
                                        borderRadius: '50%',
                                    }}
                                />
                            )}


                            {/* ✅ أيقونة داخل دائرة */}
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    backgroundColor: window.location.pathname.includes(item.id) ? '#6c757d' : 'transparent',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {item.iconType === "svg" ? (
                                    <span
                                        dangerouslySetInnerHTML={{ __html: item.icon }}
                                        style={{ display: "block", color: "#fff" }}
                                    />
                                ) : (
                                    <i className={`bi ${item.icon}`} style={{ fontSize: "20px", color: "#fff" }}></i>
                                )}
                            </div>

                            <div style={{ fontSize: "12px", marginTop: "4px", color: "#fff" }}>
                                {item.label}
                            </div>
                        </NavLink>


                    </div>
                ))}
            </div>

            {/* ✅ SubSidebar */}
            {activeSidebarItem && activeSidebarItem.subItems?.length > 0 && (
                <SubSidebar
                    items={activeSidebarItem.subItems}
                    parentLabel={activeSidebarItem.label}
                    onMouseLeave={handleItemLeave}
                />
            )}
        </>
    );
};

export default Sidebar;
