import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useProgress } from "@react-three/drei";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPause,
  FiPlay,
  FiX,
} from "react-icons/fi";
import { achievementLabel, formatIssued, latestFirst } from "@/content/selectors";
import { GALLERY_COPY, HOME_COPY, SITE_LINKS } from "@/content/site-copy";
import type { Achievement, Work } from "@/content/types";
import { useThemeColor } from "@/context/ColorThemeContext";
import { useContent } from "@/context/ContentContext";
import { LOBBY, type Exhibit, type GalleryLayout, type Rect, type RoomLayout } from "./layout";
import { SECTION_LABEL } from "./scene/labels";
import { pose, useGallery } from "./store";
import { SYMBOLS, SYMBOL_IDS, symbolSvg, type SymbolId } from "./symbols";

/** The symbol that marks the lobby itself. */
const LOBBY_SYMBOL: SymbolId = "gyeNyame";

const KENTE = ["#e3a812", "#1d7a3e", "#e3a812", "#b8322a", "#e3a812", "#17120e"];
/** Seconds the guided tour lingers on each stop. */
const TOUR_DWELL = 9;

/** Instrument Serif, the same face as the gallery's wall titles. */
const serif = "font-['Instrument_Serif'] font-normal";
const panel = "rounded-2xl border border-white/10 bg-black/65 text-white shadow-2xl backdrop-blur-md";
const button =
  "inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-white";

export function GalleryHud({
  layout,
  status,
  sceneReady,
}: {
  layout: GalleryLayout | null;
  status: "loading" | "ready" | "error";
  sceneReady: boolean;
}) {
  const focusedId = useGallery((state) => state.focusedId);
  const touring = useGallery((state) => state.touring);
  const exhibit = layout?.exhibits.find((e) => e.id === focusedId);

  useEffect(() => {
    if (!touring || !focusedId) return;
    const timer = setTimeout(() => useGallery.getState().step(1), TOUR_DWELL * 1000);
    return () => clearTimeout(timer);
  }, [touring, focusedId]);

  if (status === "error") return <LoadError />;

  return (
    <>
      <LoadingScreen visible={!sceneReady} />
      <header className="pointer-events-none fixed inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
        <div className={`${panel} pointer-events-auto px-4 py-2.5`}>
          <p className={`${serif} text-lg leading-none`}>Frederick Ofori-Boadu</p>
          <p className="text-xs text-white/60">The Gallery</p>
        </div>
        <div className="pointer-events-auto flex flex-wrap justify-end gap-2">
          <button type="button" className={button} onClick={() => useGallery.getState().setTouring(!touring)}>
            {touring ? <FiPause /> : <FiPlay />}
            <span className="sm:hidden">{touring ? "Pause" : "Tour"}</span>
            <span className="hidden sm:inline">{touring ? "Pause tour" : "Tour the gallery"}</span>
          </button>
          <Link to="/catalogue" className={button}>
            <FiBookOpen />
            <span className="sm:hidden">Catalogue</span>
            <span className="hidden sm:inline">Read the catalogue</span>
          </Link>
        </div>
      </header>
      {layout && <FloorPlan layout={layout} />}
      {exhibit && layout && <InfoPanel exhibit={exhibit} layout={layout} touring={touring} />}
      {sceneReady && !exhibit && <Hint />}
    </>
  );
}

/** A strip of Kente that weaves itself as the gallery loads. */
function LoadingScreen({ visible }: { visible: boolean }) {
  const { progress } = useProgress();
  const threads = 24;
  // Fonts and the first room load before textures start reporting, so never show an empty loom.
  const woven = Math.max(3, Math.round((progress / 100) * threads));

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#1a120c] transition-opacity duration-700 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <p className={`${serif} text-3xl text-[#f3e3c3]`}>Opening the gallery</p>
      <div className="flex h-10 w-72 overflow-hidden rounded-md border border-white/10" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
        {Array.from({ length: threads }, (_, i) => (
          <span
            key={i}
            className="h-full flex-1 transition-colors duration-300"
            style={{ backgroundColor: i < woven ? KENTE[i % KENTE.length] : "rgba(255,255,255,0.04)" }}
          />
        ))}
      </div>
      <Link to="/catalogue" className="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline">
        Prefer to read? Open the catalogue
      </Link>
    </div>
  );
}

