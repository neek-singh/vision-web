"use client";

import { useState, useEffect } from "react";

const OFFERS = [
  "Admission Applications Open for 2026-27",
  "Institute Offer: Save up to 39% on DCA & PGDCA Diploma Programs!",
  "University Courses: Regular & Private Admissions Open for BA, MA, BCA & B.Sc!"
];

export default function OfferSlider() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % OFFERS.length);
        setFade(true); // start fade in
      }, 500); // match duration-500
    }, 4500); // rotate every 4.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-block transition-all duration-500 ${
        fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
      }`}
    >
      {OFFERS[index]}
    </span>
  );
}
