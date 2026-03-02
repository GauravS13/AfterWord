import { US_STATES } from "../lib/constants";
export const LANDING_PAGE_DATA = {
  hero: {
    headlinePrefix: "What happens to your ",
    headlineHighlight: "digital life",
    headlineSuffix: " when you're gone?",
    subheadline: "Secure your digital footprint and ease the burden on your loved ones with comprehensive, encrypted digital estate planning.",
    planButton: "Plan My Legacy",
    helpButton: "Help with a Loss"
  },
  stats: [
    { value: "100+", label: "Accounts Protected" },
    { value: "3.6M", label: "Annual Digital Estates" },
    { value: "15 Mo", label: "Avg Time to Close" },
    { value: "$0", label: "Cost to Families" }
  ],
  trustFeatures: [
    { icon: "code", title: "Open Source", description: "Transparency in our code ensures your privacy is never compromised." },
    { icon: "lock", title: "End-to-End Encrypted", description: "Your data is readable only by you and your designated guardian." },
    { icon: "currency_exchange", title: "Forever Free", description: "Standard planning services are free for everyone, forever." }
  ],
  paths: [
    {
      type: "For Planners",
      title: "Planning Your Legacy",
      description: "Catalog your assets, assign a digital guardian, and ensure your final wishes are honored across all your digital accounts.",
      buttonText: "Start Planning",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN7TyfDRM3xxLaPWpK3x5TAvXlqR9DdP8QRGZEmCgovzQRm4kwQZ9gXfhvvbnm2LUgrbeMp64TNcKycsy2_ha2fEqXrzPLlzTb9ZA3GS8g6KNoYz2ndYOT84e-ZLKcTREBgOiy0I_jRbhRgQ7W_4s_JAkeNiTxLiwfCSiHzCDdtUXNHZ8wVtv0E8K1mgIxvXK7osVpCvBbvgWBOYwkNPVu7j44CnHv4Os-ZxVYi-QdwlS2F9jF-BCXYxjxdJ69V4tXWsvYeIw563M"
    },
    {
      type: "For Executors",
      title: "Managing an Estate",
      description: "Navigate the complex legal process of closing accounts, retrieving memories, and executing a digital will with expert guidance.",
      buttonText: "Get Support",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfHA-OF-jr3vyJ63MpzSOt7YyNFk8s9O74e1VXbLGAWwJ9WcFQvUpH71kh8YEEr_dIWNSs3pEoNh-mQXR79j3chvQarxJjv8TADBwAZZkfgWgAnvMCZzhw7KD_4AEOUnZa1sVerAyqkpuV43K5BRczMJQn4gbHYnMtLr9YRI3OM8TLmlXCBYIRhQa2OS911dXmCyh_mOwP59uszmfofx1pkuMfH0TqWzzLV6ahXogeRmrUnOh1au52_rDkp8X1v39yzkGl_ugOe_k"
    }
  ],
  guardianProcess: [
    { title: "Assign Guardian", description: "Select a trusted individual who will receive access to your vault. We provide the legal framework to formalize this role." },
    { title: "Strict Verification", description: "Upon a report of incapacity or passing, we initiate a rigorous multi-step verification process involving legal documentation." },
    { title: "Secure Transfer", description: "Only after verification is complete is the decryption key released to your guardian, ensuring a secure handover." }
  ],
  privacyFeatures: [
    { icon: "visibility_off", title: "Zero Knowledge", description: "We cannot see your passwords, files, or messages. Everything is encrypted client-side before it ever reaches our servers." },
    { icon: "gavel", title: "Legally Binding", description: "Our tools generate documents recognized by probate courts, ensuring your digital assets are treated as property." },
    { icon: "timer", title: "Time-Released", description: "Set specific delays or conditions for when certain information should be revealed to your beneficiaries." }
  ]
};

export const CREATE_OWNER_ACCOUNT_DATA = {
  sidebarSteps: [
    { label: "Account Details", active: true },
    { label: "Personal Profile", active: false },
    { label: "Beneficiaries", active: false },
    { label: "Review & Confirm", active: false }
  ],
  quote: "Your legacy is more than just data. It’s your story. We help you tell it right.",
  stepInfo: "Step 1 of 4",
  form: {
    title: "Create your estate",
    subtitle: "Begin by securing your digital vault.",
    emailLabel: "Email address",
    emailPlaceholder: "name@example.com",
    passphraseLabel: "Passphrase",
    passphraseHelp: "Min. 4 words",
    passphrasePlaceholder: "apple-rain-monday-river",
    strengthLabel: "Passphrase strength",
    strengthStatus: "Weak",
    strengthHint: "Use 4 random words separated by hyphens for maximum security.",
    warning: "If you forget your passphrase we cannot recover your account. This is a zero-knowledge system. Please write it down and store it securely.",
    checkboxLabel: "Never send me marketing emails",
    submitButton: "Create my estate",
    termsText: "By creating an account, you agree to our Terms of Service and Privacy Policy."
  }
};

export const PERSONAL_DETAILS_DATA = {
  sidebarSteps: [
    { label: "Welcome", icon: "home", active: false },
    { label: "Personal Details", icon: "person", active: true },
    { label: "Asset Inventory", icon: "folder_open", active: false },
    { label: "Executor Selection", icon: "diversity_3", active: false }
  ],
  stepInfo: "Step 2 of 4",
  copyright: "© 2023 LegacyGuard Inc. All rights reserved.",
  form: {
    title: "Tell us about yourself",
    subtitle: "We need these details to verify your identity and ensure your estate plan is legally sound.",
    firstNameLabel: "First Name",
    firstNamePlaceholder: "e.g. Jonathan",
    lastNameLabel: "Last Name",
    lastNamePlaceholder: "e.g. Smith",
    dobLabel: "Date of Birth",
    dobPlaceholder: "MM/DD/YYYY",
    stateLabel: "US State of Residence",
    statePlaceholder: "Select state",
    states: US_STATES
  },
  preview: {
    title: "Preview for your family",
    description: "This is what your family will need to provide to request access to your digital vault:",
    items: [
      "Full legal name",
      "Date of passing",
      "State"
    ]
  },
  actions: {
    back: "Back",
    continue: "Continue to next step"
  }
};

