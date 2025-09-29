<!-- Custom JS -->
    <script>
      // init AOS
      AOS.init({ duration: 900, once: true });

      // GALLERY FILTER LOGIC
      (function () {
        const filterButtons = document.querySelectorAll(".filter-btns [data-filter]");
        const items = document.querySelectorAll(".gallery-item");

        function applyFilter(filter) {
          // filter can be: all / pria / wanita-hijab / wanita-nonhijab / resmi / tradisional
          items.forEach((item) => {
            const gender = item.getAttribute("data-gender");
            const style = item.getAttribute("data-style");

            let show = false;
            if (filter === "all") show = true;
            else if (["pria", "wanita-hijab", "wanita-nonhijab"].includes(filter)) {
              show = gender === filter;
            } else if (["resmi", "tradisional"].includes(filter)) {
              show = style === filter;
            }

            item.classList.toggle("hidden", !show);
          });
        }

        filterButtons.forEach((btn) => {
          btn.addEventListener("click", () => {
            // active visual
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            const filter = btn.getAttribute("data-filter");
            applyFilter(filter);
          });
        });

        // default: show all
        applyFilter("all");
      })();

      // IMAGE MODAL PREVIEW + DOWNLOAD
      (function () {
        const modalEl = document.getElementById("imgModal");
        const modalImg = document.getElementById("modalImg");
        const downloadLink = document.getElementById("downloadImg");
        const bsModal = new bootstrap.Modal(modalEl);

        document.querySelectorAll(".view-image").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const src = btn.getAttribute("data-src");
            modalImg.src = src;
            downloadLink.href = src;
            bsModal.show();
          });
        });

        // clear modal image on close
        modalEl.addEventListener("hidden.bs.modal", () => {
          modalImg.src = "";
        });
      })();

      // FORM HANDLING (simpan ke localStorage sebagai contoh)
      (function () {
        const form = document.getElementById("kritikForm");
        const formMsg = document.getElementById("formMsg");

        function validateEmail(email) {
          if (!email) return true; // optional
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const nama = document.getElementById("nama");
          const email = document.getElementById("email");
          const pesan = document.getElementById("pesan");

          // simple validation
          let ok = true;
          if (!nama.value.trim()) {
            nama.classList.add("is-invalid");
            ok = false;
          } else {
            nama.classList.remove("is-invalid");
          }
          if (!validateEmail(email.value.trim())) {
            email.classList.add("is-invalid");
            ok = false;
          } else {
            email.classList.remove("is-invalid");
          }
          if (!pesan.value.trim()) {
            pesan.classList.add("is-invalid");
            ok = false;
          } else {
            pesan.classList.remove("is-invalid");
          }

          if (!ok) {
            formMsg.innerHTML = '<div class="text-danger">Mohon lengkapi data yang diperlukan.</div>';
            return;
          }

          // save to localStorage (contoh penyimpanan sementara)
          const key = "kritik_saran_list";
          const stored = JSON.parse(localStorage.getItem(key) || "[]");
          stored.push({ nama: nama.value.trim(), email: email.value.trim(), pesan: pesan.value.trim(), waktu: new Date().toISOString() });
          localStorage.setItem(key, JSON.stringify(stored));

          // feedback ke user
          formMsg.innerHTML = '<div class="text-success">Terima kasih! Kritik & saran berhasil dikirim (disimpan lokal).</div>';
          // reset form
          form.reset();
        });
      })();

      // Optional: highlight navbar links on scroll (simple)
      (function () {
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".navbar .nav-link");

        function onScroll() {
          const scrollPos = window.scrollY + 80;
          sections.forEach((section) => {
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
              navLinks.forEach((l) => l.classList.remove("active"));
              const id = section.getAttribute("id");
              const activeLink = document.querySelector('.navbar a[href="#' + id + '"]');
              if (activeLink) activeLink.classList.add("active");
            }
          });
        }
        window.addEventListener("scroll", onScroll);
        onScroll();
      })();
    </script>

