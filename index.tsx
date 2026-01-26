<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Vercel - JavaScript</title>
</head>
<body>
    <h1 id="message">Test en cours...</h1>
    <p id="status">Vérification JavaScript...</p>
    
    <script>
        console.log("=== TEST SCRIPT STARTING ===");
        
        // Test 1: Modifier le DOM
        document.getElementById('message').textContent = "✅ JavaScript fonctionne !";
        document.getElementById('status').textContent = "DOM modifié avec succès";
        
        // Test 2: Style
        document.body.style.backgroundColor = "#0f172a";
        document.body.style.color = "white";
        document.body.style.textAlign = "center";
        document.body.style.paddingTop = "100px";
        document.body.style.fontFamily = "Arial, sans-serif";
        
        // Test 3: Log
        console.log("All tests passed");
        console.log("User Agent:", navigator.userAgent);
        
        // Afficher plus d'infos
        setTimeout(() => {
            document.getElementById('status').innerHTML = 
                "JavaScript actif<br>" +
                "Navigateur: " + navigator.userAgent.substring(0, 50) + "<br>" +
                "Date: " + new Date().toLocaleString();
        }, 1000);
    </script>
</body>
</html>