export const ADD_ACCOUNTS_DATA = {
  sidebarTitle: "Legacy Plan",
  sidebarSubtitle: "Secure your digital afterlife.",
  sidebarSteps: [
    { label: "Welcome", desc: "Introduction & goals", active: false, done: true, id: 1 },
    { label: "Personal Info", desc: "Basic details & identity", active: false, done: true, id: 2 },
    { label: "Add Accounts", desc: "In Progress", active: true, done: false, id: 3 },
    { label: "Designate Executor", desc: "Choose your trusted contact", active: false, done: false, id: 4 }
  ],
  proTip: "Start with your most critical accounts: Email, Banking, and Password Managers. These often unlock access to everything else.",
  headerTitle: "Add a New Account",
  headerDesc: "Catalog your digital assets to ensure they are handled according to your wishes.",
  form: {
    serviceNameLabel: "Service Name",
    serviceNamePlaceholder: "e.g. Chase Bank",
    emailHintLabel: "Account Email / ID Hint",
    emailHintPlaceholder: "e.g. user@gmail.com",
    urgencyLabel: "Urgency Tier",
    tiers: [
      { id: "financial", label: "Financial", icon: "payments" },
      { id: "identity", label: "Identity", icon: "fingerprint" },
      { id: "sentimental", label: "Sentimental", icon: "favorite" },
      { id: "admin", label: "Admin", icon: "admin_panel_settings" }
    ],
    notesLabel: "Notes for Executor",
    notesPlaceholder: "Instructions on 2FA, where to find physical backup codes, or what to do with this account...",
    addButton: "Add Account"
  },
  autoDiscover: {
    title: "Auto-discover Accounts",
    desc: "Connect your primary email to find subscriptions automatically."
  },
  addedAccountsTitle: "Added Accounts (2)",
  addedAccounts: [
    { name: "Chase Bank", tier: "Financial", email: "johndoe@gmail.com", Note: '"Safe deposit box key is in the top drawer of my study desk."', icon: "account_balance", colorClass: "emerald" },
    { name: "Apple iCloud", tier: "Identity", email: "john.doe@icloud.com", Note: '"Contains all family photos from 2010-2023."', icon: "cloud", colorClass: "purple" }
  ],
  footer: {
    progressText: "12 accounts added",
    targetText: "Target: 40–100",
    progressPercent: 20,
    suggestedLabel: "Suggested:",
    suggestedItems: ["Banking", "Insurance", "Healthcare", "Social"]
  }
};

export const CHOOSE_INVITEES_DATA = {
  sidebarTitle: "Legacy Setup",
  sidebarSubtitle: "Step 4 of 4",
  sidebarAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuANdZ1ZM2o61IxR4t5EuZcaZIHK_a-pQggb66EYq8USV79P7TY6zSsOv-QC6j-p3IuJw8bdCH2SiTKtmRyHJpF-a2Rtu5dLLXXN5h6Mbyd5Xo-NhccK6Pl7jo64zVwnhhmT3ZofVKGcpeauWWcoOzDVq99cxUq_P_zrIZt-GmNb-AUAu8NKll3T-3m_ncADDNFHzXy5AlRuakXqf10qryXWFr2ue10JgojItfQOo-96XivGHRXg9xmXU1pNWookQZeWxvUk5I9FzaU",
  currentStepTitle: "Step 4: Choose Invitees",
  steps: ["Assets Defined", "Beneficiaries", "Digital Vault"],
  whyMattersTitle: "Why this matters?",
  whyMattersDesc: "Assigning roles ensures your digital legacy is handled exactly as you wish. Executors carry out your will, while Memorial contacts manage your digital footprint.",
  copyright: "© 2023 Afterword Legacy. Secure & Encrypted.",
  headerTitle: "Invite a Trusted Person",
  headerDesc: "Add key people who will help manage your legacy.",
  form: {
    nameLabel: "Full Name",
    namePlaceholder: "e.g. Jane Doe",
    emailLabel: "Email Address",
    emailPlaceholder: "e.g. jane@example.com",
    roleLabel: "Select Role",
    roles: [
      { id: "executor", label: "Executor", icon: "gavel", tooltip: "Legal representative" },
      { id: "co-executor", label: "Co-Executor", icon: "groups", tooltip: "Secondary representative" },
      { id: "view-only", label: "View-Only", icon: "visibility", tooltip: "Can see but not edit" },
      { id: "memorial", label: "Memorial", icon: "yard", tooltip: "Manages digital memorial" }
    ],
    messageLabel: "Personal Message",
    messageTemplateText: "Use template",
    messagePlaceholder: "Hi Jane, I'm setting up my digital estate and would like you to be my Executor...",
    privacyNote: "Private until date of passing is confirmed."
  },
  pendingInvitesTitle: "Pending Invites",
  pendingInvites: [
    { initials: "JD", name: "John Doe", email: "j***@gmail.com", role: "Executor", color: "indigo" },
    { initials: "AS", name: "Alice Smith", email: "a***@yahoo.com", role: "Co-Executor", color: "emerald" }
  ],
  actions: {
    back: "Back",
    continue: "Preview the invitation email"
  },
  privacyAssurance: {
    title: "Privacy Assurance:",
    desc: "Afterword will never contact your invitees without your explicit trigger or until the date of passing is officially confirmed by your designated verifiers."
  }
};

