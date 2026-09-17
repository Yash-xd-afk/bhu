import { TimetableEntry } from '../types';

export const TIMETABLE_DATA: Record<string, TimetableEntry[]> = {
  MON: [
    {
      code: "BCH-102",
      subject: "Business Entrepreneurship",
      faculty: "Prof. T.P.",
      time: "12:00 PM - 01:00 PM",
      room: "Room No. - 327",
      type: "core",
      status: "SCHEDULED",
      badge: "CORE COMMERCE",
      accent: "primary"
    },
    {
      code: "VAC-101",
      subject: "VAC (Environment)",
      faculty: "Designated Faculty",
      time: "02:00 PM - 03:00 PM",
      room: "Room 325 / 329",
      type: "vac",
      status: "SCHEDULED",
      badge: "SEC E ALLOCATED",
      accent: "secondary"
    }
  ],
  TUE: [
    {
      code: "BCH-102",
      subject: "Business Entrepreneurship",
      faculty: "Prof. T.P.",
      time: "12:00 PM - 01:00 PM",
      room: "Room No. - 327",
      type: "core",
      status: "SCHEDULED",
      badge: "CORE COMMERCE",
      accent: "primary"
    },
    {
      code: "VAC-101",
      subject: "VAC (Environment)",
      faculty: "Designated Faculty",
      time: "02:00 PM - 03:00 PM",
      room: "Room 325 / 329",
      type: "vac",
      status: "SCHEDULED",
      badge: "SEC E ALLOCATED",
      accent: "secondary"
    }
  ],
  WED: [
    {
      code: "BCH-102",
      subject: "Business Entrepreneurship",
      faculty: "Prof. T.P.",
      time: "12:00 PM - 01:00 PM",
      room: "Room No. - 327",
      type: "core",
      status: "VERIFIED IN-PERSON",
      badge: "CORE ANCHOR",
      accent: "primary"
    },
    {
      code: "AEC-101",
      subject: "AEC (English)",
      faculty: "Department Faculty",
      time: "02:00 PM - 03:00 PM",
      room: "Sec E: Room 330",
      type: "vac",
      status: "UPCOMING",
      badge: "ABILITY ENHANCEMENT",
      accent: "secondary"
    },
    {
      code: "VAC-102",
      subject: "VAC (Yoga)",
      faculty: "Sports Board / Trainers",
      time: "03:00 PM - 05:00 PM",
      room: "Theory (Annexe-A & Aud) / Practical (Commerce Sports Ground)",
      type: "vac",
      status: "DUAL LOCATION",
      badge: "PRACTICAL + THEORY",
      accent: "tertiary"
    }
  ],
  THU: [
    {
      code: "BCH-101",
      subject: "Business Economics",
      faculty: "Prof. L.B.J.",
      time: "11:00 AM - 12:00 PM",
      room: "Room No. - 327",
      type: "core",
      status: "SCHEDULED",
      badge: "CORE COMMERCE",
      accent: "primary"
    },
    {
      code: "BCH-103",
      subject: "Financial Accounting",
      faculty: "Prof. M.A.S.",
      time: "12:00 PM - 01:00 PM",
      room: "Room No. - 327",
      type: "core",
      status: "SCHEDULED",
      badge: "CORE COMMERCE",
      accent: "primary"
    },
    {
      code: "AEC-101",
      subject: "AEC (English)",
      faculty: "English Dept Staff",
      time: "02:00 PM - 03:00 PM",
      room: "Room 330",
      type: "vac",
      status: "SCHEDULED",
      badge: "AEC ENHANCEMENT",
      accent: "secondary"
    }
  ],
  FRI: [
    {
      code: "BCH-101",
      subject: "Business Economics",
      faculty: "Prof. L.B.J.",
      time: "11:00 AM - 12:00 PM",
      room: "Room No. - 327",
      type: "core",
      status: "SCHEDULED",
      badge: "CORE COMMERCE",
      accent: "primary"
    },
    {
      code: "BCH-103",
      subject: "Financial Accounting",
      faculty: "Prof. M.A.S.",
      time: "12:00 PM - 01:00 PM",
      room: "Room No. - 327",
      type: "core",
      status: "SCHEDULED",
      badge: "CORE COMMERCE",
      accent: "primary"
    },
    {
      code: "VAC-103",
      subject: "VAC (Ayurveda)",
      faculty: "Faculty of Ayurveda Guest",
      time: "02:00 PM - 03:00 PM",
      room: "Sec E: Room 330",
      type: "vac",
      status: "SCHEDULED",
      badge: "AYUSH VALUE-ADDED",
      accent: "tertiary"
    }
  ],
  SAT: [
    {
      code: "BCH-101",
      subject: "Business Economics",
      faculty: "Prof. L.B.J.",
      time: "11:00 AM - 12:00 PM",
      room: "Room No. - 327",
      type: "core",
      status: "SCHEDULED",
      badge: "CORE COMMERCE",
      accent: "primary"
    },
    {
      code: "BCH-103",
      subject: "Financial Accounting",
      faculty: "Prof. M.A.S.",
      time: "12:00 PM - 01:00 PM",
      room: "Room No. - 327",
      type: "core",
      status: "SCHEDULED",
      badge: "CORE COMMERCE",
      accent: "primary"
    },
    {
      code: "VAC-103",
      subject: "VAC (Ayurveda)",
      faculty: "Faculty of Ayurveda Guest",
      time: "02:00 PM - 03:00 PM",
      room: "Sec E: Room 330",
      type: "vac",
      status: "SCHEDULED",
      badge: "AYUSH VALUE-ADDED",
      accent: "tertiary"
    }
  ]
};

export const CREST_IMAGE_URL = "https://lh3.googleusercontent.com/aida/AEtjO1Wxo9LGlgXiZgHY30uOQ2l-1jmX-FmfQIKLXWQqwbxJrWWMFQAof2TU3rP2UKa5n7DTpK13S3vcbTNgqLs-A6xUWXGBfikYIV3PIbTmUs9PLpvBu0Ym8D7Hb5P669K-pZSMjC35maXNCW7Kotnp1_Ax-I7FlMSvv22_50HwOcrSmpDKQBJ7p7x2-lbAn-T3tpvfnmFz3qYD-wGAT0YeeKa8lyw6_C_UeyoVsDa7x9YNZNPSzXrl-enilw";

export const LECTURE_HALL_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuAP7MrqhyrOPkulHGu6_2G5bIFtiHS0fczSlJCFzD0SCYETbrhP850kLZVgY2DUd5rTiOTQXO1uLHxyfkTIHPcOhSZ5d5pgpAyOhOF6sPiI71Gq-1s-pZRdfLGL_nKYJnMPFpKy7kqWxDC6DsF2cUyQYUz5xdRVXXf2i07dtQ_kgK7KYepWWRN4_Q6eEI9D5LPRpLtjBDTXoD_OKdplWrs0RW60imQTDf1ZUXxDuM905rG3elPe9xM";
