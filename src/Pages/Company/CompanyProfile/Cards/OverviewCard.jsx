// 📁 Cards/OverviewCard.jsx
import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';

const OverviewCard = ({ icon, title, value, variant = 'primary', tooltip, onClick }) => {
    return (
        <OverlayTrigger
            placement="top"
            overlay={
                tooltip ? <Tooltip id={`tooltip-${title}`}>{tooltip}</Tooltip> : <></>
            }
        >
            <Card
                className={`overview-card border-0 shadow-sm rounded-4 p-3 bg-white h-100 cursor-pointer`}
                role="button"
                onClick={onClick}
                aria-label={title}
            >
                <div className="d-flex align-items-center justify-content-between h-100">
                    <div>
                        <div className="fw-bold small text-muted mb-1">{title}</div>
                        <h5 className="mb-0 text-dark">{value}</h5>
                    </div>
                    <div
                        className={`overview-icon-wrapper text-${variant} bg-${variant}-subtle rounded-circle d-flex align-items-center justify-content-center`}
                        style={{ width: 48, height: 48 }}
                    >
                        {icon}
                    </div>
                </div>
            </Card>
        </OverlayTrigger>
    );
};

OverviewCard.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    variant: PropTypes.string,
    tooltip: PropTypes.string,
    onClick: PropTypes.func
};

export default OverviewCard;
