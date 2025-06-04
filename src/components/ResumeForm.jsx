import React,{ useState } from "react";


const ResumeForm = ({ formData, setFormData }) => {
  
const [showOtherExtra, setShowOtherExtra] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name.startsWith("education.")) {
                 // Extract the key after "education."
    const key = name.split(".")[1];

    setFormData((prevData) => ({
      ...prevData,
      education: {
        ...prevData.education,
        [key]: value, // Update the specific key
      },
    }));
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update non-education fields
    }));
  }
};
                   // for CERTIFICATION
  const handleCertificateChange = (index, value) => {
    const updated = [...formData.certifications];
    updated[index] = value;
    setFormData({ ...formData, certifications: updated });
  };
  const handleAddCertificate = () => {
    setFormData({ ...formData, certifications: [...formData.certifications, ""] });
  };
  const handleRemoveCertificate = (index) => {
    const updated = formData.certifications.filter((_, i) => i !== index);
    setFormData({ ...formData, certifications: updated });
  };
                               //   coCurricular         
  const handleCoCurricularChange = (index, value) => {
  const updated = [...formData.coCurricular];
  updated[index] = value;
  setFormData({ ...formData, coCurricular: updated });
  };                               
  const handleAddcoCurricular  = () => {
    setFormData({ ...formData, coCurricular : [...formData.coCurricular , ""] });
  };
  const handleRemovecoCurricular  = (index) => {
    const updated = formData.coCurricular.filter((_, i) => i !== index);
    setFormData({ ...formData, coCurricular: updated });
  };
                                 // personalInterests
  const handlepersonalInterestsChange = (index, value) => {
   const updated = [...formData.personalInterests];
    updated[index] = value;
    setFormData({ ...formData, personalInterests: updated });
     };
     const handleAddpersonalInterests  = () => {
     setFormData({ ...formData, personalInterests : [...formData.personalInterests, ""] });
     };
    const handleRemovepersonalInterests  = (index) => {
     const updated = formData.personalInterests.filter((_, i) => i !== index);
     setFormData({ ...formData, personalInterests: updated });
    };   
                                       //references
    const handlereferencesChange = (index, value) => {
    const updated = [...formData.references];
     updated[index] = value;
    setFormData({ ...formData,references: updated });
    };
     const handleAddreferences  = () => {
    setFormData({ ...formData, references : [...formData.references, ""] });
     };
    const handleRemovereferences  = (index) => {
    const updated = formData.references.filter((_, i) => i !== index);
     setFormData({ ...formData, references: updated });
     };                                                                    
                                      // For Positions
