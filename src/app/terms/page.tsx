import type { Metadata } from "next";
import { Navbar } from "@/components/asanhesab/navbar";
import { Footer } from "@/components/asanhesab/footer";

export const metadata: Metadata = {
  title: "Terms of Service — AsanHesab",
  description:
    "Terms of Service governing your use of the AsanHesab desktop accounting application and associated web services.",
};

export default function TermsPage() {
  return (
    <div dir="ltr" className="relative min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Terms of Service for AsanHesab
          </h1>
          <p className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
            Last Updated: August 9, 2026
          </p>

          <p className="mt-8 leading-relaxed text-slate-700 dark:text-slate-200">
            Welcome to <strong>AsanHesab</strong>!
          </p>

          <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">
            These Terms of Service ("Terms") govern your use of the AsanHesab
            desktop application and associated web services provided by
            AsanHesab ("we", "us", or "our"). By installing, accessing, or
            using AsanHesab, you agree to be bound by these Terms.
          </p>

          <hr className="my-10 border-slate-200 dark:border-slate-800" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              1. License and Usage
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-6 text-slate-700 dark:text-slate-200 leading-relaxed">
              <li>
                <strong>Grant of License:</strong> Subject to your compliance
                with these Terms, AsanHesab grants you a limited,
                non-exclusive, non-transferable license to install and use the
                application on your personal computers for business accounting
                purposes.
              </li>
              <li>
                <strong>Offline Functionality:</strong> AsanHesab is designed
                to function offline. You are responsible for maintaining the
                computer hardware and operating environment required to run the
                software.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              2. User Data Ownership & Backups
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-6 text-slate-700 dark:text-slate-200 leading-relaxed">
              <li>
                <strong>Data Ownership:</strong> You maintain 100% ownership of
                all financial, inventory, customer, and transaction data
                entered into AsanHesab.
              </li>
              <li>
                <strong>Data Security & Responsibility:</strong> Because
                AsanHesab stores data locally on your computer,{" "}
                <strong>
                  you are solely responsible for protecting your machine
                  against hardware failure, virus infection, or formatting.
                </strong>
              </li>
              <li>
                <strong>Cloud Backup Feature:</strong> AsanHesab provides
                optional automated cloud backups via Google Drive. While we
                strive to provide reliable backup services, AsanHesab is not
                liable for data loss resulting from third-party service
                outages, network failures, or deleted Google accounts.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              3. Third-Party Services (Google Integration)
            </h2>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">
              AsanHesab integrates with third-party providers such as Google
              Drive API for backup functionality. Your use of Google services
              is subject to Google's respective Terms of Service and Privacy
              Policies. You may revoke AsanHesab's connection to third-party
              services at any time.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              4. Prohibited Uses
            </h2>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">
              You agree <strong>not</strong> to:
            </p>
            <ul className="mt-2 space-y-3 list-disc pl-6 text-slate-700 dark:text-slate-200 leading-relaxed">
              <li>
                Reverse engineer, decompile, or disassemble the AsanHesab
                application.
              </li>
              <li>
                Rent, lease, sublicense, or redistribute the software to third
                parties without prior written authorization.
              </li>
              <li>
                Use the software for any illegal or unauthorized financial
                activities under local laws.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              5. Limitation of Liability
            </h2>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">
              To the maximum extent permitted by applicable law, AsanHesab and
              its developers shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including but not
              limited to loss of profits, lost data, hardware damage, or
              business disruption arising out of the use or inability to use
              the software.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              6. Software Updates
            </h2>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">
              We may periodically release updates, bug fixes, or new features
              for AsanHesab. Updates may install automatically or require
              manual confirmation depending on your user settings.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              7. Termination
            </h2>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">
              We reserve the right to terminate or suspend your license key or
              access to cloud backup services if you violate any provision of
              these Terms. Upon termination, your right to use online services
              will immediately cease, though your local data remains on your
              device.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              8. Contact Information
            </h2>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-200">
              If you have any questions regarding these Terms of Service,
              please contact us at:
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
