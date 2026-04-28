(async function () {
    const alt =
        "https://script.google.com/macros/s/AKfycbyXbghR6FkHKjv28OQIjy8OWrD6vgA0c8k-UzyOZUB0/dev";
    const working =
        "https://script.google.com/macros/s/AKfycbwoC77zW-80QlC0oEKDPAqJY6_yg3j9k2hGE-eiB7MLGPtPmVdPczMEYCo7Ys3mCCpQUw/exec";
    /**
     * @typedef OneTimeTax
     * @type {object}
     * @property {number} entrance
     * @property {number} common
     */

    /**
     * @typedef Taxes
     * @type {object}
     * @property {number} entrance
     * @property {number} common
     * @property {number} people
     * @property {OneTimeTax} onceTime
     */

    /**
     * @typedef AppartmentRecord
     * @type {object}
     * @property {number} appNumber
     * @property {number} people
     * @property {number} dogs
     * @property {number} due
     * @property {Taxes} taxes
     */

    /**
     * @typedef ServerResponse
     * @type {object}
     * @property {Array<AppartmentRecord>} data
     */

    let formatter = new Intl.NumberFormat("bg-BG", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
    });

    function setContent(div, text) {
        div.querySelector("span").textContent = text;
    }

    /**
     * @param {HTMLElement} element
     * @param {string|number} text
     */
    function setText(element, text) {
        element.textContent = text;
    }

    /**
     * @param {AppartmentRecord} r
     * @param {string | undefined} templateId
     * @return {DocumentFragment}
     */
    function instanciateTemplate(r, templateId = "appartment") {
        /** @type {HTMLTemplateElement} */
        let tpl = document.getElementById(templateId);
        if (tpl === null)
            throw new Error("Template element not found: #" + templateId);
        let el = document.importNode(tpl.content, true);
        let spans = el.querySelectorAll("span");
        setText(spans[0], r.appNumber);
        setText(spans[1], r.people);
        setText(spans[2], r.dogs);
        if (r.due < 0) {
            el.children[0].classList.add("debt");
            setText(spans[3], formatter.format(r.due * -1));
        }
        return el;
    }

    async function main() {
        let url = working;
        let res = await fetch(url, { mode: "cors" });
        /** @type {ServerResponse} */
        let data = await res.json();
        let fragment = document.createDocumentFragment();
        data.data.map((r) => {
            fragment.appendChild(instanciateTemplate(r));
        });
        document.querySelector("main").querySelector("h3").remove();
        document.querySelector("main").appendChild(fragment);
    }

    main();
})();
