document.addEventListener('DOMContentLoaded', () => {
    const addBusinessBtn = document.getElementById('addBusinessBtn');
    const businessSelect = document.getElementById('businessSelect');
    const businessSelectForSlot = document.getElementById('businessSelectForSlot');
    const addSlotBtn = document.getElementById('addSlotBtn');
    const reserveBtn = document.getElementById('reserveBtn');
    const resultDiv = document.getElementById('result');

    const baseUrl = '/api';

    // İşletme ekleme
    addBusinessBtn.addEventListener('click', () => {
        const name = document.getElementById('businessNameInput').value;
        fetch(`${baseUrl}/businesses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })
        .then(res => res.json())
        .then(data => {
            resultDiv.innerText = `İşletme eklendi: ${data.name}`;
            updateBusinessSelect();
        });
    });

    // Slot ekleme
    addSlotBtn.addEventListener('click', () => {
        const businessId = businessSelectForSlot.value;
        const date = document.getElementById('slotDateInput').value;
        fetch(`${baseUrl}/businesses/${businessId}/slots`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date })
        })
        .then(res => res.json())
        .then(data => {
            resultDiv.innerText = `Slot eklendi: ${data.date}`;
        });
    });

    // Rezervasyon yap
    reserveBtn.addEventListener('click', () => {
        const businessId = businessSelect.value;
        const customerName = document.getElementById('customerName').value;
        fetch(`${baseUrl}/reservations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customerName, businessId })
        })
        .then(res => res.json())
        .then(data => {
            resultDiv.innerText = `Rezervasyon yapıldı: ${data.customerName}`;
            loadReservations();
        });
    });

    // İşletme select box’larını güncelle
    function updateBusinessSelect() {
        fetch(`${baseUrl}/businesses`)
            .then(res => res.json())
            .then(data => {
                businessSelect.innerHTML = '<option value="">İşletme Seçin</option>';
                businessSelectForSlot.innerHTML = '<option value="">İşletme Seçin</option>';
                data.forEach(b => {
                    const option = `<option value="${b.id}">${b.name}</option>`;
                    businessSelect.innerHTML += option;
                    businessSelectForSlot.innerHTML += option;
                });
            });
    }

    // Rezervasyonları listele
    function loadReservations() {
        fetch(`${baseUrl}/reservations`)
            .then(res => res.json())
            .then(data => {
                const tbody = document.querySelector("#reservationTable tbody");
                tbody.innerHTML = "";
                data.forEach(r => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${r.id}</td>
                        <td><input type="text" value="${r.customerName}" id="name-${r.id}"></td>
                        <td><input type="number" value="${r.businessId}" id="business-${r.id}"></td>
                        <td><button onclick="updateReservation(${r.id})">Güncelle</button></td>
                        <td><button onclick="deleteReservation(${r.id})">Sil</button></td>
                    `;
                    tbody.appendChild(tr);
                });
            });
    }

    // Rezervasyon güncelle
    window.updateReservation = function(id) {
        const customerName = document.getElementById(`name-${id}`).value;
        const businessId = document.getElementById(`business-${id}`).value;
        fetch(`${baseUrl}/reservations/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customerName, businessId })
        })
        .then(res => res.json())
        .then(() => loadReservations());
    }

    // Rezervasyon sil
    window.deleteReservation = function(id) {
        fetch(`${baseUrl}/reservations/${id}`, { method: "DELETE" })
            .then(() => loadReservations());
    }

    // Müsaitlikleri listele
    function loadAvailability() {
        fetch(`${baseUrl}/availability/all`)
            .then(res => res.json())
            .then(data => {
                const tbody = document.querySelector("#availabilityTable tbody");
                tbody.innerHTML = "";
                data.forEach(a => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${a.id}</td>
                        <td><input type="text" value="${a.dayOfWeek}" id="day-${a.id}"></td>
                        <td><input type="time" value="${a.startTime}" id="start-${a.id}"></td>
                        <td><input type="time" value="${a.endTime}" id="end-${a.id}"></td>
                        <td><button onclick="updateAvailability(${a.id})">Güncelle</button></td>
                        <td><button onclick="deleteAvailability(${a.id})">Sil</button></td>
                    `;
                    tbody.appendChild(tr);
                });
            });
    }

    // Müsaitlik güncelle
    window.updateAvailability = function(id) {
        const dayOfWeek = document.getElementById(`day-${id}`).value;
        const startTime = document.getElementById(`start-${id}`).value;
        const endTime = document.getElementById(`end-${id}`).value;

        fetch(`${baseUrl}/availability/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dayOfWeek, startTime, endTime })
        })
        .then(res => res.json())
        .then(() => loadAvailability());
    }

    // Müsaitlik sil
    window.deleteAvailability = function(id) {
        fetch(`${baseUrl}/availability/${id}`, { method: "DELETE" })
            .then(() => loadAvailability());
    }

    // Sayfa yüklenince işletmeleri, rezervasyonları ve müsaitlikleri çek
    updateBusinessSelect();
    loadReservations();
    loadAvailability();
});