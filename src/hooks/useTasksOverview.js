import { useState, useEffect } from 'react';

/**
 * هوك مخصص لاسترجاع نظرة عامة على المهام.
 * حالياً يعتمد على بيانات وهمية، ومُهيّأ للتوسعة لاحقاً مع API أو سياق حقيقي.
 */
const useTasksOverview = () => {
    const [data, setData] = useState({
        today: 0,
        week: 0,
        overdue: 0,
        loading: true,
        error: null,
    });

    useEffect(() => {
        // محاكاة تحميل البيانات من API
        const fetchFakeData = () => {
            setTimeout(() => {
                setData({
                    today: 2,
                    week: 4,
                    overdue: 1,
                    loading: false,
                    error: null,
                });
            }, 1000);
        };

        fetchFakeData();
    }, []);

    return data;
};

export default useTasksOverview;
