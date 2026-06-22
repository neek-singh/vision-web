"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { processPaymentSimulation } from "@/app/actions/payments";
import Image from "next/image";

interface GatewayClientProps {
  payment: {
    id: string;
    amount: number;
    status: string;
    admission: {
      student_name: string;
      email: string;
      courses: {
        title: string;
        course_code: string;
      };
    };
  };
}

export function GatewayClient({ payment }: GatewayClientProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes countdown
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSimulation(false); // Auto-fail on timeout
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSimulation = async (success: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const res = await processPaymentSimulation(payment.id, success);
      if (res.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push(`/payment/status?paymentId=${payment.id}`);
      }
    } catch (e) {
      console.error(e);
      setError("Failed to process payment status callback.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4">
      {/* SMEPay Header */}
      <div className="w-full max-w-md bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden relative">
        <div className="p-6 bg-slate-800/80 border-b border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-sm text-white">
              S
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block">
                SME<span className="text-blue-500">Pay</span>
              </span>
              <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase block -mt-0.5">
                UPI Gateway
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Secured Connection
          </div>
        </div>

        {/* Merchant Info */}
        <div className="p-6 text-center border-b border-slate-700/60">
          <span className="text-xs text-slate-400 font-semibold block mb-1">PAYING TO</span>
          <h2 className="text-lg font-black text-white leading-tight">
            Vision IT Computer Institute
          </h2>
          <div className="mt-4">
            <span className="text-slate-400 text-xs font-semibold block">TOTAL AMOUNT</span>
            <span className="text-3xl font-black text-white">₹{payment.amount}</span>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="p-6 flex flex-col items-center bg-slate-800/50">
          <span className="text-xs text-slate-400 font-semibold mb-3">SCAN UPI QR CODE</span>

          {/* Simulated QR Code SVG */}
          <div className="w-48 h-48 bg-white p-3 rounded-2xl shadow-lg relative flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="w-full h-full text-slate-900"
              fill="currentColor"
            >
              {/* QR Pattern Corners */}
              <rect x="0" y="0" width="25" height="25" />
              <rect x="2" y="2" width="21" height="21" fill="white" />
              <rect x="6" y="6" width="13" height="13" />

              <rect x="75" y="0" width="25" height="25" />
              <rect x="77" y="2" width="21" height="21" fill="white" />
              <rect x="81" y="6" width="13" height="13" />

              <rect x="0" y="75" width="25" height="25" />
              <rect x="2" y="77" width="21" height="21" fill="white" />
              <rect x="6" y="81" width="13" height="13" />

              {/* QR Center Dummy Data Dots */}
              <rect x="35" y="10" width="5" height="5" />
              <rect x="50" y="5" width="5" height="15" />
              <rect x="60" y="10" width="10" height="5" />

              <rect x="30" y="30" width="10" height="10" />
              <rect x="45" y="35" width="15" height="5" />
              <rect x="65" y="30" width="5" height="10" />

              <rect x="10" y="35" width="10" height="5" />
              <rect x="10" y="50" width="5" height="15" />
              <rect x="20" y="60" width="15" height="5" />

              <rect x="35" y="45" width="10" height="15" />
              <rect x="50" y="55" width="15" height="15" />
              <rect x="70" y="50" width="20" height="5" />

              <rect x="30" y="75" width="5" height="15" />
              <rect x="45" y="80" width="15" height="5" />
              <rect x="65" y="75" width="15" height="15" />

              <rect x="80" y="30" width="15" height="5" />
              <rect x="90" y="40" width="5" height="20" />
            </svg>
            <div className="absolute w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white">
              UPI
            </div>
          </div>

          {/* Timer */}
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            QR code expires in
            <span className="text-amber-500 font-mono text-sm font-bold">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* UPI Apps Icons intent */}
        <div className="p-6 bg-slate-800/80 border-t border-slate-700/60 text-center">
          <span className="text-xs text-slate-400 font-semibold block mb-4">OR PAY USING UPI APPS</span>
          <div className="flex justify-center gap-6">
            {["Google Pay", "PhonePe", "Paytm", "BHIM"].map((app) => (
              <button
                key={app}
                onClick={() => handleSimulation(true)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-2xl bg-slate-700 group-hover:bg-blue-600 transition-colors flex items-center justify-center font-black text-[10px] tracking-tighter text-white">
                  {app.split(" ").map(w => w[0]).join("")}
                </div>
                <span className="text-[10px] font-semibold text-slate-400 group-hover:text-white transition-colors">
                  {app}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Development simulation controls */}
        <div className="p-6 bg-slate-900 border-t border-slate-700/60 space-y-4">
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block text-center">
            ⚠️ Development Sandbox Controls
          </span>

          {error && <p className="text-xs font-semibold text-red-500 text-center">{error}</p>}

          <div className="grid grid-cols-2 gap-3">
            <button
              disabled={loading}
              onClick={() => handleSimulation(true)}
              className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              Simulate Success
            </button>
            <button
              disabled={loading}
              onClick={() => handleSimulation(false)}
              className="w-full h-10 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              Simulate Failure
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
