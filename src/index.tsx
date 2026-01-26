// src/index.tsx
console.log("React loading...");

// Marquer que React est chargé
window.ReactLoaded = true;

const root = document.getElementById('root');
if (root) {
    root.innerHTML = `
        <div style="margin-top: 30px; padding: 30px; background: rgba(16, 185, 129, 0.1); border-radius: 15px; border: 2px solid #10b981;">
            <h2 style="color: #10b981; margin-bottom: 15px;">✅ React fonctionne !</h2>
            <p>Date: ${new Date().toLocaleString()}</p>
            <p>Version: Étape 25</p>
        </div>
    `;
}
