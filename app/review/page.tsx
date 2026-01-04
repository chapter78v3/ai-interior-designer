"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ReviewPage() {
  const [payload, setPayload] = useState<any>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("roomIntakePayload");
    if (raw) setPayload(JSON.parse(raw));
  }, []);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Review Intake Payload</h1>
      <p style={{ opacity: 0.8, marginBottom: 16 }}>
        This is Step 2. Next we’ll call the AI planner and generate an “after” image.
      </p>

      {!payload ? (
        <div style={{ border: "1px solid #444", padding: 16, borderRadius: 12 }}>
          No payload found. Go back and submit the form.
        </div>
      ) : (
        <pre
          style={{
            border: "1px solid #444",
            borderRadius: 12,
            padding: 16,
            overflowX: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {JSON.stringify(payload, null, 2)}
        </pre>
      )}

      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <Link href="/" style={{ textDecoration: "underline" }}>
          ← Back
        </Link>

        <button
          type="button"
          disabled
          title="Next step in Step 4: AI planner endpoint"
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid #444",
            opacity: 0.6,
            cursor: "not-allowed",
          }}
        >
          Generate Plan (next step)
        </button>
      </div>
    </main>
  );
}
