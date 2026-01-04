"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

type RoomType = "Living Room" | "Bedroom" | "Kitchen" | "Bathroom" | "Office" | "Dining Room" | "Other";
type BudgetTier = "Budget" | "Mid" | "Premium";

const STYLE_OPTIONS = [
  "Modern",
  "Contemporary",
  "Traditional",
  "Farmhouse",
  "Industrial",
  "Scandinavian",
  "Japandi",
  "Bohemian",
  "Mid-century modern",
  "Coastal",
  "Minimalist",
] as const;

export default function HomePage() {
  const router = useRouter();

  const [roomType, setRoomType] = useState<RoomType>("Living Room");
  const [lengthFt, setLengthFt] = useState<string>("");
  const [widthFt, setWidthFt] = useState<string>("");
  const [heightFt, setHeightFt] = useState<string>("");
  const [budgetTier, setBudgetTier] = useState<BudgetTier>("Mid");
  const [stylePrefs, setStylePrefs] = useState<string[]>(["Modern"]);
  const [mustKeep, setMustKeep] = useState<string>("");
  const [dislikeMost, setDislikeMost] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  function toggleStyle(style: string) {
    setStylePrefs((prev) => {
      if (prev.includes(style)) return prev.filter((s) => s !== style);
      if (prev.length >= 3) return prev; // limit to 3
      return [...prev, style];
    });
  }

  function onFilesSelected(e: ChangeEvent<HTMLInputElement>) {
    setError("");
    const selected = Array.from(e.target.files ?? []);
    if (selected.length === 0) return;

    const next = [...files, ...selected].slice(0, 8); // max 8
    setFiles(next);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function validate(): string | null {
    const l = Number(lengthFt);
    const w = Number(widthFt);
    const h = Number(heightFt);

    if (!lengthFt || !widthFt) return "Please enter room length and width.";
    if (Number.isNaN(l) || Number.isNaN(w) || l <= 0 || w <= 0) return "Length/width must be positive numbers.";
    if (heightFt && (Number.isNaN(h) || h <= 0)) return "Height must be a positive number.";
    if (stylePrefs.length === 0) return "Please pick at least one style (up to 3).";
    if (files.length < 3) return "Please upload at least 3 room photos (up to 8).";
    if (files.length > 8) return "Please upload no more than 8 photos.";
    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }

    // For now: build a payload and pass to results page via sessionStorage
    const payload = {
      roomType,
      dimensions: {
        lengthFt: Number(lengthFt),
        widthFt: Number(widthFt),
        heightFt: heightFt ? Number(heightFt) : null,
      },
      budgetTier,
      stylePrefs,
      mustKeep,
      dislikeMost,
      photos: files.map((f) => ({ name: f.name, type: f.type, size: f.size })),
      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem("roomIntakePayload", JSON.stringify(payload));
    router.push("/review");
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>AI Interior Designer (MVP)</h1>
      <p style={{ marginBottom: 24, opacity: 0.8 }}>
        Upload 3–8 photos + enter dimensions/budget/style. Next step will generate a room plan + “after” image.
      </p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
        <section style={{ border: "1px solid #333", borderRadius: 12, padding: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Room Basics</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label style={{ display: "grid", gap: 6 }}>
              Room Type
              <select value={roomType} onChange={(e) => setRoomType(e.target.value as RoomType)}>
                {["Living Room", "Bedroom", "Kitchen", "Bathroom", "Office", "Dining Room", "Other"].map((rt) => (
                  <option key={rt} value={rt}>
                    {rt}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              Budget Tier
              <select value={budgetTier} onChange={(e) => setBudgetTier(e.target.value as BudgetTier)}>
                {["Budget", "Mid", "Premium"].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 12 }}>
            <label style={{ display: "grid", gap: 6 }}>
              Length (ft)
              <input value={lengthFt} onChange={(e) => setLengthFt(e.target.value)} inputMode="decimal" />
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              Width (ft)
              <input value={widthFt} onChange={(e) => setWidthFt(e.target.value)} inputMode="decimal" />
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              Height (ft) (optional)
              <input value={heightFt} onChange={(e) => setHeightFt(e.target.value)} inputMode="decimal" />
            </label>
          </div>
        </section>

        <section style={{ border: "1px solid #333", borderRadius: 12, padding: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Style Preferences (pick up to 3)</h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {STYLE_OPTIONS.map((style) => {
              const selected = stylePrefs.includes(style);
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => toggleStyle(style)}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 999,
                    border: "1px solid #444",
                    cursor: "pointer",
                    background: selected ? "#1f2937" : "transparent",
                    color: selected ? "white" : "inherit",
                    opacity: !selected && stylePrefs.length >= 3 ? 0.5 : 1,
                  }}
                  disabled={!selected && stylePrefs.length >= 3}
                >
                  {style}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 12, opacity: 0.8 }}>Selected: {stylePrefs.join(", ")}</div>
        </section>

        <section style={{ border: "1px solid #333", borderRadius: 12, padding: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Constraints</h2>

          <label style={{ display: "grid", gap: 6, marginBottom: 12 }}>
            Must-keep items (optional)
            <input
              value={mustKeep}
              onChange={(e) => setMustKeep(e.target.value)}
              placeholder="e.g., brown leather sofa, TV, dining table"
            />
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            What do you dislike most about the room? (optional but helpful)
            <textarea
              value={dislikeMost}
              onChange={(e) => setDislikeMost(e.target.value)}
              placeholder="e.g., feels dark, cluttered, awkward layout, not enough storage"
              rows={4}
            />
          </label>
        </section>

        <section style={{ border: "1px solid #333", borderRadius: 12, padding: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Photos (3–8 required)</h2>

          <input type="file" accept="image/*" multiple onChange={onFilesSelected} />

          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            {files.map((f, idx) => (
              <div
                key={`${f.name}-${idx}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #444",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <div style={{ display: "grid" }}>
                  <strong>{f.name}</strong>
                  <span style={{ opacity: 0.75, fontSize: 12 }}>
                    {f.type || "image"} • {(f.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <button type="button" onClick={() => removeFile(idx)} style={{ cursor: "pointer" }}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 8, opacity: 0.8 }}>
            {files.length}/8 selected (minimum 3)
          </div>
        </section>

        {error ? (
          <div style={{ color: "#fca5a5", fontWeight: 600, border: "1px solid #7f1d1d", padding: 12, borderRadius: 10 }}>
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #444",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Continue →
        </button>
      </form>
    </main>
  );
}
