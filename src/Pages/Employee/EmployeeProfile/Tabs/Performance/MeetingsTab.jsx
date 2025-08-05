import React, { useState } from 'react';
import {
    Table, Button, Form, InputGroup, Dropdown, Pagination
} from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import theme from '../../../../../theme'; // تأكد من المسار الصحيح

const mockMeetings = [
    {
        id: 1,
        employee: 'Mohammed Alobaidallah',
        avatar: '/images/avatar1.jpg',
        total: 1,
        lastMeeting: '2025-01-14'
    },
    {
        id: 2,
        employee: 'عماد شهاب',
        avatar: '/images/avatar2.jpg',
        total: 1,
        lastMeeting: '2025-01-12'
    }
];

const MeetingsTab = () => {
    const [search, setSearch] = useState('');
    const [filterDays, setFilterDays] = useState('30');

    const filteredMeetings = mockMeetings.filter((m) =>
        m.employee.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="pt-4 px-3" dir="rtl">
            {/* ✅ رأس الصفحة */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <Button
                    size="sm"
                    className="fw-bold px-4"
                    style={{
                        backgroundColor: theme.colors.accent,
                        borderColor: theme.colors.accent,
                        color: '#fff'
                    }}
                >
                    سجل اللقاء
                </Button>

                <InputGroup style={{ maxWidth: 300 }}>
                    <Form.Control
                        placeholder="البحث عن طريق اسم الموظف أو المعرف"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <InputGroup.Text>
                        <BsSearch />
                    </InputGroup.Text>
                </InputGroup>

                <div className="d-flex align-items-center gap-2">
                    <span className="small" style={{ color: theme.colors.grayDark }}>مرشحات سريعة:</span>
                    <Dropdown onSelect={(val) => setFilterDays(val)}>
                        <Dropdown.Toggle
                            variant="light"
                            className="border small px-3 py-1"
                            style={{
                                backgroundColor: theme.colors.grayBg,
                                borderColor: theme.colors.grayBorder,
                                color: theme.colors.textDark
                            }}
                        >
                            آخر {filterDays} يوماً
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="7">آخر 7 أيام</Dropdown.Item>
                            <Dropdown.Item eventKey="30">آخر 30 يوم</Dropdown.Item>
                            <Dropdown.Item eventKey="90">آخر 90 يوم</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            {/* ✅ جدول اللقاءات */}
            <div className="table-responsive">
                <Table bordered hover className="align-middle text-center small">
                    <thead style={{ backgroundColor: theme.colors.grayBg }}>
                        <tr className="text-dark">
                            <th>اللقاء مع</th>
                            <th>تم تسجيل اللقاء</th>
                            <th>آخر لقاء</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMeetings.length > 0 ? (
                            filteredMeetings.map((meeting) => (
                                <tr key={meeting.id}>
                                    <td className="text-start">
                                        <div className="d-flex align-items-center gap-2">
                                            <img
                                                src={meeting.avatar}
                                                alt="avatar"
                                                width="32"
                                                height="32"
                                                className="rounded-circle border"
                                            />
                                            {meeting.employee}
                                        </div>
                                    </td>
                                    <td>{meeting.total}</td>
                                    <td>{meeting.lastMeeting}</td>
                                    <td>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            style={{
                                                backgroundColor: theme.colors.accent,
                                                borderColor: theme.colors.accent,
                                                color: '#fff'
                                            }}
                                        >
                                            عرض اللقاءات
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-4" style={{ color: theme.colors.grayDark }}>
                                    لا تتوفر أي بيانات
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* ✅ الترقيم */}
            <div
                className="d-flex justify-content-between align-items-center mt-3 small"
                style={{ color: theme.colors.grayDark }}
            >
                <div>عرض 1 - {filteredMeetings.length} من {filteredMeetings.length}</div>
                <Pagination size="sm">
                    <Pagination.Prev />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Next />
                </Pagination>
                <Form.Select size="sm" style={{ width: 100 }}>
                    <option>16/صفحة</option>
                    <option>32/صفحة</option>
                </Form.Select>
            </div>
        </div>
    );
};

export default MeetingsTab;
