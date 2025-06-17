// Assume siteData is defined in sites-data.js
document.addEventListener("DOMContentLoaded", () => {
    //   const featured = document.getElementById("featured");
    //   featured.innerHTML = `
    //     <h2>🌟 Featured Site of the Week</h2>
    //     <p><a href="${siteData.featured.url}" target="_blank">${siteData.featured.title}</a></p>
    //     <p class="notes">${siteData.featured.notes}</p>
    //   `;

    const siteSections = document.getElementById("site-sections");

    let openSection = null; // Track currently open section for auto-collapse

    siteData.sections.forEach((section, sectionIndex) => {
        const sectionDiv = document.createElement("div");
        sectionDiv.className = `section ${section.title.toLocaleLowerCase()}`;

        const icon = section.icon || "📁";
        const iconImg = section.iconImg ? `<img src="${section.iconImg}" alt="icon" />` : `<span>${icon}</span>`;

        const listId = `site-list-${sectionIndex}`;
        const toggleId = `toggle-${sectionIndex}`;

        // First 5 sites always visible, others are hidden in a separate wrapper
        const visibleSites = section.sites.slice(0, 5);
        const hiddenSites = section.sites.slice(5);

        let visibleList = visibleSites
            .map(site => `
       <a href="${site.url}" target="_blank">
            <li class="clickable-li">
            ${site.logo ? `<img src="${site.logo}">` : ""}
                <div class="site-wrapper">
                <p class="site-name">${site.name}</p>
                  ${site.notes ? `<p class="notes">${site.notes}</p>` : ""}
                </div>
              
            </li>
        </a>
      `)
            .join("");

        let hiddenList = hiddenSites
            .map(site => `
        <a href="${site.url}" target="_blank">
            <li class="clickable-li">
            ${site.logo ? `<img src="${site.logo}">` : ""}
                <div class="site-wrapper">
                <p class="site-name">${site.name}</p>
                  ${site.notes ? `<p class="notes">${site.notes}</p>` : ""}
                </div>
              
            </li>
        </a>
      `)
            .join("");

        sectionDiv.innerHTML = `
      <h2>${iconImg} <span>${section.title}</span></h2>
      <ul id="${listId}">
        ${visibleList}
      </ul>
      ${hiddenSites.length > 0 ? `
        <ul class="extra-sites" id="${listId}-extra" style="display: none;">
          ${hiddenList}
        </ul>
        <button class="toggle-btn" id="${toggleId}">See more</button>
      ` : ""}
    `;

        siteSections.appendChild(sectionDiv);

        if (hiddenSites.length > 0) {
            const toggleBtn = sectionDiv.querySelector(`#${toggleId}`);
            const extraList = sectionDiv.querySelector(`#${listId}-extra`);

            toggleBtn.addEventListener("click", () => {
                const isOpen = extraList.style.display === "block";

                // Close any previously opened section
                if (openSection && openSection !== extraList) {
                    openSection.style.display = "none";
                    const prevBtn = openSection.parentElement.querySelector(".toggle-btn");
                    if (prevBtn) prevBtn.textContent = "See more";
                }

                // Toggle this section
                extraList.style.display = isOpen ? "none" : "block";
                toggleBtn.textContent = isOpen ? "See more" : "See less";

                openSection = isOpen ? null : extraList;
            });
        }
    });
});