const handlePositionsChange = (index, value) => {
    const updated = [...formData.extraCurricular.positions];
    updated[index] = value;
    setFormData({
      ...formData,
      extraCurricular: {
        ...formData.extraCurricular,
        positions: updated,
      },
    });
  };
  const addPosition = () => {
    setFormData({
      ...formData,
      extraCurricular: {
        ...formData.extraCurricular,
        positions: [...formData.extraCurricular.positions, ""],
      },
    });
  };
  const removePosition = (index) => {
    const updated = formData.extraCurricular.positions.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      extraCurricular: {
        ...formData.extraCurricular,
        positions: updated,
      },
    });
  };
                              // For Volunteering
  const handleVolunteeringChange = (index, value) => {
    const updated = [...formData.extraCurricular.volunteering];
    updated[index] = value;
    setFormData({
      ...formData,
      extraCurricular: {
        ...formData.extraCurricular,
        volunteering: updated,
      },
    });
  };
  
  const addVolunteering = () => {
    setFormData({
      ...formData,
      extraCurricular: {
        ...formData.extraCurricular,
        volunteering: [...formData.extraCurricular.volunteering, ""],
      },
    });
  };
  
  const removeVolunteering = (index) => {
    const updated = formData.extraCurricular.volunteering.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      extraCurricular: {
        ...formData.extraCurricular,
        volunteering: updated,
      },
    });
  };
                  // For EXTRA CURRICULAR-> OTHER
 const handleOtherExtraChange = (index, value) => {
  const updatedOther = [...formData.extraCurricular.other];
  updatedOther[index] = value;
  setFormData({
  ...formData,
  extraCurricular: {
  ...formData.extraCurricular,
    other: updatedOther,
   },
  });
  };              
  const addOtherExtra = () => {
   setFormData({
  ...formData,
  extraCurricular: {
  ...formData.extraCurricular,
  other: [...formData.extraCurricular.other, ""],
   },
  });
  };               
  const removeOtherExtra = (index) => {
  const updatedOther = [...formData.extraCurricular.other];
  updatedOther.splice(index, 1);
  setFormData({
  ...formData,
    extraCurricular: {
    ...formData.extraCurricular,
    other: updatedOther,
   },
   });
   };
                              //for Interships
  const handleInternshipChange = (index, field, value) => {
    const updated = [...formData.internships];
    updated[index][field] = value;
    setFormData({ ...formData, internships: updated });
  };
  
  const handleTaskChange = (internshipIndex, taskIndex, value) => {
    const updated = [...formData.internships];
    updated[internshipIndex].tasks[taskIndex] = value;
    setFormData({ ...formData, internships: updated });
  };
  
  const addTask = (internshipIndex) => {
    const updated = [...formData.internships];
    updated[internshipIndex].tasks.push("");
    setFormData({ ...formData, internships: updated });
  };
  const removeTask = (internshipIndex, taskIndex) => {
    const updated = [...formData.internships];
    updated[internshipIndex].tasks.splice(taskIndex, 1);
    setFormData({ ...formData, internships: updated });
  };
  const addInternship = () => {
    setFormData({
      ...formData,
      internships: [
        ...formData.internships,
        { orgName: "", teamDesc: "", duration: "", tasks: [""] },
      ],
    });
  };
  const removeInternship = (index) => {
    const updated = formData.internships.filter((_, i) => i !== index);
    setFormData({ ...formData, internships: updated });
  };
                     // Update publication field
