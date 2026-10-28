/* =====================================================
   1. DATA RUMUS SETIAP BANGUN RUANG
===================================================== */
const dataBangun = {
  kubus: {
    nama: "Kubus",
    fields: [{ id: "s", label: "Panjang Sisi (s)" }],
    rumus: (x) => ({
      volume: x.s ** 3,
      luas: 6 * x.s ** 2
    })
  },

  balok: {
    nama: "Balok",
    fields: [
      { id: "p", label: "Panjang (p)" },
      { id: "l", label: "Lebar (l)" },
      { id: "t", label: "Tinggi (t)" }
    ],
    rumus: (x) => ({
      volume: x.p * x.l * x.t,
      luas: 2 * (x.p * x.l + x.p * x.t + x.l * x.t)
    })
  },

  tabung: {
    nama: "Tabung",
    fields: [
      { id: "r", label: "Jari-jari (r)" },
      { id: "t", label: "Tinggi (t)" }
    ],
    rumus: (x) => ({
      volume: Math.PI * x.r ** 2 * x.t,
      luas: 2 * Math.PI * x.r * (x.r + x.t)
    })
  },

  bola: {
    nama: "Bola",
    fields: [{ id: "r", label: "Jari-jari (r)" }],
    rumus: (x) => ({
      volume: (4 / 3) * Math.PI * x.r ** 3,
      luas: 4 * Math.PI * x.r ** 2
    })
  },

  kerucut: {
    nama: "Kerucut",
    fields: [
      { id: "r", label: "Jari-jari (r)" },
      { id: "t", label: "Tinggi (t)" }
    ],
    rumus: (x) => {
      const s = Math.sqrt(x.r ** 2 + x.t ** 2);
      return {
        volume: (1 / 3) * Math.PI * x.r ** 2 * x.t,
        luas: Math.PI * x.r * (x.r + s)
      };
    }
  },

  limas: {
    nama: "Limas Segiempat",
    fields: [
      { id: "s", label: "Sisi Alas (s)" },
      { id: "t", label: "Tinggi Limas (t)" }
    ],
    rumus: (x) => {
      const ts = Math.sqrt((x.s / 2) ** 2 + x.t ** 2);
      return {
        volume: (1 / 3) * x.s ** 2 * x.t,
        luas: x.s ** 2 + 4 * (0.5 * x.s * ts)
      };
    }
  }
};

/* =====================================================
   2. AMBIL ELEMEN HTML
===================================================== */
const select = document.getElementById("pilihBangun");
const inputArea = document.getElementById("inputArea");
const hasil = document.getElementById("hasil");
const btnHitung = document.getElementById("btnHitung");

/* =====================================================
   3. TAMPILKAN INPUT SESUAI BANGUN YANG DIPILIH
===================================================== */
function tampilkanInput() {
  const bangun = dataBangun[select.value];
  inputArea.innerHTML = "";
  hasil.innerHTML = "";

  bangun.fields.forEach((f) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <label for="${f.id}">${f.label}</label>
      <input type="number" id="${f.id}" placeholder="Masukkan angka" step="any" min="0">
    `;
    inputArea.appendChild(div);
  });
}

/* =====================================================
   4. FUNGSI HITUNG
===================================================== */
function hitung() {
  const bangun = dataBangun[select.value];
  const nilai = {};

  for (const f of bangun.fields) {
    const input = document.getElementById(f.id);
    const angka = parseFloat(input.value);

    if (isNaN(angka) || angka <= 0) {
      hasil.innerHTML = `<p class="error">⚠️ Semua kolom harus diisi angka lebih dari 0.</p>`;
      return;
    }
    nilai[f.id] = angka;
  }

  const r = bangun.rumus(nilai);

  hasil.innerHTML = `
    <div class="hasil-box">
      <h3>Hasil Perhitungan ${bangun.nama}</h3>
      <p>Volume: <strong>${r.volume.toFixed(2)}</strong> satuan³</p>
      <p>Luas Permukaan: <strong>${r.luas.toFixed(2)}</strong> satuan²</p>
    </div>
  `;
}

/* =====================================================
   5. EVENT LISTENER & INISIALISASI
===================================================== */
select.addEventListener("change", tampilkanInput);
btnHitung.addEventListener("click", hitung);

tampilkanInput();
