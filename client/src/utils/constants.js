// Document requirements by Business Type
export const documentsByType = {
    "IT Company": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://myaadhaar.uidai.gov.in/" },
        { id: "incorporation", label: "Certificate of Incorporation", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.mca.gov.in/content/mca/global/en/home.html" },
        { id: "dpiit", label: "DPIIT Startup Recognition Certificate", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.startupindia.gov.in/" },
        { id: "stpi", label: "STPI Registration (Optional)", desc: "PDF or JPG (Max 2MB)", required: false, link: "https://stpionline.stpi.in/" }
    ],
    "Restaurant": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://myaadhaar.uidai.gov.in/" },
        { id: "fssai", label: "FSSAI License", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://foscos.fssai.gov.in/" },
        { id: "health_trade", label: "Health Trade License", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://mcdonline.nic.in/" },
        { id: "fire_noc", label: "Fire Safety NOC", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://nationalfirenoc.gov.in/" }
    ],
    "Retail": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://myaadhaar.uidai.gov.in/" },
        { id: "shop_act", label: "Shop & Establishment Act License", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://services.india.gov.in/service/search1?kw=shop+and+establishment&ln=en&cat_id=" },
        { id: "gst", label: "GST Registration Certificate", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://reg.gst.gov.in/registration/" }
    ],
    "Manufacturing": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://myaadhaar.uidai.gov.in/" },
        { id: "incorporation", label: "Certificate of Incorporation", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.mca.gov.in/content/mca/global/en/home.html" },
        { id: "factory_license", label: "Factory License", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://services.india.gov.in/service/search1?kw=factory+license&ln=en&cat_id=" },
        { id: "pollution_noc", label: "Pollution Control Board NOC", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://cpcb.nic.in/" },
        { id: "msme", label: "Udyam/MSME Registration", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://udyamregistration.gov.in/" }
    ],
    "Services": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://myaadhaar.uidai.gov.in/" },
        { id: "incorporation", label: "Certificate of Incorporation (if applicable)", desc: "PDF or JPG (Max 2MB)", required: false, link: "https://www.mca.gov.in/content/mca/global/en/home.html" },
        { id: "msme", label: "Udyam/MSME Registration", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://udyamregistration.gov.in/" }
    ],
    "Healthcare": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://myaadhaar.uidai.gov.in/" },
        { id: "clinical", label: "Clinical Establishment Registration", desc: "PDF or JPG (Max 2MB)", required: true, link: "http://clinicalestablishments.gov.in/" },
        { id: "medical_council", label: "Medical Council Registration", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.nmc.org.in/" },
        { id: "bio_waste", label: "Biomedical Waste Disposal Authorization", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://cpcb.nic.in/bio-medical-waste-rules/" }
    ],
    "Food & Beverage": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://myaadhaar.uidai.gov.in/" },
        { id: "fssai_state_central", label: "FSSAI State/Central License", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://foscos.fssai.gov.in/" },
        { id: "gst", label: "GST Registration Certificate", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://reg.gst.gov.in/registration/" }
    ],
    "Other": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://myaadhaar.uidai.gov.in/" },
        { id: "incorporation", label: "Business Registration/Incorporation Certificate", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.mca.gov.in/content/mca/global/en/home.html" }
    ],
    "default": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://myaadhaar.uidai.gov.in/" },
        { id: "incorporation", label: "Certificate of Incorporation", desc: "PDF or JPG (Max 2MB)", required: true, link: "https://www.mca.gov.in/content/mca/global/en/home.html" }
    ]
};
