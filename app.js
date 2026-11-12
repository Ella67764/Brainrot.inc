// Eén werkende functie voor het product
function voerActieUit(invoer = "Gebruiker") {
    return `Hallo ${invoer}! De eerste functie van ons product werkt.`;
}

// Koppeling met de knop in index.html (als het in de browser draait)
if (typeof document !== "undefined") {
    const knop = document.getElementById("actie-knop");
    const resultaatTekst = document.getElementById("resultaat");

    if (knop) {
        knop.addEventListener("click", () => {
            resultaatTekst.textContent = voerActieUit();
        });
    }
}

// Exporteer de functie zodat tests.js deze kan controleren
if (typeof module !== "undefined") {
    module.exports = { voerActieUit };
}
