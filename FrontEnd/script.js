let processes = [];
let nextProcessNumber = 1;
let editingProcessId = null;
let playingAlgorithm = null;

const colors = [
    "#3b82f6", "#22c55e", "#f59e0b", "#ec4899", 
    "#8b5cf6", "#ef4444", "#14b8a6", "#f97316"
];

function getColor(index) {
    return colors[index % colors.length];
}

function getNonNegativeNumber(inputId) {
    const input = document.getElementById(inputId);
    const value = parseInt(input.value);
    const nonNegativeValue = Number.isNaN(value) ? 0 : Math.max(0, value);

    input.value = nonNegativeValue;
    return nonNegativeValue;
}

function getNextProcessNumber() {
    if (processes.length === 0) {
        return 1;
    }

    const highestProcessNumber = processes.reduce((highest, process) => {
        const match = process.name.match(/^Process(\d+)$/);

        if (!match) {
            return highest;
        }

        return Math.max(highest, parseInt(match[1]));
    }, 0);

    return highestProcessNumber + 1;
}

function renderTable() {
    const tbody = document.getElementById("processes-tbody");
    tbody.innerHTML = "";

    if (processes.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="py-12 text-center text-gray-400 text-lg">
                    No processes added yet.<br>
                    Click "ADD A NEW PROCESS" to start
                </td>
            </tr>
        `;
        return;
    }

    processes.forEach((p, index) => {
        const color = p.color || getColor(index);
        const row = document.createElement("tr");
        row.className = "border-b hover:bg-gray-50 transition cursor-pointer";
        row.onclick = () => editProcess(p.id);
        row.innerHTML = `
            <td class="px-6 py-5 font-medium flex items-center gap-3">
                <div class="w-5 h-5 rounded-lg" style="background-color: ${color}"></div>
                ${p.name}
            </td>
            <td class="px-6 py-5">${p.arrival}</td>
            <td class="px-6 py-5">${p.burst}</td>
            <td class="px-6 py-5 text-center">
                <button onclick="event.stopPropagation(); deleteProcess(${p.id})" class="text-red-500 hover:text-red-700 text-xl">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function deleteProcess(id) {
    processes = processes.filter(p => p.id !== id);
    renderTable();
    renderDemoGantt();
    renderResultTables();
}

function addNewProcess() {
    nextProcessNumber = getNextProcessNumber();
    const newName = `Process${nextProcessNumber}`;

    editingProcessId = null;
    
    document.getElementById("modal-title").textContent = "Add New Process";
    document.getElementById("modal-submit").textContent = "Add Process";
    document.getElementById("modal-process-name").value = newName;
    document.getElementById("modal-arrival").value = 0;
    document.getElementById("modal-burst").value = 0;
    
    document.getElementById("add-modal").classList.remove("hidden");
    document.getElementById("modal-arrival").focus();
}

function closeModal() {
    document.getElementById("add-modal").classList.add("hidden");
    editingProcessId = null;
}

function submitAddProcess() {
    const name = document.getElementById("modal-process-name").value;
    const arrival = getNonNegativeNumber("modal-arrival");
    const burst = getNonNegativeNumber("modal-burst");

    if (editingProcessId !== null) {
        const process = processes.find(p => p.id === editingProcessId);

        if (process) {
            process.arrival = arrival;
            process.burst = burst;
        }

        renderTable();
        renderDemoGantt();
        renderResultTables();
        closeModal();
        return;
    }

    processes.push({
        id: Date.now(),
        name: name,
        arrival: arrival,
        burst: burst,
        color: getColor(nextProcessNumber - 1)
    });

    nextProcessNumber++;
    renderTable();
    renderDemoGantt();
    renderResultTables();
    closeModal();
}

function renderResultTable(tbodyId, algorithm) {
    const tbody = document.getElementById(tbodyId);

    if (!tbody) {
        return;
    }

    if (processes.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="py-10 text-center text-gray-400">
                    No results yet.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = processes.map(process => `
        <tr class="border-b last:border-b-0">
            <td class="py-4 px-6 font-medium">${process.name}</td>
            <td class="py-4 px-6">${process.arrival}</td>
            <td class="py-4 px-6">${process.burst}</td>
            <td class="py-4 px-6 font-semibold ${algorithm === "rr" ? "text-blue-600" : "text-orange-500"}">--</td>
            <td class="py-4 px-6 font-semibold ${algorithm === "rr" ? "text-blue-600" : "text-orange-500"}">--</td>
            <td class="py-4 px-6 font-semibold ${algorithm === "rr" ? "text-blue-600" : "text-orange-500"}">--</td>
        </tr>
    `).join("");
}

function renderResultTables() {
    renderResultTable("rr-results-tbody", "rr");
    renderResultTable("srtf-results-tbody", "srtf");
}

function editProcess(id) {
    const process = processes.find(p => p.id === id);

    if (!process) {
        return;
    }

    editingProcessId = id;

    document.getElementById("modal-title").textContent = "Edit Process";
    document.getElementById("modal-submit").textContent = "Save Changes";
    document.getElementById("modal-process-name").value = process.name;
    document.getElementById("modal-arrival").value = process.arrival;
    document.getElementById("modal-burst").value = process.burst;

    document.getElementById("add-modal").classList.remove("hidden");
    document.getElementById("modal-arrival").focus();
}

// عرض Gantt Demo ملون
function renderDemoGantt() {
    const rrContainer = document.getElementById("gantt-rr");
    const srtfContainer = document.getElementById("gantt-srtf");

    let html = "";

    processes.forEach((p, i) => {
        const width = Math.max(45, p.burst * 4);   // عرض تقريبي أفضل
        const color = p.color || getColor(i);
        
        html += `
            <div class="process-bar" style="width: ${width}px; background-color: ${color};">
                ${p.name}
            </div>
        `;
    });

    if (html === "") {
        html = `<div class="w-full h-full flex items-center justify-center text-gray-500 text-lg font-medium">
                    Add processes to see Gantt Chart
                </div>`;
    }

    rrContainer.innerHTML = html;
    srtfContainer.innerHTML = html;
}

function switchTab(tab) {
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });
    
    document.getElementById('rr-section').classList.toggle('hidden', tab !== 'rr');
    document.getElementById('srtf-section').classList.toggle('hidden', tab !== 'srtf');
}

function handleSimulationControl(algorithm, action) {
    if (action === "reset") {
        if (playingAlgorithm === algorithm) {
            playingAlgorithm = null;
        }

        setPlaybackButton(algorithm, false);
    }
}

function setPlaybackButton(algorithm, isPlaying) {
    const button = document.getElementById(`${algorithm}-play-button`);

    if (!button) {
        return;
    }

    button.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    button.title = isPlaying ? "Pause" : "Play";
}

function togglePlayback(algorithm) {
    const isPlaying = playingAlgorithm === algorithm;

    if (playingAlgorithm) {
        setPlaybackButton(playingAlgorithm, false);
    }

    playingAlgorithm = isPlaying ? null : algorithm;
    setPlaybackButton(algorithm, !isPlaying);
}

function runSimulation() {
    if (processes.length === 0) {
        alert("⚠️ Please add at least one process first!");
        return;
    }
    alert("✅ Simulation Running!\n\nGantt Chart جاهز\nالباک اند هيحط الرسم الحقيقي مكانه");
}

document.addEventListener("DOMContentLoaded", () => {
    renderTable();
    renderDemoGantt();
    renderResultTables();
    switchTab('rr');

    ["time-quantum", "modal-arrival", "modal-burst"].forEach(inputId => {
        const input = document.getElementById(inputId);

        input.addEventListener("input", () => {
            if (parseInt(input.value) < 0) {
                input.value = 0;
            }
        });
    });
});