function LoadError() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-[#1a120c] p-6 text-center text-white">
      <p className={`${serif} text-3xl`}>The gallery couldn&rsquo;t open.</p>
      <p className="max-w-md text-sm text-white/70">Its collection didn&rsquo;t load. Refresh to try again, or read the same work in the catalogue.</p>
      <Link to="/catalogue" className={button}>
        <FiBookOpen />
        Read the catalogue
      </Link>
    </div>
  );
}

function Hint() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const hide = () => setVisible(false);
    const timer = setTimeout(hide, 12000);
    window.addEventListener("keydown", hide, { once: true });
    window.addEventListener("pointerdown", hide, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", hide);
      window.removeEventListener("pointerdown", hide);
    };
  }, []);
  if (!visible) return null;
  return (
    <p className={`${panel} pointer-events-none fixed bottom-6 left-1/2 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 px-5 py-3 text-center text-sm text-white/85`}>
      <span className="md:hidden">Drag to look · Tap the floor to walk · Tap any work or wall text</span>
      <span className="hidden md:inline">
        Drag to look around · Click the floor to walk · Click any work or wall text to see it up close · WASD to move
      </span>
    </p>
  );
}

const LOBBY_RECT: Rect = {
  minX: -LOBBY.halfWidth,
  maxX: LOBBY.halfWidth,
  minZ: -LOBBY.halfDepth,
  maxZ: LOBBY.halfDepth,
};

/** A map of the rooms with a live "you are here" marker. North (into the gallery) is up. */
function FloorPlan({ layout }: { layout: GalleryLayout }) {
  const { color } = useThemeColor();
  const marker = useRef<SVGGElement>(null);
  const areas = [
    {
      id: "lobby",
      title: "Lobby",
      symbol: LOBBY_SYMBOL,
      rect: LOBBY_RECT,
      go: () => useGallery.getState().walkTo(layout.start),
    },
    ...layout.rooms.map((room) => ({
      id: room.id,
      title: room.title,
      symbol: room.symbol,
      rect: room.bounds,
      go: () => useGallery.getState().walkTo(room.entry),
    })),
  ];
  const pad = 1.5;
  const minX = Math.min(...areas.map((a) => a.rect.minX)) - pad;
  const maxX = Math.max(...areas.map((a) => a.rect.maxX)) + pad;
  const minZ = Math.min(...areas.map((a) => a.rect.minZ)) - pad;
  const maxZ = Math.max(...areas.map((a) => a.rect.maxZ)) + pad;

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      marker.current?.setAttribute(
        "transform",
        `translate(${pose.x} ${pose.z}) rotate(${(-pose.yaw * 180) / Math.PI})`,
      );
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <nav className={`${panel} fixed bottom-4 left-4 hidden p-3 sm:block`} aria-label="Floor plan">
      <svg viewBox={`${minX} ${minZ} ${maxX - minX} ${maxZ - minZ}`} className="h-44 w-auto">
        {areas.map((area) => (
          <g key={area.id}>
            <rect
              x={area.rect.minX}
              y={area.rect.minZ}
              width={area.rect.maxX - area.rect.minX}
              height={area.rect.maxZ - area.rect.minZ}
              rx={0.4}
              className="cursor-pointer fill-white/10 stroke-white/40 transition hover:fill-white/25"
              strokeWidth={0.25}
              onClick={() => {
                useGallery.getState().focus(null);
                area.go();
              }}
            >
              <title>{`Walk to ${area.title}`}</title>
            </rect>
            <image
              href={symbolSvg(area.symbol, "#f3e3c3", 96)}
              x={(area.rect.minX + area.rect.maxX) / 2 - 1.6}
              y={(area.rect.minZ + area.rect.maxZ) / 2 - 3.6}
              width={3.2}
              height={3.2}
              className="pointer-events-none"
            />
            <text
              x={(area.rect.minX + area.rect.maxX) / 2}
              y={(area.rect.minZ + area.rect.maxZ) / 2 + 1.2}
              textAnchor="middle"
              dominantBaseline="middle"
              className="pointer-events-none fill-white/80"
              fontSize={1.5}
            >
              {area.title === "Hall of Achievements" ? "Achievements" : area.title}
            </text>
          </g>
        ))}
        <g ref={marker} className="pointer-events-none">
          <circle r={0.9} fill={`#${color.hex}`} />
          <path d="M 0 -2.4 L 0.9 -0.6 L -0.9 -0.6 Z" fill={`#${color.hex}`} />
        </g>
      </svg>
    </nav>
  );
}

