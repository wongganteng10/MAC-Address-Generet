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

// Generate MAC dari checkbox yang dipilih
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

    // Klik untuk copy
    macDiv.addEventListener("click", () => {
      navigator.clipboard.writeText(mac).then(() => {
        macDiv.style.backgroundColor = "#c8ffc8"; // feedback visual
        setTimeout(() => macDiv.style.backgroundColor = "#f0f0f0", 500);
      });
    });

    outputDiv.appendChild(macDiv);
  });
}

// Pilih semua checkbox
function selectAllCheckboxes() {
  document.querySelectorAll('.options-group input[type="checkbox"]').forEach(box => box.checked = true);
}

// Hapus semua checkbox
function clearAllCheckboxes() {
  document.querySelectorAll('.options-group input[type="checkbox"]').forEach(box => box.checked = false);
}

// Event listeners
document.getElementById("generate-btn").addEventListener("click", generateSelectedMACs);
document.getElementById("select-all-btn").addEventListener("click", selectAllCheckboxes);
document.getElementById("clear-all-btn").addEventListener("click", clearAllCheckboxes);
