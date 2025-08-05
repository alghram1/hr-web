// Components/Performance/GoalsTabContent.jsx

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import GoalSummaryCard from './GoalSummaryCard';
import ManagerReviewCard from './ManagerReviewCard';

const dummyGoalsByCycle = {
    1: { count: 5, weight: 160, needsReview: true },
    2: { count: 3, weight: 90, needsReview: false },
    3: { count: 0, weight: 0, needsReview: false },
};

const dummyManagerByCycle = {
    1: null,
    2: { name: 'Abdulrahman ALGhram' },
    3: null,
};

const GoalsTabContent = ({ selectedCycleId, theme }) => {
    const goals = dummyGoalsByCycle[selectedCycleId];
    const manager = dummyManagerByCycle[selectedCycleId];

    return (
        <Row className="g-3">
            <Col md={6}>
                <GoalSummaryCard goalsData={goals} />
            </Col>
            <Col md={6}>
                <ManagerReviewCard
                    manager={manager}
                    employeeName="Abdulrahman"
                    theme={theme}
                />
            </Col>
        </Row>
    );
};

export default GoalsTabContent;
