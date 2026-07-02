import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CheckmarkCircle24Filled,
  ArrowLeft24Regular,
  Location24Regular,
  Gift24Regular,
  ShieldLock24Regular,
  Clock24Regular,
  Sparkle24Filled,
  CheckmarkCircle24Regular,
} from "@fluentui/react-icons";
import APIRequest from "../../utils/APIRequest";
import ConfigAPIURL from "../../config/ConfigAPIURL";

// ── Design tokens ─────────────────────────────────────────────
const C = {
  brand: "#1A56DB",
  brandDark: "#1045B8",
  brandLight: "#EBF0FF",
  accent: "#F59E0B",
  accentLight: "#FEF3C7",
  success: "#059669",
  successLight: "#D1FAE5",
  bg: "#F7F8FC",
  surface: "#FFFFFF",
  border: "#E5E7EB",
  text: "#111827",
  textMid: "#6B7280",
  textLight: "#9CA3AF",
  error: "#DC2626",
  errorLight: "#FEE2E2",
  gradient: "linear-gradient(135deg, #1A56DB 0%, #7C3AED 100%)",
};

const fmt = (v) =>
  v != null && v !== "" ? `₹${Number(v).toLocaleString("en-IN")}` : "₹0";

const fmtDate = (unix) => {
  if (!unix) return "—";
  try {
    return new Date(Number(unix) * 1000).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "—";
  }
};

const initialsOf = (name) =>
  (name || "G")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// ── Nav ───────────────────────────────────────────────────────
function NavBar({ orgName, chip }) {
  return (
    <nav
      style={{
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        padding: "0 20px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            background: C.gradient,
            color: "#fff",
            borderRadius: 10,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          {initialsOf(orgName)}
        </div>
        <span style={{ fontWeight: 600, fontSize: 15, color: C.text }}>
          {orgName ?? "Giftworks"}
        </span>
      </div>
      {chip}
    </nav>
  );
}

function Chip({ icon, label, bg, color }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: bg,
        color,
        padding: "5px 12px",
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      {label}
    </span>
  );
}

// ── Loading ──────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }`}</style>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          background: C.bg,
        }}
      >
        <div style={{ position: "relative", width: 56, height: 56 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              border: `3px solid ${C.brandLight}`,
              borderTop: `3px solid ${C.brand}`,
              borderRadius: "50%",
              animation: "spin 0.9s linear infinite",
            }}
          />
          <Gift24Regular
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              color: C.brand,
              fontSize: 20,
            }}
          />
        </div>
        <p
          style={{
            color: C.textMid,
            fontSize: 14,
            animation: "pulse 1.6s ease-in-out infinite",
          }}
        >
          Preparing your gift experience…
        </p>
      </div>
    </>
  );
}

// ── Error / Expired ──────────────────────────────────────────
function ErrorPage({ icon, title, message }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: C.bg,
      }}
    >
      <div
        style={{
          background: C.surface,
          borderRadius: 20,
          padding: "44px 30px",
          textAlign: "center",
          maxWidth: 400,
          width: "100%",
          border: `1px solid ${C.border}`,
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            background: C.errorLight,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          {icon}
        </div>
        <h2
          style={{
            fontWeight: 800,
            fontSize: 21,
            margin: "0 0 10px",
            color: C.text,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            color: C.textMid,
            fontSize: 14,
            margin: "0 0 28px",
            lineHeight: 1.7,
          }}
        >
          {message}
        </p>
        <p
          style={{
            fontSize: 12,
            color: C.textLight,
            paddingTop: 18,
            borderTop: `1px solid ${C.border}`,
          }}
        >
          Powered by <strong>Giftworks</strong>
        </p>
      </div>
    </div>
  );
}