const handlePublicationChange = (index, field, value) => {
    const updated = [...formData.publications];
    updated[index][field] = value;
    setFormData({ ...formData, publications: updated });
  };
  
                   // Add new publication
  const handleAddPublication = () => {
    setFormData({
      ...formData,
      publications: [
        ...formData.publications,
        { title: "", type: "", platform: "", date: "", link: "" },
      ],
    });
  };
                 // Remove a publication
  const handleRemovePublication = (index) => {
    const updated = formData.publications.filter((_, i) => i !== index);
    setFormData({ ...formData, publications: updated });
  };

  return(
<div className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Build Your Legal CV Now</h2>
        <div>
         <label className="font-medium text-[18px]">
         Name<span className="text-red-500">*</span>
         </label>
        <br/>
       <input type="text" name="fullName" placeholder="Add Name here" value={formData.fullName} onChange={handleChange} className="w-full sm:w-1/2  border p-2 rounded required bg-[#eaecf1] outline-none"/>
      </div>

      <div className="flex flex-wrap gap-4">
                 {/* for take email */}
      <div>
      <label className= "font-medium text-[17px]">
         Email Address <span className="text-red-500">*</span>
      </label>
        <br/>
      <input type="email" name="email" placeholder="Add email" value={formData.email} onChange={handleChange} className="w border p-2 rounded bg-[#eaecf1] outline-none"/>
      </div>         
                      {/* for take telephone */}
        <div>
       <label className="font-medium text-[17px]">
         Telephone <span className="text-red-500">*</span>
       </label>
        <br/>
      <input type="number" name="phone" placeholder="Telephone" value={formData.phone} onChange={handleChange} className="w border p-2 rounded bg-[#eaecf1] outline-none"/>
      </div>
                   {/* for take LinkedIn */}
      <div>
       <label className="font-medium text-[17px]">
         LinkedIn<span className="text-red-500">*</span>
       </label>
        <br/>
      <input type="text" name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} className="w border p-2 rounded bg-[#eaecf1] outline-none"/>
      </div>
    </div>
       <div className="flex flex-wrap ">
        <label className="font-bold mb-2 text-[18px]">
          Education Details <span className="text-red-500">*</span>
        </label>
      <div className="flex flex-wrap gap-3 border p-4 mb-4 rounded bg-[#f7f7f7]">
                        {/* Other Education */}
   <label className=" text-sm text-black font-medium mt-1">Other</label>
   <div className="w-full flex flex-wrap sm:flex-nowrap sm:space-x-4 space-y-4 sm:space-y-0">
   <input type="text" name="education.universityOther" placeholder="University Name" value={formData.education.universityOther} onChange={handleChange} className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none"/>
   <input type="text" name="education.courseOther" placeholder="Course Name" value={formData.education.courseOther} onChange={handleChange}className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none"/>
   <input type="text" name="education.cgpaOther" placeholder="CGPA/Percentage" value={formData.education.Other} onChange={handleChange}className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none" />
   </div>
               {/*Post- Graduation about the College */}
     <label className=" text-sm text-black font-medium mt-1">Post-graduation Details</label>
   <div className="w-full flex flex-wrap sm:flex-nowrap sm:space-x-4 space-y-4 sm:space-y-0">
   <input type="text" name="education.universityPg" placeholder="University Name" value={formData.education.universityPg} onChange={handleChange} className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none"/>
   <input type="text" name="education.coursePg" placeholder="Course Name" value={formData.education.coursePg} onChange={handleChange}className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none"/>
   <input type="text" name="education.cgpaPg" placeholder="CGPA/Percentage" value={formData.education.cgpaPg} onChange={handleChange}className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none" />
   </div>
                {/*Graduation about the College */}
  <label className=" text-sm text-black font-medium mt-1">Graduation Details</label>
   <div className="w-full flex flex-wrap sm:flex-nowrap sm:space-x-4 space-y-4 sm:space-y-0">
   <input type="text" name="education.university" placeholder="University Name" value={formData.education.university} onChange={handleChange} className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none"/>
   <input type="text" name="education.course" placeholder="Course Name" value={formData.education.course} onChange={handleChange}className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none"/>
   <input type="text" name="education.cgpaUni" placeholder="CGPA/Percentage" value={formData.education.cgpaUni} onChange={handleChange}className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none" />
   </div>
                       {/* about the 12th  */}
  <div className="w-full flex flex-wrap sm:flex-nowrap sm:space-x-4 space-y-4 sm:space-y-0">
  <input type="text" name="education.class12" placeholder="Class XII School" value={formData.education.class12} onChange={handleChange} className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none"/>
  <input type="text" name="education.board12" placeholder="Board (Class XII)" value={formData.education.board12} onChange={handleChange} className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none" />
  <input type="text" name="education.cgpa" placeholder="CGPA/Percentage"value={formData.education.cgpa} onChange={handleChange} className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none" />
  </div>
                            {/* about the 10th  */}
   <div className="w-full flex flex-wrap sm:flex-nowrap sm:space-x-4 space-y-4 sm:space-y-0">
  <input type="text" name="education.class10" placeholder="Class X School" value={formData.education.class10} onChange={handleChange} className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none"/>
  <input type="text" name="education.board10" placeholder="Board (Class X)" value={formData.education.board10}onChange={handleChange}className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none"/>
  <input type="text" name="education.percentage10" placeholder="CGPA/Percentage" value={formData.education.percentage10} onChange={handleChange}className="w-full sm:w-1/3 p-2 rounded bg-[#eaecf1] outline-none" />
  </div>  
</div>
</div> 
                                {/* Additional certifications */}
  <div className="mt-6">
  <label className="font-bold text-lg block mb-2">Additional Certifications <span className="text-red-500">*</span></label>
  {formData.certifications && formData.certifications.length > 0 ? (
    formData.certifications.map((cert, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder={`Certification ${index + 1}`}
          value={cert}
          onChange={(e) => handleCertificateChange(index, e.target.value)}
          className="w-full border p-2 rounded bg-[#eaecf1] outline-none"
        />
        {formData.certifications.length > 1 && (
          <button
            type="button"
            onClick={() => handleRemoveCertificate(index)}
            className="text-red-500 text-xl font-bold"
          >
            ✕
          </button>
        )}
      </div>
    ))
  ) : (
    <div className="flex items-center gap-2 mb-2">
      <input
        type="text"
        placeholder="Certification 1"
        value=""
        onChange={(e) => handleCertificateChange(0, e.target.value)}
        className="w-full border p-2 rounded bg-[#eaecf1] outline-none"
      />
    </div>
  )}
  <button
    type="button"
    onClick={handleAddCertificate}
    className="mt-2 px-4 py-1 bg-[#b96d6c] text-white rounded hover:bg-[#703236]"
  >
    + Add Certification
  </button>
