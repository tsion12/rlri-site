export type AfricaCollaborator = {
  name: string;
  logoSrc: string;
  logoAlt: string;
  /** Optional light/dark tile background for logos that need contrast. */
  tileClassName?: string;
};

/** Partner organizations featured across RLRI Africa Program webinars and research. */
export const africaCollaborators = [
  {
    name: "WaSh Voice",
    logoSrc: "/assets/collaborators/wash-voice.png",
    logoAlt: "WaSh Voice logo",
  },
  {
    name: "Kofi Annan International Peacekeeping Training Centre",
    logoSrc: "/assets/collaborators/kaiptc.png",
    logoAlt: "KAIPTC logo",
    tileClassName: "bg-black",
  },
  {
    name: "NXCOM Global",
    logoSrc: "/assets/collaborators/nxcom-global.png",
    logoAlt: "NXCOM Global logo",
    tileClassName: "bg-white",
  },
  {
    name: "Zetech University",
    logoSrc: "/assets/collaborators/zetech-university.png",
    logoAlt: "Zetech University logo",
    tileClassName: "bg-[#0b1f3a]",
  },
  {
    name: "University of Ottawa — Centre for Information Integrity",
    logoSrc: "/assets/collaborators/uottawa.jpeg",
    logoAlt: "University of Ottawa Professional Development Institute and Centre for Information Integrity logo",
  },
  {
    name: "University of Ottawa — Centre for International Policy Studies (CIPS)",
    logoSrc: "/assets/collaborators/cips-uottawa.png",
    logoAlt: "University of Ottawa Centre for International Policy Studies (CIPS / CEPI) logo",
    tileClassName: "bg-white",
  },
  {
    name: "Research Network on Women Peace and Security (RN-WPS)",
    logoSrc: "/assets/collaborators/rn-wps.png",
    logoAlt: "Research Network on Women Peace and Security logo",
    tileClassName: "bg-white",
  },
] satisfies readonly AfricaCollaborator[];

/** Countries where RLRI Africa Program maintains field teams and active partnerships. */
export const africaPresenceCountries = [
  "Kenya",
  "Zimbabwe",
  "Ethiopia",
  "Cameroon",
  "Nigeria",
  "Ghana",
  "Morocco",
  "South Africa",
  "Democratic Republic of the Congo",
  "Sierra Leone",
] as const;