// ── Step 1: Gift Selection ─────────────────────────────────────
function GiftSelectionScreen({ campaign, employee, onSelect }) {
  const [selected, setSelected] = useState(null);
  const products = campaign?.products ?? [];
  const budget = campaign?.budgetPerEmployee ?? 0;
  const firstName = employee?.fullName?.split(" ")?.[0] ?? "there";

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <NavBar
        orgName={campaign?.organizationName}
        chip={
          <Chip
            icon="💰"
            label={`Budget ${fmt(budget)}`}
            bg={C.accentLight}
            color="#92400E"
          />
        }
      />

      {/* Hero */}
      <div
        style={{
          background: C.gradient,
          padding: "44px 20px 52px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 85% 30%, rgba(255,255,255,0.10), transparent 55%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.16)",
              backdropFilter: "blur(6px)",
              color: "#fff",
              padding: "5px 14px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            <Sparkle24Filled style={{ fontSize: 14 }} /> A gift, just for you
          </div>
          <h1
            style={{
              fontSize: "clamp(26px, 6vw, 38px)",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 10px",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Happy {campaign?.occasion ?? "Celebration"}, {firstName} ✨
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: 15.5,
              margin: "0 0 22px",
              lineHeight: 1.6,
              maxWidth: 500,
            }}
          >
            Pick your favourite gift from the collection below. We'll deliver it
            to your doorstep with care.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              `Curated by ${campaign?.organizationName ?? "your company"}`,
              "Free delivery",
              "Quality guaranteed",
            ].map((t) => (
              <span
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "rgba(255,255,255,0.13)",
                  color: "rgba(255,255,255,0.92)",
                  padding: "6px 13px",
                  borderRadius: 20,
                  fontSize: 12.5,
                }}
              >
                <CheckmarkCircle24Regular style={{ fontSize: 14 }} /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Deadline */}
      {campaign?.campaignDeadline ? (
        <div
          style={{
            background: C.accentLight,
            padding: "11px 20px",
            textAlign: "center",
            borderBottom: "1px solid #FDE68A",
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: "#92400E",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Clock24Regular style={{ fontSize: 16 }} /> Complete your selection
            before <strong>{fmtDate(campaign?.campaignDeadline)}</strong>
          </span>
        </div>
      ) : null}

      {/* Products */}
      <div
        style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 16px 110px" }}
      >
        <h2
          style={{
            fontSize: 19,
            fontWeight: 800,
            margin: "0 0 4px",
            color: C.text,
          }}
        >
          Choose your gift
        </h2>
        <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 22px" }}>
          {products?.length ?? 0} curated option
          {products?.length === 1 ? "" : "s"}
        </p>

        {products?.length === 0 ? (
          <div
            style={{
              background: C.surface,
              border: `1.5px dashed ${C.border}`,
              borderRadius: 16,
              padding: "48px 20px",
              textAlign: "center",
              color: C.textMid,
            }}
          >
            <Gift24Regular
              style={{ fontSize: 36, color: C.textLight, marginBottom: 10 }}
            />
            <p style={{ margin: 0, fontSize: 14 }}>
              No gifts have been added to this campaign yet.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
              gap: 18,
            }}
          >
            {products.map((p, idx) => {
              const price = p?.discountPrice || p?.price || 0;
              const withinBudget = budget ? price <= budget : true;
              const isSelected =
                selected?.product?.toString?.() === p?.product?.toString?.();
              return (
                <div
                  key={p?.product ?? p?._id ?? idx}
                  onClick={() =>
                    withinBudget && setSelected(isSelected ? null : p)
                  }
                  style={{
                    background: C.surface,
                    borderRadius: 18,
                    overflow: "hidden",
                    border: isSelected
                      ? `2px solid ${C.brand}`
                      : `1.5px solid ${C.border}`,
                    boxShadow: isSelected
                      ? `0 0 0 4px ${C.brandLight}, 0 8px 20px rgba(26,86,219,0.08)`
                      : "0 1px 3px rgba(0,0,0,0.03)",
                    cursor: withinBudget ? "pointer" : "not-allowed",
                    opacity: withinBudget ? 1 : 0.55,
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.2s ease",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (withinBudget && !isSelected)
                      e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {isSelected && (
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: C.success,
                        color: "#fff",
                        borderRadius: "50%",
                        width: 26,
                        height: 26,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 700,
                        zIndex: 2,
                        boxShadow: "0 2px 6px rgba(5,150,105,0.35)",
                      }}
                    >
                      ✓
                    </div>
                  )}
                  <div
                    style={{
                      background:
                        "linear-gradient(145deg, #F0F4FF 0%, #E8EEF8 100%)",
                      height: 150,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {p?.thumbnailImage ? (
                      <img
                        src={p.thumbnailImage}
                        alt={p?.name ?? "Gift"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Gift24Regular
                        style={{ fontSize: 46, color: "#94A3B8" }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      padding: "16px 18px 18px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        margin: "0 0 3px",
                        lineHeight: 1.3,
                        color: C.text,
                      }}
                    >
                      {p?.name ?? "Gift Item"}
                    </p>
                    <p
                      style={{
                        fontSize: 12.5,
                        color: C.textMid,
                        margin: "0 0 14px",
                      }}
                    >
                      From {p?.vendorName ?? "Partner Vendor"}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "auto",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: 19,
                            color: C.text,
                          }}
                        >
                          {fmt(price)}
                        </span>
                        {p?.discountPrice ? (
                          <span
                            style={{
                              fontSize: 12,
                              color: C.textLight,
                              textDecoration: "line-through",
                              marginLeft: 7,
                            }}
                          >
                            {fmt(p?.price)}
                          </span>
                        ) : null}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          withinBudget && setSelected(isSelected ? null : p);
                        }}
                        style={{
                          background: isSelected ? C.success : C.brand,
                          color: "#fff",
                          border: "none",
                          borderRadius: 9,
                          padding: "8px 16px",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: withinBudget ? "pointer" : "not-allowed",
                          transition: "background 0.15s",
                        }}
                      >
                        {isSelected ? "✓ Selected" : "Select Gift"}
                      </button>
                    </div>
                    {!withinBudget && (
                      <p
                        style={{ color: C.error, fontSize: 11.5, marginTop: 7 }}
                      >
                        Exceeds your budget
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      {selected ? (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: C.surface,
            borderTop: `1px solid ${C.border}`,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            boxShadow: "0 -6px 24px rgba(0,0,0,0.10)",
            zIndex: 50,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 46,
                height: 46,
                background: C.brandLight,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {selected?.thumbnailImage ? (
                <img
                  src={selected.thumbnailImage}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                />
              ) : (
                <Gift24Regular style={{ color: C.brand, fontSize: 22 }} />
              )}
            </div>
            <div>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  margin: 0,
                  color: C.text,
                }}
              >
                {selected?.name}
              </p>
              <p style={{ color: C.textMid, fontSize: 13, margin: 0 }}>
                {fmt(selected?.discountPrice || selected?.price)}
              </p>
            </div>
          </div>
          <button
            style={{
              background: C.gradient,
              color: "#fff",
              border: "none",
              borderRadius: 11,
              padding: "13px 30px",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 14px rgba(26,86,219,0.3)",
            }}
            onClick={() => onSelect?.(selected)}
          >
            Continue to Delivery →
          </button>
        </div>
      ) : null}

      <p
        style={{
          textAlign: "center",
          padding: 16,
          fontSize: 12,
          color: C.textLight,
        }}
      >
        Powered by <strong>Giftworks</strong>
      </p>
    </div>
  );
}

// ── Step 2: Address + Confirm ──────────────────────────────────
function AddressScreen({
  campaign,
  employee,
  selectedProduct,
  onConfirm,
  onBack,
  loading,
}) {
  const [form, setForm] = useState({
    fullName: employee?.fullName ?? "",
    mobileNumber: employee?.mobileNumber ?? "",
    address: employee?.address ?? "",
    city: employee?.city ?? "",
    state: employee?.state ?? "",
    pincode: employee?.pincode ?? "",
    landmark: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.fullName?.trim()) e.fullName = "Full name is required";
    if (
      !form.mobileNumber?.trim() ||
      !/^[6-9]\d{9}$/.test(form.mobileNumber.replace(/^(\+91|91)/, ""))
    )
      e.mobileNumber = "Enter a valid 10-digit mobile number";
    if (!form.address?.trim()) e.address = "Address line is required";
    if (!form.city?.trim()) e.city = "City is required";
    if (
      !form.pincode?.trim() ||
      !/^\d{6}$/.test(form.pincode) ||
      /^(\d)\1{5}$/.test(form.pincode)
    )
      e.pincode = "Enter a valid 6-digit pincode";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    onConfirm?.(form);
  };

  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "11px 14px",
    borderRadius: 9,
    border: `1.5px solid ${hasError ? C.error : C.border}`,
    fontSize: 14,
    color: C.text,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    background: C.surface,
    transition: "border-color 0.15s",
  });

  const Field = ({ name, label, placeholder, maxLen, optional }) => (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          color: C.text,
          marginBottom: 6,
        }}
      >
        {label}{" "}
        {optional ? (
          <span style={{ color: C.textMid, fontWeight: 400 }}>(optional)</span>
        ) : null}
      </label>
      <input
        style={inputStyle(!!errors?.[name])}
        placeholder={placeholder}
        value={form?.[name] ?? ""}
        maxLength={maxLen}
        onChange={(ev) => {
          let val = ev.target.value;
          if (name === "mobileNumber")
            val = val.replace(/\D/g, "").slice(0, 10);
          if (name === "pincode") val = val.replace(/\D/g, "").slice(0, 6);
          setForm((p) => ({ ...p, [name]: val }));
          setErrors((p) => {
            const n = { ...p };
            delete n[name];
            return n;
          });
        }}
        onFocus={(ev) => {
          ev.target.style.borderColor = C.brand;
        }}
        onBlur={(ev) => {
          ev.target.style.borderColor = errors?.[name] ? C.error : C.border;
        }}
      />
      {errors?.[name] ? (
        <p style={{ color: C.error, fontSize: 12, marginTop: 5 }}>
          {errors[name]}
        </p>
      ) : null}
    </div>
  );

  const price = selectedProduct?.discountPrice || selectedProduct?.price || 0;

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <NavBar
        orgName={campaign?.organizationName}
        chip={
          <Chip
            icon={<CheckmarkCircle24Filled style={{ fontSize: 15 }} />}
            label="Gift chosen"
            bg={C.successLight}
            color={C.success}
          />
        }
      />
      <div
        style={{ maxWidth: 800, margin: "0 auto", padding: "26px 16px 80px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 22,
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 9,
              padding: "7px 15px",
              fontSize: 13,
              cursor: "pointer",
              color: C.textMid,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 500,
            }}
          >
            <ArrowLeft24Regular style={{ fontSize: 16 }} /> Back
          </button>
          <span
            style={{
              marginLeft: "auto",
              fontSize: 13,
              color: C.textMid,
              fontWeight: 500,
            }}
          >
            Step 2 of 2
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
          {/* form */}
          <div
            style={{
              background: C.surface,
              borderRadius: 18,
              padding: "26px 22px",
              border: `1px solid ${C.border}`,
            }}
          >
            <h2
              style={{
                fontWeight: 800,
                fontSize: 19,
                margin: "0 0 5px",
                color: C.text,
              }}
            >
              Where should we deliver?
            </h2>
            <p style={{ color: C.textMid, fontSize: 13, margin: "0 0 22px" }}>
              Your gift will arrive within the campaign delivery window.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <div style={{ gridColumn: "1/-1" }}>
                <Field
                  name="fullName"
                  label="Full name"
                  placeholder="Your full name"
                />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <Field
                  name="mobileNumber"
                  label="Phone number"
                  placeholder="98xxx xxxxx"
                  maxLen={10}
                />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <Field
                  name="address"
                  label="Address line"
                  placeholder="Flat / Apartment, Street"
                />
              </div>
              <Field name="city" label="City" placeholder="Mumbai" />
              <Field
                name="pincode"
                label="Pincode"
                placeholder="400001"
                maxLen={6}
              />
              <div style={{ gridColumn: "1/-1" }}>
                <Field
                  name="landmark"
                  label="Landmark"
                  placeholder="Near..."
                  optional
                />
              </div>
            </div>
          </div>

          {/* summary */}
          <div
            style={{
              background: C.surface,
              borderRadius: 18,
              padding: "22px",
              border: `1px solid ${C.border}`,
            }}
          >
            <p
              style={{
                fontWeight: 700,
                fontSize: 11,
                margin: "0 0 14px",
                color: C.textMid,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              Your Gift
            </p>
            <div
              style={{
                background: "linear-gradient(145deg, #F0F4FF, #E8EEF8)",
                borderRadius: 12,
                height: 110,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
                overflow: "hidden",
              }}
            >
              {selectedProduct?.thumbnailImage ? (
                <img
                  src={selectedProduct.thumbnailImage}
                  alt={selectedProduct?.name ?? ""}
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
              ) : (
                <Gift24Regular style={{ fontSize: 42, color: "#94A3B8" }} />
              )}
            </div>
            <p
              style={{
                fontWeight: 700,
                fontSize: 15,
                margin: "0 0 3px",
                color: C.text,
              }}
            >
              {selectedProduct?.name ?? "—"}
            </p>
            <p style={{ color: C.textMid, fontSize: 12.5, margin: "0 0 14px" }}>
              {selectedProduct?.vendorName ?? ""}
            </p>
            {[
              ["Gift price", fmt(price)],
              ["Delivery", "Free"],
              ["You pay", "₹0"],
            ].map(([k, v], i) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: C.textMid,
                  padding: "8px 0",
                  borderTop:
                    i === 2 ? `2px solid ${C.border}` : `1px solid ${C.border}`,
                }}
              >
                <span style={i === 2 ? { fontWeight: 700, color: C.text } : {}}>
                  {k}
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    color:
                      i === 2
                        ? C.success
                        : k === "Delivery"
                          ? C.success
                          : C.text,
                    fontSize: i === 2 ? 16 : 13,
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              background: C.gradient,
              color: "#fff",
              border: "none",
              borderRadius: 13,
              padding: "17px",
              fontSize: 15.5,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              width: "100%",
              textAlign: "center",
              boxShadow: "0 4px 14px rgba(26,86,219,0.25)",
            }}
          >
            {loading ? "Placing your order…" : "Confirm & Place Order 🎁"}
          </button>
        </div>
      </div>
      <p
        style={{
          textAlign: "center",
          padding: 16,
          fontSize: 12,
          color: C.textLight,
        }}
      >
        Powered by <strong>Giftworks</strong>
      </p>
    </div>
  );
}

