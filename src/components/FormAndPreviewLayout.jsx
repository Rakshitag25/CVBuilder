import React from 'react';
import ResumeForm from './ResumeForm';
import CvWithOutMark from './CvWithOutMark';

const FormAndPreviewLayout = ({ formData, setFormData }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen gap-4">
        {/* Left: Form side (scrollable) */}
        <div className="w-full lg:w-[55%] overflow-y-auto max-h-screen pr-2">
          <ResumeForm
            className="w-full"
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        {/* Right: Sticky Preview side with scroll */}
        <div className="w-full lg:w-[45%] hidden lg:block">
          <div className="sticky top-4 max-h-[95vh] overflow-y-auto p-2  rounded-lg">
            <CvWithOutMark data={formData} isPreview={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormAndPreviewLayout;
