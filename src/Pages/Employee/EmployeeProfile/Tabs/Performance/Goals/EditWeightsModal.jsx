import React, { useState, useEffect } from 'react';
import { Modal, Table, Form, Button, Alert } from 'react-bootstrap';

const EditWeightsModal = ({ show, onClose, goals, onSave }) => {
    const [editedGoals, setEditedGoals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (goals) {
            setEditedGoals(goals.map(goal => ({ ...goal })));
        }
    }, [goals]);

    // 🧠 هل الهدف مسموح بتعديل وزنه؟
    const isGoalEditable = (goal) => {
        if (!goal.linkedTasks || goal.linkedTasks.length === 0) return true;
        return !goal.linkedTasks.some(task =>
            task.status === 'In Progress' || task.status === 'Completed'
        );
    };

    const handleWeightChange = (id, newWeight) => {
        setEditedGoals(prev =>
            prev.map(goal =>
                goal.id === id ? { ...goal, weight: parseInt(newWeight) || 0 } : goal
            )
        );
    };

    const totalWeight = editedGoals.reduce((sum, g) => sum + g.weight, 0);

    const handleSubmit = () => {
        if (totalWeight !== 100) {
            setError('⚠️ يجب أن يكون مجموع الأوزان 100٪ بالضبط');
            return;
        }
        setError(null);
        onSave(editedGoals);
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>تعديل الأوزان</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                <Table bordered hover size="sm" className="text-center">
                    <thead className="table-light">
                        <tr>
                            <th>اسم الهدف</th>
                            <th>الوزن الحالي</th>
                        </tr>
                    </thead>

                    <tbody>
                        {editedGoals.map(goal => {
                            const editable = isGoalEditable(goal);

                            return (
                                <tr key={goal.id}>
                                    <td className="fw-semibold">{goal.name}</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={goal.weight}
                                            onChange={(e) => editable && handleWeightChange(goal.id, e.target.value)}
                                            disabled={!editable}
                                        />
                                        {!editable && (
                                            <div className="small text-danger mt-1">
                                                🔒 لا يمكن تعديل الوزن (مهمة نشطة مرتبطة)
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td className="fw-bold">الإجمالي</td>
                            <td className={`fw-bold ${totalWeight !== 100 ? 'text-danger' : 'text-success'}`}>
                                {totalWeight}%
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>إلغاء</Button>
                <Button variant="success" onClick={handleSubmit}>حفظ الأوزان</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditWeightsModal;
