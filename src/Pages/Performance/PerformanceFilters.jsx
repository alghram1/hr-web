import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Row, Col, Form } from 'react-bootstrap';
import theme from '../../theme'; // ✅ استيراد الهوية البصرية

const DEFAULT_FILTERS = {
    employee: [],
    cycle: '',
    branch: '',
    department: '',
};

// 🎨 تخصيص مظهر react-select حسب هوية النظام
const customSelectStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? theme.colors.accent : '#ced4da',
        boxShadow: state.isFocused ? `0 0 0 0.2rem ${theme.colors.accent}40` : 'none',
        '&:hover': {
            borderColor: theme.colors.accent
        },
        direction: 'rtl'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? theme.colors.accent
            : state.isFocused
                ? `${theme.colors.accent}20`
                : 'white',
        color: state.isSelected ? 'white' : 'black',
        textAlign: 'right'
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: `${theme.colors.accent}20`
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: theme.colors.accent,
        fontWeight: 'bold'
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: theme.colors.accent,
        ':hover': {
            backgroundColor: theme.colors.accent,
            color: 'white'
        }
    })
};

const PerformanceFilters = ({
    employees = [],
    cycles = [],
    branches = [],
    departments = [],
    selectedFilters = DEFAULT_FILTERS,
    onChange,
    hideEmployeeFilter = false,
    isSelfView = false
}) => {
    const safeFilters = { ...DEFAULT_FILTERS, ...selectedFilters };

    const handleSingleSelect = (field, selected) => {
        onChange({ ...safeFilters, [field]: selected?.value || '' });
    };

    const handleMultiSelect = (field, selected) => {
        const values = selected?.map(opt => opt.value) || [];
        onChange({ ...safeFilters, [field]: values });
    };

    const getSelectedValue = (options, value) =>
        options.find(opt => opt.value === value) || null;

    const getMultiSelectedValues = (options, values = []) =>
        options.filter(opt => values.includes(opt.value));

    return (
        <Form className="mb-4" data-testid="performance-filters">
            <Row className="gy-3" dir="rtl">
                {!hideEmployeeFilter && !isSelfView && (
                    <Col md={3}>
                        <Form.Label className="small text-muted mb-1 d-block">
                            الموظفين
                        </Form.Label>
                        <Select
                            isMulti
                            name="employee"
                            classNamePrefix="react-select"
                            options={employees}
                            placeholder="اختر موظفين..."
                            value={getMultiSelectedValues(employees, safeFilters.employee)}
                            onChange={(selected) => handleMultiSelect('employee', selected)}
                            isClearable
                            isSearchable
                            styles={customSelectStyles} // ✅ تم التفعيل
                            noOptionsMessage={() => "لا توجد خيارات متاحة"}
                        />
                    </Col>
                )}

                <Col md={3}>
                    <Form.Label className="small text-muted mb-1 d-block">
                        الدورة
                    </Form.Label>
                    <Select
                        name="cycle"
                        classNamePrefix="react-select"
                        options={cycles}
                        placeholder="اختر دورة..."
                        value={getSelectedValue(cycles, safeFilters.cycle)}
                        onChange={(selected) => handleSingleSelect('cycle', selected)}
                        isClearable
                        isSearchable
                        styles={customSelectStyles}
                        noOptionsMessage={() => "لا توجد دورات متاحة"}
                    />
                </Col>

                <Col md={3}>
                    <Form.Label className="small text-muted mb-1 d-block">
                        الفرع
                    </Form.Label>
                    <Select
                        name="branch"
                        classNamePrefix="react-select"
                        options={branches}
                        placeholder="اختر فرع..."
                        value={getSelectedValue(branches, safeFilters.branch)}
                        onChange={(selected) => handleSingleSelect('branch', selected)}
                        isClearable
                        isSearchable
                        styles={customSelectStyles}
                        noOptionsMessage={() => "لا توجد فروع متاحة"}
                    />
                </Col>

                <Col md={3}>
                    <Form.Label className="small text-muted mb-1 d-block">
                        القسم
                    </Form.Label>
                    <Select
                        name="department"
                        classNamePrefix="react-select"
                        options={departments}
                        placeholder="اختر قسم..."
                        value={getSelectedValue(departments, safeFilters.department)}
                        onChange={(selected) => handleSingleSelect('department', selected)}
                        isClearable
                        isSearchable
                        styles={customSelectStyles}
                        noOptionsMessage={() => "لا توجد أقسام متاحة"}
                    />
                </Col>
            </Row>
        </Form>
    );
};

PerformanceFilters.propTypes = {
    employees: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
    })),
    cycles: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
    })),
    branches: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
    })),
    departments: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
    })),
    selectedFilters: PropTypes.shape({
        employee: PropTypes.array,
        cycle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        branch: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        department: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    onChange: PropTypes.func.isRequired,
    hideEmployeeFilter: PropTypes.bool,
    isSelfView: PropTypes.bool,
};

export default PerformanceFilters;
