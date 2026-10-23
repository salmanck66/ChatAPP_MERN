import { useState } from "react";

const PALETTE = ["#0ea5e9", "#8b5cf6", "#ec4899", "#f97316", "#10b981", "#eab308", "#6366f1", "#14b8a6"];

const colorFor = (seed = "") => {
  let hash = 0;
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return PALETTE[Math.abs(hash) % PALETTE.length];
};

const initialsOf = (name = "?") =>
  name
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

// Uses the stored profile picture when there is one and it loads;
// otherwise renders coloured initials, so there's no dependency on an external avatar service.
const Avatar = ({ user, size = "w-12 h-12", textSize = "text-base" }) => {
  const [failed, setFailed] = useState(false);
  const showImage = user?.profilePic && !failed;

  return (
    <div className={`${size} rounded-full overflow-hidden shrink-0`}>
      {showImage ? (
        <img src={user.profilePic} alt="" className="w-full h-full object-cover" onError={() => setFailed(true)} />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center font-semibold text-white ${textSize}`}
          style={{ backgroundColor: colorFor(user?.userName || user?.fullName) }}
          aria-hidden="true"
        >
          {initialsOf(user?.fullName)}
        </div>
      )}
    </div>
  );
};

export default Avatar;
