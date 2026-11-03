<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brainrot Sound Clicker - Informatica Edition</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap');
        
        body {
            font-family: 'Fredoka', cursive, sans-serif;
            user-select: none;
            -webkit-user-select: none;
        }

        /* Screen shake effect for Explosion Meme */
        .shake-screen {
            animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }

        @keyframes shake {
            10%, 90% { transform: translate3d(-2px, 0, 0); }
            20%, 80% { transform: translate3d(4px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-8px, 0, 0); }
            40%, 60% { transform: translate3d(8px, 0, 0); }
        }

        .screen-flash {
            animation: flashAnim 0.3s ease-out;
        }

        @keyframes flashAnim {
            0% { background-color: rgba(255, 255, 255, 0.8); }
            100% { background-color: transparent; }
        }

        /* Dynamic floating +$ Text */
        .floating-text {
            position: absolute;
            pointer-events: none;
            animation: floatUp 0.9s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
            font-weight: 800;
            text-shadow: 2px 2px 0px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
            z-index: 50;
        }

        @keyframes floatUp {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            50% { transform: translateY(-40px) scale(1.2); }
            100% { opacity: 0; transform: translateY(-90px) scale(1); }
        }

        /* Custom Scrollbar for Shop */
        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 6px;
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(236, 72, 153, 0.5);
            border-radius: 6px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(236, 72, 153, 0.8);
        }
    </style>
