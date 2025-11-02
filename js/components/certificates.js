class Certificates {
  constructor() {
    this.certificates = [
      {
        title: "СЕРТИФИКАТ ОБОРУДОВАНИЕ FINN-POWER",
        images: [
          {
            src: "https://stanok-rvd.ru/certificate/finn_power.jpg",
            alt: "СЕРТИФИКАТ ОБОРУДОВАНИЕ FINN-POWER",
            title: "СЕРТИФИКАТ ОБОРУДОВАНИЕ FINN-POWER",
          },
        ],
        attachments: [
          {
            title: "ПРИЛОЖЕНИЕ № 1",
            images: [
              {
                src: "https://stanok-rvd.ru/certificate/finn_power_1.jpg",
                alt: "ПРИЛОЖЕНИЕ СЕРТИФИКАТ ОБОРУДОВАНИЕ FINN-POWER",
                title: "ПРИЛОЖЕНИЕ СЕРТИФИКАТ ОБОРУДОВАНИЕ FINN-POWER",
              },
            ],
          },
          {
            title: "ПРИЛОЖЕНИЕ № 2",
            images: [
              {
                src: "https://stanok-rvd.ru/certificate/finn_power_2.jpg",
                alt: "ПРИЛОЖЕНИЕ СЕРТИФИКАТ ОБОРУДОВАНИЕ FINN-POWER",
                title: "ПРИЛОЖЕНИЕ СЕРТИФИКАТ ОБОРУДОВАНИЕ FINN-POWER",
              },
            ],
          },
        ],
      },
      {
        title: "СЕРТИФИКАТ РУКАВА ВЫСОКОГО ДАВЛЕНИЯ VITILLO",
        images: [
          {
            src: "https://stanok-rvd.ru/certificate/vitillo-2.jpg",
            alt: "СЕРТИФИКАТ РУКАВА ВЫСОКОГО ДАВЛЕНИЯ VITILLO",
            title: "СЕРТИФИКАТ РУКАВА ВЫСОКОГО ДАВЛЕНИЯ VITILLO",
          },
        ],
        attachments: [
          {
            title: "ПРИЛОЖЕНИЕ № 1",
            images: [
              {
                src: "https://stanok-rvd.ru/certificate/vitillo-1.jpg",
                alt: "ПРИЛОЖЕНИЕ СЕРТИФИКАТ РУКАВА ВЫСОКОГО ДАВЛЕНИЯ VITILLO",
                title: "ПРИЛОЖЕНИЕ СЕРТИФИКАТ РУКАВА ВЫСОКОГО ДАВЛЕНИЯ VITILLO",
              },
            ],
          },
        ],
      },
    ];

    this.modal = null;
    this.currentImageIndex = 0;
    this.currentCertificateIndex = 0;

    this.render();
    this.initModal();
  }

  render() {
    const grid = document.getElementById("certificates-grid");
    if (!grid) return;

    grid.innerHTML = this.certificates
      .map(
        (certificate, certIndex) => `
            <div class="certificate-item">
                <h2 class="certificate-title">${certificate.title}</h2>
                
                ${certificate.images
                  .map(
                    (image, imgIndex) => `
                    <img 
                        src="${image.src}" 
                        alt="${image.alt}" 
                        title="${image.title}"
                        class="certificate-image"
                        data-cert-index="${certIndex}"
                        data-img-index="${imgIndex}"
                        loading="lazy"
                    >
                `
                  )
                  .join("")}
                
                ${certificate.attachments
                  .map(
                    (attachment, attachIndex) => `
                    <div class="certificate-attachment">
                        <h3 class="attachment-title">${attachment.title}</h3>
                        ${attachment.images
                          .map(
                            (image, imgIndex) => `
                            <img 
                                src="${image.src}" 
                                alt="${image.alt}" 
                                title="${image.title}"
                                class="certificate-image"
                                data-cert-index="${certIndex}"
                                data-img-index="${
                                  certificate.images.length + imgIndex
                                }"
                                data-attach-index="${attachIndex}"
                                loading="lazy"
                            >
                        `
                          )
                          .join("")}
                    </div>
                `
                  )
                  .join("")}
            </div>
        `
      )
      .join("");
  }

  initModal() {
    // Create modal element
    this.modal = document.createElement("div");
    this.modal.className = "certificate-modal";
    this.modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" aria-label="Закрыть">✕</button>
                <img class="modal-image" src="" alt="">
            </div>
        `;

    document.body.appendChild(this.modal);

    // Add event listeners
    this.modal.querySelector(".modal-close").addEventListener("click", () => {
      this.closeModal();
    });

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Add click events to certificate images
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("certificate-image")) {
        const certIndex = parseInt(e.target.dataset.certIndex);
        const imgIndex = parseInt(e.target.dataset.imgIndex);
        this.openModal(certIndex, imgIndex);
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (this.modal.classList.contains("active")) {
        if (e.key === "Escape") {
          this.closeModal();
        } else if (e.key === "ArrowRight") {
          this.nextImage();
        } else if (e.key === "ArrowLeft") {
          this.prevImage();
        }
      }
    });
  }

  openModal(certIndex, imgIndex) {
    this.currentCertificateIndex = certIndex;
    this.currentImageIndex = imgIndex;

    const certificate = this.certificates[certIndex];
    const allImages = [
      ...certificate.images,
      ...certificate.attachments.flatMap((attach) => attach.images),
    ];

    const image = allImages[imgIndex];
    const modalImage = this.modal.querySelector(".modal-image");

    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalImage.title = image.title;

    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  nextImage() {
    const certificate = this.certificates[this.currentCertificateIndex];
    const allImages = [
      ...certificate.images,
      ...certificate.attachments.flatMap((attach) => attach.images),
    ];

    this.currentImageIndex = (this.currentImageIndex + 1) % allImages.length;
    this.openModal(this.currentCertificateIndex, this.currentImageIndex);
  }

  prevImage() {
    const certificate = this.certificates[this.currentCertificateIndex];
    const allImages = [
      ...certificate.images,
      ...certificate.attachments.flatMap((attach) => attach.images),
    ];

    this.currentImageIndex =
      (this.currentImageIndex - 1 + allImages.length) % allImages.length;
    this.openModal(this.currentCertificateIndex, this.currentImageIndex);
  }
}

// Initialize certificates when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Certificates();
});