// ── Step 3: Confirmed ──────────────────────────────────────────
function ConfirmedScreen({ campaign, employee, orderData }) {
  const addr = orderData?.deliveryAddress;
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <NavBar orgName={campaign?.organizationName} chip={null} />
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
        }}
      >
        <div
          style={{
            background: C.surface,
            borderRadius: 22,
            padding: "44px 30px",
            textAlign: "center",
            maxWidth: 440,
            width: "100%",
            border: `1px solid ${C.border}`,
            boxShadow: "0 10px 36px rgba(0,0,0,0.07)",
          }}
        >
          <div
            style={{
              width: 76,
              height: 76,
              background: C.successLight,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              margin: "0 auto 22px",
            }}
          >
            🎉
          </div>
          <h2
            style={{
              fontWeight: 800,
              fontSize: 23,
              margin: "0 0 8px",
              color: C.text,
            }}
          >
            Your gift is confirmed!
          </h2>
          <p
            style={{
              color: C.textMid,
              fontSize: 14,
              margin: "0 0 26px",
              lineHeight: 1.65,
            }}
          >
            We've locked in your selection and will deliver it within the
            campaign window.
          </p>

          <div
            style={{
              background: C.bg,
              borderRadius: 14,
              padding: "16px 18px",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 14,
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                background: C.brandLight,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Gift24Regular style={{ color: C.brand, fontSize: 24 }} />
            </div>
            <div>
              <p
                style={{
                  fontWeight: 700,
                  margin: 0,
                  fontSize: 14,
                  color: C.text,
                }}
              >
                {orderData?.productName ?? "Your gift"}
              </p>
              <p
                style={{
                  color: C.success,
                  fontSize: 12,
                  margin: "4px 0 0",
                  fontWeight: 600,
                }}
              >
                Order placed ✓
              </p>
            </div>
          </div>

          <div
            style={{
              background: C.brandLight,
              borderRadius: 12,
              padding: "14px 18px",
              display: "flex",
              alignItems: "flex-start",
              gap: 11,
              marginBottom: 22,
              textAlign: "left",
            }}
          >
            <Location24Regular
              style={{ color: C.brand, flexShrink: 0, marginTop: 1 }}
            />
            <div>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  margin: 0,
                  color: C.brand,
                }}
              >
                Delivering to
              </p>
              <p
                style={{
                  color: C.textMid,
                  fontSize: 12.5,
                  margin: "3px 0 0",
                  lineHeight: 1.55,
                }}
              >
                {addr?.fullName ?? ""} · {addr?.addressLine ?? ""},{" "}
                {addr?.city ?? ""} – {addr?.pincode ?? ""}
              </p>
            </div>
          </div>

          <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 24px" }}>
            Confirmation sent to{" "}
            <strong>{employee?.email ?? "your email"}</strong>
          </p>

          <p
            style={{
              fontSize: 12,
              color: C.textLight,
              paddingTop: 18,
              borderTop: `1px solid ${C.border}`,
            }}
          >
            Powered by <strong>Giftworks</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Already Ordered Screen ─────────────────────────────────────
