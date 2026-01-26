<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test Vercel Fix</title>
</head>
<body>
    <h1 id="message">Testing...</h1>
    
    <!-- Script NORMAL (pas type="module") -->
    <script>
        console.log("Script loading...");
        document.getElementById('message').textContent = "✅ JavaScript works!";
        document.body.style.cssText = `
            background: #0f172a;
            color: white;
            text-align: center;
            padding: 100px;
            font-family: Arial;
        `;
        
        // Tenter de charger React
        setTimeout(() => {
            const reactScript = document.createElement('script');
            reactScript.src = 'https://unpkg.com/react@18/umd/react.development.js';
            reactScript.onload = () => {
                document.body.innerHTML += '<h2>✅ React loaded from CDN</h2>';
            };
            document.head.appendChild(reactScript);
        }, 1000);
    </script>
</body>
</html>
