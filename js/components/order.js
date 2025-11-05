class OrderForm {
  constructor() {
    this.form = document.getElementById("orderForm");
    this.init();
  }

  init() {
    if (this.form) {
      this.initFormValidation();
      this.initPhoneMask();
      this.initFormSubmission();
      this.initAutoSave();
    }
  }

  initFormValidation() {
    const inputs = this.form.querySelectorAll(
      "input[required], textarea[required]"
    );

    inputs.forEach((input) => {
      // Real-time validation
      input.addEventListener("blur", () => {
        this.validateField(input);
      });

      // Clear validation on input
      input.addEventListener("input", () => {
        this.clearFieldError(input);
      });
    });

    // Email validation
    const emailInput = document.getElementById("lad_mylo_form");
    if (emailInput) {
      emailInput.addEventListener("blur", () => {
        this.validateEmail(emailInput);
      });
    }
  }

  initPhoneMask() {
    const phoneInput = document.getElementById("lad_phon_form");
    if (phoneInput) {
      phoneInput.addEventListener("input", (e) => {
        this.formatPhoneNumber(e.target);
      });
    }
  }

  initFormSubmission() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.validateForm()) {
        this.submitForm();
      }
    });
  }

  initAutoSave() {
    const inputs = this.form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.saveToLocalStorage();
      });
    });

    // Load saved data on page load
    this.loadFromLocalStorage();
  }

  validateField(field) {
    const value = field.value.trim();

    if (!value) {
      this.showFieldError(field, "Это поле обязательно для заполнения");
      return false;
    }

    // Specific validations
    if (field.type === "email") {
      return this.validateEmail(field);
    }

    this.clearFieldError(field);
    return true;
  }

  validateEmail(emailField) {
    const email = emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      this.showFieldError(emailField, "Введите корректный email адрес");
      return false;
    }

    this.clearFieldError(emailField);
    return true;
  }

  formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, "");

    if (value.length > 0) {
      if (value.length <= 3) {
        value = `(${value}`;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else if (value.length <= 8) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
      } else {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
          6,
          8
        )}-${value.slice(8, 10)}`;
      }
    }

    input.value = value;
  }

  validateForm() {
    const requiredFields = this.form.querySelectorAll(
      "input[required], textarea[required]"
    );
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  showFieldError(field, message) {
    this.clearFieldError(field);

    field.style.borderColor = "#ef4444";

    const errorElement = document.createElement("div");
    errorElement.className = "field-error";
    errorElement.textContent = message;
    errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            display: block;
        `;

    field.parentNode.appendChild(errorElement);
  }

  clearFieldError(field) {
    field.style.borderColor = "";

    const existingError = field.parentNode.querySelector(".field-error");
    if (existingError) {
      existingError.remove();
    }
  }

  async submitForm() {
    const submitButton = this.form.querySelector(".submit-button");
    const originalText = submitButton.innerHTML;

    // Show loading state
    submitButton.classList.add("loading");
    submitButton.disabled = true;

    try {
      // Simulate form submission
      await this.simulateSubmission();

      // Show success message
      this.showSuccessMessage();

      // Clear form and local storage
      this.form.reset();
      this.clearLocalStorage();

      // Track successful submission
      this.trackFormSubmission("success");
    } catch (error) {
      // Show error message
      this.showErrorMessage();

      // Track failed submission
      this.trackFormSubmission("error");
    } finally {
      // Restore button state
      submitButton.classList.remove("loading");
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  }

  async simulateSubmission() {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, always resolve
        // In real implementation, this would be an actual form submission
        const shouldSucceed = true; // Math.random() > 0.2;

        if (shouldSucceed) {
          resolve();
        } else {
          reject(new Error("Submission failed"));
        }
      }, 2000);
    });
  }

  showSuccessMessage() {
    // Create success message element
    const successElement = document.createElement("div");
    successElement.className = "form-success active";
    successElement.innerHTML = `
            <div class="success-icon">✅</div>
            <h3 class="success-title">Запрос успешно отправлен!</h3>
            <p class="success-message">
                В течение 10-20 минут вы получите контрольное письмо с текстом вашего запроса. 
                Наш специалист свяжется с вами в ближайшее время.
            </p>
        `;

    // Insert before form
    this.form.parentNode.insertBefore(successElement, this.form);

    // Scroll to success message
    successElement.scrollIntoView({ behavior: "smooth", block: "start" });

    // Remove success message after 10 seconds
    setTimeout(() => {
      successElement.remove();
    }, 10000);
  }

  showErrorMessage() {
    alert(
      "Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону."
    );
  }

  saveToLocalStorage() {
    const formData = {};
    const inputs = this.form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      if (input.name && !input.classList.contains("hidden-field")) {
        formData[input.name] = input.value;
      }
    });

    localStorage.setItem("orderFormData", JSON.stringify(formData));
  }

  loadFromLocalStorage() {
    const savedData = localStorage.getItem("orderFormData");

    if (savedData) {
      const formData = JSON.parse(savedData);

      Object.keys(formData).forEach((key) => {
        const input = this.form.querySelector(`[name="${key}"]`);
        if (input && !input.classList.contains("hidden-field")) {
          input.value = formData[key];
        }
      });
    }
  }

  clearLocalStorage() {
    localStorage.removeItem("orderFormData");
  }

  trackFormSubmission(status) {
    // Google Analytics
    if (typeof gtag !== "undefined") {
      gtag("event", "form_submission", {
        event_category: "Order Form",
        event_label: status,
      });
    }

    // Yandex Metrika
    if (typeof ym !== "undefined") {
      ym(10115065, "reachGoal", "order_form_submission", { status: status });
    }

    console.log(`Form submission tracked: ${status}`);
  }
}

// Initialize order form when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new OrderForm();
});