export const NAME_GUARDIAN_DATA = {
  sidebarTitle: "Legacy Plan",
  sidebarSubtitle: "Estate Management",
  sidebarAvatarChar: "L",
  steps: [
    { icon: "person", label: "Profile Information", active: false, current: false },
    { icon: "account_balance", label: "Assets & Liabilities", active: false, current: false },
    { icon: "description", label: "Important Documents", active: false, current: false },
    { icon: "shield_person", label: "Designate Guardian", active: true, current: true, subLabel: "Final Step" },
    { icon: "lock", label: "Vault Settings", active: false, current: false }
  ],
  didYouKnow: "A Guardian is the only person who can verify your passing. They act as the keyholder to your digital vault when the time comes.",
  copyright: "© 2023 Legacy Plan Inc.",
  headerTitle: "Designate Trusted Guardian",
  headerDesc: "Select a trusted individual to oversee your digital estate unlock process.",
  calloutTitle: "What is a Trusted Guardian?",
  calloutDesc: "This person is responsible for verifying your status before your vault is unlocked. They will receive a secure link only when an unlock attempt is made. Choose someone you trust implicitly, like a spouse, sibling, or attorney.",
  form: {
    toggleTitle: "Select from Invitees",
    toggleDesc: "Use a contact you've already added to your plan",
    nameLabel: "Guardian Full Name",
    namePlaceholder: "e.g. Jane Doe",
    emailLabel: "Guardian Email Address",
    emailPlaceholder: "email@example.com",
    previewLabel: "Preview: What they will see",
    previewBrowserChrome: "secure-mail-view.legacyplan.com",
    previewSender: "From: Legacy Plan Security",
    previewSubject: "Unlock Request Verification",
    previewBodyNamePlaceholder: "[Guardian Name]",
    previewBodyOwnerPlaceholder: "Your Name",
    previewBody1: "Hello",
    previewBody2: "You have been designated as the Trusted Guardian for",
    previewBody3: ". A request has been made to unlock their digital vault.",
    previewBody4: "As the Guardian, please verify if this request is legitimate. Your confirmation is required to proceed.",
    previewButton: "Verify Request"
  },
  warningTitle: "Important Requirement",
  warningDesc: "Please ensure you have spoken to your chosen Guardian. They must be aware of their responsibility to verify unlock requests promptly. Without their verification, your vault may remain sealed during the critical waiting period.",
  actions: {
    save: "Save Guardian",
    skip: "Skip for now"
  }
};

