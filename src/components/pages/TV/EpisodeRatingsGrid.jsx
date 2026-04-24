import { Calendar, Download, Hash, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import { CORS_PROXY } from "data/apiEndpoints";
import { ROUTES, TMDB_IMAGE_URL } from "data/global";
import { getNiceName, getReleaseDate } from "utils/helper";

const EXPORT_BG = "#0a0a0a";
const EXPORT_FONT_STACK = "Inter, 'Montserrat', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

// brand logo served from /public — same-origin, so the canvas won't taint
const EXPORT_LOGO_URL = "/logo192.png";

const exportFont = (weight, size) => `${weight} ${size}px ${EXPORT_FONT_STACK}`;

const loadImage = (src, { crossOrigin } = {}) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    if (crossOrigin) img.crossOrigin = crossOrigin;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });

/**
 * Poster for PNG export: TMDB images are only loaded via NEXT_PUBLIC_CORS_PROXY (no direct TMDB fetch).
 * Uses fetch + createImageBitmap so the canvas stays origin-clean for toDataURL (no tainted <img>).
 * Proxy base has no query string (e.g. https://corsproxy.example.workers.dev) → we append ?q=<encoded TMDB URL>.
 */
const loadPosterForCanvasExport = async (absolutePosterUrl) => {
  if (!absolutePosterUrl) return null;

  const proxyBase = typeof CORS_PROXY === "string" ? CORS_PROXY.trim().replace(/\/+$/, "") : "";
  if (!proxyBase) return null;

  try {
    const sep = proxyBase.includes("?") ? "&" : "?";
    const proxied = `${proxyBase}${sep}q=${encodeURIComponent(absolutePosterUrl)}`;
    const res = await fetch(proxied);
    if (!res.ok) throw new Error(`proxy ${res.status}`);
    const blob = await res.blob();
    return await createImageBitmap(blob);
  } catch {
    return null;
  }
};

const pathRoundedRect = (ctx, x, y, w, h, r) => {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.arcTo(x + w, y, x + w, y + rr, rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr);
  ctx.lineTo(x + rr, y + h);
  ctx.arcTo(x, y + h, x, y + h - rr, rr);
  ctx.lineTo(x, y + rr);
  ctx.arcTo(x, y, x + rr, y, rr);
  ctx.closePath();
};

