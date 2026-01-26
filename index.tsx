<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gestionnaire d'Unités - Dark Mode</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Inter', sans-serif;
        background-color: #0f172a;
        color: #f1f5f9;
        margin: 0;
        padding: 0;
      }
      #root {
        min-height: 100vh;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div style="text-align: center; margin-top: 100px; color: #94a3b8;">
        <p>Chargement...</p>
      </div>
    </div>
    
    <!-- SCRIPT INLINE POUR TESTER -->
    <script type="module">
      console.log("Test script executing...");
      const root = document.getElementById('root');
      if (root) {
        root.innerHTML = `
          <div style="text-align: center; margin-top: 100px;">
            <h1 style="color: #10b981; font-size: 2rem;">
              ✅ Script JavaScript fonctionne !
            </h1>
            <p style="color: #94a3b8; margin-top: 20px;">
              Prochaine étape : charger React
            </p>
          </div>
        `;
        console.log("Page updated successfully");
      }
    </script>
  </body>
</html>