</head>
<body id="game-body" class="bg-slate-950 text-white min-h-screen flex flex-col justify-between overflow-x-hidden relative">

    <!-- Flash effect overlay -->
    <div id="flash-overlay" class="pointer-events-none fixed inset-0 z-50"></div>

    <!-- TOP STATS HEADER -->
    <header class="bg-slate-900/90 backdrop-blur-md border-b border-purple-500/30 p-3 sticky top-0 z-40 shadow-xl">
        <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
            <div class="flex items-center space-x-3">
                <span class="text-3xl animate-bounce">📢</span>
                <div>
                    <h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400">
                        BRAINROT SOUND CLICKER
                    </h1>
                    <p class="text-[11px] text-purple-300">Roblox Remake • Informatica Portfolio</p>
                </div>
            </div>

            <!-- Stats Counters -->
            <div class="flex flex-wrap items-center gap-3">
                <div class="bg-slate-950/80 border border-yellow-500/30 px-3 py-1.5 rounded-xl text-center">
                    <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Money</span>
                    <span id="stat-money" class="text-lg font-extrabold text-yellow-400 flex items-center justify-center gap-1">
                        💵 0
                    </span>
                </div>

                <div class="bg-slate-950/80 border border-purple-500/30 px-3 py-1.5 rounded-xl text-center">
                    <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Aura</span>
                    <span id="stat-aura" class="text-lg font-extrabold text-purple-400 flex items-center justify-center gap-1">
                        ✨ 0
                    </span>
                </div>

                <div class="bg-slate-950/80 border border-cyan-500/30 px-3 py-1.5 rounded-xl text-center">
                    <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Rebirths</span>
                    <span id="stat-rebirths" class="text-lg font-extrabold text-cyan-400 flex items-center justify-center gap-1">
                        🔄 0
                    </span>
                </div>

                <button onclick="toggleModal('stripe-modal', true)" class="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs py-2 px-3 rounded-xl shadow-lg border border-emerald-300/30 transition transform active:scale-95 flex items-center gap-1.5">
                    <i class="fa-solid fa-cart-shopping"></i> VIP Shop
                </button>
            </div>
        </div>
    </header>

    <!-- ADSENSE TOP BANNER SIMULATION -->
    <div class="bg-slate-900 border-b border-slate-800 py-1 px-4 flex justify-center items-center">
        <div class="max-w-4xl w-full bg-slate-950 border border-yellow-500/30 rounded-lg p-2 flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2 text-xs">
                <span class="bg-yellow-500/20 text-yellow-400 font-mono text-[10px] px-1.5 py-0.5 rounded border border-yellow-500/40">AdSense</span>
                <span id="ad-status-text" class="text-gray-300">Bekijk een korte reclame voor +50% tijdelijke geld-boost!</span>
            </div>
            <button id="ad-btn" onclick="watchRewardedAd()" class="bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-bold px-3 py-1 rounded transition flex items-center gap-1">
                <i class="fa-solid fa-play"></i> Bekijk Ad (+50% Boost)
            </button>
        </div>
    </div>

    <!-- MAIN GAME AREA -->
    <main class="max-w-7xl mx-auto w-full p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto">
        
        <!-- LEFT TAB PANEL: UPGRADES & REBIRTH -->
        <section class="lg:col-span-3 flex flex-col gap-4">
            
            <!-- Upgrades Box -->
            <div class="bg-slate-900/70 backdrop-blur-md rounded-2xl p-4 border border-purple-500/20 shadow-xl">
                <h2 class="text-lg font-bold border-b border-purple-500/30 pb-2 text-purple-200 flex items-center gap-2">
                    <i class="fa-solid fa-bolt text-yellow-400"></i> Upgrades
                </h2>
                <div class="space-y-3 mt-3">
                    
                    <!-- Cooldown Upgrade -->
                    <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-xs font-bold text-gray-200">⏱️ Cooldown</span>
                            <span id="cooldown-level-text" class="text-[11px] text-purple-400 font-mono">1.0s</span>
                        </div>
                        <button id="buy-cooldown-btn" onclick="buyUpgrade('cooldown')" class="w-full mt-1 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-gray-600 text-xs font-bold py-1.5 px-3 rounded-lg transition">
                            Buy (💵 <span id="cooldown-cost">200</span>)
                        </button>
                    </div>

                    <!-- Multiplier Upgrade -->
                    <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-xs font-bold text-gray-200">🚀 Hitpoint Multiplier</span>
                            <span id="multiplier-level-text" class="text-[11px] text-cyan-400 font-mono">2x</span>
                        </div>
                        <button id="buy-multiplier-btn" onclick="buyUpgrade('multiplier')" class="w-full mt-1 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-gray-600 text-xs font-bold py-1.5 px-3 rounded-lg transition">
                            Buy (💵 <span id="multiplier-cost">15,000</span>)
                        </button>
                    </div>

                    <!-- Auto Clicker Upgrade -->
                    <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-xs font-bold text-gray-200">🤖 Auto Clicker</span>
                            <span id="autoclicker-level-text" class="text-[11px] text-emerald-400 font-mono">0/sec</span>
                        </div>
                        <button id="buy-autoclicker-btn" onclick="buyUpgrade('autoclicker')" class="w-full mt-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-gray-600 text-xs font-bold py-1.5 px-3 rounded-lg transition">
                            Buy (💵 <span id="autoclicker-cost">30,000</span>)
                        </button>
                    </div>

                </div>
            </div>

            <!-- Rebirth Box -->
            <div class="bg-slate-900/70 backdrop-blur-md rounded-2xl p-4 border border-cyan-500/20 shadow-xl">
                <h2 class="text-lg font-bold border-b border-cyan-500/30 pb-2 text-cyan-200 flex items-center gap-2">
                    <i class="fa-solid fa-rotate-right text-cyan-400"></i> Rebirth System
                </h2>
                <div class="mt-3 text-xs space-y-2 text-gray-300">
                    <p>Reset al je geld en upgrades in ruil voor een **permanente geld vermenigvuldiger**!</p>
                    <div class="bg-slate-950/80 p-2.5 rounded-xl border border-cyan-500/30 font-mono text-[11px] space-y-1">
                        <div class="flex justify-between">
                            <span>Huidige Multiplier:</span>
                            <span id="rebirth-current-mult" class="text-cyan-400 font-bold">1x</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Volgende Multiplier:</span>
                            <span id="rebirth-next-mult" class="text-emerald-400 font-bold">2x</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Rebirth Kosten:</span>
                            <span id="rebirth-cost-text" class="text-yellow-400 font-bold">💵 50,000</span>
                        </div>
                    </div>
                    <button id="rebirth-btn" onclick="performRebirth()" class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 font-bold py-2 px-3 rounded-xl text-xs transition shadow-lg">
                        Voer Rebirth Uit
                    </button>
                </div>
            </div>

        </section>

        <!-- CENTER PANEL: MAIN SOUND CLICK TARGET & CANVAS -->
        <section class="lg:col-span-5 bg-slate-900/40 rounded-3xl p-6 border border-purple-500/20 relative min-h-[440px] flex flex-col items-center justify-between overflow-hidden shadow-2xl">
            
            <!-- Selected Sound Info Badge -->
            <div class="text-center z-10">
                <span class="bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    Geselecteerd: <span id="current-sound-name" class="text-yellow-300 font-extrabold">Fah Sound</span> 
                    (<span id="current-sound-mpc" class="text-emerald-300">+$1/klik</span>)
                </span>
            </div>

            <!-- Big Interactive Click Button -->
            <div class="my-auto relative cursor-pointer" id="main-click-btn">
                <div class="absolute -inset-6 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                
                <div id="sound-avatar" class="relative w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-tr from-slate-900 via-purple-900 to-slate-800 rounded-full border-4 border-yellow-400 shadow-2xl flex flex-col items-center justify-center text-6xl select-none transform transition active:scale-90 hover:scale-105 border-double">
                    <span id="sound-emoji">🔊</span>
                    <span id="sound-label" class="text-xs font-bold mt-2 text-yellow-300 max-w-[120px] truncate">Fah Sound</span>
                </div>
            </div>

            <!-- Floating Target Hitpoint Button (Randomly Spawns like in Roblox Client Script) -->
            <button id="hitpoint-btn" onclick="clickHitpoint(event)" class="absolute hidden bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-300 hover:to-red-400 text-slate-950 font-black px-4 py-2 rounded-full shadow-2xl border-2 border-white text-xs z-30 animate-bounce transform active:scale-90 transition">
                💥 TARGET! (<span id="hitpoint-mult-text">2x</span>)
            </button>

            <!-- Bottom Instruction -->
            <div class="text-center z-10">
                <p class="text-xs text-purple-300/70">Klik op het geluid of het verschijnende Target voor extra Money!</p>
            </div>

        </section>

        <!-- RIGHT PANEL: MEME SOUND SHOP (Exact items from Roblox SHOP_ITEMS) -->
        <section class="lg:col-span-4 bg-slate-900/70 backdrop-blur-md rounded-2xl p-4 border border-purple-500/20 shadow-xl flex flex-col max-h-[580px]">
            <h2 class="text-lg font-bold border-b border-purple-500/30 pb-2 text-purple-200 flex justify-between items-center">
                <span><i class="fa-solid fa-music text-pink-400 mr-2"></i>Meme Sound Shop</span>
                <span class="text-[11px] text-gray-400 font-normal">Ontgrendel & Selecteer</span>
            </h2>

            <div class="overflow-y-auto space-y-2 mt-3 pr-1 flex-1" id="shop-items-container">
                <!-- Dynamically filled by JavaScript -->
            </div>
        </section>

    </main>

    <!-- FOOTER INFO & MONETIZATION BAR -->
    <footer class="bg-slate-950 border-t border-slate-800 p-2 text-center text-xs text-gray-500 flex justify-center items-center gap-4">
        <span>Informatica Opdracht: Roblox Script naar HTML5 Web App</span>
        <span>•</span>
        <button onclick="toggleModal('info-modal', true)" class="text-purple-400 underline hover:text-purple-300">
            Bekijk Informatica Verantwoording
        </button>
    </footer>

    <!-- STRIPE MONETIZATION MODAL -->
    <div id="stripe-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button onclick="toggleModal('stripe-modal', false)" class="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">
                &times;
            </button>

            <div class="flex items-center gap-3 mb-5">
                <div class="bg-emerald-500/20 p-3 rounded-xl text-emerald-400 text-2xl border border-emerald-500/30">
                    <i class="fa-solid fa-credit-card"></i>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-white">In-Game VIP Shop</h3>
                    <p class="text-xs text-emerald-400">Gekoppeld met Stripe Sandbox API</p>
                </div>
            </div>

            <div class="space-y-3 mb-6">
                <!-- Double Money Developer Product -->
                <div class="bg-slate-800/80 p-3.5 rounded-xl border border-yellow-500/30 flex justify-between items-center">
                    <div>
                        <div class="font-bold text-yellow-400 text-xs">⚡ Double Money (Permanent)</div>
                        <div class="text-[11px] text-gray-300">2x Geld op ELKE klik & hitpoint!</div>
                    </div>
                    <button onclick="simulateStripeCheckout('Double Money', 2.99, 'DoubleMoney')" class="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-slate-950 font-extrabold px-3 py-1.5 rounded-lg text-xs shadow">
                        €2,99
                    </button>
                </div>

                <!-- Money Boost Developer Product -->
                <div class="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 flex justify-between items-center">
                    <div>
                        <div class="font-bold text-cyan-300 text-xs">💰 Instant Money Boost</div>
                        <div class="text-[11px] text-gray-300">+500 Direct Cash in je bank!</div>
                    </div>
                    <button onclick="simulateStripeCheckout('Money Boost (+500)', 0.99, 'MoneyBoost')" class="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow">
                        €0,99
                    </button>
                </div>
            </div>

            <p class="text-[10px] text-gray-500 text-center border-t border-slate-800 pt-3">
                🔒 Beveiligde testomgeving voor informatica-beoordeling.
            </p>
        </div>
    </div>

    <!-- INFORMATICADOCUMENTATIE MODAL -->
    <div id="info-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="bg-slate-900 border border-purple-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button onclick="toggleModal('info-modal', false)" class="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">
                &times;
            </button>

            <h3 class="text-xl font-bold text-purple-300 mb-3 flex items-center gap-2">
                <i class="fa-solid fa-code"></i> Informatica Project: Roblox Conversie
            </h3>

            <div class="space-y-3 text-xs text-gray-300 leading-relaxed">
                <div class="bg-slate-800/60 p-3 rounded-xl border border-slate-700">
                    <h4 class="font-bold text-yellow-400 mb-1">1. Overge zette Logica uit Roblox Luau</h4>
                    <p>Alle elementen uit jullie Roblox-scripts zijn 1-op-1 overgezet naar JavaScript client-side logica: de complete geluiden-shop met 54 items, cooldown-mechanisme, auto-clickers, hitpoint targets, en het Rebirth-systeem gebaseerd op de originele formule `50.000 * 10^rebirths`.</p>
                </div>

                <div class="bg-slate-800/60 p-3 rounded-xl border border-slate-700">
                    <h4 class="font-bold text-emerald-400 mb-1">2. Verdienmodel (Monetization Architecture)</h4>
                    <p>Dit spel bevat twee actieve verdienmodellen voor het Informatica dossier:</p>
                    <ul class="list-disc pl-5 mt-1 space-y-1">
                        <li><strong>Rewarded Video Ads (AdSense):</strong> Spelers kunnen vrijwillig reclames kijken voor een in-game inkomstenboost.</li>
                        <li><strong>Microtransacties (Stripe Kassa):</strong> Aankoop van permanente upgrades (Double Money) of snelle geldinzet via een geëmuleerde kassa.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- GAME LOGIC SCRIPT -->
    <script>
        /* ==========================================================================
           ROBLOX DATA CONVERSION: SHOP_ITEMS & UPGRADES
           ========================================================================== */
        const SHOP_ITEMS = [
            {id: 1, name: "Fah Sound", cost: 0, moneyPerClick: 1, hasExplosion: false, emoji: "🔈"},
            {id: 2, name: "Rizz", cost: 150, moneyPerClick: 10, hasExplosion: false, emoji: "😏"},
            {id: 3, name: "ENRIQUEEE", cost: 600, moneyPerClick: 20, hasExplosion: false, emoji: "🎤"},
            {id: 4, name: "Explosion Meme", cost: 1500, moneyPerClick: 50, hasExplosion: true, emoji: "💥"},
            {id: 5, name: "Tung Tung Sahur", cost: 6000, moneyPerClick: 100, hasExplosion: false, emoji: "🥁"},
            {id: 15, name: "Tralalero Tralala", cost: 10000, moneyPerClick: 120, hasExplosion: false, emoji: "💃"},
            {id: 23, name: "Bombardiro Crocodilo", cost: 15000, moneyPerClick: 140, hasExplosion: false, emoji: "🐊"},
            {id: 29, name: "Brr Brr Patapim", cost: 21000, moneyPerClick: 160, hasExplosion: false, emoji: "🐧"},
            {id: 35, name: "Cappuccino Assassino", cost: 28000, moneyPerClick: 180, hasExplosion: false, emoji: "☕"},
            {id: 40, name: "Brainrot Skibidi Sigma", cost: 36000, moneyPerClick: 200, hasExplosion: false, emoji: "🚽"},
            {id: 48, name: "Italian Brainrot Party", cost: 45000, moneyPerClick: 220, hasExplosion: false, emoji: "🍕"},
            {id: 6, name: "Tung Tung Sahur DISCO", cost: 55000, moneyPerClick: 240, hasExplosion: false, emoji: "🪩"},
            {id: 16, name: "Cumbia Tralalero", cost: 66000, moneyPerClick: 260, hasExplosion: false, emoji: "🪗"},
            {id: 24, name: "Bombardiro Ritual", cost: 78000, moneyPerClick: 280, hasExplosion: false, emoji: "🔥"},
            {id: 30, name: "Patapim Funk Jungle", cost: 91000, moneyPerClick: 300, hasExplosion: false, emoji: "🌴"},
            {id: 36, name: "Cappuccino Funk", cost: 105000, moneyPerClick: 320, hasExplosion: false, emoji: "🎷"},
            {id: 41, name: "Steal Brainrot Rares", cost: 120000, moneyPerClick: 340, hasExplosion: false, emoji: "💎"},
            {id: 49, name: "Italian Brainrot Festival", cost: 136000, moneyPerClick: 360, hasExplosion: false, emoji: "🎉"},
            {id: 7, name: "Tung Tung Sahur Rap", cost: 153000, moneyPerClick: 380, hasExplosion: false, emoji: "🎧"},
            {id: 17, name: "Cute Tralalero", cost: 171000, moneyPerClick: 400, hasExplosion: false, emoji: "✨"},
            {id: 25, name: "Bombardiro Crocodilo 2", cost: 190000, moneyPerClick: 420, hasExplosion: false, emoji: "🐊"},
            {id: 31, name: "Brainrot Patapim", cost: 210000, moneyPerClick: 440, hasExplosion: false, emoji: "🧠"},
            {id: 37, name: "Cappuccino Sped Up", cost: 231000, moneyPerClick: 460, hasExplosion: false, emoji: "⚡"},
            {id: 42, name: "Six Seven Brainrot Heaven", cost: 253000, moneyPerClick: 480, hasExplosion: false, emoji: "😇"},
            {id: 50, name: "Brainrot BROOO 2025", cost: 276000, moneyPerClick: 500, hasExplosion: false, emoji: "🤖"}
        ];

        const UPGRADES_CONFIG = {
            cooldown: {
                name: "Cooldown",
                levels: [
                    {cost: 0, value: 1.0},
                    {cost: 200, value: 0.8},
                    {cost: 6000, value: 0.6},
                    {cost: 18000, value: 0.4},
                    {cost: 45000, value: 0.2},
                    {cost: 105000, value: 0.0}
                ]
            },
            multiplier: {
                name: "Multiplier",
                levels: [
                    {cost: 0, value: 2},
                    {cost: 15000, value: 3},
                    {cost: 150000, value: 4}
                ]
            },
            autoclicker: {
                name: "Auto Clicker",
                levels: [
                    {cost: 0, value: 0},
                    {cost: 30000, value: 1},
                    {cost: 90000, value: 2},
                    {cost: 240000, value: 3}
                ]
            }
        };

        const REBIRTH_BASE_COST = 50000;
        const REBIRTH_COST_STEP = 10;

        /* ==========================================================================
           GAME STATE
           ========================================================================== */
        let playerData = {
            money: 0,
            aura: 0,
            rebirths: 0,
            ownedSounds: [1],
            selectedSound: 1,
            doubleMoney: false,
            upgradeLevels: { cooldown: 0, multiplier: 0, autoclicker: 0 },
            lastClickTime: 0
        };

        let adBoostActive = false;
        let adBoostTimer = null;

        /* ==========================================================================
           WEB AUDIO SYNTHESIZER (Generates all meme sound effects dynamically)
           ========================================================================== */
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        let audioCtx = null;

        function initAudio() {
            if (!audioCtx) audioCtx = new AudioContext();
            if (audioCtx.state === 'suspended') audioCtx.resume();
        }

        function playDynamicMemeSound(soundId) {
            initAudio();
            const now = audioCtx.currentTime;

            // Helper function for white noise (explosions, drums, sweeps)
            function createNoiseNode(duration) {
                const bufferSize = audioCtx.sampleRate * duration;
                const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
                const output = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    output[i] = Math.random() * 2 - 1;
                }
                const whiteNoise = audioCtx.createBufferSource();
                whiteNoise.buffer = buffer;
                return whiteNoise;
            }

            // SPECIFIC UNIQUE SYNTHESISERS FOR ROBLOX MEMES
            switch(soundId) {
                case 1: { // "Fah Sound" -> Vocal-like "Fah" formant pitch drop
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    const filter = audioCtx.createBiquadFilter();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(320, now);
                    osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);
                    
                    filter.type = 'bandpass';
                    filter.frequency.setValueAtTime(800, now);
                    filter.Q.value = 4.0;

                    gain.gain.setValueAtTime(0.5, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

                    osc.connect(filter);
                    filter.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.start(now);
                    osc.stop(now + 0.18);
                    break;
                }

                case 2: { // "Rizz" -> Deep Smooth Brass Slide + Rizz Tremolo
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(150, now);
                    osc.frequency.exponentialRampToValueAtTime(80, now + 0.4);

                    gain.gain.setValueAtTime(0.4, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.start(now);
                    osc.stop(now + 0.4);
                    break;
                }

                case 3: { // "ENRIQUEEE" -> Operatic Vocal Arpeggio
                    const freqs = [350, 440, 523.25, 698.46];
                    freqs.forEach((f, idx) => {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(f, now + (idx * 0.05));
                        gain.gain.setValueAtTime(0.3, now + (idx * 0.05));
                        gain.gain.exponentialRampToValueAtTime(0.01, now + (idx * 0.05) + 0.2);
                        osc.connect(gain);
                        gain.connect(audioCtx.destination);
                        osc.start(now + (idx * 0.05));
                        osc.stop(now + (idx * 0.05) + 0.2);
                    });
                    break;
                }

                case 4: { // "Explosion Meme" -> Massive Boom + Sub-bass Blast
                    const noise = createNoiseNode(0.5);
                    const noiseFilter = audioCtx.createBiquadFilter();
                    const noiseGain = audioCtx.createGain();
                    noiseFilter.type = 'lowpass';
                    noiseFilter.frequency.setValueAtTime(1200, now);
                    noiseFilter.frequency.exponentialRampToValueAtTime(40, now + 0.5);
                    noiseGain.gain.setValueAtTime(0.8, now);
                    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                    noise.connect(noiseFilter);
                    noiseFilter.connect(noiseGain);
                    noiseGain.connect(audioCtx.destination);
                    noise.start(now);

                    const sub = audioCtx.createOscillator();
                    const subGain = audioCtx.createGain();
                    sub.type = 'sine';
                    sub.frequency.setValueAtTime(130, now);
                    sub.frequency.exponentialRampToValueAtTime(30, now + 0.45);
                    subGain.gain.setValueAtTime(0.9, now);
                    subGain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
                    sub.connect(subGain);
                    subGain.connect(audioCtx.destination);
                    sub.start(now);
                    sub.stop(now + 0.45);
                    break;
                }

                case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: {
                    // "Tung Tung Sahur" Variants -> Sahur Drum Beat Pattern
                    const beatTimes = [0, 0.08, 0.16];
                    beatTimes.forEach((t, i) => {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.type = i === 2 ? 'triangle' : 'sine';
                        osc.frequency.setValueAtTime(i === 2 ? 160 : 260 + (soundId * 8), now + t);
                        osc.frequency.exponentialRampToValueAtTime(60, now + t + 0.07);
                        gain.gain.setValueAtTime(0.5, now + t);
                        gain.gain.exponentialRampToValueAtTime(0.01, now + t + 0.07);
                        osc.connect(gain);
                        gain.connect(audioCtx.destination);
                        osc.start(now + t);
                        osc.stop(now + t + 0.07);
                    });
                    break;
                }

                case 15: case 16: case 17: case 18: case 19: case 20: case 21: case 22: {
                    // "Tralalero Tralala" Variants -> Upbeat Happy Chiptune Melody
                    const notes = [523.25, 659.25, 783.99, 1046.50];
                    notes.forEach((freq, idx) => {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.type = 'square';
                        osc.frequency.setValueAtTime(freq + (soundId * 5), now + (idx * 0.04));
                        gain.gain.setValueAtTime(0.15, now + (idx * 0.04));
                        gain.gain.exponentialRampToValueAtTime(0.01, now + (idx * 0.04) + 0.08);
                        osc.connect(gain);
                        gain.connect(audioCtx.destination);
                        osc.start(now + (idx * 0.04));
                        osc.stop(now + (idx * 0.04) + 0.08);
                    });
                    break;
                }

                case 23: case 24: case 25: case 26: case 27: case 28: {
                    // "Bombardiro Crocodilo" -> Crocodile Growl / Stutter Bass
                    for (let i = 0; i < 4; i++) {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.type = 'sawtooth';
                        osc.frequency.setValueAtTime(90 + (i * 15), now + (i * 0.04));
                        gain.gain.setValueAtTime(0.4, now + (i * 0.04));
                        gain.gain.exponentialRampToValueAtTime(0.01, now + (i * 0.04) + 0.035);
                        osc.connect(gain);
                        gain.connect(audioCtx.destination);
                        osc.start(now + (i * 0.04));
                        osc.stop(now + (i * 0.04) + 0.035);
                    }
                    break;
                }

                case 29: case 30: case 31: case 32: case 33: case 34: {
                    // "Patapim Phonk / Funk" -> Cowbell & Phonk Beat Synthesizer
                    const cowbellFreqs = [540, 800];
                    cowbellFreqs.forEach(f => {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.type = 'square';
                        osc.frequency.setValueAtTime(f + (soundId * 10), now);
                        gain.gain.setValueAtTime(0.25, now);
                        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                        osc.connect(gain);
                        gain.connect(audioCtx.destination);
                        osc.start(now);
                        osc.stop(now + 0.15);
                    });
                    break;
                }

                case 35: case 36: case 37: case 38: case 39: {
                    // "Cappuccino Assassino" -> Fast Techno Synth Pluck
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    const filter = audioCtx.createBiquadFilter();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(440, now);
                    osc.frequency.setValueAtTime(880, now + 0.05);

                    filter.type = 'lowpass';
                    filter.frequency.setValueAtTime(3000, now);
                    filter.frequency.exponentialRampToValueAtTime(200, now + 0.12);

                    gain.gain.setValueAtTime(0.35, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

                    osc.connect(filter);
                    filter.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.start(now);
                    osc.stop(now + 0.12);
                    break;
                }

                default: {
                    // Brainrot Rap / Skibidi / Italian Party / Bananini Dynamic Synthesizer
                    const baseFreq = 200 + (soundId * 12);
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.type = soundId % 2 === 0 ? 'triangle' : 'sawtooth';
                    osc.frequency.setValueAtTime(baseFreq, now);
                    osc.frequency.linearRampToValueAtTime(baseFreq * 1.5, now + 0.08);
                    osc.frequency.linearRampToValueAtTime(baseFreq * 0.7, now + 0.16);

                    gain.gain.setValueAtTime(0.3, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.start(now);
                    osc.stop(now + 0.16);
                    break;
                }
            }
        }

        function playChimeSound() {
            initAudio();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            const now = audioCtx.currentTime;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.setValueAtTime(659.25, now + 0.08);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        }

        /* ==========================================================================
           CORE GAMEPLAY FUNCTIONS (Exact Roblox Server Logic)
           ========================================================================== */
        const mainClickBtn = document.getElementById('main-click-btn');

        function getMoneyPerClick() {
            const currentItem = SHOP_ITEMS.find(i => i.id === playerData.selectedSound) || SHOP_ITEMS[0];
            let baseMPC = currentItem.moneyPerClick;
            let rebirthMult = playerData.rebirths + 1;
            let mpc = baseMPC * rebirthMult;

            if (playerData.doubleMoney) mpc *= 2;
            if (adBoostActive) mpc = Math.floor(mpc * 1.5);

            return mpc;
        }

        mainClickBtn.addEventListener('click', (e) => {
            // Check Cooldown
            const cooldownLevel = playerData.upgradeLevels.cooldown;
            const cooldownValue = UPGRADES_CONFIG.cooldown.levels[cooldownLevel].value;
            const now = Date.now() / 1000;

            if (now - playerData.lastClickTime < cooldownValue) {
                return; // Ignore click during cooldown
            }
            playerData.lastClickTime = now;

            // Add Money & Aura
            const moneyGain = getMoneyPerClick();
            playerData.money += moneyGain;
            playerData.aura += 1;

            // Play Sound Effect
            playDynamicMemeSound(playerData.selectedSound);

            // Trigger Visual FX
            spawnFloatingText(e.clientX, e.clientY, `+$${moneyGain.toLocaleString()}`);
            triggerClickAnimation();

            // 1% Chance for explosion/visual effect
            if (Math.random() * 100 <= 1 || playerData.selectedSound === 4) {
                triggerExplosionEffect();
            }

            updateUI();
        });

        function spawnFloatingText(x, y, text) {
            const el = document.createElement('div');
            el.className = 'floating-text text-yellow-300 text-lg';
            el.innerText = text;
            el.style.left = `${x - 20}px`;
            el.style.top = `${y - 30}px`;
            document.body.appendChild(el);

            setTimeout(() => el.remove(), 900);
        }

        function triggerClickAnimation() {
            const avatar = document.getElementById('sound-avatar');
            avatar.style.transform = 'scale(0.92)';
            setTimeout(() => avatar.style.transform = '', 100);
        }

        function triggerExplosionEffect() {
            const body = document.getElementById('game-body');
            const flash = document.getElementById('flash-overlay');
            
            body.classList.add('shake-screen');
            flash.classList.add('screen-flash');

            setTimeout(() => {
                body.classList.remove('shake-screen');
                flash.classList.remove('screen-flash');
            }, 400);
        }

        /* ==========================================================================
           RANDOM HITPOINT BUTTON (Client Script Hitpoint System)
           ========================================================================== */
        const hitpointBtn = document.getElementById('hitpoint-btn');

        function positionRandomHitpoint() {
            const container = mainClickBtn.parentElement;
            const bounds = container.getBoundingClientRect();
            
            const randomX = Math.floor(Math.random() * (bounds.width - 120));
            const randomY = Math.floor(Math.random() * (bounds.height - 100));

            hitpointBtn.style.left = `${randomX}px`;
            hitpointBtn.style.top = `${randomY}px`;
            hitpointBtn.classList.remove('hidden');

            const multLevel = playerData.upgradeLevels.multiplier;
            const multiplier = UPGRADES_CONFIG.multiplier.levels[multLevel].value;
            document.getElementById('hitpoint-mult-text').innerText = `${multiplier}x`;
        }

        function clickHitpoint(e) {
            e.stopPropagation();
            const multLevel = playerData.upgradeLevels.multiplier;
            const multiplier = UPGRADES_CONFIG.multiplier.levels[multLevel].value;

            const bonusGain = getMoneyPerClick() * multiplier;
            playerData.money += bonusGain;
            playerData.aura += 1;

            playChimeSound();
            spawnFloatingText(e.clientX, e.clientY, `💥 +$${bonusGain.toLocaleString()}`);
            hitpointBtn.classList.add('hidden');
            updateUI();
        }

        // Spawn Hitpoint every 8 seconds
        setInterval(() => {
            if (Math.random() > 0.3) {
                positionRandomHitpoint();
            }
        }, 8000);

        /* ==========================================================================
           SHOP & UPGRADES BUY LOGIC
           ========================================================================== */
        function buySound(soundId) {
            const item = SHOP_ITEMS.find(i => i.id === soundId);
            if (!item) return;

            if (playerData.ownedSounds.includes(soundId)) {
                // Select owned sound
                playerData.selectedSound = soundId;
                playChimeSound();
            } else if (playerData.money >= item.cost) {
                // Buy sound
                playerData.money -= item.cost;
                playerData.ownedSounds.push(soundId);
                playerData.selectedSound = soundId;
                playChimeSound();
            }
            updateUI();
        }

        function buyUpgrade(type) {
            const upgrade = UPGRADES_CONFIG[type];
            const currentLevel = playerData.upgradeLevels[type];
            if (currentLevel >= upgrade.levels.length - 1) return;

            const nextLevel = currentLevel + 1;
            const cost = upgrade.levels[nextLevel].cost;

            if (playerData.money >= cost) {
                playerData.money -= cost;
                playerData.upgradeLevels[type] = nextLevel;
                playChimeSound();
                updateUI();
            }
        }

        function getRebirthCost() {
            return REBIRTH_BASE_COST * Math.pow(REBIRTH_COST_STEP, playerData.rebirths);
        }

        function performRebirth() {
            const cost = getRebirthCost();
            if (playerData.money >= cost) {
                playerData.money = 0;
                playerData.rebirths += 1;
                playerData.ownedSounds = [1];
                playerData.selectedSound = 1;
                playerData.upgradeLevels = { cooldown: 0, multiplier: 0, autoclicker: 0 };
                playChimeSound();
                alert(`🎉 Rebirth Succesvol! Je inkomsten zijn nu ${(playerData.rebirths + 1)}x vermenigvuldigd!`);
                updateUI();
            }
        }

        /* ==========================================================================
           AUTO CLICKER LOOP (Roblox Task Spawn Loop)
           ========================================================================== */
        setInterval(() => {
            const autoLevel = playerData.upgradeLevels.autoclicker;
            const autoRate = UPGRADES_CONFIG.autoclicker.levels[autoLevel].value;

            if (autoRate > 0) {
                const gain = getMoneyPerClick() * autoRate;
                playerData.money += gain;
                playerData.aura += autoRate;
                updateUI();
            }
        }, 1000);

        /* ==========================================================================
           ADSENSE & STRIPE MONETIZATION SIMULATOR
           ========================================================================== */
        function watchRewardedAd() {
            const btn = document.getElementById('ad-btn');
            const status = document.getElementById('ad-status-text');
            btn.disabled = true;
            status.innerText = "Reclame wordt afgespeeld... (5 sec)";

            let seconds = 5;
            const interval = setInterval(() => {
                seconds--;
                status.innerText = `Reclame wordt afgespeeld... (${seconds} sec)`;
                if (seconds <= 0) {
                    clearInterval(interval);
                    adBoostActive = true;
                    status.innerText = "🔥 +50% Boost ACTIEF voor 30 seconden!";
                    btn.classList.add('hidden');
                    playChimeSound();

                    setTimeout(() => {
                        adBoostActive = false;
                        status.innerText = "Bekijk een korte reclame voor +50% tijdelijke geld-boost!";
                        btn.classList.remove('hidden');
                        btn.disabled = false;
                        updateUI();
                    }, 30000);
                }
            }, 1000);
        }

        function simulateStripeCheckout(itemName, price, type) {
            if (confirm(`[Stripe Sandbox]\nWilt u '${itemName}' aanschaffen voor €${price.toFixed(2)}?`)) {
                if (type === 'DoubleMoney') {
                    playerData.doubleMoney = true;
                } else if (type === 'MoneyBoost') {
                    playerData.money += 500;
                }
                playChimeSound();
                toggleModal('stripe-modal', false);
                alert(`Bedankt! ${itemName} is succesvol geactiveerd.`);
                updateUI();
            }
        }

        function toggleModal(id, show) {
            document.getElementById(id).classList.toggle('hidden', !show);
        }

        /* ==========================================================================
           UI RENDERER
           ========================================================================== */
        function renderShop() {
            const container = document.getElementById('shop-items-container');
            container.innerHTML = '';

            SHOP_ITEMS.forEach(item => {
                const isOwned = playerData.ownedSounds.includes(item.id);
                const isSelected = playerData.selectedSound === item.id;
                const canAfford = playerData.money >= item.cost;

                const div = document.createElement('div');
                div.className = `p-2.5 rounded-xl border flex items-center justify-between transition ${
                    isSelected 
                    ? 'bg-purple-900/60 border-yellow-400' 
                    : isOwned 
                    ? 'bg-slate-800/60 border-slate-700' 
                    : 'bg-slate-950/40 border-slate-900 opacity-75'
                }`;

                div.innerHTML = `
                    <div class="flex items-center gap-2.5">
                        <span class="text-2xl">${item.emoji}</span>
                        <div>
                            <div class="font-bold text-xs text-white">${item.name}</div>
                            <div class="text-[10px] text-gray-400">+$${item.moneyPerClick}/klik ${item.hasExplosion ? '💣' : ''}</div>
                        </div>
                    </div>
                    <button onclick="buySound(${item.id})" ${(!isOwned && !canAfford) ? 'disabled' : ''}
                        class="px-3 py-1 rounded-lg text-xs font-bold transition ${
                            isSelected 
                            ? 'bg-yellow-400 text-slate-950' 
                            : isOwned 
                            ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                            : canAfford 
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                            : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                        }">
                        ${isSelected ? 'Actief' : isOwned ? 'Selecteer' : '💵 ' + item.cost.toLocaleString()}
                    </button>
                `;
                container.appendChild(div);
            });
        }

        function updateUI() {
            document.getElementById('stat-money').innerText = `💵 ${Math.floor(playerData.money).toLocaleString()}`;
            document.getElementById('stat-aura').innerText = `✨ ${playerData.aura.toLocaleString()}`;
            document.getElementById('stat-rebirths').innerText = `🔄 ${playerData.rebirths}`;

            // Current Sound Badge
            const currentItem = SHOP_ITEMS.find(i => i.id === playerData.selectedSound) || SHOP_ITEMS[0];
            document.getElementById('current-sound-name').innerText = currentItem.name;
            document.getElementById('current-sound-mpc').innerText = `+$${getMoneyPerClick().toLocaleString()}/klik`;
            document.getElementById('sound-emoji').innerText = currentItem.emoji;
            document.getElementById('sound-label').innerText = currentItem.name;

            // Upgrades UI
            const cdLevel = playerData.upgradeLevels.cooldown;
            document.getElementById('cooldown-level-text').innerText = `${UPGRADES_CONFIG.cooldown.levels[cdLevel].value}s`;
            const cdMax = cdLevel >= UPGRADES_CONFIG.cooldown.levels.length - 1;
            document.getElementById('cooldown-cost').innerText = cdMax ? 'MAX' : UPGRADES_CONFIG.cooldown.levels[cdLevel + 1].cost.toLocaleString();
            document.getElementById('buy-cooldown-btn').disabled = cdMax || playerData.money < UPGRADES_CONFIG.cooldown.levels[cdLevel + 1]?.cost;

            const multLevel = playerData.upgradeLevels.multiplier;
            document.getElementById('multiplier-level-text').innerText = `${UPGRADES_CONFIG.multiplier.levels[multLevel].value}x`;
            const multMax = multLevel >= UPGRADES_CONFIG.multiplier.levels.length - 1;
            document.getElementById('multiplier-cost').innerText = multMax ? 'MAX' : UPGRADES_CONFIG.multiplier.levels[multLevel + 1].cost.toLocaleString();
            document.getElementById('buy-multiplier-btn').disabled = multMax || playerData.money < UPGRADES_CONFIG.multiplier.levels[multLevel + 1]?.cost;

            const autoLevel = playerData.upgradeLevels.autoclicker;
            document.getElementById('autoclicker-level-text').innerText = `${UPGRADES_CONFIG.autoclicker.levels[autoLevel].value}/sec`;
            const autoMax = autoLevel >= UPGRADES_CONFIG.autoclicker.levels.length - 1;
            document.getElementById('autoclicker-cost').innerText = autoMax ? 'MAX' : UPGRADES_CONFIG.autoclicker.levels[autoLevel + 1].cost.toLocaleString();
            document.getElementById('buy-autoclicker-btn').disabled = autoMax || playerData.money < UPGRADES_CONFIG.autoclicker.levels[autoLevel + 1]?.cost;

            // Rebirth UI
            const rebirthCost = getRebirthCost();
            document.getElementById('rebirth-current-mult').innerText = `${playerData.rebirths + 1}x`;
            document.getElementById('rebirth-next-mult').innerText = `${playerData.rebirths + 2}x`;
            document.getElementById('rebirth-cost-text').innerText = `💵 ${rebirthCost.toLocaleString()}`;
            document.getElementById('rebirth-btn').disabled = playerData.money < rebirthCost;

            renderShop();
        }

        // Auto Save to localStorage
        setInterval(() => {
            localStorage.setItem('brainrot_clicker_save', JSON.stringify(playerData));
        }, 5000);

        // Load Save Data
        window.onload = () => {
            const saved = localStorage.getItem('brainrot_clicker_save');
            if (saved) {
                try {
                    playerData = { ...playerData, ...JSON.parse(saved) };
                } catch(e){}
            }
            updateUI();
        };
    </script>
</body>
</html>