const KIND_LABEL: Record<Achievement["kind"], string> = {
  degree: "Degree",
  certification: "Certification",
  award: "Award",
};

function InfoPanel({ exhibit, layout, touring }: { exhibit: Exhibit; layout: GalleryLayout; touring: boolean }) {
  const { color } = useThemeColor();
  const room = layout.rooms.find((r) => r.id === exhibit.region);
  const place = room?.title ?? "Lobby";
  const number = room?.numbers[exhibit.id];
  const tourIndex = layout.tour.indexOf(exhibit.id);
  const { step, focus } = useGallery.getState();
  const accent = { color: `#${color.hex}` };

  return (
    <aside
      className={`${panel} fixed inset-x-3 bottom-3 max-h-[55vh] overflow-y-auto p-5 sm:inset-x-auto sm:top-20 sm:right-4 sm:bottom-auto sm:max-h-[calc(100vh-7rem)] sm:w-[400px]`}
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase" style={accent}>
          <img src={symbolSvg(room?.symbol ?? LOBBY_SYMBOL, "#ffffff", 48)} alt="" className="h-4 w-4 opacity-80" />
          <span>
            {place}
            {number && ` · ${number}`}
            {exhibit.subject.kind === "work" && ` · ${SECTION_LABEL[exhibit.subject.work.section]}`}
            {exhibit.subject.kind === "achievement" && ` · ${KIND_LABEL[exhibit.subject.achievement.kind]}`}
          </span>
        </p>
        <button type="button" onClick={() => focus(null)} className="rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white" aria-label="Close">
          <FiX />
        </button>
      </div>

      {exhibit.subject.kind === "work" && <WorkDetails work={exhibit.subject.work} accent={accent} />}
      {exhibit.subject.kind === "achievement" && <AchievementDetails achievement={exhibit.subject.achievement} />}
      {exhibit.subject.kind === "statement" && <StatementDetails />}
      {exhibit.subject.kind === "now" && <TextDetails title={GALLERY_COPY.now.title} paragraphs={[GALLERY_COPY.now.body]} />}
      {exhibit.subject.kind === "symbols" && <SymbolsDetails />}
      {exhibit.subject.kind === "contact" && <ContactDetails />}
      {exhibit.subject.kind === "cv" && <CvDetails />}
      {exhibit.subject.kind === "title" && <TitleDetails />}
      {exhibit.subject.kind === "figure" && <FigureDetails index={exhibit.subject.index} layout={layout} />}
      {exhibit.subject.kind === "career" && <CareerDetails />}
      {exhibit.subject.kind === "intro" && room && <IntroDetails room={room} />}

      {tourIndex !== -1 && (
        <div className="mt-5 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
          <button type="button" className={button} onClick={() => step(-1)}>
            <FiArrowLeft /> Previous
          </button>
          <span className="text-xs text-white/50">
            {tourIndex + 1} / {layout.tour.length}
            {touring && " · touring"}
          </span>
          <button type="button" className={button} onClick={() => step(1)}>
            Next <FiArrowRight />
          </button>
        </div>
      )}
    </aside>
  );
}

const linkClass =
  "inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium transition hover:bg-white/10";

