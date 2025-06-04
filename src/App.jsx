import React, { useEffect, useRef, useState } from "react";
import ResumeForm from "./components/ResumeForm";
import CvWithMark from "./components/CvWithMark";
import CvWithOutMark from "./components/CvWithOutMark";
import FormAndPreviewLayout from "./components/FormAndPreviewLayout";
import html2pdf from "html2pdf.js";
import './styles/pagebreak.css';
import axios from "axios";
import img1 from './assets/Imges/ConsumerLaw.jpg'
import img2 from './assets/Imges/CUserstanv.png'
import * as dotenv from "../server/dotenv"

const client= process.env.MONGO_URI;
let db= client.db();

function App() {
const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    education: {
      class10: "",
      board10: "",
      percentage10: "",
  
      class12: "",
      board12: "",
      cgpa: "",
  
      university: "",
      course: "",
      cgpaUni: "",
  
      universityPg: "",
      coursePg: "",
      cgpaPg: "",
  
      universityOther: "",
      courseOther: "",
      cgpaOther: "",
  
    },
    certifications: [""],  
    internships: [
      {
        orgName: "",
        teamDesc: "",
        duration: "",
        tasks: [""],
      },
    ],
    coCurricular: [""],
    publications: [
      {
        title: "",
        type: "", 
        platform: "",
        date: "",
        link: "",
      },
    ],
    extraCurricular: {
      positions: [""],
      volunteering: [""],
      other: [""],  
    },
    personalInterests: [""],
    references: [""]
  });
  
              //FOR SAVE DATA IN DATABASE 
const handleSaveToDatabase = async () => {
  try {
    console.log(formData);
    const res = await axios.post("http://localhost:5000/api/resume",formData);
    console.log(res);
    alert("Resume saved to database successfully!");
  } catch (error) {
    console.error("Error saving resume:", error);
    alert("Failed to save resume.");
  }
};

  useEffect(()=> {console.log(formData)},[formData])
  const resumeRef = useRef();
  const resumeNoWatermarkRef = useRef();
  const [showPreview, setShowPreview] = useState(true);
  const downloadResumeAsPDF = (ref, filename) => {
    const element = ref.current;
    if (!element) {
      console.error("Element not found for PDF export");
      return;
    }
  
    const sections = element.querySelectorAll(".pdf-section");
  
    // Step 1: Clear all previous padding
    sections.forEach((section) => {
      section.classList.remove("add-padding-top");
    });
  
    // Step 2: Wait for layout to settle
    setTimeout(() => {
      const dpi = 96;
      const pageHeightPx = 11 * dpi; // 11 inches
      const buffer = 30;
  
      sections.forEach((section) => {
        const offsetTop = section.getBoundingClientRect().top + window.scrollY;
  
        // Add padding if important block starts near the top of second page
        if (
          offsetTop > pageHeightPx - buffer &&
          offsetTop < pageHeightPx + 200 &&
          section.classList.contains("important-block")
        ) {
          section.classList.add("add-padding-top");
        }
      });
  
      // Step 3: Generate PDF
      const opt = {
        margin: [0.4, 0.6, 0.2, 0.6],
        filename: filename,
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 4,
          useCORS: true,
          allowTaint: true,
        },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait",
        },
      };
  
      html2pdf().from(element).set(opt).save();
    }, 100); // Delay ensures layout stabilizes before calculating offsets
  };
  

  const isFormValid = () => {
    const { fullName, email, phone, linkedin, certifications, internships, coCurricular, personalInterests, references, publications, extraCurricular } = formData;
  
    const hasValidInternship = internships.some(intern => {
      return (
        intern.orgName?.trim() ||
        intern.duration?.trim() ||
        (Array.isArray(intern.tasks) && intern.tasks.some(task => task?.trim()))
      );
    });
  
    const hasPersonalInterest = Array.isArray(personalInterests) && personalInterests.some(item => item?.trim());
    const hasReference = Array.isArray(references) && references.some(item => item?.trim());
    const hasCoCurricular = Array.isArray(coCurricular) && coCurricular.some(item => item?.trim());
  
    const hasExtraCurricular =
      (Array.isArray(extraCurricular?.positions) && extraCurricular.positions.some(p => p?.trim())) ||
      (Array.isArray(extraCurricular?.volunteering) && extraCurricular.volunteering.some(v => v?.trim()));
  
    const hasPublication = Array.isArray(publications) && publications.some(pub =>
      pub.title?.trim() || pub.type?.trim() || pub.platform?.trim() || pub.date?.trim() || pub.link?.trim()
    );
  
    return !(
      fullName?.trim() &&
      email?.trim() &&
      phone?.toString().trim() &&
      linkedin?.trim() &&
      Array.isArray(certifications) && certifications.length > 0 &&
      hasValidInternship &&
      hasPersonalInterest &&
      hasReference &&
      hasCoCurricular &&
      hasExtraCurricular &&
      hasPublication
    );
  };
  
           // Handlers
  // const handlePreview = () => {
  //   downloadResumeAsPDF(resumeRef, `${formData.name || "Resume"}`);
  // };

  const handleDownloadPDF = async () => {
    if (isFormValid()) {
      alert("Please fill all required fields — including at least one internship, personal interest, reference, co-curricular, extra-curricular, and publication.");
      console.log("###################");
      console.log("***********isFormValid****",isFormValid());
      console.log({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        linkedin: formData.linkedin,
        certifications: formData.certifications,
      });
      return;
    }
    await handleSaveToDatabase();
    await downloadResumeAsPDF(resumeRef, `${formData.name || "Resume"}.pdf`);
  };
 
