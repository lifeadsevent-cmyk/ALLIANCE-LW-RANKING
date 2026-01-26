<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>✅ TEST REACT READY</title>
    <style>
        body {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 100px 20px;
            margin: 0;
            min-height: 100vh;
        }
        h1 {
            color: #10b981;
            font-size: 2.5rem;
            margin-bottom: 20px;
        }
        .status {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 10px;
            display: inline-block;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <h1>✅ ÉTAPE 22 : DÉPLOIEMENT VERCEL ACTIF</h1>
    <p>Ceci est la version ACTUALISÉE du site</p>
    
    <div class="status" id="status">
        <p>Vérification JavaScript en cours...</p>
    </div>
    
    <!-- SCRIPT POUR PROUVER QUE JS FONCTIONNE -->
    <script>
        console.log("=== VERCEL DEPLOYMENT TEST ===");
        console.log("Timestamp:", new Date().toISOString());
        
        // Modifier la page pour prouver que JS fonctionne
        document.getElementById('status').innerHTML = `
            <p><strong>✅ JavaScript fonctionne !</strong></p>
            <p>Date: ${new Date().toLocaleString()}</p>
            <p>User Agent: ${navigator.userAgent.substring(0, 60)}...</p>
        `;
        
        // Changer la couleur après 1 sec
        setTimeout(() => {
            document.body.style.background = "linear-gradient(135deg, #1e40af 0%, #0f172a 100%)";
        }, 1000);
    </script>
</body>
</html>
