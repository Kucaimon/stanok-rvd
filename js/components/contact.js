class ContactPage {
  constructor() {
    this.init();
  }

  init() {
    this.initContactActions();
    this.initAddressAccordion();
    this.addCopyToClipboard();
  }

  initAddressAccordion() {
    const toggle = document.querySelector(".contact-address-toggle");
    const panel = document.querySelector(".contact-address-panel");
    const icon = document.querySelector(".contact-card-toggle-icon");

    if (!toggle || !panel || !icon) {
      return;
    }

    toggle.addEventListener("click", () => {
      const expanded = panel.classList.toggle("active");
      icon.textContent = expanded ? "⟰" : "⟱";
      panel.setAttribute("aria-hidden", (!expanded).toString());
    });
  }

  initContactActions() {
    // Add click tracking for contact actions
    const contactLinks = document.querySelectorAll(
      'a[href^="tel:"], a[href^="mailto:"]'
    );

    contactLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const actionType = link.href.startsWith("tel:")
          ? "phone_call"
          : "email_click";
        const target = link.href.startsWith("tel:")
          ? link.href.replace("tel:", "")
          : link.href.replace("mailto:", "");

        this.trackContactAction(actionType, target);
      });
    });
  }

  addCopyToClipboard() {
    // Add copy functionality for phone and email
    const contactElements = document.querySelectorAll(
      ".contact-phone-large, .contact-email-large"
    );

    contactElements.forEach((element) => {
      element.addEventListener("click", (e) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          this.copyToClipboard(element.textContent.trim());
          this.showCopyFeedback(element, "Скопировано!");
        }
      });

      // Add tooltip on hover
      element.addEventListener("mouseenter", () => {
        this.showTooltip(element, "Ctrl+Click для копирования");
      });

      element.addEventListener("mouseleave", () => {
        this.hideTooltip(element);
      });
    });
  }

  copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      });
  }

  showCopyFeedback(element, message) {
    const feedback = document.createElement("div");
    feedback.textContent = message;
    feedback.style.cssText = `
            position: absolute;
            background: var(--primary-green);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
            pointer-events: none;
        `;

    const rect = element.getBoundingClientRect();
    feedback.style.top = rect.top - 40 + "px";
    feedback.style.left = rect.left + rect.width / 2 + "px";
    feedback.style.transform = "translateX(-50%)";

    document.body.appendChild(feedback);

    setTimeout(() => {
      document.body.removeChild(feedback);
    }, 2000);
  }

  showTooltip(element, message) {
    let tooltip = element.querySelector(".contact-tooltip");

    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.className = "contact-tooltip";
      tooltip.textContent = message;
      tooltip.style.cssText = `
                position: absolute;
                background: var(--industrial-gray);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
      element.style.position = "relative";
      element.appendChild(tooltip);
    }

    const rect = element.getBoundingClientRect();
    tooltip.style.bottom = "100%";
    tooltip.style.left = "50%";
    tooltip.style.transform = "translateX(-50%)";
    tooltip.style.marginBottom = "8px";

    setTimeout(() => {
      tooltip.style.opacity = "1";
    }, 10);
  }

  hideTooltip(element) {
    const tooltip = element.querySelector(".contact-tooltip");
    if (tooltip) {
      tooltip.style.opacity = "0";
      setTimeout(() => {
        if (tooltip.parentElement === element) {
          element.removeChild(tooltip);
        }
      }, 300);
    }
  }

  trackContactAction(actionType, target) {
    // Here you can integrate with analytics
    console.log(`Contact action: ${actionType} - ${target}`);

    // Example: Google Analytics event tracking
    if (typeof gtag !== "undefined") {
      gtag("event", actionType, {
        event_category: "Contact",
        event_label: target,
      });
    }

    // Example: Yandex Metrika
    if (typeof ym !== "undefined") {
      ym(10115065, "reachGoal", actionType, { target: target });
    }
  }
}

// Initialize contact page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ContactPage();
});