const handleDownloadNoWatermark = async () => {
  if (isFormValid()) {
    alert("Please fill all info carefully!");
    console.log("###################");
    console.log("*********isFormValid*******",isFormValid()) 
    console.log({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      linkedin: formData.linkedin,
      certifications: formData.certifications,
    });
    
    return;
  }
  await handleSaveToDatabase();
  await downloadResumeAsPDF(resumeNoWatermarkRef, `${formData.name || "Resume-No-Watermark"}.pdf`);
};

  

return (
  <>
                     {/* // <!-- Header Component --> */} {/* <!-- Font Awesome CDN --> */}
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
{/* --- HEADER --- */}
<header className="flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-md">
  {/* Logo & Title */}
  <div className="flex items-center space-x-4">
    <img src=".\src\assets\Imges\Fawyerz CV Maker.svg" alt="Logo" className="h-[70px] w-auto" />
  </div>

  {/* Social Icons */}
  <div className="flex space-x-3 mt-4 sm:mt-0">
    <a href="https://www.youtube.com/@Inculcatelaw" target="_blank" className="w-8 h-8 bg-red-600 rounded-md text-white flex items-center justify-center hover:scale-110 transition-transform">
      <i className="fab fa-youtube text-lg"></i>
    </a>
    <a href="https://chat.whatsapp.com/GABMQcxgwChKpgSeQAUxRe" target="_blank" className="w-8 h-8 bg-green-500 rounded-md text-white flex items-center justify-center hover:scale-110 transition-transform">
      <i className="fab fa-whatsapp text-lg"></i>
    </a>
    <a href="https://www.instagram.com/fawyerz.in" target="_blank" className="w-8 h-8 bg-black rounded-md text-white flex items-center justify-center hover:scale-110 transition-transform">
      <i className="fab fa-instagram text-lg"></i>
    </a>
    <a href="https://www.linkedin.com/company/fawyerz-in/posts/?feedView=all" target="_blank" className="w-8 h-8 bg-blue-700 rounded-md text-white flex items-center justify-center hover:scale-110 transition-transform">
      <i className="fab fa-linkedin-in text-lg"></i>
    </a>
    <a href="https://t.me/Inculcatelaw" target="_blank" className="w-8 h-8 bg-sky-500 rounded-md text-white flex items-center justify-center hover:scale-110 transition-transform">
      <i className="fab fa-telegram text-lg"></i>
    </a>
  </div>
</header>

{/* --- AD BANNERS --- */}

<div className="w-full flex justify-center mt-4 bg-white">
  <div className="flex gap-6 flex-wrap justify-center items-center max-w-[1200px] w-full px-4">
    <a href="https://fawyerz.in/courses" target="_blank" rel="noopener noreferrer">
      <img
        src={img1}
        alt="Ad 1"
        className="object-contain"
        style={{ width: '30vw', height: 'auto' }}
      />
    </a>
    <a href="https://fawyerz.in/journal" target="_blank" rel="noopener noreferrer">
      <img
        src={img2}
        alt="Ad 2"
        className="object-contain"
        style={{ width: '30vw', height: 'auto' }}
      />
    </a>
  </div>
</div>
<div className="min-h-screen p-9 space-y-3">
{!showPreview ? (
  
  <ResumeForm formData={formData} setFormData={setFormData} />
) : (
  
  <FormAndPreviewLayout
    formData={formData}
    setFormData={setFormData}
    onClose={() => setShowPreview(false)}
  />
)}
                            {/* Buttons - Centered Always */}
      <div className="flex gap-4 items-center justify-center mt-10 flex-wrap">
                       {/* Download PDF */}
          {/* <button onClick={handleDownloadPDF} className="px-5 py-2.5 bg-[#491b1d] text-white rounded-md shadow-sm transition duration-150 ease-in-out font-semibold text-sm flex items-center hover:bg-[#703236]">
            <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            Download
          </button> */}
                          {/* Download No Watermark */}
          <button onClick={handleDownloadNoWatermark} className="px-5 py-2.5 bg-[#491b1d] text-white rounded-md shadow-sm transition duration-150 ease-in-out font-semibold text-sm flex items-center hover:bg-[#703236]">
            <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            Download
          </button>
       </div>
    
        {/* Hidden templates for PDF export */}
        <div style={{ display: "none" }}>
          <div ref={resumeRef}>
            <CvWithMark data={formData} />
          </div>
          <div ref={resumeNoWatermarkRef}>
            <CvWithOutMark data={formData} />
          </div>
        </div>
      </div>
                                                 {/* footer start from here */}
  <footer class="bg-[#290f0f] text-white py-8 px-4 md:px-10 xl:px-60">
  <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
   <div class="space-y-4 mt-4">
   <img src="https://fawyerz.in/wp-content/uploads/2024/10/Group-3.png" alt="Fawyerz Logo" class="max-w-[180px] w-full sm:w-auto"/>
  
  <div class="flex flex-wrap gap-2 h-auto mt-8 w-80">

  <div class="bg-white w-8 h-8 flex items-center justify-center rounded-full">
    <a href="https://www.youtube.com/@Inculcatelaw" class="hover:opacity-75">
      <i class="fa-brands fa-youtube text-lg text-black"></i>
    </a>
  </div>

   <div className='bg-white w-8 h-8 flex items-center justify-center rounded-full'>
    <a href="https://chat.whatsapp.com/GABMQcxgwChKpgSeQAUxRe" class="hover:opacity-75">
      <i class="fa-brands fa-whatsapp text-lg text-black"></i>
    </a></div>
    
    <div className='bg-white w-8 h-8 flex items-center justify-center rounded-full'>
    <a href="https://www.instagram.com/fawyerz.in/?igsh=djY3dmtrMDNqZzFp#" class="hover:opacity-75">
      <i class="fa-brands fa-instagram text-lg text-black"></i>
    </a> </div>

    <div className='bg-white w-8 h-8 flex items-center justify-center rounded-full '>
    <a href="https://www.linkedin.com/company/fawyerz-in/posts/?feedView=all" class="hover:opacity-75">
      <i class="fa-brands fa-linkedin-in text-lg text-black"></i>
    </a></div>

    <div className='bg-white w-8 h-8 flex items-center justify-center rounded-full'>
    <a href="https://t.me/Inculcatelaw" class="hover:opacity-75">
      <i class="fa-brands fa-telegram text-lg text-black"></i>
    </a>
    </div>
  </div>
</div>

    <div class="space-y-2">
    <h3 class="font-bold text-lg md:text-xl mt-4 md:mt-2">Explore Us</h3>
      <ul class="list-none mt-8 text-sm">
        <li><a href="https://fawyerz.in/fawyerzin/updates">Updates</a></li>
        <li><a href="https://fawyerz.in/fawyerzin/drafts">Drafts</a></li>
        <li><a href="https://fawyerz.in/jobs/">Jobs</a></li>
        <li><a href="https://inculcatelaw.com/courses/">Courses</a></li>
        <li><a href="https://fawyerz.in/internships/">Internships</a></li>
        <li><a href="https://fawyerz.in/fawyerzin/judgments">Case Summaries</a></li>
      </ul>
    </div>

    <div class="space-y-2">
    <h3 class="font-bold text-lg md:text-xl mt-4 md:mt-2">Useful Links</h3>
      <ul class="list-none mt-8 text-sm">
        <li><a href="https://fawyerz.in/blogs/">Blogs</a></li>
        <li><a href="https://fawyerz.in/judgments/about-us/">About Us</a></li>
        <li><a href="https://fawyerz.in/post-now/">Submit Post</a></li>
        <li><a href="https://fawyerz.in/judgments/contact-us/">Contact Us</a></li>
        <li><a href="#">Daily Quizzes</a></li>
        <li><a href="https://chat.whatsapp.com/IN8BV9E4npgHQfGxDZwNBd">WhatsApp Community</a></li>
      </ul>
    </div>

    <div class="space-y-2">
    <h3 class="font-bold text-lg md:text-xl mt-4 md:mt-2">Legal</h3>
      <ul class="list-none mt-8 text-sm">
        <li><a href="https://fawyerz.in/terms-and-conditions/" >Terms and Conditions</a></li>
        <li><a href="https://fawyerz.in/refund-policy/">Refund Policy</a></li>
        <li><a href="https://fawyerz.in/cookie-policy/">Cookie Policy</a></li>
        <li><a href="https://fawyerz.in/affiliate-disclosure/">Affiliate Disclosure</a></li>
        <li><a href="https://fawyerz.in/privacy-policy/">Privacy Policy</a></li>
      </ul>
    </div>

    <div class="space-y-2">
    <h3 class="font-bold text-lg md:text-xl mt-4 md:mt-2">Important</h3>
      <ul class="list-none mt-8 space-y-1.5 text-sm">
      <li class="flex items-center gap-3">
      <span class="w-5 h-5 flex items-center justify-center rounded-full border-2 border-white text-white text-sm text-bold">
      &#10003;
    </span> <a href="https://fawyerz.in/submit-posts/">Submit Posts</a>
  </li>
   <li class="flex items-center gap-3">
    <span class="w-5 h-5 flex items-center justify-center rounded-full border-2 border-white text-white text-sm text-bold">
      &#10003;
    </span>
    <a href="#">Advertise with Us</a>
  </li>
  <li class="flex items-center gap-3">
    <span class="w-5 h-5 flex items-center justify-center rounded-full border-2 border-white text-white text-sm text-bold">
      &#10003;
    </span>
    <a href="#">Join our Team</a>
  </li>
  <li class="flex items-center gap-3">
    <span class="w-5 h-5 flex items-center justify-center rounded-full border-2 border-white text-white text-sm text-bold">
      &#10003;
    </span>
    <a href="#">Mail Us</a>
  </li>
</ul>
</div>
  </div>

  <div class="container mx-auto mt-8 text-center text-sm">
  <div class="group w-full">
  <hr class="border border-gray-500 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
</div>
<hr class="border border-white w-full sm:w-[500px] md:w-[700px] lg:w-[900px] mx-auto mt-9" />
<p class="mt-4 font-bold text-center text-[12px] sm:text-sm">Copyright ©FAWYERZ INCLCATELAW LLP & All Rights reserved</p>
  </div>
</footer>
</>
    );
    
    
}

export default App;
