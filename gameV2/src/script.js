const tsConfig = {
    compilerOptions: {
        module: "ESNext",
        target: "ES6",
    }
};

async function game() {
    try {
        const response = await fetch('src/game.ts');
        const tsCode = await response.text();
        const jsCode = window.ts.transpileModule(tsCode, tsConfig).outputText.replace('data.js', 'src/data.js');
        const script = document.createElement('script');
        script.type = 'module';
        script.textContent = jsCode;
        document.body.appendChild(script);
    } catch (error) {
        console.error('ERROR: There was a problem fetching or compiling game.ts:', error);
    }
}

game();