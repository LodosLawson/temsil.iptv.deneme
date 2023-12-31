// IPTV URL'sini burada belirtin
const iptvUrl = "http://pray45748.cdngold.me/get.php?username=7c8c640943&password=4574cdce6e&type=m3u_plus&output=ts";

// Kanal listesini almak için bir HTTP isteği yapın
fetch(iptvUrl)
    .then(response => response.text())
    .then(data => {
        // M3U8 dosyasını satırlara bölelim
        const lines = data.split("\n");
        const kanalListesi = [];

        for (let i = 0; i < lines.length; i++) {
          alert(lines[i]);
            if (lines[i].startsWith("#EXTINF")) {
                // Kanal başlığı ise, bir sonraki satır URL'dir
                kanalListesi.push(lines[i + 1]);
            }
        }

        // Kanal listesini HTML'de görüntüle
        const kanalListesiElementi = document.getElementById("kanalListesi");
        kanalListesi.forEach((kanal, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="${kanal}" target="_blank">Kanal ${index + 1}</a>`;
            kanalListesiElementi.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error("Hata:", error);
    });
