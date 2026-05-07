import { useLayoutEffect, useRef, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";

const CARD_SELECTOR = ".site-card, .hover-lift, .tour-card, .heritage-tile";
const MOBILE_REVEAL_DELAY_CAP_MS = 180;

function parseDelayMs(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  if (trimmed.endsWith("ms")) return Number.parseFloat(trimmed);
  if (trimmed.endsWith("s")) return Number.parseFloat(trimmed) * 1000;
  const parsed = Number.parseFloat(trimmed);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function Layout({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const cards = Array.from(main.querySelectorAll<HTMLElement>(CARD_SELECTOR));
    if (!cards.length) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    cards.forEach((card) => {
      card.dataset.cardReady = "true";
      const delayMs = parseDelayMs(getComputedStyle(card).getPropertyValue("--card-delay"));
      const revealDelay = coarsePointer ? Math.min(delayMs, MOBILE_REVEAL_DELAY_CAP_MS) : delayMs;
      card.style.setProperty("--card-reveal-delay", `${revealDelay}ms`);
    });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      cards.forEach((card) => {
        card.dataset.cardVisible = "true";
        card.style.setProperty("--card-reveal-delay", "0ms");
      });
      return () => {
        cards.forEach((card) => {
          card.style.removeProperty("--card-reveal-delay");
        });
      };
    }

    const timers = new Map<HTMLElement, number>();
    const pressedCards = new Set<HTMLElement>();
    const clearPressedCards = () => {
      pressedCards.forEach((card) => {
        delete card.dataset.cardPressed;
      });
      pressedCards.clear();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const card = entry.target as HTMLElement;
          if (card.dataset.cardVisible === "true") return;

          card.dataset.cardVisible = "true";
          observer.unobserve(card);

          const revealDelay = parseDelayMs(getComputedStyle(card).getPropertyValue("--card-reveal-delay"));
          const timer = window.setTimeout(() => {
            if (card.isConnected) {
              card.style.setProperty("--card-reveal-delay", "0ms");
            }
            timers.delete(card);
          }, revealDelay + 820);

          timers.set(card, timer);
        });
      },
      coarsePointer
        ? { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
        : { threshold: 0.18, rootMargin: "0px 0px -12% 0px" },
    );

    cards.forEach((card) => observer.observe(card));

    let cleanupTouchFeedback = () => {};

    if (coarsePointer) {
      const findCard = (target: EventTarget | null) => {
        if (!(target instanceof Element)) return null;
        const card = target.closest<HTMLElement>(CARD_SELECTOR);
        if (!card || !main.contains(card)) return null;
        return card;
      };

      const handlePointerDown = (event: PointerEvent) => {
        if (event.pointerType === "mouse") return;

        const card = findCard(event.target);
        if (!card) return;

        card.dataset.cardPressed = "true";
        pressedCards.add(card);
      };

      const handlePointerEnd = (event: PointerEvent) => {
        if (event.pointerType === "mouse") return;

        const card = findCard(event.target);
        if (card) {
          delete card.dataset.cardPressed;
          pressedCards.delete(card);
          return;
        }

        clearPressedCards();
      };

      main.addEventListener("pointerdown", handlePointerDown, true);
      main.addEventListener("pointerup", handlePointerEnd, true);
      main.addEventListener("pointercancel", handlePointerEnd, true);
      window.addEventListener("scroll", clearPressedCards, { passive: true });

      cleanupTouchFeedback = () => {
        main.removeEventListener("pointerdown", handlePointerDown, true);
        main.removeEventListener("pointerup", handlePointerEnd, true);
        main.removeEventListener("pointercancel", handlePointerEnd, true);
        window.removeEventListener("scroll", clearPressedCards);
        clearPressedCards();
      };
    }

    return () => {
      observer.disconnect();
      cleanupTouchFeedback();
      timers.forEach((timer) => window.clearTimeout(timer));
      cards.forEach((card) => {
        card.style.removeProperty("--card-reveal-delay");
        delete card.dataset.cardPressed;
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main ref={mainRef} className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
