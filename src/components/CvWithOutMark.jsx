import React, { useRef, useEffect, useState } from 'react';


const CvWithOutMark = React.forwardRef(({data, isPreview }, ref) => {
  // const shouldBreak =
  // data.extraCurricular.positions.filter(p => p.trim() !== '').length > 2 ||
  // data.extraCurricular.volunteering.filter(v => v.trim() !== '').length > 2;
  const extracurricularRef = useRef(null);
  const publicationRef = useRef(null);
  const [breakSection, setBreakSection] = useState(null);

  useEffect(() => {
    if (isPreview) return;

    const extraTop = extracurricularRef.current?.getBoundingClientRect().top || 0;
    const pubTop = publicationRef.current?.getBoundingClientRect().top || 0;

    if (extraTop > pubTop) {
      setBreakSection("extracurricular");
    } else {
      setBreakSection("publication");
    }
  }, [isPreview]);


  useEffect(() => {
    const handleBeforePrint = () => {
      document.querySelectorAll(".page-section").forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          section.classList.add("second-page");
        }
      });
    };

    const handleAfterPrint = () => {
      document.querySelectorAll(".page-section").forEach((section) => {
        section.classList.remove("second-page");
      });
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  return (
    <>
    
    <div ref={ref} className="bg-white p-6 rounded-lg shadow-md text-gray-800 w-full max-w-[800px] mx-auto a4-size shadow-xl mx-auto  ">
    {isPreview && (
        <p className="text-xl font-bold mb-4">Preview of your CV</p>
      )}
  
<div className="a4-size">
  {/* All resume content here */}

  <div className="text-center">
    <h1 className="text-[20px] text-center font-times font-bold">
      {data.fullName && data.fullName.trim() !== "" ? data.fullName : "Name"}
  </h1>

<p className="text-center text-[12px] mt-2 font-times">
  <a href={`mailto:${data.email || "email@example.com"}`} className="text-blue-900">
    {data.email && data.email.trim() !== "" ? data.email : "email@example.com"}
  </a>
  {` | `}
  {data.phone && data.phone.trim() !== ""
    ? `+91 ${data.phone}`
    : "+91 XXXXXXXXXX"}
  {` | `}
  <a
    href={data.linkedin || "https://linkedin.com/in/your-profile"}
    className="text-blue-900"
  >
    {data.linkedin && data.linkedin.trim() !== ""
      ? data.linkedin
      : "linkedin.com/in/your-profile"}
  </a>
</p>
</div>

  <div className="mt-6 font-times">
    <hr className="border border-black" style={{ marginTop: '20px'}}/>
    <h2 className="text-[12px] font-bold" >EDUCATION</h2>
    <hr className="border border-black"  style={{ marginTop: '12px'}}/>
                   {/* Education table and content goes here */}
  </div>
  <table className="w-full text-left border border-blue-300 mt-2 font-times">
    <thead>
      <tr>
        <th className="border border-black font-times pb-2 pl-2 text-[12px]">UNIVERSITY/SCHOOL</th>
        <th className="border border-black font-times pb-2 pl-2 text-[12px]">QUALIFICATION</th>
        <th className="border border-black font-times pb-2 pl-2 text-[12px]">CGPA/PERCENTAGE</th>
      </tr>
    </thead>
    <tbody>
  {data.education.universityOther && (
    <tr>
    <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">{data.education.universityOther}</td>
    <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">{data.education.courseOther}</td>
    <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">{data.education.cgpaOther}</td>
   </tr>
)}
 
 {data.education.universityPg && (
    <tr>
    <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">{data.education.universityPg}</td>
    <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">{data.education.coursePg}</td>
    <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">{data.education.cgpaPg}</td>
    </tr>
)}
         <tr>
          <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">{data.education.university}</td>
          <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">{data.education.course}</td>
          <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">{data.education.cgpaUni}</td>
        </tr>
  
        <tr>
          <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">{data.education.class12}</td>
          <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">Class XII ({data.education.board12})</td>
          <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">{data.education.cgpa}</td>
        </tr>
        <tr>
          <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">{data.education.class10}</td>
          <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">Class X ({data.education.board10})</td>
          <td className="border border-black font-times pb-2 pl-2 text-[11px] text-black">{data.education.percentage10}</td>
        </tr>
    </tbody>
  </table>
          {/* ADDITIONAL CerTIFication */}
  <div className="mt-3 font-times avoid-break"> 
    <hr className="border border-black w-full" />
    <h2 className="font-bold text-[12px] font-times leading-none" >
      ADDITIONAL CERTIFICATIONS
    </h2>
    <hr className="border border-black w-full" style={{ marginTop: '12px'}} />
  
  <ul className="font-times text-[11px]">
    {data.certifications
      .filter(cert => cert.trim() !== '')
      .map((cert, index) => (
        <li key={index} className="flex items-start gap-2 ml-6 text-black">
          <span className="mt-[2px]">•</span>
          <span className="align-middle">{cert}</span>
        </li>
      ))}
  </ul>
    {/* <ul className="font-times text-[11px]">
      {data.certifications
        .filter(cert => cert.trim() !== '')
        .map((cert, index) => (
          <li key={index} className="flex items-start gap-2 ml-6">
            <span className="mt-[2px]">•</span>
            <span className="align-middle">{cert}</span>
          </li>
        ))}
    </ul> */}
  </div>
 
  <div className="mt-6 font-times">
    <hr className="border border-black" />
    <h2 className="font-bold text-[12px]" >INTERNSHIPS & WORK EXPERIENCE</h2>
    <hr className="border border-black" style={{ marginTop: '12px'}}/>

    {data.internships.map((intern, index) => {
      const hasOrg = intern.orgName?.trim() !== '';
      const hasTeam = intern.teamDesc?.trim() !== '';
      const hasDuration = intern.duration?.trim() !== '';
      const validTasks = Array.isArray(intern.tasks)
        ? intern.tasks.filter(task => task.trim() !== '')
        : [];

      const shouldRender = hasOrg || hasTeam || hasDuration || validTasks.length > 0;

      if (!shouldRender) return null;

      return (
        <div key={index} className="mb-4 font-times break-inside-avoid text-black">
          {(hasOrg || hasTeam || hasDuration) && (
            <div className="flex justify-between items-start flex-wrap font-times">
              <p className="font-medium font-times">
              ➢ {hasOrg ? intern.orgName : ''}{hasOrg && hasTeam ? ` (${intern.teamDesc})` : hasTeam ? intern.teamDesc : ''}
              </p>
              {hasDuration && (
        <span className="text-[14px] font-bold text-black" style={{ fontFamily: 'Times New Roman, serif' }}>
           {intern.duration}
            </span>
)}

            </div>
          )}

          {validTasks.length > 0 && (
            <ul className="space-y-1 font-times text-[11px] mt-[2px]">
              {validTasks.map((task, taskIdx) => (
                <li key={taskIdx} className="flex items-start gap-2 ml-6 font-times text-black">
                  <span className="mt-[2px]">•</span>
                  <span className="leading-tight font-times">{task}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    })}
  </div>

  <div className="mt-6 font-times avoid-break pdf-section important-block">
    <hr className="border border-black" />
    <h2 className="font-times text-[12px] font-bold">CO-CURRICULAR ACTIVITIES</h2>
    <hr className="border border-black " style={{ marginTop: '12px'}}/>
    
    <p className="text-[11px] font-extrabold mt-2" style={{ fontFamily: 'Times New Roman, serif' }}>
      Moot Court Competitions/Debates/MUN /Literary Events
    </p>
    
    <ul className="space-y-1 font-times pb-2 text-[11px] mb-3">
      {data.coCurricular
        .filter(item => item.trim() !== '')
        .map((cert, index) => (
          <li key={index} className="flex items-start gap-2 ml-6 font-times text-black">
            <span className="mt-[2px]">•</span>
            <span className="align-middle font-times">{cert}</span>
          </li>
        ))}
    </ul>
  </div>
  {data.publications?.some(
  (pub) =>
    pub.title?.trim() !== '' ||
    // pub.type?.trim() !== '' ||
    // pub.platform?.trim() !== '' ||
    // pub.date?.trim() !== '' ||
    pub.link?.trim() !== ''
) && (
<div
  className={`mt-[-25px] font-times ${
    breakSection === "publication" && !isPreview ? "maybe-break" : ""
  }`}
  ref={publicationRef}
>
  <div className="break-inside-avoid pdf-section mt-[-10px]">
    <hr className="border border-black" />
    <h2 className="text-[12px] font-times font-bold">
      PUBLICATIONS, CONFERENCES AND WEBINARS
    </h2>
    <hr className="border border-black" style={{ marginTop: "12px" }} />
    <ul className="space-y-1 font-times pb-2 text-[11px] mt-2">
      {data.publications
        .filter(
          (pub) =>
            pub.title?.trim() !== "" ||
            // pub.type?.trim() !== "" ||
            // pub.platform?.trim() !== "" ||
            pub.date?.trim() !== "" ||
            pub.link?.trim() !== ""
        )
        .slice(0, 10)
        .map((pub, index) => (
          <li key={index} className="flex items-start gap-2 ml-6 font-times text-black">
            <span className="mt-[2px]">•</span>
            <span>
              {pub.type?.toLowerCase() || ""} {" "}
              <>{pub.title}</>
              {pub.link?.trim() !== "" && (
                <>
                  {" "}
                  —{" "}
                  <a href={pub.link} className="text-blue-900">
                    {pub.link}
                  </a>
                </>
              )}
            </span>
          </li>
        ))}
    </ul>
  </div>
</div>

)}
       
    {/* Second page content here */}
 <div
  className={`w-full mt-[-10px] ${
    breakSection === "extracurricular" && !isPreview ? "maybe-break" : ""
  }`}
  ref={extracurricularRef}
>
  <div className="break-inside-avoid pdf-section important-block">
    <div
      className="w-full max-w-[800px] mx-auto font-times"
      style={{ marginTop: "30px" }}
    >
      <hr className="border border-black" />
      <h2 className="font-times text-[12px] font-bold">
        EXTRA-CURRICULAR ACTIVITIES
      </h2>
      <hr className="border border-black" style={{ marginTop: "12px" }} />
      <p className="text-[12px] font-times mt-2 text-black">
        <span>➢ </span>
        <span className="font-times text-[11px] font-extrabold" style={{ fontFamily: 'Times New Roman, serif' }}>
          Positions of responsibility
        </span>
      </p>
      <ul className="space-y-1 font-times text-[11px]">
        {data.extraCurricular.positions
          .filter((p) => p.trim() !== "")
          .map((item, index) => (
            <li key={index} className="flex items-center gap-2 ml-3 text-black">
              <span className="text-[10px]">•</span>
              <span className="text-[10px] leading-tight font-times">
                {item}
              </span>
            </li>
          ))}
      </ul>
      <p className="text-[12px] mt-2 font-times text-black">
        <span>➢ </span>
        <span className="text-[11px] font-extrabold" style={{ fontFamily: 'Times New Roman, serif' }}>Volunteering activities</span>
      </p>
      <ul className="space-y-1 pb-2 text-[11px]">
        {data.extraCurricular.volunteering
          .filter((v) => v.trim() !== "")
          .map((item, index) => (
            <li key={index} className="flex items-center gap-2 ml-3 text-black">
              <span className="text-[10px]">•</span>
              <span className="text-[10px] leading-tight font-times">
                {item}
              </span>
            </li>
          ))}
      </ul>
    </div>
  </div>

  
{/* <div className={`page-section ${!isPreview ? "maybe-break" : ""}`}> */}
  <div className="break-inside-avoid pdf-section mt-[-10px]">
   <div className="mt-6 font-times">
   <hr className="border border-black"/>
   <h2 className="font-times text-[12px] font-bold">PERSONAL INTERESTS</h2>
   <hr className="border border-black" style={{ marginTop: '12px'}}/>
   {data.personalInterests && data.personalInterests.length > 0 && (
 <ul className="space-y-1 pb-2 text-[11px] mt-2 text-black">
   {data.personalInterests.map((cert, index) => (
     <li key={index} className="flex items-center gap-2 ml-3 font-times text-black">
         <span className="text-[10px]">•</span>
         <span className="text-[10px] leading-tight font-times text-black">{cert}</span>
     </li>
   ))}
 </ul>
  )}
 </div>
 </div>
 {/* </div> */}
                    {/* references */}  
     {/* <div className={`page-section ${!isPreview ? "maybe-break" : ""}`}>     */}
      <div className="break-inside-avoid pdf-section mt-[-10px]">                     
      <div className="mt-6 font-times text-black">
        <hr className="border border-black" />
        <h2 className="font-times text-[12px] font-bold text-black">REFERENCES/RECOMMENDATIONS</h2>
        <hr className="border border-black"style={{ marginTop: '12px'}} />
  
         <ul className="space-y-1 mb-2 font-times pb-2 text-[11px] mt-2 text-black">
         {Array.isArray(data.references) && data.references.length > 0 &&
           data.references.map((cert, index) => (
            <li key={index} className="flex items-center gap-2 ml-3 font-times text-black">
              <span className="text-[10px]">•</span>
              <span className="text-[10px] leading-tight font-times">{cert}</span>
            </li>
         ))
         }
         </ul>
      </div>
      </div>
      <hr className="border border-black"/>
    </div>
    </div>  
{/* </div>  */}
</div>
</>
  );

});


export default CvWithOutMark;