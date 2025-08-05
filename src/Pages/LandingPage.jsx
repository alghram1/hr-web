import React from 'react';
import { Link } from 'react-router-dom';
import theme from '../theme'; // استيراد الهوية البصرية

const LandingPage = () => {
    return (
        <div style={{
            margin: 0,
            padding: 0,
            fontFamily: 'sans-serif',
            backgroundColor: theme.colors.grayBg
        }}>

            {/* الشريط العلوي */}
            <header style={{
                backgroundColor: theme.colors.accent,
                color: theme.colors.textLight,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem'
            }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                    <Link to="/" style={{ color: theme.colors.textLight, textDecoration: 'none' }}>
                        OroomUnit
                    </Link>
                </div>

                <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Link to="/dashboard" style={{ color: theme.colors.textLight, textDecoration: 'none' }}>
                        تسجيل الدخول
                    </Link>
                    <span style={{ cursor: 'pointer', color: theme.colors.textLight }}>تعرف على النظام</span>
                    <Link to="/signup" style={{
                        backgroundColor: theme.colors.textLight,
                        color: theme.colors.primary,
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                    }}>
                        ابدأ الآن
                    </Link>
                    <Link to="#" style={{ color: theme.colors.textLight, textDecoration: 'none' }}>
                        English
                    </Link>
                </nav>
            </header>

            {/* Hero Section */}
            <section style={{
                color: theme.colors.textLight,
                minHeight: '70vh',
                backgroundColor: theme.colors.primary,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                    برنامج إدارة الموارد البشرية الأكثر تكاملاً
                </h1>
                <p style={{ maxWidth: '500px', marginBottom: '1rem' }}>
                    سهّل عملية إدارة الموظفين، والحضور، والرواتب من خلال منصة متكاملة وسهلة الاستخدام.
                </p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        style={{
                            marginRight: '0.5rem',
                            width: '200px',
                            padding: '0.5rem',
                            border: `1px solid ${theme.colors.grayBorder}`,
                            borderRadius: '4px'
                        }}
                        placeholder="رقم الجوال (مثال: +966)"
                    />
                    <button style={{
                        backgroundColor: theme.colors.accent,
                        color: theme.colors.textLight,
                        border: 'none',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                    }}>
                        اطلب عرض تجريبي مجاني
                    </button>
                </div>
            </section>

            {/* الأقسام */}
            <section style={{ backgroundColor: '#fff', padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', color: theme.colors.primary, marginBottom: '2rem' }}>
                    الأقسام
                </h2>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    justifyContent: 'center'
                }}>
                    {[
                        { title: "نظام المعلومات الوظيفية", desc: "إدارة جميع بيانات الموظفين الأساسية والوظيفية في مكان واحد." },
                        { title: "نظام الرواتب", desc: "حساب الرواتب والحسميات والبدلات آليًا مع تقارير مفصلة." },
                        { title: "نظام الحضور والانصراف", desc: "تتبع دقيق للحضور والانصراف مع إمكانية التكامل مع أجهزة البصمة." },
                        { title: "نظام الإجازات", desc: "تقديم ومتابعة طلبات الإجازة واعتمادها إلكترونيًا." },
                        { title: "نظام تقييم الأداء", desc: "تقييم دوري لأداء الموظفين ووضع خطط التحسين." },
                        { title: "نظام العُهد", desc: "تتبع العُهد والممتلكات المسلّمة للموظفين وإدارتها بسهولة." },
                    ].map((item, idx) => (
                        <div key={idx} style={{
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            width: '300px',
                            padding: '1rem',
                            textAlign: 'center',
                            borderTop: `4px solid ${theme.colors.accent}`,
                            borderRadius: '6px'
                        }}>
                            <h5 style={{ color: theme.colors.accent }}>{item.title}</h5>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* العملاء */}
            <section style={{
                backgroundColor: theme.colors.grayBg,
                padding: '2rem',
                textAlign: 'center'
            }}>
                <h5 style={{ color: theme.colors.accent, marginBottom: '1rem' }}>
                    يستخدم نظامنا العديد من الشركات الرائدة
                </h5>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <img src="https://via.placeholder.com/100x50" alt="logo1" />
                    <img src="https://via.placeholder.com/100x50" alt="logo2" />
                    <img src="https://via.placeholder.com/100x50" alt="logo3" />
                </div>
            </section>

            {/* التسعير */}
            <section style={{ padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', color: theme.colors.primary, marginBottom: '2rem' }}>
                    الباقات والأسعار
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                    {[
                        { name: "الباقة الأساسية", price: "99 ريال / شهر", desc: "مزايا محدودة، إدارة أساسية للموظفين والحضور." },
                        { name: "الباقة المتقدمة", price: "199 ريال / شهر", desc: "تتضمن إدارة الرواتب والإجازات وتكامل الأجهزة." },
                        { name: "الباقة الاحترافية", price: "299 ريال / شهر", desc: "جميع المزايا + دعم مخصص وتقييم أداء متقدم." }
                    ].map((pkg, idx) => (
                        <div key={idx} style={{
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            width: '300px',
                            padding: '1rem',
                            textAlign: 'center',
                            borderRadius: '6px',
                            borderTop: `4px solid ${theme.colors.accent}`
                        }}>
                            <h5 style={{ color: theme.colors.accent }}>{pkg.name}</h5>
                            <h6 style={{ color: '#666', margin: '0.5rem 0' }}>{pkg.price}</h6>
                            <p>{pkg.desc}</p>
                            <Link to="/signup" style={{
                                display: 'inline-block',
                                marginTop: '0.5rem',
                                padding: '0.5rem 1rem',
                                border: `1px solid ${theme.colors.accent}`,
                                color: theme.colors.accent,
                                textDecoration: 'none',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}>
                                ابدأ الآن
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* الفوتر */}
            <footer style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.textLight,
                padding: '1rem',
                textAlign: 'center',
                marginTop: '2rem'
            }}>
                <p style={{ margin: 0 }}>جميع الحقوق محفوظة &copy; 2025</p>
            </footer>
        </div>
    );
};

export default LandingPage;
