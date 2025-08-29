// Fungsi generate MAC address
function generateMACAddress(letterCase, separator) {
  const hexDigits = "0123456789ABCDEF";
  let macParts = [];

  for (let i = 0; i < 6; i++) {
    let part = "";
    for (let j = 0; j < 2; j++) {
      let char = hexDigits.charAt(Math.floor(Math.random() * 16));
      if (letterCase === "lower") char = char.toLowerCase();
      else if (letterCase === "mix") char = Math.random() < 0.5 ? char.toLowerCase() : char;
      part += char;
    }
    macParts.push(part);
  }

  return macParts.join(separator);
}

// Fungsi generate semua MAC terpilih
function generateSelectedMACs() {
  const checkedBoxes = document.querySelectorAll('.options-group input[type="checkbox"]:checked');

  if (checkedBoxes.length === 0) {
    alert("Silakan pilih minimal satu kombinasi!");
    return;
  }

  const outputDiv = document.getElementById("mac-address");
  outputDiv.innerHTML = ""; // bersihkan hasil sebelumnya

  checkedBoxes.forEach(box => {
    const value = box.value;
    const letterCase = value.slice(0, -1);
    const separator = value.slice(-1);
    const mac = generateMACAddress(letterCase, separator);

    const macDiv = document.createElement("div");
    macDiv.textContent = `${letterCase.toUpperCase()} (${separator}) → ${mac}`;

    // Tambahkan fitur klik untuk copy
    macDiv.addEventListener("click", () => {
      navigator.clipboard.writeText(mac).then(() => {
        macDiv.style.backgroundColor = "#c8ffc8"; // feedback visual copy
        setTimeout(() => {
          macDiv.style.backgroundColor = "#f0f0f0"; // kembali ke warna normal
        }, 500);
      });
    });

    outputDiv.appendChild(macDiv);
  });
}

// Event listener tombol generate
document.getElementById("generate-btn").addEventListener("click", generateSelectedMACs);