function AlreadyOrderedScreen({ campaign, employee, order }) {
  const addr = order?.deliveryAddress;
  const statusColors = {
    delivered: { bg: C.successLight, color: C.success },
    shipped: { bg: C.brandLight, color: C.brand },
    processing: { bg: C.accentLight, color: "#92400E" },
    pending: { bg: C.brandLight, color: C.brand },
    cancelled: { bg: C.errorLight, color: C.error },
  };
  const statusStyle = statusColors?.[order?.status] ?? statusColors.pending;

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <NavBar orgName={campaign?.organizationName} chip={null} />
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
        }}
      >
        <div
          style={{
            background: C.surface,
            borderRadius: 22,
            padding: "44px 30px",
            textAlign: "center",
            maxWidth: 440,
            width: "100%",
            border: `2px solid ${C.success}`,
            boxShadow: `0 0 0 5px ${C.successLight}`,
          }}
        >
          <CheckmarkCircle24Filled
            style={{ color: C.success, fontSize: 56, marginBottom: 14 }}
          />
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: C.successLight,
              color: C.success,
              padding: "5px 15px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 18,
            }}
          >
            ✓ Gift already selected
          </div>
          <h2
            style={{
              fontWeight: 800,
              fontSize: 21,
              margin: "0 0 6px",
              color: C.text,
            }}
          >
            {order?.productSnapshot?.name ?? "Your Gift"}
          </h2>
          <p style={{ color: C.textMid, fontSize: 13, margin: "0 0 22px" }}>
            Order ID: {order?.orderId ?? "—"}
          </p>

          <div
            style={{
              background: C.bg,
              borderRadius: 14,
              padding: "16px 18px",
              marginBottom: 22,
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontWeight: 600,
                fontSize: 13,
                margin: "0 0 8px",
                color: C.textMid,
              }}
            >
              Delivery details
            </p>
            <p style={{ fontSize: 13, margin: "0 0 4px", color: C.text }}>
              <strong>{addr?.fullName ?? "—"}</strong>
            </p>
            <p
              style={{
                fontSize: 13,
                color: C.textMid,
                margin: "0 0 10px",
                lineHeight: 1.55,
              }}
            >
              {addr?.addressLine ?? ""}, {addr?.city ?? ""} –{" "}
              {addr?.pincode ?? ""}
            </p>
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 600,
                background: statusStyle.bg,
                color: statusStyle.color,
                textTransform: "capitalize",
              }}
            >
              {order?.status ?? "pending"}
            </span>
          </div>

          <p
            style={{
              fontSize: 12,
              color: C.textLight,
              paddingTop: 18,
              borderTop: `1px solid ${C.border}`,
            }}
          >
            Powered by <strong>Giftworks</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────