</div>

                         
                                 {/* InterSHip WOrk */}
  <div className="mt-6">
  <h2 className="font-bold text-[16px] mb-4">INTERNSHIPS & WORK EXPERIENCE <span className="text-red-500">*</span></h2>
  {formData.internships.map((intern, index) => (
    <div key={index} className="border p-4 mb-4 rounded bg-[#f7f7f7]">
      <input
        type="text"
        placeholder="Name of Organisation / Advocate"
        value={intern.orgName}
        onChange={(e) => handleInternshipChange(index, "orgName", e.target.value)}
        className="w-full p-2 mb-2 border rounded bg-[#eaecf1] outline-none"
      />
      <input
        type="text"
        placeholder="Team Description"
        value={intern.teamDesc}
        onChange={(e) => handleInternshipChange(index, "teamDesc", e.target.value)}
        className="w-full p-2 mb-2 border rounded bg-[#eaecf1] outline-none"
      />
      <input
        type="text"
        placeholder="Duration or Date (e.g., January 2020 - Present)"
        value={intern.duration}
        onChange={(e) => handleInternshipChange(index, "duration", e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-[#eaecf1] outline-none"
      />

      <label className="block mb-2 font-medium">Tasks:</label>
      {intern.tasks.map((task, taskIdx) => (
        <div key={taskIdx} className="flex gap-2 mb-2">
          <input
            type="text"
            value={task}
            onChange={(e) => handleTaskChange(index, taskIdx, e.target.value)}
            className="w-full p-2 border rounded bg-[#eaecf1] outline-none"
          />
          {intern.tasks.length > 1 && (
            <button
              type="button"
              onClick={() => removeTask(index, taskIdx)}
              className="text-red-600 text-lg font-bold outline-none"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => addTask(index)}
        className="text-sm text-black font-medium mt-1"
      >
        + Add Task
      </button>

      <div className="mt-3">
        {formData.internships.length > 1 && (
          <button
            type="button"
            onClick={() => removeInternship(index)}
            className="text-red-600"
          >
            ✕ Remove Internship
          </button>
        )}
      </div>
    </div>
  ))}

  <button
    type="button"
    onClick={addInternship}
    className="mt-4 px-4 py-1 bg-[#b96d6c] text-white rounded hover:bg-[#703236]"
  >
    + Add Internship
  </button>
</div>
     {/* CO-CURRICYLAR ACTIVITIES */}
     <div className="mt-6">
  <label className="font-bold text-[16px] block mb-2">CO-CURRICULAR ACTIVITIES <span className="text-red-500">*</span></label>
  {formData.coCurricular && formData.coCurricular.length > 0 ? (
    formData.coCurricular.map((cert, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder={`coCurricular ${index + 1}`}
          value={cert}
          onChange={(e) => handleCoCurricularChange(index, e.target.value)}
         className="w-full border p-2 rounded bg-[#eaecf1] outline-none outline-none"
        />
        {formData.coCurricular.length > 1 && (
          <button
            type="button"
            onClick={() => handleRemovecoCurricular(index)}
            className="text-red-500 text-xl font-bold "
          >
            ✕
          </button>
        )}
      </div>
    ))
  ) : (
    <div className="flex items-center gap-2 mb-2">
      <input
        type="text"
        placeholder="coCurricular"
        value=""
        onChange={(e) => handleCoCurricularChange(0, e.target.value)}
        className="w-full border p-2 rounded bg-[#eaecf1] outline-none outline-none"
      />
    </div>
  )}
  <button
    type="button"
    onClick={handleAddcoCurricular}
    className="text-sm text-black font-medium mt-1"
  >
    + Add Co-Curricular
  </button>
</div>  
                                {/* PUBLICATIONS AND CONFERENCES */}
<div className="mt-6">
  <h2 className="font-bold text-[16px] mb-3">PUBLICATIONS, CONFERENCES AND WEBINARS <span className="text-red-500">*</span></h2>
  {formData.publications.map((pub, index) => (
    <div key={index} className="mb-4 border p-4 rounded bg-[#f9f9f9]">
      <input
        type="text"
        placeholder="Published a blogpost/article titled [“Title of the blog”], [Name of the Blog], [Month, Year]"
        value={pub.title}
        onChange={(e) => handlePublicationChange(index, "title", e.target.value)}
        className="w-full mb-2 p-2 border rounded bg-[#eaecf1] outline-none"
      />
      {/* <input
        type="text"
        placeholder="Type (Blog, Paper, Conference)"
        value={pub.type}
        onChange={(e) => handlePublicationChange(index, "type", e.target.value)}
        className="w-full mb-2 p-2 border rounded bg-[#eaecf1] outline-none"
      />
      <input
        type="text"
        placeholder="Platform or Journal Name"
        value={pub.platform}
        onChange={(e) => handlePublicationChange(index, "platform", e.target.value)}
        className="w-full mb-2 p-2 border rounded bg-[#eaecf1] outline-none"
      />
      <input
        type="text"
        placeholder="Month, Year"
        value={pub.date}
        onChange={(e) => handlePublicationChange(index, "date", e.target.value)}
        className="w-full mb-2 p-2 border rounded bg-[#eaecf1] outline-none"
      /> */}
      <input
        type="text"
        placeholder="Link (optional)"
        value={pub.link}
        onChange={(e) => handlePublicationChange(index, "link", e.target.value)}
        className="w-full mb-2 p-2 border rounded bg-[#eaecf1] outline-none"
      />
      {formData.publications.length > 15 && (
        <button
          onClick={() => handleRemovePublication(index)}
          className="text-red-500"
        >
          Remove
        </button>
      )}
    </div>
  ))}
 {formData.publications.length < 15 && (
  <button
    onClick={handleAddPublication} className="px-4 py-2 bg-[#b96d6c] text-white rounded hover:bg-[#703236]" >
    + Add Publication
  </button>
 )}
</div>
                                 {/*EXTRA CURRICYLAR ACTIVITIES */}
                                 {/* part-ONE */}
  <div className="mt-6">
  <h2 className="font-bold text-[16px] mb-2">EXTRA-CURRICULAR ACTIVITIES <span className="text-red-500">*</span></h2>
                              {/* All Sections in One Box */}
  <div className="mb-4 border p-4 rounded bg-[#f9f9f9]">
                              {/* Positions of Responsibility */}
   <p className="text-sm underline decoration-black mb-2">Positions of responsibility</p>
    {formData.extraCurricular.positions.map((item, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder={`Position ${index + 1}`}
          value={item}
          onChange={(e) => handlePositionsChange(index, e.target.value)}
          className="w-full border p-2 rounded bg-[#eaecf1] outline-none"
        />
        {formData.extraCurricular.positions.length > 1 && (
          <button
            type="button"
            onClick={() => removePosition(index)}
            className="text-red-500 text-xl font-bold"
          >
            ✕
          </button>
        )}
      </div>
    ))}
    <button
      type="button"
      onClick={addPosition}
      className="text-sm text-black font-medium mt-1"
    >
      + Add Position
    </button>
                       {/* Volunteering Activities */}
    <p className="text-sm underline decoration-black mt-4 mb-2">Volunteering activities</p>
    {formData.extraCurricular.volunteering.map((item, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder={`Volunteering ${index + 1}`}
          value={item}
          onChange={(e) => handleVolunteeringChange(index, e.target.value)}
          className="w-full border p-2 rounded bg-[#eaecf1] outline-none"
        />
        {formData.extraCurricular.volunteering.length > 1 && (
          <button
            type="button"
            onClick={() => removeVolunteering(index)}
            className="text-red-500 text-xl font-bold"
          >
            ✕
          </button>
        )}
      </div>
    ))}
    <button
      type="button"
      onClick={addVolunteering}
      className="text-sm text-black font-medium mt-1"
    >
      + Add Volunteering
    </button>
                                       {/* + Other Button */}
    <div className="flex justify-end mt-4">
      <button
        type="button"
        onClick={() => setShowOtherExtra(true)}
        className="px-4 py-2 bg-[#b96d6c] text-white rounded hover:bg-[#703236]"
      >
        + Other
      </button>
    </div>
                    {/* Other Extra Curricular Activities */}
    {showOtherExtra && (
      <>
        <p className="text-sm underline decoration-black mt-6 mb-2">Other Extra-Curricular Activities <span className="text-red-500">*</span></p>
        {formData.extraCurricular.other.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder={`Other ${index + 1}`}
              value={item}
              onChange={(e) => handleOtherExtraChange(index, e.target.value)}
              className="w-full border p-2 rounded bg-[#eaecf1] outline-none"
            />
            {formData.extraCurricular.other.length > 1 && (
              <button
                type="button"
                onClick={() => removeOtherExtra(index)}
                className="text-red-500 text-xl font-bold"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-2">
                                   {/* Add Other Activity */}
          <div className="text-left">
            <button
              type="button"
              onClick={addOtherExtra}
              className="text-sm text-black font-medium mt-1"
            >
              + Add Other Activity
            </button>
          </div>
                                      {/* Back Button */}
          <div className="text-left sm:text-right">
            <button
              type="button"
              onClick={() => setShowOtherExtra(false)}
              className="text-sm text-blue-600"
            >
              ← Hide Other Activities
            </button>
          </div>
        </div>
      </>
    )}
  </div>
</div>
                                 {/* PERSONAL INTERESTS */}
   <div className="mt-6">
  <label className="font-bold text-[16px] block mb-2">PERSONAL INTERESTS <span className="text-red-500">*</span></label>
  {formData.personalInterests && formData.personalInterests.length > 0 ? (
    formData.personalInterests.map((cert, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder={`PERSONAL INTERESTS Mention one line in detials ${index + 1}`}
          value={cert}
          onChange={(e) => handlepersonalInterestsChange(index, e.target.value)}
         className="w-full border p-2 rounded bg-[#eaecf1] outline-none"
        />
        {formData.personalInterests.length > 1 && (
          <button
            type="button"
            onClick={() => handleRemovepersonalInterests(index)}
            className="text-red-500 text-xl font-bold"
          >
            ✕
          </button>
        )}
      </div>
    ))
  ) : (
    <div className="flex items-center gap-2 mb-2">
      <input
        type="text"
        placeholder="ADD personalInterests one line "
        value=""
        onChange={(e) => handlepersonalInterestsChange(0, e.target.value)}
        className="w-full border p-2 rounded bg-[#eaecf1] outline-none"
      />
    </div>
  )}

  <button
    type="button"
    onClick={handleAddpersonalInterests}
    className="text-sm text-black font-medium mt-1"
  >
    + Add personal Interests
  </button>
</div>                 
                                   {/* REFERENCES/RECOMMENDATIONS */}
  <div className="mt-6">
  <label className="font-bold text-[16px] block mb-2">REFERENCES /RECOMMENDATIONS <span className="text-red-500">*</span></label>
  
  {formData.references && formData.references.length > 0 ? (
    formData.references.map((cert, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder={`references Mention one line in detials ${index + 1}`}
          value={cert}
          onChange={(e) => handlereferencesChange(index, e.target.value)}
         className="w-full border p-2 rounded bg-[#eaecf1] outline-none"
        />
        {formData.references.length > 1 && (
          <button
            type="button"
            onClick={() => handleRemovereferences(index)}
            className="text-red-500 text-xl font-bold"
          >
            ✕
          </button>
        )}
      </div>
    ))
  ) : (
    <div className="flex items-center gap-2 mb-2">
      <input
        type="text"
        placeholder="ADD personalInterests one line "
        value=""
        onChange={(e) => handlereferencesChange(0, e.target.value)}
        className="w-full border p-2 rounded bg-[#eaecf1] outline-none"
      />
    </div>
  )}
  <button
    type="button"
    onClick={handleAddreferences}
    className="text-sm text-black font-medium mt-1"
  >
    + Add references
  </button>
</div>                 

 </div>
  );
  };

export default ResumeForm;


