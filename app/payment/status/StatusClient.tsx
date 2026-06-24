"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface StatusClientProps {
  payment: {
    id: string;
    amount: number;
    status: string;
    transaction_id: string | null;
    created_at: string;
    admission: {
      id: string;
      student_name: string;
      email: string;
      phone: string;
      father_name: string | null;
      mother_name: string | null;
      dob: string | null;
      gender: string | null;
      category: string | null;
      address: string | null;
      qualification: string | null;
      admission_no: string | null;
      student_id: string | null;
      photo_url: string | null;
      created_at: string;
      courses: {
        title: string;
        course_code: string;
      };
    };
  };
  print?: string;
}

function capitalizeWords(str: string | null): string {
  if (!str) return "N/A";
  return str
    .toLowerCase()
    .split(" ")
    .map(word => {
      if (word.includes("/")) {
        return word.split("/").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" / ");
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function formatAddress(addressStr: any): string {
  if (!addressStr) return "N/A";
  try {
    const addr = typeof addressStr === "string" ? JSON.parse(addressStr) : addressStr;
    if (addr && typeof addr === "object") {
      const parts = [];
      if (addr.village) parts.push(capitalizeWords(addr.village));
      if (addr.post) parts.push(`Post: ${capitalizeWords(addr.post)}`);
      if (addr.district) parts.push(capitalizeWords(addr.district));
      if (addr.state) parts.push(capitalizeWords(addr.state));
      if (addr.pin) parts.push(addr.pin);
      return parts.join(", ");
    }
  } catch (e) {
    // ignore
  }
  return typeof addressStr === "string" ? capitalizeWords(addressStr) : "N/A";
}

export function StatusClient({ payment, print }: StatusClientProps) {
  const [printingLetter, setPrintingLetter] = useState(false);
  const [printingReceipt, setPrintingReceipt] = useState(false);

  const isSuccess = payment.status === "completed";
  const isFailed = payment.status === "failed";

  useEffect(() => {
    if (isSuccess) {
      if (print === "form") {
        handlePrintAdmissionLetter();
      } else if (print === "receipt") {
        handlePrintPaymentReceipt();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [print, isSuccess]);

  const handlePrintAdmissionLetter = () => {
    setPrintingLetter(true);
    const doc = payment.admission;
    
    let iframe = document.getElementById("print-iframe") as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = "print-iframe";
      iframe.style.position = "absolute";
      iframe.style.top = "-9999px";
      iframe.style.left = "-9999px";
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.border = "none";
      document.body.appendChild(iframe);
    }

    const formattedDob = doc.dob
      ? new Date(doc.dob).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : "N/A";
    const formattedAppliedDate = new Date(doc.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const letterHtml = `
      <html>
        <head>
          <title>Admission Form - ${capitalizeWords(doc.student_name)}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #1e293b;
              margin: 0;
              padding: 40px;
              line-height: 1.6;
              background: #fff;
            }
            .border-frame {
              padding: 40px;
              position: relative;
              min-height: calc(100vh - 142px);
              box-sizing: border-box;
            }
            .header-container {
              position: relative;
              border-bottom: 3px double #1e3a8a;
              padding-bottom: 20px;
              margin-bottom: 30px;
              min-height: 90px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .logo {
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 90px;
              height: 90px;
              object-fit: contain;
            }
            .header-text {
              text-align: center;
              width: 100%;
              padding-left: 100px;
              padding-right: 100px;
              box-sizing: border-box;
            }
            .header-text h1 {
              font-size: 26px;
              font-weight: 800;
              color: #1e3a8a;
              margin: 0;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              line-height: 1.2;
            }
            .tagline {
              margin: 4px 0 6px 0;
              font-size: 11px;
              color: #475569;
              font-weight: 600;
              font-style: italic;
            }
            .address-info, .contact-info {
              margin: 2px 0;
              font-size: 12px;
              color: #475569;
              font-weight: 500;
            }
            .doc-title {
              text-align: center;
              font-size: 20px;
              font-weight: 800;
              color: #0f172a;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-top: 10px;
              margin-bottom: 30px;
              position: relative;
            }
            .doc-title::after {
              content: '';
              display: block;
              width: 80px;
              height: 3px;
              background: #2563eb;
              margin: 8px auto 0 auto;
              border-radius: 2px;
            }
            .date-row {
              display: flex;
              justify-content: space-between;
              font-size: 13px;
              font-weight: 600;
              color: #475569;
              margin-bottom: 25px;
              background: #f1f5f9;
              padding: 10px 16px;
              border-radius: 8px;
            }
            .salutation {
              font-size: 14px;
              font-weight: 700;
              margin-bottom: 12px;
              color: #0f172a;
            }
            .body-text {
              font-size: 13.5px;
              color: #334155;
              text-align: justify;
              margin-bottom: 25px;
            }
            .main-content-row {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              gap: 24px;
              margin-bottom: 40px;
            }
            .details-table {
              flex: 1;
              max-width: 580px;
              border-collapse: collapse;
              margin-bottom: 0;
              box-shadow: 0 1px 3px rgba(0,0,0,0.02);
            }
            .photo-box {
              width: 120px;
              height: 150px;
              border: 1px solid #cbd5e1;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 10px;
              text-align: center;
              color: #94a3b8;
              background: #f8fafc;
              padding: 4px;
              box-sizing: border-box;
              border-radius: 4px;
              flex-shrink: 0;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .photo-box img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 2px;
            }
            .details-table th, .details-table td {
              border: 1px solid #cbd5e1;
              padding: 12px 16px;
              font-size: 13px;
              line-height: 1.5;
              text-align: left;
            }
            .details-table th {
              background-color: #f8fafc;
              font-weight: 700;
              color: #334155;
              width: 32%;
              text-transform: uppercase;
              font-size: 11px;
              letter-spacing: 0.5px;
            }
            .details-table td {
              color: #0f172a;
              font-weight: 500;
            }
            .details-table tr:nth-child(even) td {
              background-color: #fafafa;
            }
            .sign-section {
              margin-top: 60px;
              display: flex;
              justify-content: flex-end;
              align-items: flex-end;
              page-break-inside: avoid;
            }
            .sign-box {
              text-align: center;
              font-size: 13px;
              color: #334155;
            }
            .sign-line {
              border-top: 1px solid #475569;
              width: 200px;
              margin-top: 40px;
              padding-top: 8px;
              font-weight: 700;
              color: #0f172a;
              text-transform: uppercase;
              font-size: 11px;
              letter-spacing: 0.5px;
            }
            @page {
              margin: 20mm;
            }
            @media print {
              body {
                padding: 0;
              }
              .border-frame {
                min-height: auto;
                border: none;
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="border-frame">
            <div class="header-container">
              <img src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/logo_unnut8.png" alt="Vision IT Logo" class="logo" />
              <div class="header-text">
                <h1>Vision IT Computer Institute</h1>
                <div class="tagline">"Learn. Practice. Succeed."</div>
                <div class="address-info">Pratappur, District Surajpur, Chhattisgarh - 497223</div>
                <div class="contact-info">Contact: +91 81031 70595 | Email: visionitpratappur@gmail.com</div>
              </div>
            </div>

            <div class="doc-title">Admission Form</div>

            <div class="date-row">
              <div>Admission No: <span style="color:#1e3a8a;">${doc.admission_no || "Pending"}</span></div>
              <div>Date: ${formattedAppliedDate}</div>
            </div>

            <div class="salutation">Dear ${capitalizeWords(doc.student_name)},</div>
            <div class="body-text">
              We are pleased to inform you that your application for formal admission at <strong>Vision IT Computer Institute</strong> has been approved and successfully confirmed after document verification. You are officially enrolled in the course detailed below. Please present this admission form during your first batch session.
            </div>

            <div class="main-content-row">
              <table class="details-table">
                <tr>
                  <th>Course Selected</th>
                  <td style="font-weight: 700; color: #1e3a8a;">${capitalizeWords(doc.courses?.title)}</td>
                </tr>
                <tr>
                  <th>Admission No.</th>
                  <td style="font-weight: 700; color: #1e3a8a;">${doc.admission_no || "Pending"}</td>
                </tr>
                <tr>
                  <th>Registration No.</th>
                  <td style="font-weight: 700; color: #1e3a8a;">${doc.student_id || "Pending"}</td>
                </tr>
                <tr>
                  <th>Student Full Name</th>
                  <td>${capitalizeWords(doc.student_name)}</td>
                </tr>
                <tr>
                  <th>Father's Name</th>
                  <td>${capitalizeWords(doc.father_name)}</td>
                </tr>
                <tr>
                  <th>Mother's Name</th>
                  <td>${capitalizeWords(doc.mother_name)}</td>
                </tr>
                <tr>
                  <th>Date of Birth</th>
                  <td>${formattedDob}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>${capitalizeWords(doc.gender)}</td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>${capitalizeWords(doc.category || "General")}</td>
                </tr>
                <tr>
                  <th>Highest Qualification</th>
                  <td>${doc.qualification || "N/A"}</td>
                </tr>
                <tr>
                  <th>Email Address</th>
                  <td style="text-transform: lowercase;">${doc.email}</td>
                </tr>
                <tr>
                  <th>Mobile Number</th>
                  <td>+91 ${doc.phone}</td>
                </tr>
                <tr>
                  <th>Residential Address</th>
                  <td>${formatAddress(doc.address)}</td>
                </tr>
              </table>

              <div class="photo-box">
                ${doc.photo_url ? `<img src="${doc.photo_url}" alt="Student Photo" />` : 'Student Photo'}
              </div>
            </div>

            <div class="sign-section">
              <div class="sign-box">
                <div class="sign-line">Authorized Signatory</div>
                <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Vision IT Administration</div>
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              function triggerPrint() {
                setTimeout(function() {
                  window.focus();
                  window.print();
                  if (window.self === window.top) {
                    setTimeout(function() { window.close(); }, 500);
                  }
                }, 250);
              }
              const images = document.getElementsByTagName('img');
              let loadedCount = 0;
              if (images.length === 0) {
                triggerPrint();
              } else {
                for (let i = 0; i < images.length; i++) {
                  if (images[i].complete) {
                    loadedCount++;
                    if (loadedCount === images.length) {
                      triggerPrint();
                    }
                  } else {
                    images[i].addEventListener('load', function() {
                      loadedCount++;
                      if (loadedCount === images.length) {
                        triggerPrint();
                      }
                    });
                    images[i].addEventListener('error', function() {
                      loadedCount++;
                      if (loadedCount === images.length) {
                        triggerPrint();
                      }
                    });
                  }
                }
              }
            };
          </script>
        </body>
      </html>
    `;

    const iframeDoc = iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(letterHtml);
      iframeDoc.close();
    }
    setPrintingLetter(false);
  };

  const handlePrintPaymentReceipt = () => {
    setPrintingReceipt(true);
    const doc = payment.admission;
    
    let iframe = document.getElementById("print-iframe") as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = "print-iframe";
      iframe.style.position = "absolute";
      iframe.style.top = "-9999px";
      iframe.style.left = "-9999px";
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.border = "none";
      document.body.appendChild(iframe);
    }

    const formattedPaymentDate = new Date(payment.created_at).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const receiptHtml = `
      <html>
        <head>
          <title>Fee Receipt - ${capitalizeWords(doc.student_name)}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #1e293b;
              margin: 0;
              padding: 40px;
              line-height: 1.5;
              background: #fff;
            }
            .receipt-box {
              max-width: 600px;
              margin: 0 auto;
              border: 1px solid #cbd5e1;
              padding: 35px;
              border-radius: 16px;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
            }
            .header-container {
              position: relative;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 20px;
              margin-bottom: 25px;
              min-height: 70px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .logo {
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 70px;
              height: 70px;
              object-fit: contain;
            }
            .header-text {
              text-align: center;
              width: 100%;
              padding-left: 80px;
              padding-right: 80px;
              box-sizing: border-box;
            }
            .header-text h1 {
              font-size: 22px;
              font-weight: 800;
              color: #1e3a8a;
              margin: 0;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              line-height: 1.2;
            }
            .tagline {
              margin: 3px 0 5px 0;
              font-size: 10px;
              color: #475569;
              font-weight: 600;
              font-style: italic;
            }
            .address-info, .contact-info {
              margin: 1px 0;
              font-size: 11px;
              color: #475569;
              font-weight: 500;
            }
            .receipt-title {
              text-align: center;
              font-size: 16px;
              font-weight: 800;
              color: #0f172a;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-bottom: 25px;
              position: relative;
            }
            .receipt-title::after {
              content: '';
              display: block;
              width: 50px;
              height: 3px;
              background: #10b981;
              margin: 6px auto 0 auto;
              border-radius: 2px;
            }
            .meta-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
              border-bottom: 1px solid #f1f5f9;
            }
            .meta-table td {
              width: 50%;
              padding: 8px 0;
              font-size: 12px;
              color: #475569;
              vertical-align: top;
            }
            .meta-table td span {
              font-weight: 700;
              color: #0f172a;
              display: block;
              margin-top: 2px;
            }
            .invoice-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            .invoice-table th, .invoice-table td {
              padding: 12px;
              font-size: 12px;
              text-align: left;
              border-bottom: 1px solid #f1f5f9;
            }
            .invoice-table th {
              background-color: #f8fafc;
              font-weight: 700;
              color: #475569;
              text-transform: uppercase;
              font-size: 10px;
              letter-spacing: 0.5px;
            }
            .invoice-table td {
              color: #0f172a;
              font-weight: 500;
            }
            .total-row {
              font-size: 14px;
              font-weight: 800;
              color: #0f172a;
              display: flex;
              justify-content: space-between;
              padding: 15px 12px;
              background-color: #f8fafc;
              border-radius: 8px;
              margin-bottom: 35px;
              border: 1px solid #e2e8f0;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 10px;
              background-color: #d1fae5;
              color: #065f46;
              font-weight: 800;
              font-size: 10px;
              border-radius: 9999px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .footnote {
              text-align: center;
              font-size: 10px;
              color: #94a3b8;
              font-weight: 500;
              border-top: 1px dashed #cbd5e1;
              padding-top: 15px;
            }
            @page {
              margin: 15mm;
            }
            @media print {
              body {
                padding: 0;
              }
              .receipt-box {
                border: none;
                box-shadow: none;
                padding: 0;
                max-width: 600px;
                margin: 0 auto;
              }
            }
          </style>
        </head>
        <body>
          <div class="receipt-box">
            <div class="header-container">
              <img src="https://res.cloudinary.com/ddiooxxks/image/upload/f_auto,q_auto/logo_unnut8.png" alt="Vision IT Logo" class="logo" />
              <div class="header-text">
                <h1>Vision IT Computer Institute</h1>
                <div class="tagline">"Learn. Practice. Succeed."</div>
                <div class="address-info">Pratappur, District Surajpur, Chhattisgarh - 497223</div>
                <div class="contact-info">Contact: +91 81031 70595 | Email: visionitpratappur@gmail.com</div>
              </div>
            </div>

            <div class="receipt-title">Fee Payment Receipt</div>

             <table class="meta-table">
               <tr>
                 <td>Receipt ID: <span>REC-${payment.id.substring(0, 8).toUpperCase()}</span></td>
                 <td>Transaction ID: <span style="font-family: monospace;">${payment.transaction_id || "N/A"}</span></td>
               </tr>
               <tr>
                 <td>Date & Time: <span>${formattedPaymentDate}</span></td>
                 <td>Payment Mode: <span>SMEPay (UPI)</span></td>
               </tr>
               <tr>
                 <td>Admission No: <span>${doc.admission_no || "Pending"}</span></td>
                 <td>Registration No: <span>${doc.student_id || "Pending"}</span></td>
               </tr>
             </table>

            <table class="invoice-table">
              <thead>
                <tr>
                  <th>Particulars</th>
                  <th>Student & Course</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-weight: 700; color: #1e3a8a;">Course Admission Fee</td>
                  <td>
                    <span style="font-weight:700; display:block; color: #0f172a;">${capitalizeWords(doc.student_name)}</span>
                    <span style="font-size:11px; color:#64748b;">Course: ${capitalizeWords(doc.courses?.title)}</span>
                  </td>
                  <td style="text-align: right; font-weight: 700; color: #0f172a;">₹${payment.amount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <div class="total-row">
              <span>Total Paid</span>
              <span>₹${payment.amount.toFixed(2)}</span>
            </div>

            <div style="text-align: center; margin-bottom: 25px;">
              <span class="status-badge">Payment Successful</span>
            </div>

            <div class="footnote">
              This is a system-generated electronic receipt and does not require a physical signature.<br>
              Thank you for choosing Vision IT Computer Institute.
            </div>
          </div>
          <script>
            window.onload = function() {
              function triggerPrint() {
                setTimeout(function() {
                  window.focus();
                  window.print();
                  if (window.self === window.top) {
                    setTimeout(function() { window.close(); }, 500);
                  }
                }, 250);
              }
              const images = document.getElementsByTagName('img');
              let loadedCount = 0;
              if (images.length === 0) {
                triggerPrint();
              } else {
                for (let i = 0; i < images.length; i++) {
                  if (images[i].complete) {
                    loadedCount++;
                    if (loadedCount === images.length) {
                      triggerPrint();
                    }
                  } else {
                    images[i].addEventListener('load', function() {
                      loadedCount++;
                      if (loadedCount === images.length) {
                        triggerPrint();
                      }
                    });
                    images[i].addEventListener('error', function() {
                      loadedCount++;
                      if (loadedCount === images.length) {
                        triggerPrint();
                      }
                    });
                  }
                }
              }
            };
          </script>
        </body>
      </html>
    `;

    const iframeDoc = iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(receiptHtml);
      iframeDoc.close();
    }
    setPrintingReceipt(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 md:px-6 lg:px-8 pt-24 md:pt-32">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl p-8 text-center space-y-6">
        
        {/* Status Icon */}
        <div className="flex justify-center">
          {isSuccess ? (
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          ) : isFailed ? (
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight">
            {isSuccess ? "Payment Successful!" : isFailed ? "Payment Failed" : "Verification Pending"}
          </h1>
          <p className="text-slate-500 text-sm font-semibold mt-1.5">
            {isSuccess 
              ? "Thank you! Your course fee has been processed." 
              : isFailed 
                ? "We couldn't process your transaction. Please try again." 
                : "We are currently checking the status with SMEPay."}
          </p>
        </div>

        {/* Details Card */}
        <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl text-left text-sm font-medium space-y-4">
          <div className="flex justify-between items-baseline border-b border-slate-200/60 pb-3">
            <span className="text-slate-400 text-xs uppercase tracking-wider">Course Name</span>
            <span className="text-slate-900 font-bold max-w-[200px] text-right truncate">
              {payment.admission.courses.title}
            </span>
          </div>

          <div className="flex justify-between items-baseline border-b border-slate-200/60 pb-3">
            <span className="text-slate-400 text-xs uppercase tracking-wider">Amount Paid</span>
            <span className="text-slate-900 font-extrabold text-base">
              ₹{payment.amount.toFixed(2)}
            </span>
          </div>

          {payment.transaction_id && (
            <div className="flex justify-between items-baseline border-b border-slate-200/60 pb-3">
              <span className="text-slate-400 text-xs uppercase tracking-wider">Transaction ID</span>
              <span className="text-slate-950 font-mono text-xs font-bold">
                {payment.transaction_id}
              </span>
            </div>
          )}

          <div className="flex justify-between items-baseline">
            <span className="text-slate-400 text-xs uppercase tracking-wider">Date & Time</span>
            <span className="text-slate-900">
              {new Date(payment.created_at).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
        </div>

        {/* PDF Documents Actions (Success Only) */}
        {isSuccess && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              disabled={printingLetter}
              onClick={handlePrintAdmissionLetter}
              className="flex items-center justify-center gap-1.5 h-11 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer bg-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
              </svg>
              Admission Form
            </button>
            <button
              disabled={printingReceipt}
              onClick={handlePrintPaymentReceipt}
              className="flex items-center justify-center gap-1.5 h-11 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer bg-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                <rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="2" y1="12" x2="22" y2="12"/>
              </svg>
              Payment Receipt
            </button>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-100">
          {isSuccess ? (
            <Link
              href="/dashboard"
              className="w-full h-11 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              Go to My Dashboard
            </Link>
          ) : isFailed ? (
            <Link
              href={`/checkout/${payment.admission.id}`}
              className="w-full h-11 bg-red-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              Try Paying Again
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="w-full h-11 bg-blue-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              Return to Dashboard
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