function WorkDetails({ work, accent }: { work: Work; accent: { color: string } }) {
  return (
    <div className="mt-2 space-y-3">
      <h2 className={`${serif} text-[1.7rem] leading-tight`}>{work.headline ?? work.title}</h2>
      {work.context && <p className="text-xs text-white/60 italic">{work.context}</p>}
      {work.metrics && work.metrics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {work.metrics.map((metric) => (
            <span key={metric} className="rounded-md bg-white/10 px-2 py-1 text-xs font-semibold" style={accent}>
              {metric}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm leading-relaxed text-white/85">{work.body ?? work.summary}</p>
      <p className="text-xs text-white/60">
        <span className="font-semibold text-white/80">Medium:</span> {work.tags.join(", ")}
      </p>
      {(work.liveUrl || work.githubUrl) && (
        <div className="flex flex-wrap gap-2 pt-1">
          {work.liveUrl && (
            <a href={work.liveUrl} target="_blank" rel="noreferrer noopener" className={linkClass}>
              <FiExternalLink /> Visit live site
            </a>
          )}
          {work.githubUrl && (
            <a href={work.githubUrl} target="_blank" rel="noreferrer noopener" className={linkClass}>
              <FiGithub /> View code
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function AchievementDetails({ achievement }: { achievement: Achievement }) {
  const detail = achievement.note ?? formatIssued(achievement.date);
  return (
    <div className="mt-2 space-y-3">
      <h2 className={`${serif} text-[1.7rem] leading-tight`}>{achievementLabel(achievement)}</h2>
      {detail && <p className="text-sm text-white/75">{detail}</p>}
      {achievement.credentialUrl && (
        <a href={achievement.credentialUrl} target="_blank" rel="noreferrer noopener" className={linkClass}>
          <FiExternalLink /> Verify credential
        </a>
      )}
    </div>
  );
}

function TextDetails({ title, paragraphs }: { title: string; paragraphs: readonly string[] }) {
  return (
    <div className="mt-2 space-y-3">
      <h2 className={`${serif} text-[1.7rem] leading-tight`}>{title}</h2>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-white/85">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

const actionClass =
  "inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-black transition hover:bg-white";

function TitleDetails() {
  const { artist, title, dates } = GALLERY_COPY.exhibition;
  return (
    <div className="mt-2 space-y-3">
      <h2 className={`${serif} text-[2rem] leading-tight`}>{artist}</h2>
      <p className={`${serif} text-xl text-white/80 italic`}>{title}</p>
      <p className="text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">{dates}</p>
      <blockquote className="border-l-2 border-white/30 pl-3 text-sm leading-relaxed text-white/90">
        {GALLERY_COPY.quote}
      </blockquote>
      <div className="flex flex-wrap gap-1.5">
        {HOME_COPY.heroHighlights.map((highlight) => (
          <span key={highlight} className="rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white/85">
            {highlight}
          </span>
        ))}
      </div>
      <button type="button" className={actionClass} onClick={() => useGallery.getState().setTouring(true)}>
        <FiPlay /> Tour the gallery
      </button>
    </div>
  );
}

/** One of the headline numbers, with a way to walk to the work behind it. */
function FigureDetails({ index, layout }: { index: number; layout: GalleryLayout }) {
  const figure = GALLERY_COPY.figures[index];
  if (!figure) return null;
  const source = "work" in figure ? layout.exhibits.find((e) => e.id === figure.work) : undefined;
  return (
    <div className="mt-2 space-y-3">
      <h2 className={`${serif} text-6xl leading-none`}>{figure.figure}</h2>
      <p className="text-sm leading-relaxed text-white/85">{figure.caption}</p>
      {source?.subject.kind === "work" && (
        <button type="button" className={actionClass} onClick={() => useGallery.getState().focus(source.id)}>
          See {source.subject.work.title} <FiArrowRight />
        </button>
      )}
    </div>
  );
}

function CareerDetails() {
  const { experience } = useContent();
  return (
    <div className="mt-2 space-y-3">
      <h2 className={`${serif} text-[1.7rem] leading-tight`}>Career</h2>
      <ol className="space-y-3 border-l border-white/20 pl-4">
        {latestFirst(experience).map((role) => (
          <li key={role.id}>
            <p className="text-xs font-medium text-white/50">{role.period.replace("-", "–")}</p>
            <p className={`${serif} text-lg leading-snug`}>{role.company}</p>
            <p className="text-sm text-white/75">{role.role}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** A room's intro wall: its symbol, statement, and a way to start at its first piece. */
function IntroDetails({ room }: { room: RoomLayout }) {
  const symbol = SYMBOLS[room.symbol];
  const first = Object.entries(room.numbers).sort(([, a], [, b]) => a.localeCompare(b))[0]?.[0];
  return (
    <div className="mt-2 space-y-3">
      <h2 className={`${serif} text-[2rem] leading-tight`}>{room.title}</h2>
      <p className="text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">{room.eyebrow}</p>
      <div className="flex gap-3 rounded-xl bg-white/5 p-3">
        <img src={symbolSvg(room.symbol, "#f3e3c3", 96)} alt="" className="h-10 w-10 shrink-0" />
        <div>
          <p className="text-sm font-semibold">
            {symbol.name} <span className="font-normal text-white/60 italic">“{symbol.translation}”</span>
          </p>
          <p className="text-sm text-white/75">{symbol.meaning}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-white/90">{room.statement}</p>
      {first && (
        <button type="button" className={actionClass} onClick={() => useGallery.getState().focus(first)}>
          Start with {room.numbers[first]} <FiArrowRight />
        </button>
      )}
    </div>
  );
}

/** The lobby statement, followed by the full bio for anyone who wants more. */
function StatementDetails() {
  const { title, body } = GALLERY_COPY.statement;
  return (
    <div className="mt-2 space-y-3">
      <h2 className={`${serif} text-[1.7rem] leading-tight`}>{title}</h2>
      <p className="text-sm leading-relaxed text-white/90">{body}</p>
      <h3 className="pt-2 text-xs font-semibold tracking-[0.18em] text-white/60 uppercase">About Frederick</h3>
      {HOME_COPY.about.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-white/80">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/** Every Adinkra symbol the gallery uses, what it means, and where it appears. */
function SymbolsDetails() {
  return (
    <div className="mt-2 space-y-4">
      <h2 className={`${serif} text-[1.7rem] leading-tight`}>{GALLERY_COPY.symbols.title}</h2>
      <p className="text-sm leading-relaxed text-white/80">{GALLERY_COPY.symbols.body}</p>
      <ul className="space-y-3">
        {SYMBOL_IDS.map((id) => {
          const symbol = SYMBOLS[id];
          return (
            <li key={id} className="flex gap-3">
              <img src={symbolSvg(id, "#f3e3c3", 96)} alt="" className="mt-0.5 h-9 w-9 shrink-0" />
              <div>
                <p className="text-sm font-semibold">
                  {symbol.name} <span className="font-normal text-white/60 italic">“{symbol.translation}”</span>
                </p>
                <p className="text-sm text-white/75">{symbol.meaning}</p>
                {symbol.role && <p className="text-xs text-white/50">{symbol.role}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ContactDetails() {
  return (
    <div className="mt-2 space-y-3">
      <h2 className={`${serif} text-[1.7rem] leading-tight`}>{HOME_COPY.footerCta.headline}</h2>
      <p className="text-sm text-white/80">{HOME_COPY.footerCta.subtext}</p>
      <div className="flex flex-wrap gap-2">
        <a href={`mailto:${SITE_LINKS.email}`} className={linkClass}>
          <FiMail /> {SITE_LINKS.email}
        </a>
        <a href={SITE_LINKS.linkedin} target="_blank" rel="noreferrer noopener" className={linkClass}>
          <FiLinkedin /> LinkedIn
        </a>
        <a href={SITE_LINKS.github} target="_blank" rel="noreferrer noopener" className={linkClass}>
          <FiGithub /> GitHub
        </a>
        <a href="/catalogue#contact" className={linkClass}>
          Send a message
        </a>
      </div>
    </div>
  );
}

function CvDetails() {
  return (
    <div className="mt-2 space-y-3">
      <h2 className={`${serif} text-[1.7rem] leading-tight`}>Take a free CV</h2>
      <p className="text-sm text-white/80">Everything in this gallery, in one document.</p>
      <a href={SITE_LINKS.resume} target="_blank" rel="noreferrer noopener" className={linkClass}>
        <FiDownload /> Download resume
      </a>
    </div>
  );
}
