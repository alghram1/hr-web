import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { BsExclamationCircleFill, BsHourglassSplit } from 'react-icons/bs';
import theme from '../../../../../theme'; // ← تأكد من المسار الصحيح

const ManagerReviewCard = ({ manager, employeeName = 'الموظف' }) => {
    const isAssigned = !!manager;

    return (
        <Card className="border-0 shadow-sm h-100">
            <Card.Body>
                {/* عنوان الكرت */}
                <div className="d-flex justify-content-between mb-2">
                    <h6 style={{ color: theme.colors.accent }}>مراجعة</h6>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        style={{
                            backgroundColor: theme.colors.accent,
                            borderColor: theme.colors.accent,
                            color: '#fff'
                        }}
                    >
                        عرض جميع المراجعات
                    </Button>
                </div>

                {/* تنبيه لعدم تعيين مدير */}
                {!isAssigned && (
                    <div
                        className="p-3 rounded bg-opacity-25"
                        style={{ backgroundColor: theme.colors.soft.danger }}
                    >
                        <div className="d-flex align-items-start gap-2">
                            <BsExclamationCircleFill
                                color={theme.colors.danger}
                                size={18}
                                className="mt-1"
                            />
                            <div className="small fw-semibold" style={{ color: theme.colors.danger }}>
                                لم يتم تعيين مدير مباشر إلى <strong>{employeeName}</strong> بعد.
                                <div className="mt-2">
                                    <Button
                                        size="sm"
                                        className="me-2"
                                        style={{
                                            backgroundColor: theme.colors.danger,
                                            borderColor: theme.colors.danger,
                                            color: '#fff'
                                        }}
                                        onClick={() => alert('وظيفة تعيين مدير لم تُفعّل بعد')}
                                    >
                                        تعيين مدير مباشر
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* عرض حالة المراجعة */}
                <div className="mt-3 small" style={{ color: theme.colors.grayDark }}>
                    مراجعة المدير المباشر <BsHourglassSplit className="ms-1" />
                </div>

                <Button
                    size="sm"
                    variant="light"
                    disabled={!isAssigned}
                    className="mt-2"
                >
                    {isAssigned ? 'ملء مراجعة المدير' : 'غير متاح حالياً'}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ManagerReviewCard;
