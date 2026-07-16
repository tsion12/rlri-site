import type { TranslationKey } from "@/lib/i18n/messages/en";
import { mainGallerySrc } from "@/lib/main-gallery";

/** 1st Annual Iqaluit Arctic Security Conference — August 26–28, 2026. */

export const CONFERENCE_HERO_IMAGE = mainGallerySrc(
  "Rethinking Arctic Security from Iqaluit-conference.jpeg",
);

export type ConferencePanelist = {
  name: string;
  affiliation: string;
};

export type ConferenceSession = {
  /** 24-hour time range, e.g. "09:00 – 09:30". Omitted for untimed items. */
  time?: string;
  labelKey: TranslationKey;
  /** Speaker or host — proper names and titles are kept as provided, not translated. */
  who?: string;
  topicKey?: TranslationKey;
  panelists?: readonly ConferencePanelist[];
  breakoutQuestionKey?: TranslationKey;
};

export type ConferenceDay = {
  id: string;
  labelKey: TranslationKey;
  dateKey: TranslationKey;
  /** Thematic session heading for the day. */
  themeKey: TranslationKey;
  sessions: readonly ConferenceSession[];
};

export const CONFERENCE_DAYS: readonly ConferenceDay[] = [
  {
    id: "day-1",
    labelKey: "pages.conference.agenda.day1Label",
    dateKey: "pages.conference.agenda.day1Date",
    themeKey: "pages.conference.focus2Title",
    sessions: [
      { labelKey: "pages.conference.agenda.items.arrival" },
      {
        time: "09:00 – 09:30",
        labelKey: "pages.conference.agenda.items.welcome",
        who: "Solomon Awa, Mayor of Iqaluit",
      },
      {
        time: "09:30 – 10:00",
        labelKey: "pages.conference.agenda.items.introductions",
        who: "Carla Oyukuluk, Outreach Coordinator, Real Life Institute",
      },
      {
        time: "10:00 – 10:30",
        labelKey: "pages.conference.agenda.items.overview",
        who: "Chris Begealawuh, Executive Director, Real Life Institute",
      },
      { time: "10:30 – 11:00", labelKey: "pages.conference.agenda.items.groupPhoto" },
      {
        time: "11:00 – 12:15",
        labelKey: "pages.conference.agenda.items.panel",
        topicKey: "pages.conference.agenda.topics.skills",
        panelists: [
          { name: "Adam Sneyd", affiliation: "Department of Political Science, University of Guelph" },
          { name: "Paul Irngaut", affiliation: "President, Nunavut Tunngavik Incorporated (NTI)" },
          { name: "Amber Anglukarg", affiliation: "A/Manager, Policy and Planning, Government of Nunavut" },
        ],
      },
      { time: "12:15 – 12:45", labelKey: "pages.conference.agenda.items.qa" },
      { time: "12:45 – 13:30", labelKey: "pages.conference.agenda.items.lunch" },
      {
        time: "13:30 – 14:30",
        labelKey: "pages.conference.agenda.items.breakout",
        breakoutQuestionKey: "pages.conference.agenda.breakoutQuestions.industrialBase",
      },
      { time: "14:30 – 15:00", labelKey: "pages.conference.agenda.items.reporting" },
      { time: "15:00 – 16:00", labelKey: "pages.conference.agenda.items.synthesis" },
    ],
  },
  {
    id: "day-2",
    labelKey: "pages.conference.agenda.day2Label",
    dateKey: "pages.conference.agenda.day2Date",
    themeKey: "pages.conference.focus1Title",
    sessions: [
      {
        time: "09:00 – 09:15",
        labelKey: "pages.conference.agenda.items.recap",
        who: "Kyleigh Rosset, Real Life Institute",
      },
      { time: "09:15 – 09:30", labelKey: "pages.conference.agenda.items.reactions" },
      {
        time: "09:30 – 10:45",
        labelKey: "pages.conference.agenda.items.panel1",
        topicKey: "pages.conference.agenda.topics.culture",
        panelists: [
          {
            name: "Rebecca Tiessen",
            affiliation: "School of International Development and Global Studies, University of Ottawa",
          },
          { name: "Francis Essebou", affiliation: "Executive Director, Carrefour Nunavut" },
          {
            name: "Allen Kunuk",
            affiliation: "Director of Policy, Department of Culture and Heritage, Government of Nunavut",
          },
        ],
      },
      { time: "10:45 – 11:15", labelKey: "pages.conference.agenda.items.qa" },
      { time: "11:15 – 11:30", labelKey: "pages.conference.agenda.items.coffee" },
      {
        time: "11:30 – 12:30",
        labelKey: "pages.conference.agenda.items.panel2",
        topicKey: "pages.conference.agenda.topics.nunavut",
        panelists: [
          { name: "Adamee Itorcheak", affiliation: "Vice-President, Nunavut Tunngavik Incorporated (NTI)" },
          { name: "Carla Oyukuluk", affiliation: "Real Life Institute, Iqaluit" },
          { name: "Bruno Charbonneau", affiliation: "Royal Military College Saint-Jean" },
        ],
      },
      { time: "12:30 – 13:00", labelKey: "pages.conference.agenda.items.qa" },
      { time: "13:00 – 13:30", labelKey: "pages.conference.agenda.items.lunch" },
      {
        time: "13:30 – 14:30",
        labelKey: "pages.conference.agenda.items.breakout",
        breakoutQuestionKey: "pages.conference.agenda.breakoutQuestions.arcticNorth",
      },
      { time: "14:30 – 15:00", labelKey: "pages.conference.agenda.items.reporting" },
      { time: "15:00 – 16:00", labelKey: "pages.conference.agenda.items.synthesis" },
    ],
  },
  {
    id: "day-3",
    labelKey: "pages.conference.agenda.day3Label",
    dateKey: "pages.conference.agenda.day3Date",
    themeKey: "pages.conference.focus1Title",
    sessions: [
      {
        time: "09:00 – 09:15",
        labelKey: "pages.conference.agenda.items.recap",
        who: "Kyleigh Rosset, Real Life Institute",
      },
      { time: "09:15 – 09:30", labelKey: "pages.conference.agenda.items.reactions" },
      {
        time: "09:30 – 10:45",
        labelKey: "pages.conference.agenda.items.panel",
        topicKey: "pages.conference.agenda.topics.investments",
        panelists: [
          {
            name: "Sherry Young",
            affiliation: "Director of Policy and Strategic Planning, Nunavut Arctic College",
          },
          { name: "Adamee Itorcheak", affiliation: "Vice-President, Nunavut Tunngavik Incorporated (NTI)" },
          { name: "Kimberly Smith", affiliation: "Deputy Mayor of Iqaluit" },
        ],
      },
      { time: "10:45 – 11:15", labelKey: "pages.conference.agenda.items.qa" },
      { time: "11:15 – 11:30", labelKey: "pages.conference.agenda.items.coffee" },
      {
        time: "11:30 – 12:30",
        labelKey: "pages.conference.agenda.items.studentBreakout",
        topicKey: "pages.conference.agenda.topics.students",
      },
      { time: "12:30 – 13:00", labelKey: "pages.conference.agenda.items.reporting" },
      { time: "13:00 – 13:30", labelKey: "pages.conference.agenda.items.synthesis" },
      { time: "13:30 – 15:00", labelKey: "pages.conference.agenda.items.farewell" },
    ],
  },
];