export const OWNER_DASHBOARD_DATA = {
  header: {
    logoIcon: "shield_lock",
    logoText: "Owner Vault",
    navItems: [
      { label: "Dashboard", href: "/dashboard", active: false },
      { label: "Vault", href: "/dashboard", active: true },
      { label: "Executors", href: "/dashboard", active: false },
      { label: "Settings", href: "/dashboard", active: false }
    ],
    searchPlaceholder: "Search accounts...",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHGgq0qPQkOv3mM-xntRnrXAD3lRSZaRQZu_ib130blHRpr6hL5qQUv64RLKRun6iBPLVk9wAD0aBqzhB6hysRx4ytsJK8yLA0JiUqOHCxEz4lGdwEU_ydN8xQZxVUdlNaAK3ubm1DvoZx7dRvYObEckuTjj_Ac-Eb8FAftWzC2kJMjrP4Dljo02UXCBdxChYLj67l3uoRv8cjxNpL16ABgbobhGFE4ogLGbxEbnMzXa4gGZ31zzNMpP8nDRghyqQguSUlWeaNI6w"
  },
  hero: {
    title: "Your Digital Estate",
    proTip: "Pro Tip: Add government accounts to reach 90% completion.",
    completionPercent: 74,
    completionLabel: "Completion",
    addButtonText: "Add Account",
    addHref: "/setup/accounts"
  },
  accountSections: [
    {
      title: "Financial Accounts",
      icon: "payments",
      iconColor: "emerald-500",
      accounts: [
        {
          name: "Chase Bank Checking",
          tier: "Financial Tier",
          updatedAt: "Last updated: 2 days ago",
          logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwjxC9szgUQ06zT-M4H9HoYqqhz9TdPTvYT3ZyA1Ka6cbF1ut1-dXXJ_A2fLtZakVFtcGvxQquj3VPIopjWRTGZtzjCkILw2EXaQrqMIQHxXvndJZ-NghVO8Ozemyl-yfrZGk-yjy1mpWpplBD15XrNHyLC1-MaATAbT7bGTZdCVbNgQKg9lc14ENEyJrFhtT2APE84mtzUmc_hCweXSE-5Ka_U5gTTDl0-nC53EiBKlL9nYkZ853fp8PvBzkcFP82aD3RbvYGWoM",
          note: "Safety deposit box key is located in the home office top drawer."
        },
        {
          name: "Vanguard Investment",
          tier: "Financial Tier",
          updatedAt: "Last updated: 14 months ago",
          icon: "account_balance",
          warning: "Needs review"
        }
      ]
    },
    {
      title: "Identity & Government",
      icon: "fingerprint",
      iconColor: "blue-500",
      accounts: [
        {
          name: "Social Security Administration",
          tier: "Identity Tier",
          updatedAt: "Last updated: 1 week ago",
          icon: "badge",
          iconColor: "blue-600",
          iconBg: "blue-50",
          iconDarkBg: "blue-900/20"
        }
      ]
    }
  ],
  sidebar: {
    peopleTitle: "Your People",
    peopleSubtitle: "Notified only after date of passing is confirmed.",
    people: [
      { name: "Sarah Miller", role: "Primary Executor", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB53K2wuhTi489E3uE2VxDo8L_L5gqa9uDkd7LnRblGfl-dpBmcAt36bBT9g5J51o3gimJKN4_onwAF9QVt9Fl2bwt2OnZDVB5OP9n-e4o8XtmdQpFMJh12i8D_UwVCRo7cUMe_K7oP_b_HMb5Dxqn32FAlEt7xO4ub6Q_pBRFqMUWXbSVgc3PXSOOnwERO5f6Jg2W05J1JmeTMyrYtEH4hdepC0E3vV-MBOlRebrOSUPT76hLbGKfIbhgc9NVpAq7pAwgAL7eF9T8", roleColor: "primary", roleColorDark: "primary" },
      { name: "David Chen", role: "Memorial Contact", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOFhteW2zCF4SatC-8r6VxqNl7vVFQBYo4jgH136OGr1Vb-5Tt2UxLy0PJctY1SNoKiPmwKxUkLhVnKbqDFeRMx0Ova6TKlJ4SZyHTXfwGNexJFic7xHmNCEfOAVh4Wfg4uD4bfKRrQ52FxwuCERTO934d0WCTOQneRJqw6xiR0PWosZto2iDL08kSgBNP2HmkyVUEI7UwPAJiItdzKjShOWtncOFycDH7muydUpYQwq_URTbvo6TYVK0OnE-CKSdpx3wa0A7dCd8", roleColor: "slate-500", roleColorDark: "slate-500" }
    ],
    addPersonText: "Add Trusted Contact",
    actions: [
      { title: "Download Estate PDF", subtitle: "Full detailed report", icon: "download", active: true, href: "/estate/1/export" },
      { title: "Run Preview", subtitle: "Simulate executor view", icon: "play_arrow", active: false, href: "/dashboard/preview" }
    ]
  }
};

export const DRY_RUN_PREVIEW_DATA = {
  warningBanner: {
    icon: "warning",
    text: "DRY RUN MODE — This is a preview. No real emails will be sent."
  },
  header: {
    logoIcon: "account_balance",
    logoText: "EstateLegacy",
    closeButtonText: "Close preview",
    closeHref: "/dashboard"
  },
  hero: {
    title: "Invitee Experience Preview",
    subtitle: "Review exactly what your executor will see when they receive access to your estate plan.",
    badgeIcon: "visibility",
    badgeText: "Read-only View"
  },
  steps: [
    {
      stepLabel: "Step 1",
      icon: "mail",
      title: "Invitation Email",
      description: "The initial email notification your executor receives containing the secure access link.",
      mockupIcon: "mark_email_unread",
      mockupButtonText: "View Invitation"
    },
    {
      stepLabel: "Step 2",
      icon: "verified_user",
      title: "Verification Gate",
      description: "Security screen requiring 2-factor authentication before any data is revealed.",
      mockupIcon: "lock"
    },
    {
      stepLabel: "Step 3",
      icon: "dashboard",
      title: "Account Board",
      description: "The dashboard where assets, documents, and instructions are securely presented."
    }
  ],
  footerNote: "This preview uses your real data configuration. To edit any information shown here, please return to your dashboard and modify the asset details."
};

export const UNLOCK_FLOW_DATA = {
  entry: {
    icon: "lock_open",
    subtitle: "We're sorry for your loss.",
    title: "Unlock an estate.",
    nameLabel: "Full Legal Name of the deceased",
    namePlaceholder: "e.g. John Doe",
    dateLabel: "Date of Passing",
    stateLabel: "State where deceased lived",
    relationshipLabel: "Your relationship to the deceased",
    relationships: ["Spouse", "Child", "Executor", "Sibling", "Attorney", "Other"],
    faqLink: "What happens after I submit?",
    submitButton: "Find estate"
  },
  otpWaiting: {
    headerLogo: "shield_lock",
    headerTitle: "EstateGuard",
    nav: ["Home", "Support", "Legal"],
    loginText: "Log In",
    statusIcon: "check_circle",
    statusTitle: "Estate found.",
    statusDesc: "We have successfully located the digital estate associated with the provided details.",
    alertTitle: "Security Check Required",
    alertDesc: "To protect privacy, we have sent a 6-digit verification code to the registered Trusted Guardian on file. Please contact them to retrieve this code.",
    otpLabel: "Enter Verification Code",
    timerText: "09:42 remaining",
    confirmButton: "Confirm Code",
    resendTextPart1: "Didn't reach them? ",
    resendTextPart2: "Resend code",
    helpLink: "I can't reach the guardian"
  },
  noMatch: {
    headerLogo: "Afterword",
    nav: ["Services", "Resources", "Pricing", "Login"],
    cta: "Get Started",
    icon: "search_off",
    title: "No estate found",
    desc: "We couldn't find an account matching those details. It's possible there was a typo, the date is incorrect, or an account hasn't been set up yet.",
    card1Icon: "manage_search",
    card1Title: "Try again",
    card1Desc: "Double check the spelling or try a different email address.",
    card1Button: "Search again",
    card2Icon: "edit_note",
    card2Title: "Start manually",
    card2Desc: "They didn't use Afterword? You can still organize their estate here.",
    card2Button: "Start estate",
    resourceTag: "Resource",
    resourceTitle: "Executor's Checklist",
    resourceDesc: "Not sure where to begin? Our guide walks you through the first 48 hours.",
    resourceLink: "Read the guide",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFTUOwBsYNu9NR3vl2MTZKmh6q_meco5cjGg0tiCYzI_nvKBjLePtibWeWEkoXn6yacUGXyELrvIX6WnOZqydFpSrT6NSJqGJAExXQQvn13UGlfXB9iHzJ9UtGEhp_Ch1XguZPXqlt5Fio93xwth5jZJjk4ClBhcgNKGeycNvztXPJfI14mhFnhVfzx5-er96vaak89lPGgN_1Dyba9889HEq7p2K5CiSm_W9mMrd2s0ze5jY8Lje23_TdG-hqjdYXYbtaQ_AKR2Y"
  },
  confirmed: {
    headerTitle: "EstateLegacy",
    nav: ["Dashboard", "Documents", "Support"],
    title: "Identity confirmed.",
    desc: "Invitation emails are being sent to the people designated by the estate. They'll receive secure instructions within a few minutes.",
    statusLabel: "Status",
    statusText: "Processing invites...",
    continueButton: "Continue to estate",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn5_Sf_roeFGXCF4d9KHhD1oXsYo9Qhj7dor8G3F9QAacgivNfU-9Kb74Gjizx0--0-UVdpUerB9mudgjoWqCWijg2PQKd9tjJzg6PS6AuTffIEJe9w1eSSo_lC2cKiomeo8hcdiQu8TXi6wfu-_tpiU7hj1ie-s3WW75ik9quN08N0piQ6KyqmB1JByq_L_CWt8v9dM3D8v2w-bIFtOOLDOxkFI-iuVOFCvZwka5ufk4Y4pPRZwE74sH7V_ngUJT687NFigqrHeA"
  }
};

export const ESTATE_INTAKE_DATA = {
  sidebar: {
    logoIcon: "diversity_1",
    logoText: "Afterword",
    steps: [
      { number: "1", text: "Estate Details", active: true },
      { number: "2", text: "Assets & Accounts", active: false },
      { number: "3", text: "Review", active: false }
    ],
    quoteIcon: "format_quote",
    quoteText: '"Helping you navigate the digital details of a life well-lived."'
  },
  form: {
    headerTitle: "Tell us about the deceased",
    headerDesc: "We'll help you identify which laws apply to their digital estate.",
    deceasedNameLabel: "Deceased's Full Name",
    deceasedNamePlaceholder: "e.g. Jane Doe",
    dodLabel: "Date of Death",
    stateLabel: "State of Residence",
    rufadaaText: "RUFADAA adopted",
    dobToggleText: "Add Date of Birth (Optional)",
    aboutYouTitle: "About You",
    yourNameLabel: "Your Full Name",
    yourNameDefault: "Alex Morgan",
    relationshipLabel: "Relationship to Deceased",
    relationships: ["Child", "Spouse", "Sibling", "Executor"],
    continueButton: "Continue",
    continueHref: "/connect"
  }
};

export const CONNECT_INBOX_DATA = {
  sidebar: {
    logoIcon: "security",
    logoText: "EstateSecure",
    steps: [
      { number: "1", text: "Dashboard", active: false },
      { number: "2", text: "Connect Accounts", active: true },
      { number: "3", text: "Legal Documents", active: false },
      { number: "4", text: "Review Plan", active: false },
      { number: "5", text: "Finalize", active: false }
    ],
    supportIcon: "support_agent",
    supportTitle: "Need help?",
    supportDesc: "Our support team is available 24/7 to assist you with the verification process."
  },
  main: {
    stepLabel: "Step 2 of 5",
    title: "Connect Email Account",
    desc: "Securely scan the deceased's inbox to identify active subscriptions and accounts. We use read-only access to find relevant emails.",
    primaryCard: {
      logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9Gg4CpM20UCclGHsqOAFB7_5x5ufHW-VPC3wIPH2ZIwSHTwx3WtoMtPlndqmpXdwVsVW8_nb1avuWMOhRl71jNEJNlaq1KdQ3gfnt4hpK2cO7Q2M1UnKM-XyQ3_eovbYJNnCeMSGSes0VANGZB99b7_z8EdpNIim5CdKZdIrdxOy_9qoIiB1XZ-Qi0FnxK7CEfRDmLcis5TRQsszhiC9yhXP-LCgeKkey1ca7Xzewg0l6TOZLIc9tD2woivhBQo6TEiCLSbJLJiY",
      title: "Connect Gmail",
      desc: "Grant read-only access to scan for financial and utility accounts.",
      scopeTitle: "Requested Scopes",
      scopeText: "https://www.googleapis.com/auth/gmail.readonly",
      buttonText: "Connect Gmail",
      buttonHref: "/scan"
    },
    dividerText: "OR",
    secondaryCard: {
      icon: "upload_file",
      title: "Upload Google Takeout Archive",
      descPart1: "Drag and drop your ",
      descCode: ".mbox",
      descPart2: " file here, or click to browse. Useful if you already have an archive of the account."
    },
    footerLinkText: "Skip inbox scan — I’ll add accounts manually",
    footerLinkHref: "/scan"
  }
};

export const SCAN_PROGRESS_DATA = {
  header: {
    logoIcon: "security",
    logoText: "EstatePlan",
    nav: ["Dashboard", "Services", "Support"],
    exitText: "Exit Scan",
    exitHref: "/dashboard"
  },
  main: {
    icon: "mail",
    title: "Scanning inbox...",
    desc: "This usually takes 60–90 seconds.",
    progressLabel: "Analyzing",
    progressValue: "64%",
    progressTimeStart: "Started 42s ago",
    progressTimeEnd: "~28s remaining",
    feedItems: [
      {
        icon: "movie",
        iconColor: "text-red-500",
        iconBg: "bg-red-500/10",
        title: "Netflix",
        domain: "netflix.com",
        statusText: "Active",
        statusColor: "text-[#13ecec]",
        statusBg: "bg-[#13ecec]/10"
      },
      {
        icon: "water_drop",
        iconColor: "text-blue-500",
        iconBg: "bg-blue-500/10",
        title: "City Utilities",
        domain: "cityservices.gov",
        statusText: "Overdue",
        statusColor: "text-orange-400",
        statusBg: "bg-orange-400/10"
      },
      {
        icon: "shopping_bag",
        iconColor: "text-green-500",
        iconBg: "bg-green-500/10",
        title: "Amazon Prime",
        domain: "amazon.com",
        statusText: "Active",
        statusColor: "text-[#13ecec]",
        statusBg: "bg-[#13ecec]/10"
      }
    ],
    counterValue: "14",
    counterLabel: "Accounts Found",
    footerText: "Secure connection established via OAuth 2.0. No passwords are stored.",
    nextHref: "/verify/demo" // Adding for prototype flow
  }
};

export const VERIFICATION_GATE_DATA = {
  header: {
    logoText: "EstateSecure",
    helpIcon: "help",
    helpText: "Need Help?"
  },
  main: {
    lockIcon: "lock",
    title: "Margaret set this up for you.",
    subtitle: "To protect Margaret’s estate, we need to verify your identity.",
    whoAreYouLabel: "Who are you",
    fullNameLabel: "Full Name",
    fullNameValue: "David Miller",
    roleIcon: "badge",
    roleText: "Role: Executor",
    aboutLabel: "About Margaret",
    attemptsText: "5 attempts available",
    legalNameLabel: "Legal Name",
    legalNamePlaceholder: "Enter Margaret's full legal name",
    dodLabel: "Date of Passing",
    stateLabel: "State of Residence",
    states: US_STATES,
    verifyButton: "Verify and access estate",
    verifyHref: "/estate/demo",
    footerTextLine1: "This verification is secure and encrypted.",
    footerTextLine2: "Your information is only used to confirm your authorization."
  }
};

export const ESTATE_BOARD_DATA = {
  header: {
    estateName: "Estate of Maria Santos",
    location: "California",
    progressValue: "35%",
    downloadBtn: "Download Evidence",
    shareBtn: "Share",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGsXoFo7tSu_YjslqUpm5Co4TVUuSJ7xfPsPzp-kEjYQOhAoksyAH54RpX8YWiPklvpSw6LBPtGb8DLjQ5RvMlno-rij-Q9F6fF--3r5F5RIIfc9iEJN-fBjA7GfKuFvBMgdu8uOx-E6ufANPFsBHYEXExqxoK9mCILSm6_3qvWPuugrRcWe2Eyz4yJs3h0JgObOxVVusaWDOjzQ-763wrikyzu1UTbBPW5hMLnJ_13TssKnw8j7vjB4ptmh7HycR-k6KACSRKqGc"
  },
  banner: {
    welcome: "Welcome, David.",
    descPart1: "Margaret prepared this estate for you. We've identified ",
    accountsFound: "47 accounts",
    descPart2: ", with ",
    charging: "3 currently charging fees",
    descPart3: ". Immediate action is recommended.",
    quote: '"Please handle the Netflix account first, I think I forgot to cancel it..." — Margaret',
    instructionsBtn: "View Instructions"
  },
  stats: [
    { label: "Accounts Found", value: "47", icon: "search", color: "text-white", borderClass: "hover:border-[#13ecec]/30" },
    { label: "Still Charging", value: "3", sub: "Action Needed", subColor: "text-[#ff4d4d]", color: "text-white", isUrgent: true, borderClass: "border-[#ff4d4d]/30 hover:border-[#ff4d4d]/60" },
    { label: "Closed", value: "12", sub: "Good Progress", subColor: "text-[#00cc66]", color: "text-white", borderClass: "hover:border-[#00cc66]/30" },
    { label: "Saved / Yr", value: "$1,240", icon: "savings", iconColor: "text-[#00cc66]", color: "text-white", borderClass: "hover:border-[#13ecec]/30" },
    { label: "Est. Time Left", value: "3 Mo", icon: "schedule", iconColor: "text-slate-500", color: "text-white", borderClass: "hover:border-[#13ecec]/30" }
  ],
  filters: [
    { label: "All", count: 47, active: true },
    { label: "Charging", count: 3, dot: "bg-[#ff4d4d]", active: false },
    { label: "Identity", count: 12, dot: "bg-[#ffbf00]", active: false },
    { label: "Sentimental", count: 8, dot: "bg-[#3b82f6]", active: false },
    { label: "Other", count: 24, active: false }
  ],
  columns: {
    todo: {
      title: "TODO",
      count: 14,
      items: [
        { title: "Netflix", subtitle: "$15.99 / mo", logoText: "NF", urgent: true, urgentText: "Urgent", dueText: "Due Today", href: "/estate/demo/account/netflix", iconBg: "bg-white", textColor: "text-black" },
        { title: "Chase Bank", subtitle: "Checking ••••4582", icon: "account_balance", iconBg: "bg-blue-600", category: "Assets", tagColor: "amber", href: "/estate/demo/account/chase", textColor: "text-white" },
        { title: "Amazon Prime", subtitle: "Subscription", logoText: "AM", iconBg: "bg-gray-200", textColor: "text-black", href: "/estate/demo/account/amazon" }
      ]
    },
    inProgress: {
      title: "IN PROGRESS",
      count: 5,
      items: [
        { title: "Social Security", subtitle: "Death certificate sent", icon: "verified", iconBg: "bg-green-600", textColor: "text-white", category: "Processing", dueText: "Sent 2d ago", statusIcon: "hourglass_top" },
        { title: "Instagram", subtitle: "Memorialization Request", icon: "photo_camera", iconBg: "bg-gradient-to-br from-pink-500 to-orange-400", textColor: "text-white", collaboratorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrGZ-ZDbARXCT-oiac3VjkpMlmfHiQurmrYVfzlBAAxtbCxYlvxKo2PF1hKxNMof8TrA8wX1I6EG_K4F7nDXTqCQat8bvpdQenqfJt7hrKcD3jW4sfuBS74rsd46KP-sFOUP7dlxiTuSnQS3J03UzEa-IsZS17qazZ6X7uCSXIDFnCBSvf7391DMJIAIExNAV3BgRSLZzCS1ZecDUizkAMs5sYXA6H5wtx89K8y5T2yJGuikF5ckT2vdfxH1SADeaMtbEroUzr1no", collaboratorText: "Assigned to Sarah" }
      ]
    },
    awaiting: {
      title: "AWAITING",
      count: 2,
      items: [
        { title: "IRS", subtitle: "Final Tax Return", icon: "assured_workload", iconBg: "bg-indigo-600", textColor: "text-white", blockedText: "Waiting for W2 forms" }
      ]
    },
    closed: {
      title: "CLOSED",
      count: 12,
      items: [
        { title: "YouTube Premium", subtitle: "Cancelled successfully", logoText: "YT", iconBg: "bg-red-600", textColor: "text-white" },
        { title: "UPS My Choice", subtitle: "Account deleted", icon: "local_shipping", iconBg: "bg-blue-400", textColor: "text-white" },
        { title: "NY Times", subtitle: "Cancelled", logoText: "NYT", iconBg: "bg-slate-200", textColor: "text-black" }
      ]
    }
  }
};

export const ACCOUNT_PLAYBOOK_DATA = {
  header: {
    logoText: "EstateFlow",
    nav: ["Dashboard", "Accounts", "Documents", "Settings"],
    searchPlaceholder: "Search accounts...",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZAcGRPb9IMdIZBpQ_m_AiLbn0cybs2pxVAfl7XiOP_8vRwB3PUVCiYnzKaFSyHXcbHY2SyIAXg2BdfWdeDMm64y8oVNYv7Xq4yauzNYZjxFjNhMRf8qldhyNpma8k0OpuXqj-h5nlL-_BFy0FJSmegk3oneK8N8XD_Mq2e5pSg5DDoEbLkzGpsYbwDL52IR1pD7ioGQnTy_0KAg38KhCL5p5BPinDjtD-PSGFf6aG3gOwHbG52hT3VwCsxpC5LIGAmRS77D4MlzA"
  },
  breadcrumbs: [
    { label: "Home", href: "#", active: false },
    { label: "Digital Estate", href: "/estate/demo", active: false },
    { label: "Cormorant Subscription", href: "#", active: true }
  ],
  titleSection: {
    serviceLogoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcx0ohhlJRWFzekX1JyJKKbLC2mwYzbMpZYvdfxEuXp1sCAOYtRUg018GitKdBo9wX7S6P1vgxJB93I8FLIRZe1wydHyQ4joqbK8n1iQzoyXa0rCpO_bKVG9Emp0REQgFaqE1iZ7eS7NanZ5cEZDAzqtxYeTPj4Eb0lMPeknBlWD-swyILWvkJNvORCv0J6oXBG4mzCd8acrcPiktSowWrsoAohj78FyUMF-u7v5Yv29pHw4WOy0-OYqYVXH9Kz6ysErhaAzqx80E",
    serviceName: "Cormorant",
    tier: "Premium Tier",
    id: "#CM-88219",
    statusOptions: ["Active", "Pending Closure", "Closed"],
    statusDefault: "Active"
  },
  quickFacts: [
    { label: "Last Billed", value: "Oct 12, 2023", icon: "calendar_month" },
    { label: "Method", value: "Online Form", icon: "logout" },
    { label: "Est. Time", value: "~15 mins", icon: "schedule" },
    { label: "Avg. Ease", value: "4.8/5", icon: "star", iconColor: "text-[#13ecec]" }
  ],
  playbook: {
    title: "Closure Playbook",
    progressText: "2 of 5 steps completed",
    progressPercent: "40%",
    steps: [
      { num: 1, title: "Log in to the account dashboard", desc: "Use the credentials stored in the vault or reset password via email.", status: "done" },
      { num: 2, title: "Navigate to 'Profile Settings'", desc: "Usually located in the top right dropdown menu under the user avatar.", status: "done" },
      { 
        num: 3, 
        title: "Download all data archives", 
        desc: "This step is critical. Margaret requested specific photos be saved.", 
        status: "active", 
        fileLink: { name: "cormorant_archive_2023.zip", meta: "2.4 GB • Ready for download" } 
      },
      { num: 4, title: "Submit closure request", desc: "Fill out the 'Account Deletion' form at the bottom of the settings page.", status: "pending" },
      { num: 5, title: "Confirm deletion via email", desc: "You will receive a final confirmation link at the registered email address.", status: "pending" }
    ],
    nextHref: "/letter/demo" // prototype flow link
  },
  ownerNote: {
    title: "Margaret's Note",
    subtitle: "Instructions for Executor",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdblJ1RWKBJ0Potl-OBwOPBapA96F0FqLLPcWbamLRsGW5pyoFYCUj0EbE9O-MvG6SoF76peYgCNU_Sojh3djBzbRH7ljM9CQtVWQldZrXj95zHHF_MMXkcbqPVER7YkusfLAS91I8V3TR_YlWEuyjaCeXu8u0yvZ7oJ17FzTvPSCCPp7YWW8v40o3mxr3JNcmgipwQ59ME2kSXkwc5nykjGLG3twsBrAafUCGIuLJ5k44GJ9PPzl8wI_a8I4kj9GxnV-xfbm6rI4",
    content: '"Please ensure you download all the archives before closing this account. I have some sentimental photos from the 2018 trip to Kyoto stored in the \'Travel\' folder. Once you have those safely backed up on the hard drive, you can proceed with the deletion."'
  },
  documents: {
    title: "Documents Needed",
    items: [
      { label: "Death Certificate (PDF)", hasIt: true },
      { label: "Executor Authority Letter", hasIt: true },
      { label: "Account Password / 2FA Device", hasIt: false }
    ]
  },
  help: {
    title: "Need Assistance?",
    primaryBtn: "Contact Cormorant Support",
    secondaryBtn: "View Knowledge Base"
  }
};

export const LETTER_PREVIEW_DATA = {
  header: {
    logoIcon: "account_balance",
    logoText: "EstateExecutor",
    nav: ["Dashboard", "Documents", "Tasks", "Settings"],
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuADW3jpkSJsZuZkNKiqF4quGE1kjmfzAVAyxC3r7WEXJBpcV4I8Ono6SOqFLbI4Vtglh3_nRZdFtYFaiYU3jLak6BTVJsdXkSmSflJ72-nA7So9yPcy63AZ4N0mD1RxZJDvys396zp9a6xCYy61yT-t9aWdCMCZSaKLVnCt02dI0jiiatGy39yYT5R5togVR5kaOmk4wkH-eg44e3zzsHxRrwS0pc-DUEOlUaBqOgFW6ZZwsWygvHs2f56LtFYF172TwheKUUboxhs"
  },
  breadcrumbs: [
    { label: "Home", href: "#", active: false },
    { label: "Documents", href: "#", active: false },
    { label: "Closure Request", href: "#", active: true }
  ],
  titleSection: {
    title: "Review Closure Request",
    subtitle: "Review the generated letter below. Click on any section to make edits directly."
  },
  letter: {
    date: "October 24, 2023",
    recipient: [
      "Attn: Estates Department",
      "Global Bank Corp.",
      "123 Financial District Blvd",
      "New York, NY 10005"
    ],
    subjectLine1: "RE: Request to Close Accounts for Estate of Arthur H. Pendelton",
    subjectLine2: "Account Number(s): 8849-2938-1029, 1122-3344-5566",
    salutation: "To Whom It May Concern,",
    body1: 'I am writing to you in my capacity as the Executor of the Estate of Arthur H. Pendelton, who passed away on September 15, 2023. Enclosed with this letter, please find a certified copy of the Death Certificate and the Letters Testamentary appointing me as the representative of the estate.',
    body2: 'Please consider this letter as a formal request to close the above-referenced accounts immediately. I request that all funds remaining in these accounts, including any accrued interest, be issued in the form of a cashier’s check made payable to "The Estate of Arthur H. Pendelton."',
    body3: 'Please mail the closing funds and any final statements to the address listed below. If there are any additional forms or requirements needed to process this request, please contact me immediately at (555) 123-4567 or via email at executor@email.com.',
    closing: "Sincerely,",
    signature: "Jane Doe",
    printedName: [
      "Jane Doe",
      "Executor",
      "456 Oak Lane",
      "Springfield, IL 62704"
    ]
  },
  actions: {
    status: "Status: Draft",
    markReviewed: "Mark as Reviewed",
    deliveryActions: [
      { id: "print", icon: "print", title: "Print Letter", desc: "Standard US Letter format" },
      { id: "pdf", icon: "picture_as_pdf", title: "Download PDF", desc: "High resolution for archival" },
      { id: "email", icon: "mail", title: "Open in Gmail", desc: "Draft a new email" },
      { id: "copy", icon: "content_copy", title: "Copy to Clipboard", desc: "Paste into any document" }
    ],
    attachments: [
      { name: "Death Certificate.pdf", icon: "description" },
      { name: "Letters Testamentary.pdf", icon: "gavel" }
    ],
    nextActionHref: "/estate/demo/export" // added for prototype navigation
  }
};

export const EVIDENCE_BUNDLE_DATA = {
  header: {
    logoIcon: "account_balance",
    logoText: "EstateExecutor",
    nav: ["Dashboard", "Documents", "Settings"],
    logoutText: "Log Out"
  },
  hero: {
    icon: "check_circle",
    title: "The final chapter is closed.",
    subtitle: "The estate has been fully executed. A complete record of evidence has been compiled for probate submission."
  },
  bundleCard: {
    title: "Evidence Bundle Contents",
    subtitle: "Generated on October 24, 2023",
    icon: "inventory_2",
    items: [
      "Official Closure Letters",
      "Asset Verification Records",
      "Debt Settlement Confirmations",
      "Tax Clearance Certificates",
      "Beneficiary Receipts",
      "Final Account Ledger"
    ]
  },
  actions: {
    primaryBtn: "Download Evidence Bundle",
    primaryIcon: "download",
    secondaryBtns: [
      { id: "csv", label: "Download CSV", icon: "table_chart" },
      { id: "print", label: "Print Summary", icon: "print" },
      { id: "share", label: "Share with Attorney", icon: "share" }
    ]
  },
  footer: {
    legalNote: "* This bundle constitutes a sworn record of the estate's distribution. Ensure this file is stored securely for at least 7 years in accordance with probate court regulations.",
    dangerAction: "Delete all estate data from server"
  }
};
