import React from "react"; 

const CvWithMark = React.forwardRef(({data }, ref) => {
  return (
    <>
    <div ref={ref} className="bg-white p-6 rounded-lg shadow-md text-gray-800 w-full max-w-[800px] mx-auto ">
    <div className="text-center">
    <h1 className="text-[20px] text-center font-times font-bold">
  {data.fullName && data.fullName.trim() !== "" ? data.fullName : "Name"}
  </h1>

  <p className="text-center text-[12px] mt-2 font-times">
  <a href={`mailto:${data.email || "email@example.com"}`} className="text-blue-700">
    {data.email && data.email.trim() !== "" ? data.email : "email@example.com"}
  </a>
  {` | `}
  {data.phone && data.phone.trim() !== ""
    ? `+91 ${data.phone}`
    : "+91 XXXXXXXXXX"}
  {` | `}
  <a
    href={data.linkedin || "https://linkedin.com/in/your-profile"}
    className="text-blue-700"
  >
    {data.linkedin && data.linkedin.trim() !== ""
      ? data.linkedin
      : "linkedin.com/in/your-profile"}
  </a>
</p>
</div>

  <div className="mt-6 font-times">
    <hr className="border border-black" />
    <h2 className="font-times text-[12px] font-bold mb-3">EDUCATION</h2>
    <hr className="border border-black" />
    
                            {/* Education table and content goes here */}
  </div>

  <table className="w-full text-left border border-black mt-2">
    <thead>
      <tr>
        <th className="border border-black font-times pb-2 pl-2">UNIVERSITY/SCHOOL</th>
        <th className="border border-black font-times pb-2 pl-2">QUALIFICATION</th>
        <th className="border border-black font-times pb-2 pl-2">CGPA/PERCENTAGE</th>
      </tr>
    </thead>
    <tbody>
     {data.education.universityOther && (
    <tr>
    <td className="border border-black font-times pb-2 pl-2 text-[11px]">{data.education.universityOther}</td>
    <td className="border border-black font-times pb-2 pl-2 text-[11px]">{data.education.courseOther}</td>
    <td className="border border-black font-times pb-2 pl-2 text-[11px]">{data.education.cgpaOther}</td>
   </tr>
  )}
        
    {data.education.universityPg && (
    <tr>
    <td className="border border-black font-times pb-2 pl-2 text-[11px]">{data.education.universityPg}</td>
    <td className="border border-black font-times pb-2 pl-2 text-[11px]">{data.education.coursePg}</td>
    <td className="border border-black font-times pb-2 pl-2 text-[11px]">{data.education.cgpaPg}</td>
    </tr>
   )}
        <tr>
          <td className="border border-black font-times pb-2 pl-2 text-[11px]">{data.education.university}</td>
          <td className="border border-black font-times pb-2 pl-2 text-[11px]">{data.education.course}</td>
          <td className="border border-black font-times pb-2 pl-2 text-[11px]">{data.education.cgpaUni}</td>
        </tr>
        <tr>
          <td className="border border-black font-times pb-2 pl-2 text-[11px]">{data.education.class12}</td>
          <td className="border border-black font-times pb-2 pl-2 text-[11px]">Class XII ({data.education.board12})</td>
          <td className="border border-black font-times pb-2 pl-2 text-[11px]">{data.education.cgpa}</td>
        </tr>
        <tr>
          <td className="border border-black font-times pb-2 pl-2 text-[11px]">{data.education.class10}</td>
          <td className="border border-black font-times pb-2 pl-2 text-[11px]">Class X ({data.education.board10})</td>
          <td className="border border-black font-times pb-2 pl-2 text-[11px]">{data.education.percentage10}</td>
        </tr>
  </tbody>
  </table>
                        {/* ADDITIONAL CerTIFication */}
  <div className="mt-6 font-times"> 
    <hr className="border border-black" />
    <h2 className="font-bold text-[12px] mb-3 font-times">ADDITIONAL CERTIFICATIONS</h2>
    <hr className="border border-black" />

    <ul className="font-times text-[11px]">
      {data.certifications
        .filter(cert => cert.trim() !== '')
        .map((cert, index) => (
          <li key={index} className="flex items-start gap-2 ml-6">
            <span className="mt-[2px]">•</span>
            <span className="align-middle">{cert}</span>
          </li>
        ))}
    </ul>
  </div>

  <div className="mt-6 font-times">
    <hr className="border border-black" />
    <h2 className="font-bold text-[12px] mb-3">INTERNSHIPS & WORK EXPERIENCE</h2>
    <hr className="border border-black"/>

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
        <div key={index} className="mb-4">
          {(hasOrg || hasTeam || hasDuration) && (
            <div className="flex justify-between items-start flex-wrap font-times">
              <p className="font-medium font-times">
                ◆ {hasOrg ? intern.orgName : ''}{hasOrg && hasTeam ? ` (${intern.teamDesc})` : hasTeam ? intern.teamDesc : ''}
              </p>
              {hasDuration && <span className="text-[10px] font-times">{intern.duration}</span>}
            </div>
          )}

          {validTasks.length > 0 && (
            <ul className="space-y-1 font-times">
              {validTasks.map((task, taskIdx) => (
                <li key={taskIdx} className="flex items-start gap-2 ml-6 font-times">
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

  <div className="mt-6 font-times">
    <hr className="border border-black" />
    <h2 className="font-times text-[12px] mb-3 font-bold">CO-CURRICULAR ACTIVITIES</h2>
    <hr className="border border-black" />
    
    <p className="text-[12px] text-bold font-times text-[11px]">
      Moot Court Competitions/Debates/MUN /Literary Events
    </p>
    
    <ul className="space-y-1 font-times pb-2 text-[11px]">
      {data.coCurricular
        .filter(item => item.trim() !== '')
        .map((cert, index) => (
          <li key={index} className="flex items-start gap-2 ml-6 font-times">
            <span className="mt-[2px]">•</span>
            <span className="align-middle font-times">{cert}</span>
          </li>
        ))}
    </ul>
  </div>

  {data.publications?.some(
  (pub) =>
    pub.title?.trim() !== '' ||
    pub.type?.trim() !== '' ||
    pub.platform?.trim() !== '' ||
    pub.date?.trim() !== '' ||
    pub.link?.trim() !== ''
) && (
  <div className="mt-6 font-times">
    <hr className="border border-black" />
    <h2 className="text-[12px] pb-1 font-times font-bold">PUBLICATIONS, CONFERENCES AND WEBINARS</h2>
    <hr className="border border-black"style={{ marginTop: '12px'}} />
    <ul className="space-y-1 font-times pb-2 text-[11px]">
      {data.publications
        .filter(
          (pub) =>
            pub.title?.trim() !== '' ||
            pub.type?.trim() !== '' ||
            pub.platform?.trim() !== '' ||
            pub.date?.trim() !== '' ||
            pub.link?.trim() !== ''
        )
        .slice(0, 3)
        .map((pub, index) => (
          <li key={index} className="flex items-start gap-2 ml-6 font-times">
            <span className="mt-[2px]">•</span>
            <span className="font-times">
              {pub.type?.toLowerCase() || "publication"} titled <strong>{pub.title}</strong>, {pub.platform}, {pub.date}
              {pub.link?.trim() !== '' && (
                <> — <a href={pub.link} className="text-blue-600 underline">{pub.link}</a></>
              )}
            </span>
          </li>
        ))}
    </ul>
  </div>
)}

<div className="flex justify-center mt-[220px]">
  <span className="inline-block px-2 py-2 rounded text-center">
    <span className="font-times text-lg">
      CV made by <a href="https://fawyerz.in/judgments/" className="text-[#A52A2A]">FAWYERZ</a>
    </span>
  </span>
</div>

                                {/* Second page content here */}
   <div className="w-full mt-[10px]">
  <div className="mt-6 w-full max-w-[800px] mx-auto font-times" style={{ marginTop:'30px'}}>
    <hr className="border border-black"/>
    <h2 className="font-times text-[12px] p-1 font-bold">EXTRA-CURRICULAR ACTIVITIES</h2>
    <hr className="border border-black mt-1 "/>
        <p className="text-[12px] font-times">
          <span>◆ </span>
          <span className="text-[11px]">Positions of responsibility</span>
        </p>
        <ul className="space-y-1 text-[11px]">
          {data.extraCurricular.positions
            .filter(p => p.trim() !== '')
            .map((item, index) => (
              <li key={index} className="flex items-center gap-2 ml-3">
                <span className="text-[10px]">•</span>
                <span className="text-[10px] leading-tight font-times">{item}</span>
              </li>
          ))}
        </ul>
    {Array.isArray(data.extraCurricular.volunteering) && data.extraCurricular.volunteering.filter(v => v.trim() !== '').length > 0 && (
      <>
        <p className="text-[11px] mt-2 font-times">
          <span>◆ </span>
          <span className="">Volunteering activities</span>
        </p>
        <ul className="space-y-1 pb-2 text-[11px]">
          {data.extraCurricular.volunteering
            .filter(v => v.trim() !== '')
            .map((item, index) => (
              <li key={index} className="flex items-center gap-2 ml-3">
                <span className="text-[10px]">•</span>
                <span className="text-[10px] leading-tight font-times">{item}</span>
              </li>
          ))}
        </ul>
      </>
    )}
  </div>
   <div className="mt-6">
   <hr className="border border-black"/>
   <h2 className="font-times text-[12px] mb-3 font-bold">PERSONAL INTERESTS</h2>
   <hr className="border border-black mt-1"/>
   {data.personalInterests && data.personalInterests.length > 0 && (
 <ul className="space-y-1 pb-2 text-[11px]">
   {data.personalInterests.map((cert, index) => (
     <li key={index} className="flex items-center gap-2 ml-3 font-times">
         <span className="text-[10px]">•</span>
         <span className="text-[10px] leading-tight font-times">{cert}</span>
     </li>
   ))}
 </ul>
  )}
 </div>
                {/* references */}
 <div className="mt-6 font-times">
  <hr className="border border-black" />
  <h2 className="font-times text-[12px] mb-3 font-bold">REFERENCES/RECOMMENDATIONS</h2>
  <hr className="border border-black" />
  <ul className="space-y-1 mb-2 font-times pb-2 text-[11px]">
    {Array.isArray(data.references) && data.references.length > 0 &&
      data.references.map((cert, index) => (
        <li key={index} className="flex items-center gap-2 ml-3 font-times">
          <span className="text-[10px]">•</span>
          <span className="text-[10px] leading-tight font-times">{cert}</span>
        </li>
      ))
    }
  </ul>
</div>

<hr className="border border-black"/>
</div>
</div>
</>
  );

});


export default CvWithMark;
