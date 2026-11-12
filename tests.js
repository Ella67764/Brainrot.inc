const { voerActieUit } = require('./app.js');

// Eenvoudige test om te controleren of de functie de juiste tekst teruggeeft
function testVoerActieUit() {
    const resultaat = voerActieUit("Tester");
    const verwacht = "Hallo Tester! De eerste functie van ons product werkt.";

    if (resultaat === verwacht) {
        console.log("✅ Test geslaagd!");
    } else {
        console.error(`❌ Test mislukt! Verwacht: "${verwacht}", maar kreeg: "${resultaat}"`);
    }
}

testVoerActieUit();
