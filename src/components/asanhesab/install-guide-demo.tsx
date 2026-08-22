"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { INSTALLER_URL } from "@/lib/installer";
import styles from "./install-guide.module.css";

const STAGE_W = 820;
const STAGE_H = 540;

type InstallGuideDemoProps = {
  stepBadges: [string, string, string, string];
  stepTexts: [string, string, string, string];
};

export function startInstallerDownload() {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.title = "AsanHesab installer download";
  iframe.src = INSTALLER_URL;
  document.body.appendChild(iframe);
  window.setTimeout(() => iframe.remove(), 60_000);
}

export function InstallGuideDemo({ stepBadges, stepTexts }: InstallGuideDemoProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      setScale(Math.min(1, w / STAGE_W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={viewportRef} className={styles.viewport}>
      <div className={styles.scaleBox} style={{ height: Math.round(STAGE_H * scale) }}>
        <div
          className={styles.desktop}
          style={{ transform: `scale(${scale})`, width: STAGE_W, height: STAGE_H }}
          aria-hidden="true"
        >
          <div className={styles.clickFx}></div>

          <div className={styles.mouseCursor}>
            <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1L8.5 23L12.5 15.5L20 15.5L1 1Z"
                fill="white"
                stroke="#111111"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className={styles.desktopIcon}>
            <div className={styles.iconBox}>
              <Image
                src="/asanhesab-logo.png"
                alt=""
                width={46}
                height={46}
                className={styles.iconImg}
              />
            </div>
            <div className={styles.iconTitle}>AsanHesab.exe</div>
          </div>

          <div className={styles.smartscreenDialog}>
            <div className={styles.dialogClose}>✕</div>
            <h2>Windows protected your PC</h2>
            <p>
              Microsoft Defender SmartScreen prevented an unrecognized app from starting.
              Running this app might put your PC at risk.
            </p>

            <span className={styles.moreInfoLink}>More info</span>

            <div className={styles.appDetails}>
              <div>App: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>AsanHesab.exe</b></div>
              <div>Publisher: &nbsp;<b>Unknown publisher</b></div>
            </div>

            <div className={styles.actionsBefore}>
              <button type="button" className={`${styles.btn} ${styles.btnDontrun}`}>
                Don&apos;t run
              </button>
            </div>

            <div className={styles.actionsAfter}>
              <button type="button" className={`${styles.btn} ${styles.btnRun}`}>
                Run anyway
              </button>
              <button type="button" className={`${styles.btn} ${styles.btnDontrun}`}>
                Don&apos;t run
              </button>
            </div>
          </div>

          <div className={styles.setupWizard}>
            <div className={styles.wizardTitlebar}>
              <span>Setup - AsanHesab</span>
              <span>✕</span>
            </div>
            <div className={styles.wizardMain}>
              <div className={styles.wizardBanner}>
                <Image
                  src="/asanhesab-logo.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.wizardBannerLogo}
                />
                نرم‌افزار آسان حساب
                <br />
                AsanHesab Setup
              </div>
              <div className={styles.wizardBody}>
                <h3>Welcome to the AsanHesab Setup Wizard</h3>
                <p>This will install AsanHesab on your computer.</p>
                <p>Click Next to continue, or Cancel to exit Setup.</p>
              </div>
            </div>
            <div className={styles.wizardFooter}>
              <button type="button" className={`${styles.btnWiz} ${styles.btnWizPrimary}`}>
                Next &gt;
              </button>
              <button type="button" className={styles.btnWiz}>Cancel</button>
            </div>
          </div>

          <div className={styles.guideOverlay}>
            <div className={`${styles.guideText} ${styles.step1}`}>
              <span className={styles.stepBadge}>{stepBadges[0]}</span>
              <span>{stepTexts[0]}</span>
            </div>
            <div className={`${styles.guideText} ${styles.step2}`}>
              <span className={styles.stepBadge}>{stepBadges[1]}</span>
              <span>{stepTexts[1]}</span>
            </div>
            <div className={`${styles.guideText} ${styles.step3}`}>
              <span className={styles.stepBadge}>{stepBadges[2]}</span>
              <span>{stepTexts[2]}</span>
            </div>
            <div className={`${styles.guideText} ${styles.step4}`}>
              <span className={styles.stepBadge}>{stepBadges[3]}</span>
              <span>{stepTexts[3]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
