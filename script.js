// script.js dosyası
const iptvUrlInput = document.getElementById("iptvUrl");
const getKanalListesiBtn = document.getElementById("getKanalListesiBtn");
const kanalListesi = document.getElementById("kanalListesi");
const videoOynatici = document.getElementById("videoOynatici");

getKanalListesiBtn.addEventListener("click", () => {
    const iptvUrl = iptvUrlInput.value;

    // IPTV kanallarını çekme
    fetch(iptvUrl)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            let kanalAdi = '';
            let kanalURL = '';

            // Mevcut kanal listesini temizle
            kanalListesi.innerHTML = '';

            lines.forEach(line => {
                if (line.startsWith('#EXTINF')) {
                    kanalAdi = line.split(',')[1];
                } else if (line.trim() !== '') {
                    kanalURL = line;
                    const kanalItem = document.createElement("li");
                    kanalItem.textContent = kanalAdi;
                    kanalItem.addEventListener("click", () => {
                        videoOynatici.src = kanalURL;
                        videoOynatici.load();
                        videoOynatici.play();
                    });
                    kanalListesi.appendChild(kanalItem);
                }
            });
        })
        .catch(error => console.error(error));
});