/** Upright 5-point star for PNG export — avoids font side-bearings on Unicode ★ */
const fillFivePointStar = (ctx, cx, cy, outerR, innerR, fill) => {
  ctx.beginPath();
  // -π/2 puts the first outer vertex at the top (standard point-up star)
  const startAngle = -Math.PI / 2;
  for (let i = 0; i < 10; i += 1) {
    const angle = startAngle + (i * Math.PI) / 5;
    const rad = i % 2 === 0 ? outerR : innerR;
    const px = cx + Math.cos(angle) * rad;
    const py = cy + Math.sin(angle) * rad;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
};

// horizontal ink half-width of an upright 5-point star: sin(72°) × outerR
const STAR_INK_HALF_W = Math.sin((72 * Math.PI) / 180);

// greedy word-wrap with ellipsis on the last line when it overflows
const wrapText = (ctx, text, maxWidth, maxLines) => {
  if (!text) return [];
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      if (lines.length >= maxLines) {
        current = "";
        break;
      }
      current = word;
    } else {
      current = test;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  if (lines.length === maxLines) {
    let last = lines[maxLines - 1] || "";
    if (ctx.measureText(last).width > maxWidth) {
      while (last.length > 0 && ctx.measureText(`${last}…`).width > maxWidth) {
        last = last.slice(0, -1);
      }
      lines[maxLines - 1] = `${last.trim()}…`;
    }
  }
  return lines;
};

const CELL_W = 60;
const CELL_H = 40;
const GAP = 8;
const PAD_TOP = 44;
const DEFAULT_PAD_LEFT = 48;
const PAD_RIGHT = 16;
const AVG_ROW_H = 44;
const PAD_BOTTOM = 24;

/**
 * Left gutter sized to fit the widest episode label ("E<digits>") right-anchored 14px from the cells.
 * Rough ink: "E" ≈ 10px + each digit ≈ 9px @ 15px bold, plus 14px gap + 14px cushion.
 * Floored at DEFAULT_PAD_LEFT so short shows keep the original layout.
 */
const getPadLeft = (maxEpisodes) => {
  const digits = String(Math.max(1, maxEpisodes || 1)).length;
  return Math.max(DEFAULT_PAD_LEFT, 10 + digits * 9 + 14 + 14);
};

const TOOLTIP_OFFSET = 14;
const TOOLTIP_MAX_W = 280;

// ordered from highest to lowest so `find(r >= min)` works top-down
const RATING_BUCKETS = [
  { label: "Awesome", color: "#166534", textDark: false, min: 9 },
  { label: "Great", color: "#22c55e", textDark: true, min: 8 },
  { label: "Good", color: "#eab308", textDark: true, min: 7 },
  { label: "Regular", color: "#f59e0b", textDark: true, min: 6 },
  { label: "Bad", color: "#ef4444", textDark: false, min: 4 },
  { label: "Garbage", color: "#a855f7", textDark: false, min: 0 }
];

const UNKNOWN_FILL = "#4b5563";
const UNKNOWN_TEXT = "#e5e7eb";

// round to the same precision we display (1 decimal) so bucket and label always agree.
// otherwise 7.98 displays as "8.0" but buckets as "Good", while 8.03 also displays as "8.0" and buckets as "Great".
const roundToOneDecimal = (rating) => Math.round(rating * 10) / 10;

const getBucket = (rating) => {
  if (rating == null || rating <= 0) return null;
  const rounded = roundToOneDecimal(rating);
  return RATING_BUCKETS.find((b) => rounded >= b.min) || null;
};

const formatRating = (rating) => {
  if (rating == null || rating <= 0) return "?";
  return roundToOneDecimal(rating).toFixed(1);
};

const Legend = () => (
  <FlexBox className='flex-wrap items-center gap-x-1624 gap-y-12'>
    {RATING_BUCKETS.map((b) => (
      <FlexBox key={b.label} className='items-center gap-4'>
        <span aria-hidden className='inline-block h-5 w-5 rounded-full' style={{ backgroundColor: b.color }} />
        <P size='small' weight='semibold' className='text-neutral-200'>
          {b.label}
        </P>
      </FlexBox>
    ))}
  </FlexBox>
);

const EpisodeTooltip = ({ data }) => {
  // flip horizontally if the tooltip would clip off the right edge of the viewport
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const flipX = data.x + TOOLTIP_OFFSET + TOOLTIP_MAX_W > vw;
  const left = flipX ? data.x - TOOLTIP_OFFSET : data.x + TOOLTIP_OFFSET;
  const transform = flipX ? "translate(-100%, 0)" : "translate(0, 0)";

  const bucket = getBucket(data.rating);
  const badgeColor = bucket ? bucket.color : UNKNOWN_FILL;
  const badgeText = bucket ? (bucket.textDark ? "#111827" : "#ffffff") : UNKNOWN_TEXT;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.12 }}
      role='tooltip'
      style={{
        position: "fixed",
        left,
        top: data.y + TOOLTIP_OFFSET,
        transform,
        maxWidth: TOOLTIP_MAX_W,
        pointerEvents: "none",
        zIndex: 60
      }}
      className='rounded-lg border border-white/10 bg-neutral-900/95 px-12 py-10 shadow-2xl backdrop-blur-sm'>
      <FlexBox className='mb-6 items-center gap-8'>
        <span className='rounded px-6 py-2 text-micro font-bold tracking-wider' style={{ backgroundColor: badgeColor, color: badgeText }}>
          S{data.seasonNumber} &middot; E{data.episodeNumber}
        </span>
        <FlexBox className='items-center gap-4 text-neutral-200'>
          <Star size={12} fill='currentColor' />
          <P size='small' weight='bold' className='leading-none'>
            {formatRating(data.rating)}
          </P>
        </FlexBox>
      </FlexBox>

      <P size='small' weight='bold' className='mb-4 text-pretty text-white'>
        {data.title || "Untitled episode"}
      </P>

      <FlexBox className='flex-wrap items-center gap-x-10 gap-y-2 text-neutral-400'>
        {data.airDate ? (
          <FlexBox className='items-center gap-4'>
            <Calendar size={11} />
            <P size='tiny' weight='medium'>
              {getReleaseDate(data.airDate)}
            </P>
          </FlexBox>
        ) : null}
        {data.voteCount > 0 ? (
          <FlexBox className='items-center gap-4'>
            <Hash size={11} />
            <P size='tiny' weight='medium'>
              {data.voteCount.toLocaleString()} votes
            </P>
          </FlexBox>
        ) : null}
      </FlexBox>
    </motion.div>
  );
};