export default function EmployeeGiftApp() {
  const { token } = useParams();
  const [state, setState] = useState("loading");
  const [campaign, setCampaign] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [existingOrder, setExistingOrder] = useState(null);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!token) {
        setState("invalid");
        return;
      }
      try {
        const res = await APIRequest.request(
          "GET",
          `${ConfigAPIURL?.validateToken}/${token}`,
          "",
        );

        if (res?.data?.responseCode !== 109) {
          const msg = res?.data?.message?.toLowerCase?.() ?? "";
          setState(
            msg.includes("expired") || msg.includes("ended")
              ? "expired"
              : "invalid",
          );
          return;
        }

        const emp = res?.data?.data?.employee ?? null;
        const camp = res?.data?.data?.campaign ?? null;
        const existing = res?.data?.data?.existingOrder ?? null;

        setCampaign(camp);
        setEmployee(emp);

        if (existing) {
          setExistingOrder(existing);
          setState("already_ordered");
          return;
        }

        setState("select");
      } catch (err) {
        console.log(err);
        setState("invalid");
      }
    };
    init();
  }, [token]);

  const handleConfirmOrder = async (addressForm) => {
    if (!selectedProduct || placing) return;
    setPlacing(true);
    try {
      const res = await APIRequest.request(
        "POST",
        ConfigAPIURL?.placeOrder,
        JSON.stringify({
          token,
          productId: selectedProduct?.product,
          fullName: addressForm?.fullName,
          mobileNumber: addressForm?.mobileNumber,
          addressLine: addressForm?.address,
          city: addressForm?.city,
          state: addressForm?.state ?? "",
          pincode: addressForm?.pincode,
          landmark: addressForm?.landmark ?? "",
        }),
      );

      if (res?.data?.responseCode === 109) {
        setOrderData(res?.data?.data ?? null);
        setState("confirmed");
      } else {
        alert(res?.data?.message ?? "Failed to place order. Please try again.");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (state === "loading") return <LoadingScreen />;

  if (state === "invalid")
    return (
      <ErrorPage
        icon={<ShieldLock24Regular style={{ color: C.error, fontSize: 32 }} />}
        title="Invalid link"
        message="This gift selection link is invalid or has already been used. Please check your email for the correct link or contact your HR team."
      />
    );

  if (state === "expired")
    return (
      <ErrorPage
        icon={<Clock24Regular style={{ color: C.error, fontSize: 32 }} />}
        title="Link expired"
        message="The gift selection period for this campaign has ended. Please contact your HR team if you believe this is an error."
      />
    );

  if (state === "already_ordered")
    return (
      <AlreadyOrderedScreen
        campaign={campaign}
        employee={employee}
        order={existingOrder}
      />
    );

  if (state === "select")
    return (
      <GiftSelectionScreen
        campaign={campaign}
        employee={employee}
        onSelect={(p) => {
          setSelectedProduct(p);
          setState("address");
        }}
      />
    );

  if (state === "address")
    return (
      <AddressScreen
        campaign={campaign}
        employee={employee}
        selectedProduct={selectedProduct}
        onBack={() => setState("select")}
        onConfirm={handleConfirmOrder}
        loading={placing}
      />
    );

  if (state === "confirmed")
    return (
      <ConfirmedScreen
        campaign={campaign}
        employee={employee}
        orderData={orderData}
      />
    );

  return null;
}
