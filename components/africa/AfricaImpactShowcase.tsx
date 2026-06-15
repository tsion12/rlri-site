"use client";

import Image from "next/image";
import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { africaCollaborators, africaPresenceCountries } from "@/lib/africa-collaborators";
import { au } from "./africa-ui";

const GEO_URL = "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

const AFRICAN_COUNTRIES = new Set([
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde",
  "Cameroon", "Central African Republic", "Chad", "Comoros", "Congo", "Democratic Republic of the Congo",
  "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia",
  "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Côte d'Ivoire", "Kenya", "Lesotho", "Liberia",
  "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique",
  "Namibia", "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles",
  "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia",
  "Uganda", "Zambia", "Zimbabwe", "Western Sahara",
]);

const PRESENCE_COUNTRIES = new Set<string>(africaPresenceCountries);

function countryFill(country: string, isHovered: boolean) {
  const isAfrica = AFRICAN_COUNTRIES.has(country);
  const isPresence = PRESENCE_COUNTRIES.has(country);

  if (isPresence) {
    return isHovered ? "#2dd4bf" : "#0f766e";
  }

  if (isAfrica) {
    return isHovered ? "#5eead4" : "#99f6e4";
  }

  return isHovered ? "#cbd5e1" : "#e5e7eb";
}

export function AfricaImpactShowcase() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <section className={`${au.home.section} ${au.home.sectionPad}`} aria-labelledby="africa-impact-map-heading">
      <p className={au.home.eyebrow}>Impact map</p>
      <h2 id="africa-impact-map-heading" className={au.home.title}>
        Africa footprint
      </h2>
      <p className={au.home.lead}>
        Field teams and active partnerships across Kenya, Zimbabwe, Ethiopia, Cameroon, Nigeria, and Ghana—with
        research and webinar collaborators across the continent.
      </p>

      <div className="relative mt-8 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 p-3 shadow-sm ring-1 ring-zinc-900/5 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:ring-white/5">
        <div className="pointer-events-none absolute right-5 top-5 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur dark:bg-zinc-900/85 dark:text-zinc-200">
          {hoveredCountry
            ? PRESENCE_COUNTRIES.has(hoveredCountry)
              ? `${hoveredCountry} · Active presence`
              : hoveredCountry
            : "Hover a country"}
        </div>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 160, center: [20, 8] }}
          className="h-[420px] w-full bg-linear-to-br from-teal-50 via-emerald-50 to-cyan-50 dark:from-teal-950/60 dark:via-zinc-950 dark:to-emerald-950/40"
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const country = String(geo.properties.name ?? "");
                const isAfrica = AFRICAN_COUNTRIES.has(country);
                const isPresence = PRESENCE_COUNTRIES.has(country);
                const isHovered = hoveredCountry === country;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={countryFill(country, isHovered)}
                    stroke={isPresence ? "#115e59" : isAfrica ? "#14b8a6" : "#94a3b8"}
                    strokeWidth={isPresence ? 0.9 : isAfrica ? 0.6 : 0.3}
                    aria-label={country}
                    onMouseEnter={() => setHoveredCountry(country)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    style={{
                      default: { outline: "none", transition: "fill 180ms ease" },
                      hover: { outline: "none", cursor: "pointer" },
                      pressed: { outline: "none" },
                    }}
                  >
                    <title>
                      {isPresence ? `${country} — RLRI Africa Program presence` : country}
                    </title>
                  </Geography>
                );
              })
            }
          </Geographies>
        </ComposableMap>
        <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-zinc-200/80 px-2 py-3 text-xs text-zinc-600 dark:border-zinc-800/80 dark:text-zinc-400">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-[#0f766e] ring-1 ring-[#115e59]" aria-hidden />
            Active presence
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-[#99f6e4] ring-1 ring-[#14b8a6]" aria-hidden />
            Pan-African reach
          </span>
        </div>
      </div>

      <div className="mt-12" aria-labelledby="africa-collaborators-heading">
        <p className={au.home.eyebrow}>Network</p>
        <h3 id="africa-collaborators-heading" className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Collaborators &amp; partners
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Organizations that contribute expertise to RLRI Africa Program webinars, research, and policy dialogue.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {africaCollaborators.map((collaborator) => (
            <li
              key={collaborator.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/55"
            >
              <div
                className={`flex min-h-30 items-center justify-center px-6 py-5 ${collaborator.tileClassName ?? "bg-zinc-50 dark:bg-zinc-900/80"}`}
              >
                <Image
                  src={collaborator.logoSrc}
                  alt={collaborator.logoAlt}
                  width={320}
                  height={120}
                  className="max-h-16 w-auto max-w-full object-contain"
                />
              </div>
              <p className="border-t border-zinc-200/80 px-4 py-3 text-center text-sm font-medium text-zinc-700 dark:border-zinc-800/80 dark:text-zinc-300">
                {collaborator.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