const EpisodeRatingsGrid = ({ tvId, tvName, seasons, posterPath, overallRating, voteCount, yearRange }) => {
  const [tooltip, setTooltip] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const rafRef = useRef(0);
  const svgRef = useRef(null);
  // Render-time SVG layout values the export callback needs to line up with the actual SVG bitmap.
  const layoutRef = useRef({ padLeft: DEFAULT_PAD_LEFT });

  // cancel any pending rAF position update on unmount
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const handleCellEnter = useCallback(
    (episode) => (e) => {
      setTooltip({
        x: e.clientX,
        y: e.clientY,
        seasonNumber: episode.season_number,
        episodeNumber: episode.episode_number,
        title: episode.name,
        airDate: episode.air_date,
        rating: episode.vote_average,
        voteCount: episode.vote_count
      });
    },
    []
  );

  const handleCellMove = useCallback((e) => {
    const { clientX, clientY } = e;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setTooltip((prev) => (prev ? { ...prev, x: clientX, y: clientY } : prev));
    });
  }, []);

  const handleCellLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setTooltip(null);
  }, []);

  const handleExportPng = useCallback(async () => {
    const svg = svgRef.current;
    if (!svg || isExporting) return;

    const svgW = Number(svg.getAttribute("width")) || svg.clientWidth;
    const svgH = Number(svg.getAttribute("height")) || svg.clientHeight;
    if (!svgW || !svgH) return;

    try {
      setIsExporting(true);

      // --- 1. Serialize the live SVG into a data-URL-backed image ---
      const clone = svg.cloneNode(true);
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
      // pin font-family so we don't inherit from a page stylesheet the standalone SVG can't see
      clone.setAttribute("font-family", EXPORT_FONT_STACK);
      clone.style.fontFamily = EXPORT_FONT_STACK;
      // Next.js <Link> renders HTML <a> which is invalid inside a standalone SVG payload — unwrap them
      clone.querySelectorAll("a").forEach((a) => {
        const parent = a.parentNode;
        while (a.firstChild) parent.insertBefore(a.firstChild, a);
        parent.removeChild(a);
      });
      const svgStr = '<?xml version="1.0" encoding="UTF-8"?>' + new XMLSerializer().serializeToString(clone);
      // data: URL (not blob:) to stay within the app's CSP `img-src * data:`
      const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr)}`;
      const gridImg = await loadImage(svgDataUrl);

      // --- 2. Poster: NEXT_PUBLIC_CORS_PROXY only (?q=encoded TMDB URL) → ImageBitmap (canvas-safe) ---
      const posterUrl = posterPath ? `${TMDB_IMAGE_URL}w500${posterPath}` : null;
      const posterImg = await loadPosterForCanvasExport(posterUrl);

      // Inline brand logo (best-effort; footer degrades to text-only if it fails to decode)
      const logoImg = await loadImage(EXPORT_LOGO_URL).catch(() => null);

      // --- 3. Wait for web fonts so canvas text renders in Inter/Montserrat, not a system fallback ---
      if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      // --- 4. Layout constants ---
      const PAD = 36;
      const POSTER_W = 260;
      const POSTER_H = 390; // 2:3 poster aspect
      const COL_GAP = 36;
      const POSTER_RADIUS = 12;
      const LEGEND_H = 20;
      const LEGEND_GAP = 20;
      const LEGEND_FONT_SIZE = 14;
      const LEGEND_DOT_R = 8;
      const LEGEND_ITEM_GAP = 20;
      const LEGEND_TEXT_GAP = 4;
      const TITLE_SIZE = 32;
      const TITLE_LINE_H = 40;
      const TITLE_MAX_LINES = 2;

      // Measure with a scratch context so main ctx state stays pristine
      const scratch = document.createElement("canvas").getContext("2d");
      scratch.font = exportFont(800, TITLE_SIZE);
      const titleLines = wrapText(scratch, tvName || "", POSTER_W, TITLE_MAX_LINES);

      scratch.font = exportFont(600, LEGEND_FONT_SIZE);
      const legendItems = RATING_BUCKETS.map((b) => ({ bucket: b, textW: scratch.measureText(b.label).width }));
      // full rendered width of the legend row so we can make the canvas wide enough to fit it
      const legendW = legendItems.reduce(
        (acc, item, i) => acc + LEGEND_DOT_R * 2 + LEGEND_TEXT_GAP + item.textW + (i < legendItems.length - 1 ? LEGEND_ITEM_GAP : 0),
        0
      );
      // SVG reserves padLeft for episode labels; rating cells start at x = padLeft. Draw the export
      // legend from that x so dots line up with the grid, not with the SVG bitmap’s left gutter.
      const legendOffsetX = layoutRef.current.padLeft;

      const hasRating = typeof overallRating === "number" && overallRating > 0;
      const ratingBucket = hasRating ? getBucket(overallRating) : null;
      const ratingText = hasRating ? formatRating(overallRating) : "";

      const textBlockH = (hasRating ? 36 : 0) + titleLines.length * TITLE_LINE_H + (yearRange ? 22 : 0);
      const textEndY = PAD + POSTER_H + 24 + textBlockH;
      const gridTopY = PAD + LEGEND_H + LEGEND_GAP;
      const episodeBandH = svgH - PAD_TOP - AVG_ROW_H - PAD_BOTTOM;
      const maxEpisodesExport = Math.max(1, Math.round((episodeBandH + GAP) / (CELL_H + GAP)));
      const avgRowYSvg = PAD_TOP + maxEpisodesExport * (CELL_H + GAP);
      const avgRowCenterCanvasY = gridTopY + avgRowYSvg + AVG_ROW_H / 2 + 6;
      const brandLogoPx = 36;
      const brandY = Math.max(textEndY + 12, avgRowCenterCanvasY - brandLogoPx / 2);

      // --- 5. Canvas size ---
      const rightColW = Math.max(svgW, legendOffsetX + legendW);
      const rightH = LEGEND_H + LEGEND_GAP + svgH;
      const leftStackH = POSTER_H + 24 + textBlockH;
      const contentH = Math.max(rightH, leftStackH, brandY + brandLogoPx - PAD);
      // Ceil to integers so the canvas pixel buffer matches the logical fill region exactly.
      // Without this, legendW (from measureText) is fractional → fillRect leaves a sub-pixel gap
      // on the right/bottom edge that renders as transparent (shows white on light viewers).
      const canvasW = Math.ceil(PAD * 2 + POSTER_W + COL_GAP + rightColW);
      const canvasH = Math.ceil(PAD * 2 + contentH);

      const scale = 3;
      const canvas = document.createElement("canvas");
      canvas.width = canvasW * scale;
      canvas.height = canvasH * scale;
      const ctx = canvas.getContext("2d");
      ctx.scale(scale, scale);

      // Background
      ctx.fillStyle = EXPORT_BG;
      ctx.fillRect(0, 0, canvasW, canvasH);

      // --- 6. Left column: poster + info + branding ---
      const leftX = PAD;
      const posterY = PAD;

      if (posterImg) {
        ctx.save();
        pathRoundedRect(ctx, leftX, posterY, POSTER_W, POSTER_H, POSTER_RADIUS);
        ctx.clip();
        // cover-fit the poster inside the box
        const imgAspect = posterImg.width / posterImg.height;
        const boxAspect = POSTER_W / POSTER_H;
        let dw, dh, dx, dy;
        if (imgAspect > boxAspect) {
          dh = POSTER_H;
          dw = POSTER_H * imgAspect;
          dx = leftX - (dw - POSTER_W) / 2;
          dy = posterY;
        } else {
          dw = POSTER_W;
          dh = POSTER_W / imgAspect;
          dx = leftX;
          dy = posterY - (dh - POSTER_H) / 2;
        }
        ctx.drawImage(posterImg, dx, dy, dw, dh);
        ctx.restore();
      } else {
        // graceful fallback: dark tile with title initial
        ctx.fillStyle = "#1f2937";
        pathRoundedRect(ctx, leftX, posterY, POSTER_W, POSTER_H, POSTER_RADIUS);
        ctx.fill();
        ctx.save();
        ctx.fillStyle = "#6b7280";
        ctx.font = exportFont(800, 80);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const initial = ((tvName || "?").trim().charAt(0) || "?").toUpperCase();
        ctx.fillText(initial, leftX + POSTER_W / 2, posterY + POSTER_H / 2);
        ctx.restore();
      }

      // Text block under the poster
      ctx.textBaseline = "top";
      let y = posterY + POSTER_H + 24;

      if (hasRating) {
        ctx.textAlign = "left";
        // One shared center line for the star, rating, and vote count — all drawn with textBaseline "middle"
        const ROW_H = 28;
        const rowCy = y + ROW_H / 2;
        ctx.textBaseline = "middle";

        const starColor = ratingBucket ? ratingBucket.color : "#facc15";
        const STAR_OUTER = 10;
        const STAR_INNER = STAR_OUTER * 0.42;
        const starHalfW = STAR_OUTER * STAR_INK_HALF_W;
        const starCx = leftX + starHalfW;
        fillFivePointStar(ctx, starCx, rowCy, STAR_OUTER, STAR_INNER, starColor);
        const starInkRight = starCx + starHalfW;

        ctx.fillStyle = "#ffffff";
        ctx.font = exportFont(700, 18);
        const gapAfterStar = 8;
        const ratingX = starInkRight + gapAfterStar;
        ctx.fillText(ratingText, ratingX, rowCy);
        const ratingInkRight = ratingX + ctx.measureText(ratingText).width;

        if (voteCount) {
          ctx.fillStyle = "#9ca3af";
          ctx.font = exportFont(500, 14);
          ctx.fillText(`(${voteCount.toLocaleString()})`, ratingInkRight + 8, rowCy);
        }

        ctx.textBaseline = "top";
        y += ROW_H + 8;
      }

      // Title (up to 2 lines, ellipsized if needed)
      ctx.fillStyle = "#ffffff";
      ctx.font = exportFont(800, TITLE_SIZE);
      for (const line of titleLines) {
        ctx.fillText(line, leftX, y);
        y += TITLE_LINE_H;
      }

      if (yearRange) {
        ctx.font = exportFont(500, 14);
        ctx.fillStyle = "#9ca3af";
        ctx.fillText(yearRange, leftX, y + 2);
      }

      // Branding: same vertical band as the SVG AVG row (not pinned to canvas bottom — avoids a floating footer gap)
      const LOGO_GAP = 10;
      let wordmarkX = leftX;
      if (logoImg) {
        ctx.drawImage(logoImg, leftX, brandY, brandLogoPx, brandLogoPx);
        wordmarkX = leftX + brandLogoPx + LOGO_GAP;
      }
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.font = exportFont(800, 22);
      ctx.fillStyle = "#ffffff";
      ctx.fillText("Cinephiled", wordmarkX, brandY + brandLogoPx / 2 + 1);
      ctx.textBaseline = "top";

      // --- 7. Right column: legend + grid ---
      const rightX = leftX + POSTER_W + COL_GAP;

      ctx.textBaseline = "middle";
      ctx.font = exportFont(600, LEGEND_FONT_SIZE);
      let legendCursor = rightX + legendOffsetX;
      const legendCenterY = PAD + LEGEND_H / 2;
      for (const { bucket, textW } of legendItems) {
        ctx.fillStyle = bucket.color;
        ctx.beginPath();
        ctx.arc(legendCursor + LEGEND_DOT_R, legendCenterY, LEGEND_DOT_R, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#e5e5e5";
        ctx.fillText(bucket.label, legendCursor + LEGEND_DOT_R * 2 + LEGEND_TEXT_GAP, legendCenterY);
        legendCursor += LEGEND_DOT_R * 2 + LEGEND_TEXT_GAP + textW + LEGEND_ITEM_GAP;
      }
      ctx.textBaseline = "alphabetic";

      ctx.drawImage(gridImg, rightX, PAD + LEGEND_H + LEGEND_GAP, svgW, svgH);

      // --- 8. Download ---
      const pngDataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngDataUrl;
      a.download = `${getNiceName({ id: tvId, name: tvName })}-episode-ratings.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Episode ratings PNG export failed", err);
    } finally {
      setIsExporting(false);
    }
  }, [isExporting, tvId, tvName, posterPath, overallRating, voteCount, yearRange]);

  const validSeasons = (seasons || []).filter((s) => s.season_number > 0 && (s.episodes?.length || 0) > 0);

  if (validSeasons.length === 0) {
    return (
      <P size='large' className='text-neutral-300'>
        No episode ratings available yet.
      </P>
    );
  }

  const maxEpisodes = Math.max(...validSeasons.map((s) => s.episodes.length));
  const padLeft = getPadLeft(maxEpisodes);
  layoutRef.current.padLeft = padLeft;
  const width = padLeft + validSeasons.length * (CELL_W + GAP) - GAP + PAD_RIGHT;
  const height = PAD_TOP + maxEpisodes * (CELL_H + GAP) - GAP + AVG_ROW_H + PAD_BOTTOM;

  const hrefPrefix = `/${ROUTES.tv}/${getNiceName({ id: tvId, name: tvName })}/${ROUTES.seasons}`;

  const seasonAverages = validSeasons.map((s) => {
    const rated = s.episodes.filter((ep) => ep.vote_average > 0);
    if (rated.length === 0) return null;
    return rated.reduce((sum, ep) => sum + ep.vote_average, 0) / rated.length;
  });

  const avgRowY = PAD_TOP + maxEpisodes * (CELL_H + GAP);

  return (
    <div>
      <FlexBox className='mb-1620 flex-wrap items-center justify-between gap-x-32 gap-y-20'>
        <Legend />

        <Button
          type='button'
          onClick={handleExportPng}
          disabled={isExporting}
          variant='secondary'
          size='small'
          weight='semibold'
          className='flex items-center gap-8 ring-1 ring-neutral-500'
          aria-label='Download episode ratings grid as PNG'>
          <Download size={16} aria-hidden />
          {isExporting ? "Exporting…" : "Download PNG"}
        </Button>
      </FlexBox>

      <div className='overflow-auto rounded-xl bg-neutral-900/20 p-1620 ring-1 ring-white/5'>
        <svg
          ref={svgRef}
          width={width}
          height={height}
          role='img'
          aria-label={`Episode ratings grid for ${tvName}`}
          style={{ display: "block", fontFamily: "inherit" }}>
          {/* season labels on top */}
          <g fill='#f5f5f5' fontSize='16' fontWeight='700' textAnchor='middle'>
            {validSeasons.map((s, i) => (
              <text key={s.id || s.season_number} x={padLeft + i * (CELL_W + GAP) + CELL_W / 2} y={PAD_TOP - 18}>
                S{s.season_number}
              </text>
            ))}
          </g>

          {/* episode labels on left */}
          <g fill='#f5f5f5' fontSize='15' fontWeight='700' textAnchor='end'>
            {Array.from({ length: maxEpisodes }).map((_, i) => (
              <text key={i} x={padLeft - 14} y={PAD_TOP + i * (CELL_H + GAP) + CELL_H / 2 + 5}>
                E{i + 1}
              </text>
            ))}
          </g>

          {/* cells */}
          {validSeasons.map((season, col) => (
            <Fragment key={season.id || season.season_number}>
              {season.episodes.map((ep, row) => {
                const x = padLeft + col * (CELL_W + GAP);
                const y = PAD_TOP + row * (CELL_H + GAP);
                const bucket = getBucket(ep.vote_average);
                const fill = bucket ? bucket.color : UNKNOWN_FILL;
                const textFill = bucket ? (bucket.textDark ? "#111827" : "#ffffff") : UNKNOWN_TEXT;
                const ratingText = formatRating(ep.vote_average);
                const ariaLabel =
                  `S${ep.season_number}E${ep.episode_number} — ${ep.name || "Episode"}: ` +
                  `${ratingText}${ep.vote_count ? ` (${ep.vote_count} votes)` : ""}`;
                const href = `${hrefPrefix}/${season.season_number}/${ROUTES.episodes}/${ep.episode_number}`;

                return (
                  <Link
                    key={ep.id || `${season.season_number}-${ep.episode_number}`}
                    href={href}
                    onMouseEnter={handleCellEnter(ep)}
                    onMouseMove={handleCellMove}
                    onMouseLeave={handleCellLeave}
                    onFocus={handleCellEnter(ep)}
                    onBlur={handleCellLeave}
                    style={{ cursor: "pointer", outline: "none" }}
                    aria-label={ariaLabel}>
                    <rect x={x} y={y} width={CELL_W} height={CELL_H} rx={8} ry={8} fill={fill} style={{ transition: "opacity 0.15s ease" }} />
                    <text
                      x={x + CELL_W / 2}
                      y={y + CELL_H / 2 + 6}
                      fill={textFill}
                      fontSize='17'
                      fontWeight='700'
                      textAnchor='middle'
                      pointerEvents='none'
                      className='font-montserrat'>
                      {ratingText}
                    </text>
                  </Link>
                );
              })}
            </Fragment>
          ))}

          {/* AVG row */}
          <g>
            <text
              x={padLeft - 14}
              y={avgRowY + AVG_ROW_H / 2 + 4}
              fill='#b4b4b4'
              fontSize='12'
              fontWeight='700'
              textAnchor='end'
              letterSpacing='0.5'>
              AVG.
            </text>
            {seasonAverages.map((avg, i) => {
              const cx = padLeft + i * (CELL_W + GAP) + CELL_W / 2;
              const avgBucket = getBucket(avg);
              const barFill = avgBucket ? avgBucket.color : UNKNOWN_FILL;
              const barW = CELL_W - 12;
              const barH = 5;
              const barY = avgRowY + AVG_ROW_H / 2 + 14;
              const barX = cx - barW / 2;
              const r = Math.min(barH, barW / 2);
              const barPath = `M${barX},${barY + r} A${r},${r} 0 0 1 ${barX + r},${barY} L${barX + barW - r},${barY} A${r},${r} 0 0 1 ${barX + barW},${barY + r} L${barX + barW},${barY + barH} L${barX},${barY + barH} Z`;
              return (
                <Fragment key={i}>
                  <text
                    x={cx}
                    y={avgRowY + AVG_ROW_H / 2 + 6}
                    fill={avg ? "#ffffff" : "#9ca3af"}
                    fontSize='18'
                    fontWeight='600'
                    textAnchor='middle'
                    className='font-montserrat'>
                    {avg ? formatRating(avg) : "—"}
                  </text>
                  {avg ? <path d={barPath} fill={barFill} /> : null}
                </Fragment>
              );
            })}
          </g>
        </svg>
      </div>

      <AnimatePresence>{tooltip ? <EpisodeTooltip data={tooltip} /> : null}</AnimatePresence>
    </div>
  );
};

export default EpisodeRatingsGrid;
