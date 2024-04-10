const world_languages = [
    { id: "mandarin_chinese", value: "Mandarin Chinese" },
    { id: "spanish", value: "Spanish" },
    { id: "english", value: "English" },
    { id: "hindi", value: "Hindi" },
    { id: "bengali", value: "Bengali" },
    { id: "portuguese", value: "Portuguese" },
    { id: "russian", value: "Russian" },
    { id: "japanese", value: "Japanese" },
    { id: "punjabi", value: "Punjabi" },
    { id: "german", value: "German" },
    { id: "javanese", value: "Javanese" },
    { id: "wu_chinese", value: "Wu Chinese" },
    { id: "korean", value: "Korean" },
    { id: "french", value: "French" },
    { id: "vietnamese", value: "Vietnamese" },
    { id: "telugu", value: "Telugu" },
    { id: "chinese", value: "Chinese" },
    { id: "tamil", value: "Tamil" },
    { id: "marathi", value: "Marathi" },
    { id: "urdu", value: "Urdu" },
    { id: "turkish", value: "Turkish" },
    { id: "italian", value: "Italian" },
    { id: "yoruba", value: "Yoruba" },
    { id: "ukrainian", value: "Ukrainian" },
    { id: "gujarati", value: "Gujarati" },
    { id: "min_nan_chinese", value: "Min Nan Chinese" },
    { id: "polish", value: "Polish" },
    { id: "pashto", value: "Pashto" },
    { id: "kannada", value: "Kannada" },
    { id: "xiang_chinese", value: "Xiang Chinese" },
    { id: "malayalam", value: "Malayalam" },
    { id: "sundanese", value: "Sundanese" },
    { id: "hausa", value: "Hausa" },
    { id: "odia", value: "Odia" },
    { id: "burmese", value: "Burmese" },
    { id: "hakka_chinese", value: "Hakka Chinese" },
    { id: "tagalog", value: "Tagalog" },
    { id: "uighur", value: "Uighur" },
    { id: "ukrainian", value: "Ukrainian" },
    { id: "yoruba", value: "Yoruba" },
    { id: "sindhi", value: "Sindhi" },
    { id: "amharic", value: "Amharic" },
    { id: "farsi", value: "Farsi" },
    { id: "romanian", value: "Romanian" },
    { id: "saraiki", value: "Saraiki" },
    { id: "gan_chinese", value: "Gan Chinese" },
    { id: "aramaic", value: "Aramaic" },
    { id: "thai", value: "Thai" }
  ];
  

export const language_suggestions = world_languages.map(language => {
    return {
      id: language.id,
      text: language.value
    };
  });

const doctor_specializations = [
    "Internal Medicine",
    "Pediatrics",
    "Family Medicine",
    "Obstetrics and Gynecology",
    "Cardiology",
    "Orthopedic Surgery",
    "Dermatology",
    "Psychiatry",
    "Anesthesiology",
    "Radiology",
    "Emergency Medicine",
    "Ophthalmology",
    "Neurology",
    "General Surgery",
    "Urology",
    "Otolaryngology (ENT)",
    "Gastroenterology",
    "Endocrinology",
    "Pulmonology",
    "Hematology",
    "Oncology",
    "Nephrology",
    "Rheumatology",
    "Infectious Disease",
    "Allergy and Immunology",
    "Geriatrics",
    "Physical Medicine and Rehabilitation",
    "Plastic Surgery",
    "Neurosurgery",
    "Vascular Surgery",
    "Colon and Rectal Surgery",
    "Pediatric Surgery",
    "Critical Care Medicine",
    "Pain Medicine",
    "Sports Medicine",
    "Neonatology",
    "Sleep Medicine",
    "Reproductive Medicine",
    "Medical Genetics",
    "Interventional Radiology",
    "Clinical Pathology",
    "Dentistry",
    "Maxillofacial Surgery",
    "Dental Orthopedics",
    "Prosthodontics",
    "Oral and Maxillofacial Radiology",
    "Oral and Maxillofacial Pathology",
    "Oral and Maxillofacial Surgery"
]

export const specialization_suggestions = doctor_specializations.map(specialization => {
    return {
      id: specialization.toLowerCase().replace(" ", "_"),
      text: specialization
    };
  });
