// Pages/Employee/EmployeeProfile/Tabs/AboutTab.jsx
import React from 'react';
import PersonalInfoCard from '../../Cards/PersonalInfoCard';
import ContactInfoCard from '../../Cards/ContactInfoCard';
import AdditionalInfoCard from '../../Cards/AdditionalInfoCard';

const AboutTab = () => {
    return (
        <>
            <PersonalInfoCard />
            <ContactInfoCard />
            <AdditionalInfoCard />
        </>
    );
};

export default AboutTab;
