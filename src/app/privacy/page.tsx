import type { Metadata } from "next";
import { Navbar } from "@/components/asanhesab/navbar";
import { Footer } from "@/components/asanhesab/footer";

export const metadata: Metadata = {
  title: "Privacy Policy — AsanHesab",
  description:
    "Privacy Policy for AsanHesab — an offline-first desktop accounting application. Learn how your financial data is stored, used, and protected.",
};

export default function PrivacyPage() {
  return (
    <div dir="ltr" className="relative min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Privacy Policy for AsanHesab
          </h1>
          <p className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
            Last Updated: August 9, 2026
          </p>

          <p className="mt-8 leading-relaxed text-slate-700 dark:text-slate-200">
            At <strong>AsanHesab</strong> ("we", "our", or "us"), accessible
            from <a href="https://asanhesab.app" className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300">https://asanhesab.app</a>,
            the privacy of our users is one of our top priorities. AsanHesab is
            designed as an offline-first desktop accounting application. This
            Privacy Policy document outlines the types of information that are
            collected and recorded by AsanHesab and how we use it.
          </p>

          <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us at{" "}
            <a href="mailto:support@asanhesab.app" className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300">support@asanhesab.app</a>.
          </p>

          <hr className="my-10 border-slate-200 dark:border-slate-800" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              1. Information Collection and Storage (Offline-First)
            </h2>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">
              AsanHesab operates primarily offline on your desktop computer:
            </p>
            <ul className="mt-4 space-y-3 list-disc pl-6 text-slate-700 dark:text-slate-200 leading-relaxed">
              <li>
                <strong>Financial & Inventory Data:</strong> All your customer
                records, sales, inventory, and ledger transactions are stored
                locally on your device in an isolated database file (
                <code dir="ltr" className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-sm">.sqlite</code>
                ). We do not collect, transmit, or store your business or
                financial records on our servers.
              </li>
              <li>
                <strong>Account Information:</strong> To manage application
                licensing or cloud integration, we may collect basic details
                such as your business name and contact email address.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              2. Google Drive Integration & Data Access
            </h2>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">
              AsanHesab offers an optional Cloud Backup feature using Google
              Drive API services.
            </p>
            <h3 className="mt-6 text-base font-bold text-slate-900 dark:text-white">
              Scopes Requested:
            </h3>
            <ul className="mt-2 space-y-1.5 list-disc pl-6 text-slate-700 dark:text-slate-200 leading-relaxed">
              <li>
                <code dir="ltr" className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-sm">https://www.googleapis.com/auth/drive.file</code>
              </li>
              <li>
                <code dir="ltr" className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-sm">https://www.googleapis.com/auth/userinfo.email</code>
              </li>
            </ul>
            <h3 className="mt-6 text-base font-bold text-slate-900 dark:text-white">
              How We Use Google User Data:
            </h3>
            <ul className="mt-2 space-y-3 list-disc pl-6 text-slate-700 dark:text-slate-200 leading-relaxed">
              <li>
                <strong>Email Address:</strong> We access your Google email
                address solely to display your connected account status inside
                the AsanHesab interface (e.g., "Connected as
                user@gmail.com").
              </li>
              <li>
                <strong>Drive Files (</strong>
                <code dir="ltr" className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-sm">drive.file</code>
                <strong> scope):</strong> We use this permission{" "}
                <strong>exclusively</strong> to create, upload, list, and
                manage automated database backup files (
                <code dir="ltr" className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-sm">.sqlite</code>
                ) created by AsanHesab inside your personal Google Drive.
              </li>
              <li>
                <strong>Isolation:</strong> AsanHesab <strong>cannot</strong>{" "}
                view, edit, read, or delete any of your personal files, photos,
                or documents in your Google Drive. It only accesses files
                created by the AsanHesab app itself.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              3. Google API Limited Use Disclosure
            </h2>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">
              AsanHesab's use and transfer to any other app of information
              received from Google APIs will adhere to the{" "}
              <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300">Google API Services User Data Policy</a>,
              including the Limited Use requirements.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              4. Data Sharing and Selling
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-6 text-slate-700 dark:text-slate-200 leading-relaxed">
              <li>
                <strong>
                  We do NOT sell, trade, or rent your personal or business data
                  to third parties under any circumstances.
                </strong>
              </li>
              <li>
                All business transaction data remains on your local machine and
                your personal cloud storage.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              5. Data Retention and Control
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-6 text-slate-700 dark:text-slate-200 leading-relaxed">
              <li>
                <strong>Local Data:</strong> You retain full ownership and
                control over your local database. Uninstalling the application
                or deleting your local database file permanently removes your
                local data.
              </li>
              <li>
                <strong>Cloud Backups:</strong> Backups stored in Google Drive
                remain under your direct control inside your personal Google
                account. You may delete backup files or disconnect AsanHesab's
                access at any time via your{" "}
                <a href="https://myaccount.google.com/permissions" className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300">Google Account Security Settings</a>.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              6. Security
            </h2>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">
              We prioritize data security. AsanHesab utilizes operating
              system-level encryption protocols (such as safeStorage/Keychain)
              to securely store authentication tokens locally on your machine.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              7. Changes to This Privacy Policy
            </h2>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">
              We may update our Privacy Policy from time to time. Thus, you are
              advised to review this page periodically for any changes. We will
              notify you of any changes by posting the new Privacy Policy on
              this page.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              8. Contact Us
            </h2>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">
              If you have any questions or suggestions about our Privacy
              Policy, do not hesitate to contact us at:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6 text-slate-700 dark:text-slate-200 leading-relaxed">
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:support@asanhesab.app" className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300">support@asanhesab.app</a>
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a href="https://asanhesab.app" className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300">https://asanhesab.app</a>
              </li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
