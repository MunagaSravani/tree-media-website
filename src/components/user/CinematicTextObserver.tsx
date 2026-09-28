"use client";

import { useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";

/**
 * CinematicTextObserverCore
 * Monitors elements with [data-reveal] attributes across all pages and triggers smooth,
 * filmic text transition animations (heading, tagline, eyebrow, fade-up, stagger) as they
 * enter the viewport or mount on route navigation.
 */
function CinematicTextObserverCore() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If the user prefers reduced motion, reveal everything immediately and don't animate
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    // Activate progressive reveal styling once client is ready
    document.documentElement.classList.add("js-reveal");

    const observedElements = new WeakSet<Element>();
    const safetyTimers = new Set<ReturnType<typeof setTimeout>>();

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries, obs) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("revealed");
                  obs.unobserve(entry.target);
                }
              });
            },
            {
              threshold: 0.01,
              rootMargin: "60px 0px 60px 0px",
            }
          )
        : null;

    const revealElement = (el: Element) => {
      el.classList.add("revealed");
      if (observer) {
        observer.unobserve(el);
      }
    };

    const scanAndObserve = () => {
      const elements = document.querySelectorAll("[data-reveal]:not(.revealed)");
      elements.forEach((el) => {
        if (observedElements.has(el)) return;
        observedElements.add(el);

        if (!observer) {
          revealElement(el);
          return;
        }

        // Fast viewport check: if already in or near viewport, reveal promptly
        const rect = el.getBoundingClientRect();
        const isInOrNearViewport =
          rect.top < window.innerHeight + 120 && rect.bottom > -80;

        if (isInOrNearViewport) {
          // One frame tick gives time for CSS initial state to bind before transitioning to revealed
          requestAnimationFrame(() => {
            revealElement(el);
          });
        } else {
          observer.observe(el);
        }

        // Fail-safe timeout: never leave content permanently hidden
        const timer = setTimeout(() => {
          safetyTimers.delete(timer);
          revealElement(el);
        }, 1200);
        safetyTimers.add(timer);
      });
    };

    // Initial scan on mount / route change
    const rafId = requestAnimationFrame(() => {
      scanAndObserve();
    });

    // MutationObserver to catch dynamically fetched/rendered content (e.g. talent cards, async lists)
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const mutationObserver =
      "MutationObserver" in window
        ? new MutationObserver(() => {
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
              scanAndObserve();
            }, 30);
          })
        : null;

    if (mutationObserver) {
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (debounceTimer) clearTimeout(debounceTimer);
      safetyTimers.forEach((t) => clearTimeout(t));
      safetyTimers.clear();
      if (mutationObserver) mutationObserver.disconnect();
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  return null;
}

export default function CinematicTextObserver() {
  return (
    <Suspense fallback={null}>
      <CinematicTextObserverCore />
    </Suspense>
  );
}
