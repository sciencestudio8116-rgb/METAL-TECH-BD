/**
 * Master Bi-Lingual Translation Dictionary for Metal Tek BD
 * Provides complete English (en) and Bengali (bn) localization.
 */

export interface TranslationDictionary {
  header: {
    call: string;
    callNow: string;
    emailDesk: string;
    foundryLocations: string;
    whyMetalTek: string;
    caseStudies: string;
    careers: string;
    contactUs: string;
    langToggle: string;
    brandSubtitle: string;
    searchPlaceholder: string;
    searchBtn: string;
    rfqBtn: string;
    adminConsole: string;
    menus: {
      casting: string;
      capabilities: string;
      alloys: string;
      markets: string;
      resources: string;
      about: string;
    };
    subMenus: Record<string, string>;
  };
  home: {
    heroBadge: string;
    heroHeadline: string;
    heroSubhead: string;
    ctaQuote: string;
    ctaAlloy: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
    stat4Number: string;
    stat4Label: string;
    processesTitle: string;
    processesSubtitle: string;
    capabilitiesTitle: string;
    capabilitiesSubtitle: string;
    marketsTitle: string;
    marketsSubtitle: string;
    exploreDetails: string;
  };
  footer: {
    brandTagline: string;
    headquartersTitle: string;
    colQuickNav: string;
    colCapabilities: string;
    colResources: string;
    colContact: string;
    privacyPolicy: string;
    termsConditions: string;
    accessibility: string;
    cookieSettings: string;
    isoCertified: string;
    allRightsReserved: string;
  };
  admin: {
    portalTitle: string;
    portalSubtitle: string;
    returnToWebsite: string;
    signOut: string;
    activeSession: string;
    superAdminRole: string;
    siteMenuTree: string;
    systemManagement: string;
    sectionsCount: string;
    tabs: {
      hierarchy: string;
      overview: string;
      settings: string;
      alloys: string;
      faqs: string;
      downloads: string;
      caseStudies: string;
      leads: string;
      backup: string;
    };
    buttons: {
      addSubMenu: string;
      editSubMenu: string;
      deleteSubMenu: string;
      saveChanges: string;
      saving: string;
      saved: string;
      cancel: string;
      delete: string;
      edit: string;
      addNew: string;
      publish: string;
      exportJson: string;
      importJson: string;
      resetDefaults: string;
    };
    tables: {
      title: string;
      category: string;
      status: string;
      actions: string;
      date: string;
      client: string;
      email: string;
      phone: string;
      quantity: string;
      source: string;
      published: string;
      draft: string;
    };
    loginModal: {
      title: string;
      subtitle: string;
      usernameLabel: string;
      passwordLabel: string;
      signInBtn: string;
      signingInBtn: string;
      errorMessage: string;
    };
  };
  common: {
    readMore: string;
    downloadPdf: string;
    viewSpecs: string;
    loading: string;
    success: string;
    error: string;
    close: string;
  };
}

export const translations: { en: TranslationDictionary; bn: TranslationDictionary } = {
  en: {
    header: {
      call: 'Call',
      callNow: 'Call Metal Tek BD',
      emailDesk: 'sales@metaltekbd.com',
      foundryLocations: 'Dhaka Foundry · Gazipur Plant · Chittagong Port Hub',
      whyMetalTek: 'Why Metal Tech BD?',
      caseStudies: 'Case Studies',
      careers: 'Careers',
      contactUs: 'Contact Us',
      langToggle: 'বাংলা',
      brandSubtitle: 'High-Integrity Castings',
      searchPlaceholder: 'Search alloys, processes, specs...',
      searchBtn: 'Search',
      rfqBtn: 'Request a Quote',
      adminConsole: 'Admin Console',
      menus: {
        casting: 'Metal Casting',
        capabilities: 'Capabilities',
        alloys: 'Alloys & Materials',
        markets: 'Market Solutions',
        resources: 'Resources Hub',
        about: 'About Us',
      },
      subMenus: {
        'centrifugal-casting': 'Centrifugal Casting',
        'sand-casting': 'Sand Casting',
        'investment-casting': 'Investment Casting',
        'ingot': 'High-Integrity Ingot',
        'metallurgy-engineering': 'Metallurgy & Engineering',
        'additive-manufacturing': 'Additive Manufacturing (3D Sand)',
        'heat-treatment': 'Precision Heat Treatment',
        'metal-machining': 'Metal Machining',
        'metal-fabrication': 'Metal Fabrication',
        'metal-testing-analysis': 'Metal Testing & Analysis',
        'training': 'TekSession Training',
        'alloy-finder': 'Specialty Alloy Finder',
        'stainless-steel': 'Stainless Steel',
        'nickel-superalloys': 'Nickel-Base Superalloys',
        'bronze-alloys': 'Copper-Base & Bronze',
        'cobalt-wear': 'Cobalt-Base & Wear-Resistant',
        'carbon-low-alloy': 'Carbon & Low-Alloy Steels',
        'railway': 'Locomotives and Wagons (Railway)',
        'navy-marine': 'Ship and Vessel Components (Navy & Marine)',
        'heavy-vehicles': 'Truck and Bus Brake Systems (Heavy Vehicles)',
        'industry': 'Pumps, Valves and Machine Parts (Industry)',
        'technical-blog': 'Technical Blog',
        'case-studies': 'Case Studies',
        'faqs': 'Technical FAQs',
        'glossary': 'Metallurgy Glossary',
        'downloads': 'Downloads',
        'overview': 'Company Overview / Who We Are',
        'history': 'Our History / Legacy',
        'mission-vision': 'Mission & Vision',
        'leadership': 'Leadership & Team',
        'certifications': 'Quality Standards & Certifications',
        'why-us': 'Why Metal Tech BD',
      },
    },
    home: {
      heroBadge: 'ISO 9001:2015 & Nadcap Accredited Foundry',
      heroHeadline: 'High-Integrity Metal Castings & Engineered Solutions',
      heroSubhead: 'South Asia’s premier centrifugal, sand, and precision investment casting foundry delivering mission-critical components for demanding industrial applications.',
      ctaQuote: 'Request an Engineering Quote',
      ctaAlloy: 'Explore Alloy Finder',
      stat1Number: '30+',
      stat1Label: 'Years Foundry Craftsmanship',
      stat2Number: '60+',
      stat2Label: 'Qualified Casting Alloys',
      stat3Number: '22,000 kg',
      stat3Label: 'Max Single Pour Weight',
      stat4Number: '200+',
      stat4Label: 'CNC Turning & Milling Centers',
      processesTitle: 'Specialized Metal Casting Processes',
      processesSubtitle: 'Custom-engineered metallurgical solutions with directional solidification and computational modeling.',
      capabilitiesTitle: 'Turnkey Manufacturing Capabilities',
      capabilitiesSubtitle: 'Comprehensive in-house metallurgy, 3D sand printing, heat treatment, and precision machining.',
      marketsTitle: 'Engineered for Critical Industries',
      marketsSubtitle: 'Supplying certified high-stress components across railway, marine, energy, and defense sectors.',
      exploreDetails: 'Explore Specifications',
    },
    footer: {
      brandTagline: 'High-integrity centrifugal, sand, and investment castings engineered for mission-critical industrial applications across South Asia and global markets.',
      headquartersTitle: 'Corporate Headquarters',
      colQuickNav: 'Quick Navigation',
      colCapabilities: 'Casting & Processing',
      colResources: 'Technical Resources',
      colContact: 'Locations & Contact',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
      accessibility: 'Accessibility',
      cookieSettings: 'Cookie Settings',
      isoCertified: 'ISO 9001:2015 Certified',
      allRightsReserved: 'All rights reserved.',
    },
    admin: {
      portalTitle: 'Administrator Portal',
      portalSubtitle: 'Master Content Management System',
      returnToWebsite: 'Return to Public Website',
      signOut: 'Sign Out',
      activeSession: 'Active Session',
      superAdminRole: 'Chief Metallurgical Officer / Admin',
      siteMenuTree: 'Site Menu & Content Tree',
      systemManagement: 'System Management',
      sectionsCount: '6 Sections',
      tabs: {
        hierarchy: 'Content Workspace',
        overview: 'System Overview',
        settings: 'Site Settings',
        alloys: 'Alloy Database',
        faqs: 'Technical FAQs',
        downloads: 'Downloads Center',
        caseStudies: 'Case Studies',
        leads: 'RFQ Leads & Inquiries',
        backup: 'Backup & Restore',
      },
      buttons: {
        addSubMenu: '+ Add Sub-Menu',
        editSubMenu: 'Edit Sub-Menu',
        deleteSubMenu: 'Delete Sub-Menu',
        saveChanges: 'Save Changes',
        saving: 'Saving...',
        saved: 'Changes Saved Successfully',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        addNew: 'Add New Record',
        publish: 'Publish Changes',
        exportJson: 'Export JSON Backup',
        importJson: 'Import JSON Backup',
        resetDefaults: 'Reset to Factory Defaults',
      },
      tables: {
        title: 'Title / Grade',
        category: 'Category / Process',
        status: 'Status',
        actions: 'Actions',
        date: 'Date & Time',
        client: 'Client / Company',
        email: 'Email Address',
        phone: 'Phone Number',
        quantity: 'Quantity / Scope',
        source: 'Inquiry Source',
        published: 'Published',
        draft: 'Draft',
      },
      loginModal: {
        title: 'Admin Login',
        subtitle: 'Metal Tek BD Security Console',
        usernameLabel: 'Username or Email',
        passwordLabel: 'Password',
        signInBtn: 'Sign In',
        signingInBtn: 'Signing In...',
        errorMessage: 'Invalid credentials. Access denied.',
      },
    },
    common: {
      readMore: 'Read Full Article',
      downloadPdf: 'Download Datasheet (PDF)',
      viewSpecs: 'View Mechanical Properties',
      loading: 'Loading...',
      success: 'Operation completed successfully.',
      error: 'An error occurred. Please try again.',
      close: 'Close',
    },
  },
  bn: {
    header: {
      call: 'কল',
      callNow: 'মেটাল টেক বিডি-তে কল করুন',
      emailDesk: 'sales@metaltekbd.com',
      foundryLocations: 'ঢাকা ফাউন্ড্রি · গাজীপুর প্ল্যান্ট · চট্টগ্রাম বন্দর হাব',
      whyMetalTek: 'কেন মেটাল টেক?',
      caseStudies: 'কেস স্টাডিজ',
      careers: 'ক্যারিয়ার',
      contactUs: 'যোগাযোগ করুন',
      langToggle: 'English',
      brandSubtitle: 'হাই-ইনটিগ্রিটি কাস্টিং ও মেটালার্জি',
      searchPlaceholder: 'অ্যালয়, কাস্টিং প্রক্রিয়া বা স্পেসিফিকেশন অনুসন্ধান করুন...',
      searchBtn: 'অনুসন্ধান',
      rfqBtn: 'কোটেশন অনুরোধ করুন',
      adminConsole: 'অ্যাডমিন কনসোল',
      menus: {
        casting: 'মেটাল কাস্টিং',
        capabilities: 'উৎপাদন সক্ষমতা',
        alloys: 'অ্যালয় ও উপকরণ',
        markets: 'শিল্প সমাধান',
        resources: 'রিসোর্স হাব',
        about: 'আমাদের সম্পর্কে',
      },
      subMenus: {
        'centrifugal-casting': 'সেন্ট্রিফিউগাল কাস্টিং',
        'sand-casting': 'স্যান্ড কাস্টিং',
        'investment-casting': 'ইনভেস্টমেন্ট কাস্টিং',
        'ingot': 'হাই-ইনটিগ্রিটি ইনগট',
        'metallurgy-engineering': 'মেটালার্জি ও ইঞ্জিনিয়ারিং',
        'additive-manufacturing': 'অ্যাডিটিভ ম্যানুফ্যাকচারিং (৩ডি স্যান্ড)',
        'heat-treatment': 'প্রিসিশন হিট ট্রিটমেন্ট',
        'metal-machining': 'সিএনসি মেটাল মেশিনিং',
        'metal-fabrication': 'মেটাল ফেব্রিকেশন ও ওয়েল্ডিং',
        'metal-testing-analysis': 'মেটাল টেস্টিং ও এনডিটি বিশ্লেষণ',
        'training': 'টেক-সেশন টেকনিক্যাল ট্রেনিং',
        'alloy-finder': 'স্পেশালিটি অ্যালয় ফাইন্ডার',
        'stainless-steel': 'স্টেইনলেস স্টিল',
        'nickel-superalloys': 'নিকেল-বেস সুপারঅ্যালয়',
        'bronze-alloys': 'কপার-বেস ও ব্রোঞ্জ অ্যালয়',
        'cobalt-wear': 'কোবাল্ট ও ক্ষয়-প্রতিরোধী অ্যালয়',
        'carbon-low-alloy': 'কার্বন ও লো-অ্যালয় স্টিল',
        'railway': 'রেলওয়ে লোকোমোটিভ ও ওয়াগন যন্ত্রাংশ',
        'navy-marine': 'নৌ ও জাহাজ সরঞ্জাম (মেরিন গ্রেড)',
        'heavy-vehicles': 'ভারী যানবাহনের ব্রেক সিস্টেম',
        'industry': 'শিল্প পাম্প, ভালভ ও ভারি যন্ত্রাংশ',
        'technical-blog': 'প্রযুক্তিগত ব্লগ',
        'case-studies': 'কেস স্টাডিজ',
        'faqs': 'প্রযুক্তিগত প্রশ্নোত্তর (FAQs)',
        'glossary': 'ধাতুবিদ্যা পরিভাষা (শব্দকোষ)',
        'downloads': 'ডাউনলোড ও ব্রোশিউর',
        'overview': 'কোম্পানি পরিচিতি ও কার্যক্রম',
        'history': 'আমাদের ইতিহাস ও ঐতিহ্য',
        'mission-vision': 'লক্ষ্য ও উদ্দেশ্য (মিশন-ভিশন)',
        'leadership': 'নেতৃত্ব ও পরিচালনা পরিষদ',
        'certifications': 'গুণমান ও আন্তর্জাতিক সনদপত্র',
        'why-us': 'কেন মেটাল টেক বিডি?',
      },
    },
    home: {
      heroBadge: 'আইএসও ৯০০১:২০১৫ ও ন্যাডক্যাপ প্রত্যায়িত ফাউন্ড্রি',
      heroHeadline: 'উচ্চ-নির্ভুল মেটাল কাস্টিং ও প্রকৌশল সমাধান',
      heroSubhead: 'দক্ষিণ এশিয়ার শীর্ষস্থানীয় সেন্ট্রিফিউগাল, স্যান্ড এবং প্রিসিশন ইনভেস্টমেন্ট কাস্টিং ফাউন্ড্রি—বিশ্বমানের গুরুত্বপূর্ণ শিল্পের নির্ভরযোগ্য দীর্ঘমেয়াদী অংশীদার।',
      ctaQuote: 'প্রকৌশল কোটেশন চান',
      ctaAlloy: 'অ্যালয় ফাইন্ডার দেখুন',
      stat1Number: '৩০+ বছর',
      stat1Label: 'মেটালার্জি ও ফাউন্ড্রি শ্রেষ্ঠত্ব',
      stat2Number: '৬০+ গ্রেড',
      stat2Label: 'অনুমোদিত কাস্টিং অ্যালয়',
      stat3Number: '২২,০০০ কেজি',
      stat3Label: 'সর্বোচ্চ একক ঢালাই সক্ষমতা',
      stat4Number: '২০০+',
      stat4Label: 'সিএনসি টার্নিং ও মিলিং সেন্টার',
      processesTitle: 'বিশেষায়িত মেটাল কাস্টিং প্রযুক্তিসমূহ',
      processesSubtitle: 'দিকনির্দেশক দৃঢ়ীকরণ ও কম্পিউটেশনাল সিমুলেশনের মাধ্যমে ত্রুটিমুক্ত মেটাল কাস্টিং।',
      capabilitiesTitle: 'সম্পূর্ণ অভ্যন্তরীণ উৎপাদন সক্ষমতা',
      capabilitiesSubtitle: 'উন্নত ধাতুবিদ্যা, ৩ডি স্যান্ড প্রিন্টিং, তাপ চিকিৎসা এবং সুনির্দিষ্ট সিএনসি মেশিনিং।',
      marketsTitle: 'গুরুত্বপূর্ণ জাতীয় ও বৈশ্বিক শিল্পের জন্য প্রস্তুত',
      marketsSubtitle: 'রেলওয়ে, নৌবাহিনী, শক্তি ও ভারী প্রকৌশল খাতের জন্য আন্তর্জাতিক মানের প্রত্যায়িত উপাদান।',
      exploreDetails: 'স্পেসিফিকেশন দেখুন',
    },
    footer: {
      brandTagline: 'দক্ষিণ এশিয়া এবং বৈশ্বিক বাজারের জন্য প্রকৌশলকৃত উচ্চ-নির্ভুল সেন্ট্রিফিউগাল, স্যান্ড ও ইনভেস্টমেন্ট মেটাল কাস্টিং সল্যুশন।',
      headquartersTitle: 'কর্পোরেট প্রধান কার্যালয়',
      colQuickNav: 'দ্রুত নেভিগেশন',
      colCapabilities: 'কাস্টিং ও উৎপাদন সক্ষমতা',
      colResources: 'প্রযুক্তিগত রিসোর্স হাব',
      colContact: 'কারখানা ও যোগাযোগ ডেস্ক',
      privacyPolicy: 'গোপনীয়তা নীতি',
      termsConditions: 'ব্যবহারের শর্তাবলী',
      accessibility: 'অ্যাক্সেসিবিলিটি সহায়তা',
      cookieSettings: 'কুকি সেটিংস',
      isoCertified: 'আইএসও ৯০০১:২০১৫ সনদপ্রাপ্ত',
      allRightsReserved: 'সর্বস্বত্ব সংরক্ষিত।',
    },
    admin: {
      portalTitle: 'অ্যাডমিনিস্ট্রেটর পোর্টাল',
      portalSubtitle: 'মাস্টার কনটেন্ট ম্যানেজমেন্ট সিস্টেম',
      returnToWebsite: 'পাবলিক ওয়েবসাইটে ফিরুন',
      signOut: 'লগ আউট',
      activeSession: 'সক্রিয় সেশন',
      superAdminRole: 'চিফ মেটালার্জিক্যাল অফিসার / অ্যাডমিন',
      siteMenuTree: 'ওয়েবসাইট মেনু ও কনটেন্ট ট্রু',
      systemManagement: 'সিস্টেম ম্যানেজমেন্ট',
      sectionsCount: '৬টি বিভাগ',
      tabs: {
        hierarchy: 'কনটেন্ট ওয়ার্কস্পেস',
        overview: 'সিস্টেম ওভারভিউ',
        settings: 'সাইট সেটিংস',
        alloys: 'অ্যালয় ডেটাবেস',
        faqs: 'প্রযুক্তিগত প্রশ্নোত্তর',
        downloads: 'ডাউনলোড সেন্টার',
        caseStudies: 'কেস স্টাডিজ',
        leads: 'কোটেশন অনুসন্ধান ও লিড',
        backup: 'ব্যাকআপ ও রিস্টোর',
      },
      buttons: {
        addSubMenu: '+ সাব-মেনু যোগ করুন',
        editSubMenu: 'সাব-মেনু সম্পাদনা',
        deleteSubMenu: 'সাব-মেনু মুছুন',
        saveChanges: 'পরিবর্তন সংরক্ষণ করুন',
        saving: 'সংরক্ষণ করা হচ্ছে...',
        saved: 'সফলভাবে সংরক্ষিত হয়েছে',
        cancel: 'বাতিল',
        delete: 'মুছুন',
        edit: 'সম্পাদনা',
        addNew: 'নতুন রেকর্ড যোগ করুন',
        publish: 'পরিবর্তন প্রকাশ করুন',
        exportJson: 'জেসন ব্যাকআপ এক্সপোর্ট',
        importJson: 'জেসন ব্যাকআপ ইমপোর্ট',
        resetDefaults: 'ফ্যাক্টরি ডিফল্টে রিসেট',
      },
      tables: {
        title: 'শিরোনাম / গ্রেড',
        category: 'ক্যাটাগরি / প্রক্রিয়া',
        status: 'অবস্থা',
        actions: 'অ্যাকশন',
        date: 'তারিখ ও সময়',
        client: 'গ্রাহক / প্রতিষ্ঠান',
        email: 'ইমেইল ঠিকানা',
        phone: 'ফোন নম্বর',
        quantity: 'পরিমাণ / পরিধি',
        source: 'অনুসন্ধানের উৎস',
        published: 'প্রকাশিত',
        draft: 'খসড়া',
      },
      loginModal: {
        title: 'অ্যাডমিন লগইন',
        subtitle: 'মেটাল টেক বিডি নিরাপত্তা কনসোল',
        usernameLabel: 'ইউজারনেম অথবা ইমেইল',
        passwordLabel: 'পাসওয়ার্ড',
        signInBtn: 'প্রবেশ করুন',
        signingInBtn: 'যাচাই করা হচ্ছে...',
        errorMessage: 'ভুল ইউজারনেম বা পাসওয়ার্ড। পুনরায় চেষ্টা করুন।',
      },
    },
    common: {
      readMore: 'সম্পূর্ণ প্রবন্ধ পড়ুন',
      downloadPdf: 'ডেটাশিট ডাউনলোড (PDF)',
      viewSpecs: 'যান্ত্রিক গুণাবলী দেখুন',
      loading: 'লোড হচ্ছে...',
      success: 'কার্যক্রম সফলভাবে সম্পন্ন হয়েছে।',
      error: 'একটি সমস্যা দেখা দিয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।',
      close: 'বন্ধ করুন',
    },
  },
};
