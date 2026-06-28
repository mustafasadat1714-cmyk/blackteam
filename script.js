// Create orb elements
const orb1 = document.createElement('div'); orb1.className = 'orb orb-1';
const orb2 = document.createElement('div'); orb2.className = 'orb orb-2';
const orb3 = document.createElement('div'); orb3.className = 'orb orb-3';
document.body.appendChild(orb1);
document.body.appendChild(orb2);
document.body.appendChild(orb3);

// Toast Notification
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');
if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, followerX = 0, followerY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        cursor.style.left = cursorX - 6 + 'px';
        cursor.style.top = cursorY - 6 + 'px';
        cursorFollower.style.left = followerX - 22.5 + 'px';
        cursorFollower.style.top = followerY - 22.5 + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// Loading Screen
window.addEventListener('load', () => {
    const loading = document.getElementById('loadingScreen');
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => loading.remove(), 500);
        }, 1500);
    }
    setTimeout(() => showToast('Welcome to BLACK TEAM! 20+ Tools Ready', 'success'), 2000);
});

// Navbar Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }
});

// Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle) menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            navLinks.classList.remove('active');
        }
    });
});

// Back to Top
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (backBtn) {
        if (window.scrollY > 300) backBtn.classList.add('visible');
        else backBtn.classList.remove('visible');
    }
});
if (backBtn) backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// AI Chat
const aiChat = document.getElementById('aiChat');
const aiChatToggle = document.getElementById('aiChatToggle');
const aiMessages = document.getElementById('aiMessages');
const aiInput = document.getElementById('aiInput');
const aiSendBtn = document.getElementById('aiSendBtn');
const aiOpenBtn = document.getElementById('aiOpenBtn');

if (aiChatToggle) aiChatToggle.addEventListener('click', () => aiChat.classList.toggle('collapsed'));
if (aiOpenBtn) aiOpenBtn.addEventListener('click', () => aiChat.classList.remove('collapsed'));

function addAIMessage(text, isUser = false) {
    const div = document.createElement('div');
    div.className = `ai-message ${isUser ? 'user' : 'ai'}`;
    div.innerHTML = `<i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i><span>${text}</span>`;
    aiMessages.appendChild(div);
    aiMessages.scrollTop = aiMessages.scrollHeight;
}

function getAIResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return "Hello! Welcome to BLACK TEAM. I'm your AI assistant. Ask me anything about our 20+ tools!";
    }
    if (msg.includes('discord spawner')) {
        return "Discord Spawner sends messages to 10 channels at 0ms speed! Supports both User Token and Bot Token. Get your token, channel IDs, set your message, and click START. It includes rate limit bypass and infinite message mode!";
    }
    if (msg.includes('webhook spawner')) {
        return "Webhook Spawner sends messages through Discord webhooks! Supports multiple webhooks at once with 0ms speed. Just paste your webhook URLs, set your message, and start spamming!";
    }
    if (msg.includes('discord cloner')) {
        return "Discord Cloner clones entire servers including channels, categories, roles with permissions, and server logo. Use your USER token from Discord Web → F12 → Network → Authorization header.";
    }
    if (msg.includes('help')) {
        return "I can help you with all 24 tools! Ask about Discord Spawner, Webhook Spawner, Discord Cloner, Website Dumper, Media Converter, Password Generator, QR Code Generator, and more!";
    }
    return "I can help you with all BLACK TEAM tools! Ask me about Discord Spawner, Webhook Spawner, Cloner, Website Dumper, Media Converter, Password Generator, or any other tool!";
}

async function sendAIMessage() {
    const message = aiInput.value.trim();
    if (!message) return;
    addAIMessage(message, true);
    aiInput.value = '';
    const typing = document.createElement('div');
    typing.className = 'ai-message ai';
    typing.innerHTML = `<i class="fas fa-robot"></i><span><i class="fas fa-ellipsis-h"></i> Typing...</span>`;
    aiMessages.appendChild(typing);
    aiMessages.scrollTop = aiMessages.scrollHeight;
    setTimeout(() => {
        typing.remove();
        const response = getAIResponse(message);
        addAIMessage(response, false);
    }, 300);
}
if (aiSendBtn) aiSendBtn.addEventListener('click', sendAIMessage);
if (aiInput) aiInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendAIMessage(); });

// Modal System
const modalContainer = document.getElementById('modalContainer');

function openModal(title, content) {
    modalContainer.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-tool"></i> ${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">${content}</div>
        </div>
    `;
    modalContainer.classList.add('active');
    document.querySelector('.modal-close').onclick = () => modalContainer.classList.remove('active');
    modalContainer.onclick = (e) => { if (e.target === modalContainer) modalContainer.classList.remove('active'); };
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
}

// ============================================
// ===== DISCORD SPAWNER (User + Bot Token) =====
// ============================================
function discordSpawner() {
    openModal('Discord Spawner - 10 Channels', `
        <div class="warning-box"><i class="fas fa-exclamation-triangle"></i> ⚠️ Supports both User Token & Bot Token!</div>
        
        <div style="display:flex; gap:10px; margin-bottom:15px;">
            <button class="token-selector-btn active" id="userTokenBtn" style="flex:1;">👤 USER TOKEN</button>
            <button class="token-selector-btn" id="botTokenBtn" style="flex:1;">🤖 BOT TOKEN</button>
        </div>
        
        <div class="input-group">
            <label id="tokenLabel">🔑 User Token:</label>
            <input type="password" id="spawnToken" placeholder="Enter your Discord token...">
        </div>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:15px;">
            <div class="input-group"><label>Channel 1:</label><input type="text" id="spawnCh1" placeholder="Channel ID"></div>
            <div class="input-group"><label>Channel 2:</label><input type="text" id="spawnCh2" placeholder="Channel ID"></div>
            <div class="input-group"><label>Channel 3:</label><input type="text" id="spawnCh3" placeholder="Channel ID"></div>
            <div class="input-group"><label>Channel 4:</label><input type="text" id="spawnCh4" placeholder="Channel ID"></div>
            <div class="input-group"><label>Channel 5:</label><input type="text" id="spawnCh5" placeholder="Channel ID"></div>
            <div class="input-group"><label>Channel 6:</label><input type="text" id="spawnCh6" placeholder="Channel ID"></div>
            <div class="input-group"><label>Channel 7:</label><input type="text" id="spawnCh7" placeholder="Channel ID"></div>
            <div class="input-group"><label>Channel 8:</label><input type="text" id="spawnCh8" placeholder="Channel ID"></div>
            <div class="input-group"><label>Channel 9:</label><input type="text" id="spawnCh9" placeholder="Channel ID"></div>
            <div class="input-group"><label>Channel 10:</label><input type="text" id="spawnCh10" placeholder="Channel ID"></div>
        </div>
        
        <div class="input-group">
            <label>💬 Message:</label>
            <input type="text" id="spawnMessage" value="💀 BLACK TEAM SPAWNER! ⚡">
        </div>
        
        <div class="input-group">
            <label>⚡ Speed:</label>
            <select id="spawnSpeed">
                <option value="0">🚀 0ms - INSANE</option>
                <option value="10">⚡ 10ms - ULTRA</option>
                <option value="50">🔥 50ms - FAST</option>
                <option value="100" selected>💨 100ms - NORMAL</option>
                <option value="200">🐢 200ms - SLOW</option>
                <option value="500">🐌 500ms - VERY SLOW</option>
            </select>
        </div>
        
        <div style="display:flex; gap:10px;">
            <button class="btn-success" id="startSpawnBtn">🚀 START SPAWNING</button>
            <button class="btn-danger" id="stopSpawnBtn" disabled>⛔ STOP</button>
        </div>
        
        <div id="spawnLog" style="margin-top:15px; background:#0a0a0a; padding:10px; border-radius:8px; max-height:150px; overflow-y:auto; font-family:monospace; font-size:0.7rem;"></div>
        <div style="margin-top:10px; display:flex; gap:20px; flex-wrap:wrap;">
            <span>📨 Sent: <strong id="sentCount">0</strong></span>
            <span>✅ Success: <strong id="successCount">0</strong></span>
            <span>❌ Failed: <strong id="failCount">0</strong></span>
            <span>⚡ Speed: <strong id="currentSpeed">0</strong> ms</span>
        </div>
    `);
    
    setTimeout(() => {
        let tokenType = 'user';
        let isSpawning = false;
        let sent = 0, success = 0, fail = 0;
        let spawnIntervals = [];
        const logDiv = document.getElementById('spawnLog');
        
        // Token type toggle
        document.getElementById('userTokenBtn').addEventListener('click', function() {
            tokenType = 'user';
            document.getElementById('userTokenBtn').className = 'token-selector-btn active';
            document.getElementById('botTokenBtn').className = 'token-selector-btn';
            document.getElementById('tokenLabel').textContent = '🔑 User Token:';
            showToast('User Token mode selected', 'info');
        });
        document.getElementById('botTokenBtn').addEventListener('click', function() {
            tokenType = 'bot';
            document.getElementById('botTokenBtn').className = 'token-selector-btn active';
            document.getElementById('userTokenBtn').className = 'token-selector-btn';
            document.getElementById('tokenLabel').textContent = '🤖 Bot Token:';
            showToast('Bot Token mode selected', 'info');
        });
        
        function addLog(msg) {
            logDiv.innerHTML += `<div>> ${msg}</div>`;
            logDiv.scrollTop = logDiv.scrollHeight;
        }
        
        function updateStats() {
            document.getElementById('sentCount').textContent = sent;
            document.getElementById('successCount').textContent = success;
            document.getElementById('failCount').textContent = fail;
        }
        
        async function sendMessage(channelId, token, message, speed) {
            if (!isSpawning) return;
            try {
                const authHeader = tokenType === 'bot' ? `Bot ${token}` : token;
                const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
                    method: 'POST',
                    headers: {
                        'Authorization': authHeader,
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'
                    },
                    body: JSON.stringify({ content: message })
                });
                sent++;
                if (response.ok) {
                    success++;
                    if (sent % 5 === 0) addLog(`✅ Sent ${sent} messages`);
                } else if (response.status === 429) {
                    const data = await response.json();
                    const wait = (data.retry_after || 1) * 1000;
                    addLog(`⏳ Rate limited, waiting ${wait/1000}s`);
                    await new Promise(r => setTimeout(r, wait));
                    return sendMessage(channelId, token, message, speed);
                } else if (response.status === 401) {
                    addLog(`❌ Invalid token!`);
                    showToast('Invalid token!', 'error');
                    stopSpawning();
                    return;
                } else if (response.status === 403) {
                    addLog(`❌ No permission to send messages!`);
                    showToast('No permission!', 'error');
                    stopSpawning();
                    return;
                } else {
                    fail++;
                    addLog(`❌ Error: ${response.status}`);
                }
                updateStats();
            } catch(e) {
                fail++;
                addLog(`❌ Error: ${e.message}`);
                updateStats();
            }
        }
        
        function stopSpawning() {
            isSpawning = false;
            spawnIntervals.forEach(interval => clearInterval(interval));
            spawnIntervals = [];
            document.getElementById('startSpawnBtn').disabled = false;
            document.getElementById('stopSpawnBtn').disabled = true;
            document.getElementById('currentSpeed').textContent = '0';
            addLog(`⛔ Stopped. Sent: ${sent}, Success: ${success}, Failed: ${fail}`);
            showToast('Spawner stopped!', 'info');
        }
        
        document.getElementById('startSpawnBtn').addEventListener('click', () => {
            const token = document.getElementById('spawnToken').value.trim();
            const message = document.getElementById('spawnMessage').value.trim() || '💀 BLACK TEAM SPAWNER! ⚡';
            const speed = parseInt(document.getElementById('spawnSpeed').value);
            const channels = [];
            for (let i = 1; i <= 10; i++) {
                const ch = document.getElementById(`spawnCh${i}`).value.trim();
                if (ch) channels.push(ch);
            }
            if (!token) { showToast('Enter token!', 'error'); return; }
            if (channels.length === 0) { showToast('Enter at least 1 channel ID!', 'error'); return; }
            
            isSpawning = true;
            sent = 0; success = 0; fail = 0;
            updateStats();
            logDiv.innerHTML = '';
            addLog(`🚀 Starting spawn on ${channels.length} channels`);
            addLog(`⚡ Speed: ${speed}ms | Mode: ${tokenType.toUpperCase()}`);
            addLog(`💬 Message: ${message}`);
            
            document.getElementById('startSpawnBtn').disabled = true;
            document.getElementById('stopSpawnBtn').disabled = false;
            document.getElementById('currentSpeed').textContent = speed;
            
            channels.forEach(ch => {
                const interval = setInterval(() => {
                    sendMessage(ch, token, message, speed);
                }, Math.max(1, speed));
                spawnIntervals.push(interval);
            });
        });
        
        document.getElementById('stopSpawnBtn').addEventListener('click', stopSpawning);
        
        // Enter key support
        document.getElementById('spawnToken').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('startSpawnBtn').click();
        });
    }, 100);
}

// ============================================
// ===== WEBHOOK SPAWNER =====
// ============================================
function webhookSpawner() {
    openModal('Webhook Spawner', `
        <div class="warning-box"><i class="fas fa-exclamation-triangle"></i> ⚠️ Send messages through Discord webhooks!</div>
        
        <div class="input-group">
            <label>🔗 Webhook URLs (one per line):</label>
            <textarea id="webhookUrls" rows="4" placeholder="https://discord.com/api/webhooks/..."></textarea>
        </div>
        
        <div class="input-group">
            <label>💬 Message:</label>
            <input type="text" id="webhookMessage" value="💀 BLACK TEAM WEBHOOK SPAWNER! ⚡">
        </div>
        
        <div class="input-group">
            <label>🖼️ Avatar URL (optional):</label>
            <input type="text" id="webhookAvatar" placeholder="https://example.com/avatar.png">
        </div>
        
        <div class="input-group">
            <label>👤 Username (optional):</label>
            <input type="text" id="webhookUsername" placeholder="BLACK TEAM">
        </div>
        
        <div class="input-group">
            <label>⚡ Speed:</label>
            <select id="webhookSpeed">
                <option value="0">🚀 0ms - INSANE</option>
                <option value="10">⚡ 10ms - ULTRA</option>
                <option value="50">🔥 50ms - FAST</option>
                <option value="100" selected>💨 100ms - NORMAL</option>
                <option value="200">🐢 200ms - SLOW</option>
            </select>
        </div>
        
        <div style="display:flex; gap:10px;">
            <button class="btn-success" id="startWebhookBtn">🚀 START WEBHOOK SPAWN</button>
            <button class="btn-danger" id="stopWebhookBtn" disabled>⛔ STOP</button>
        </div>
        
        <div id="webhookLog" style="margin-top:15px; background:#0a0a0a; padding:10px; border-radius:8px; max-height:150px; overflow-y:auto; font-family:monospace; font-size:0.7rem;"></div>
        <div style="margin-top:10px; display:flex; gap:20px; flex-wrap:wrap;">
            <span>📨 Sent: <strong id="webhookSent">0</strong></span>
            <span>✅ Success: <strong id="webhookSuccess">0</strong></span>
            <span>❌ Failed: <strong id="webhookFail">0</strong></span>
        </div>
    `);
    
    setTimeout(() => {
        let isWebhookSpawning = false;
        let webhookSent = 0, webhookSuccess = 0, webhookFail = 0;
        let webhookIntervals = [];
        const logDiv = document.getElementById('webhookLog');
        
        function addLog(msg) {
            logDiv.innerHTML += `<div>> ${msg}</div>`;
            logDiv.scrollTop = logDiv.scrollHeight;
        }
        
        function updateWebhookStats() {
            document.getElementById('webhookSent').textContent = webhookSent;
            document.getElementById('webhookSuccess').textContent = webhookSuccess;
            document.getElementById('webhookFail').textContent = webhookFail;
        }
        
        async function sendWebhook(url, message, username, avatar, speed) {
            if (!isWebhookSpawning) return;
            try {
                const payload = { content: message };
                if (username) payload.username = username;
                if (avatar) payload.avatar_url = avatar;
                
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                webhookSent++;
                if (response.ok) {
                    webhookSuccess++;
                    if (webhookSent % 5 === 0) addLog(`✅ Sent ${webhookSent} webhook messages`);
                } else if (response.status === 429) {
                    const data = await response.json();
                    const wait = (data.retry_after || 1) * 1000;
                    addLog(`⏳ Rate limited, waiting ${wait/1000}s`);
                    await new Promise(r => setTimeout(r, wait));
                    return sendWebhook(url, message, username, avatar, speed);
                } else if (response.status === 404) {
                    addLog(`❌ Webhook not found!`);
                    showToast('Webhook not found!', 'error');
                    return;
                } else {
                    webhookFail++;
                    addLog(`❌ Error: ${response.status}`);
                }
                updateWebhookStats();
            } catch(e) {
                webhookFail++;
                addLog(`❌ Error: ${e.message}`);
                updateWebhookStats();
            }
        }
        
        function stopWebhookSpawning() {
            isWebhookSpawning = false;
            webhookIntervals.forEach(interval => clearInterval(interval));
            webhookIntervals = [];
            document.getElementById('startWebhookBtn').disabled = false;
            document.getElementById('stopWebhookBtn').disabled = true;
            addLog(`⛔ Stopped. Sent: ${webhookSent}, Success: ${webhookSuccess}, Failed: ${webhookFail}`);
            showToast('Webhook spawner stopped!', 'info');
        }
        
        document.getElementById('startWebhookBtn').addEventListener('click', () => {
            const urlsText = document.getElementById('webhookUrls').value.trim();
            const message = document.getElementById('webhookMessage').value.trim() || '💀 BLACK TEAM WEBHOOK SPAWNER! ⚡';
            const username = document.getElementById('webhookUsername').value.trim();
            const avatar = document.getElementById('webhookAvatar').value.trim();
            const speed = parseInt(document.getElementById('webhookSpeed').value);
            
            const urls = urlsText.split('\n').filter(u => u.trim());
            if (urls.length === 0) { showToast('Enter at least 1 webhook URL!', 'error'); return; }
            
            isWebhookSpawning = true;
            webhookSent = 0; webhookSuccess = 0; webhookFail = 0;
            updateWebhookStats();
            logDiv.innerHTML = '';
            addLog(`🚀 Starting webhook spawn on ${urls.length} webhooks`);
            addLog(`⚡ Speed: ${speed}ms`);
            addLog(`💬 Message: ${message}`);
            if (username) addLog(`👤 Username: ${username}`);
            
            document.getElementById('startWebhookBtn').disabled = true;
            document.getElementById('stopWebhookBtn').disabled = false;
            
            urls.forEach(url => {
                const interval = setInterval(() => {
                    sendWebhook(url.trim(), message, username, avatar, speed);
                }, Math.max(1, speed));
                webhookIntervals.push(interval);
            });
        });
        
        document.getElementById('stopWebhookBtn').addEventListener('click', stopWebhookSpawning);
    }, 100);
}

// ============================================
// ===== DISCORD CLONER =====
// ============================================
async function discordCloner() {
    openModal('Discord Server Cloner', `
        <div class="warning-box"><i class="fas fa-exclamation-triangle"></i> ⚠️ Use your USER token. Get from Discord Web → F12 → Network → Authorization header.</div>
        <div class="input-group"><label>Discord User Token:</label><input type="password" id="dcToken" placeholder="Your Discord user token"></div>
        <div class="input-group"><label>Source Server ID:</label><input type="text" id="dcSource" placeholder="Server to copy FROM"></div>
        <div class="input-group"><label>Target Server ID:</label><input type="text" id="dcTarget" placeholder="Server to copy TO"></div>
        <div class="input-group"><label>What to clone:</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <label><input type="checkbox" id="cloneText" checked> Text Channels</label>
                <label><input type="checkbox" id="cloneVoice" checked> Voice Channels</label>
                <label><input type="checkbox" id="cloneCat" checked> Categories</label>
                <label><input type="checkbox" id="cloneRole" checked> Roles + Permissions</label>
                <label><input type="checkbox" id="cloneLogo" checked> Server Logo</label>
                <label><input type="checkbox" id="clearTarget"> Clear target first</label>
            </div>
        </div>
        <button class="btn-primary" id="startCloneBtn">Start Cloning</button>
        <div id="cloneLog" style="margin-top:15px; background:#0a0a0a; padding:10px; border-radius:8px; max-height:200px; overflow-y:auto; font-family:monospace; font-size:0.7rem;"></div>
    `);
    
    setTimeout(() => {
        const startBtn = document.getElementById('startCloneBtn');
        if (startBtn) {
            startBtn.addEventListener('click', async () => {
                const token = document.getElementById('dcToken').value.trim();
                const sourceId = document.getElementById('dcSource').value.trim();
                const targetId = document.getElementById('dcTarget').value.trim();
                const logDiv = document.getElementById('cloneLog');
                if (!token || !sourceId || !targetId) { showToast('Fill all fields', 'error'); return; }
                logDiv.innerHTML = '';
                function addLog(msg) { logDiv.innerHTML += `<div>> ${msg}</div>`; logDiv.scrollTop = logDiv.scrollHeight; }
                addLog('🔐 Starting Discord cloner...');
                
                const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
                async function discordAPI(endpoint, method = 'GET', body = null) {
                    const options = { method, headers: { 'Authorization': token, 'Content-Type': 'application/json' } };
                    if (body) options.body = JSON.stringify(body);
                    try {
                        const response = await fetch(`https://discord.com/api/v10${endpoint}`, options);
                        if (response.status === 429) { const data = await response.json(); const wait = (data.retry_after || 1) * 1000; addLog(`⏳ Rate limited, waiting ${wait/1000}s...`); await delay(wait); return discordAPI(endpoint, method, body); }
                        if (response.status === 401) throw new Error('Invalid token!');
                        if (response.status === 403) throw new Error('Missing permissions!');
                        if (method === 'DELETE') return true;
                        if (response.status === 204) return true;
                        return response.json();
                    } catch (error) { throw error; }
                }
                
                try {
                    const sourceGuild = await discordAPI(`/guilds/${sourceId}`);
                    addLog(`✅ Source: ${sourceGuild.name}`);
                    const sourceChannels = await discordAPI(`/guilds/${sourceId}/channels`);
                    const sourceRoles = await discordAPI(`/guilds/${sourceId}/roles`);
                    const filteredRoles = sourceRoles.filter(r => r.name !== '@everyone');
                    
                    if (document.getElementById('clearTarget').checked) {
                        addLog('🧹 Clearing target...');
                        const targetChannels = await discordAPI(`/guilds/${targetId}/channels`);
                        for (const ch of targetChannels) { try { await discordAPI(`/channels/${ch.id}`, 'DELETE'); addLog(`🗑️ Deleted: ${ch.name}`); await delay(300); } catch(e) {} }
                        const targetRoles = await discordAPI(`/guilds/${targetId}/roles`);
                        for (const role of targetRoles) { if (role.name !== '@everyone' && !role.managed) { try { await discordAPI(`/guilds/${targetId}/roles/${role.id}`, 'DELETE'); addLog(`🗑️ Deleted role: ${role.name}`); await delay(500); } catch(e) {} } }
                    }
                    
                    let roleMap = {};
                    if (document.getElementById('cloneRole').checked && filteredRoles.length) {
                        addLog(`🎭 Cloning ${filteredRoles.length} roles...`);
                        for (const role of filteredRoles) {
                            try {
                                const newRole = await discordAPI(`/guilds/${targetId}/roles`, 'POST', { 
                                    name: role.name, color: role.color, hoist: role.hoist, 
                                    mentionable: role.mentionable, permissions: role.permissions.toString() 
                                });
                                roleMap[role.id] = newRole.id;
                                addLog(`✅ Created role: ${role.name}`);
                                await delay(800);
                            } catch(e) { addLog(`❌ Failed: ${role.name}`); }
                        }
                    }
                    
                    let categoryMap = {};
                    const categories = sourceChannels.filter(c => c.type === 4);
                    if (document.getElementById('cloneCat').checked && categories.length) {
                        addLog(`📁 Cloning ${categories.length} categories...`);
                        for (const cat of categories) {
                            try {
                                const newCat = await discordAPI(`/guilds/${targetId}/channels`, 'POST', { name: cat.name, type: 4, position: cat.position });
                                categoryMap[cat.id] = newCat.id;
                                addLog(`✅ Created category: ${cat.name}`);
                                await delay(1000);
                            } catch(e) { addLog(`❌ Failed category: ${cat.name}`); }
                        }
                    }
                    
                    const textChannels = sourceChannels.filter(c => c.type === 0);
                    if (document.getElementById('cloneText').checked && textChannels.length) {
                        addLog(`📝 Cloning ${textChannels.length} text channels...`);
                        for (const ch of textChannels) {
                            try {
                                let parentId = ch.parent_id && categoryMap[ch.parent_id] ? categoryMap[ch.parent_id] : null;
                                await discordAPI(`/guilds/${targetId}/channels`, 'POST', { 
                                    name: ch.name, type: 0, position: ch.position, parent_id: parentId, 
                                    topic: ch.topic || '', nsfw: ch.nsfw || false
                                });
                                addLog(`✅ Created text: #${ch.name}`);
                                await delay(800);
                            } catch(e) { addLog(`❌ Failed #${ch.name}`); }
                        }
                    }
                    
                    const voiceChannels = sourceChannels.filter(c => c.type === 2);
                    if (document.getElementById('cloneVoice').checked && voiceChannels.length) {
                        addLog(`🔊 Cloning ${voiceChannels.length} voice channels...`);
                        for (const ch of voiceChannels) {
                            try {
                                let parentId = ch.parent_id && categoryMap[ch.parent_id] ? categoryMap[ch.parent_id] : null;
                                await discordAPI(`/guilds/${targetId}/channels`, 'POST', { 
                                    name: ch.name, type: 2, position: ch.position, parent_id: parentId, 
                                    bitrate: ch.bitrate || 64000, user_limit: ch.user_limit || 0
                                });
                                addLog(`✅ Created voice: 🔊${ch.name}`);
                                await delay(800);
                            } catch(e) { addLog(`❌ Failed voice ${ch.name}`); }
                        }
                    }
                    
                    if (document.getElementById('cloneLogo').checked && sourceGuild.icon) {
                        addLog(`🖼️ Cloning server logo...`);
                        try {
                            const logoUrl = `https://cdn.discordapp.com/icons/${sourceId}/${sourceGuild.icon}.png?size=256`;
                            const response = await fetch(logoUrl);
                            const blob = await response.blob();
                            const formData = new FormData();
                            formData.append('file', blob, 'icon.png');
                            await fetch(`https://discord.com/api/v10/guilds/${targetId}`, { method: 'PATCH', headers: { 'Authorization': token }, body: formData });
                            addLog(`✅ Server logo cloned!`);
                        } catch(e) { addLog(`❌ Logo error`); }
                    }
                    
                    addLog(`🎉 CLONE COMPLETED SUCCESSFULLY!`);
                    showToast('Clone completed!', 'success');
                } catch (error) { addLog(`❌ ERROR: ${error.message}`); showToast('Clone failed', 'error'); }
            });
        }
    }, 100);
}

// ============================================
// ===== WEBSITE DUMPER =====
// ============================================
function websiteDumper() {
    openModal('Website Dumper', `
        <div class="input-group"><label>Website URL:</label><input type="text" id="dumpUrl" placeholder="https://example.com"></div>
        <button class="btn-primary" id="dumpBtn">Dump Website</button>
        <div id="dumpResult"></div>
    `);
    setTimeout(() => {
        document.getElementById('dumpBtn')?.addEventListener('click', async () => {
            let url = document.getElementById('dumpUrl').value;
            if (!url) { showToast('Enter a URL', 'error'); return; }
            if (!url.startsWith('http')) url = 'https://' + url;
            showToast('Fetching website...', 'info');
            try {
                const proxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
                const response = await fetch(proxy);
                const html = await response.text();
                const cssMatches = []; const cssRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
                let match; while ((match = cssRegex.exec(html)) !== null) cssMatches.push(match[1]);
                const css = cssMatches.join('\n\n');
                const jsMatches = []; const jsRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
                while ((match = jsRegex.exec(html)) !== null) { if (!match[1].includes('src=')) jsMatches.push(match[1]); }
                const js = jsMatches.join('\n\n');
                document.getElementById('dumpResult').innerHTML = `
                    <div class="result-box">
                        <p><strong>✅ Website dumped successfully!</strong></p>
                        <p>📄 HTML: ${(html.length/1024).toFixed(2)} KB</p>
                        <p>🎨 CSS: ${(css.length/1024).toFixed(2)} KB</p>
                        <p>📜 JS: ${(js.length/1024).toFixed(2)} KB</p>
                        <div style="display:flex; gap:10px; margin-top:15px; flex-wrap:wrap;">
                            <button id="downloadHtmlBtn" class="btn-secondary">📄 Download HTML</button>
                            <button id="downloadCssBtn" class="btn-secondary">🎨 Download CSS</button>
                            <button id="downloadJsBtn" class="btn-secondary">📜 Download JS</button>
                        </div>
                    </div>
                `;
                document.getElementById('downloadHtmlBtn')?.addEventListener('click', () => { const blob = new Blob([html], { type: 'text/html' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'website.html'; a.click(); URL.revokeObjectURL(a.href); });
                document.getElementById('downloadCssBtn')?.addEventListener('click', () => { const blob = new Blob([css], { type: 'text/css' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'styles.css'; a.click(); URL.revokeObjectURL(a.href); });
                document.getElementById('downloadJsBtn')?.addEventListener('click', () => { const blob = new Blob([js], { type: 'text/javascript' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'script.js'; a.click(); URL.revokeObjectURL(a.href); });
                showToast('Website dumped!', 'success');
            } catch(e) { showToast('Failed to dump website', 'error'); }
        });
    }, 100);
}

// ============================================
// ===== MEDIA CONVERTER =====
// ============================================
function mediaConverter() {
    openModal('Media Converter', `
        <div style="display:flex; gap:10px; margin-bottom:15px;">
            <button class="btn-primary" id="convMp4Btn" style="background:#4f46e5;">MP4 → MP3</button>
            <button class="btn-secondary" id="convMp3Btn">MP3 → MP4</button>
        </div>
        <div id="convPanel">
            <div class="input-group"><label>Select File:</label><input type="file" id="convFile" accept="video/mp4,audio/mpeg"></div>
            <div id="convResult"></div>
        </div>
    `);
    setTimeout(() => {
        let currentMode = 'mp4tomp3';
        const mp4Btn = document.getElementById('convMp4Btn');
        const mp3Btn = document.getElementById('convMp3Btn');
        const fileInput = document.getElementById('convFile');
        const resultDiv = document.getElementById('convResult');
        
        mp4Btn.addEventListener('click', () => {
            currentMode = 'mp4tomp3';
            mp4Btn.className = 'btn-primary';
            mp3Btn.className = 'btn-secondary';
            fileInput.accept = 'video/mp4';
            showToast('Select MP4 file to convert to MP3', 'info');
        });
        mp3Btn.addEventListener('click', () => {
            currentMode = 'mp3tomp4';
            mp3Btn.className = 'btn-primary';
            mp4Btn.className = 'btn-secondary';
            fileInput.accept = 'audio/mpeg';
            showToast('Select MP3 file to convert to MP4', 'info');
        });
        
        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            resultDiv.innerHTML = '<div class="result-box"><p>⏳ Converting...</p></div>';
            try {
                if (currentMode === 'mp4tomp3') {
                    if (!file.type.includes('video/mp4')) throw new Error('Please select an MP4 file');
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const arrayBuffer = await file.arrayBuffer();
                    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                    const wavBuffer = audioBufferToWav(audioBuffer);
                    const blob = new Blob([wavBuffer], { type: 'audio/wav' });
                    const url = URL.createObjectURL(blob);
                    resultDiv.innerHTML = `
                        <div class="result-box">
                            <p><strong>✅ Conversion Complete!</strong></p>
                            <a href="${url}" download="${file.name.replace(/\.mp4$/i, '.mp3')}" class="btn-primary" style="display:inline-block; margin-top:10px;">📥 Download MP3</a>
                        </div>
                    `;
                    audioContext.close();
                    showToast('MP4 converted to MP3!', 'success');
                } else {
                    if (!file.type.includes('audio/mpeg')) throw new Error('Please select an MP3 file');
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const arrayBuffer = await file.arrayBuffer();
                    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                    const canvas = document.createElement('canvas');
                    canvas.width = 1280; canvas.height = 720;
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#0a0a0a';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = '#4f46e5';
                    ctx.font = 'bold 48px Orbitron';
                    ctx.textAlign = 'center';
                    ctx.fillText('BLACK TEAM', canvas.width/2, canvas.height/2 - 50);
                    ctx.fillStyle = '#a855f7';
                    ctx.font = '24px Poppins';
                    ctx.fillText(file.name.replace(/\.mp3$/i, ''), canvas.width/2, canvas.height/2 + 50);
                    const duration = audioBuffer.duration;
                    const stream = canvas.captureStream(30);
                    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
                    const chunks = [];
                    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
                    mediaRecorder.onstop = () => {
                        const blob = new Blob(chunks, { type: 'video/webm' });
                        const url = URL.createObjectURL(blob);
                        resultDiv.innerHTML = `
                            <div class="result-box">
                                <p><strong>✅ Conversion Complete!</strong></p>
                                <a href="${url}" download="${file.name.replace(/\.mp3$/i, '.mp4')}" class="btn-primary" style="display:inline-block; margin-top:10px;">📥 Download MP4</a>
                            </div>
                        `;
                        showToast('MP3 converted to MP4!', 'success');
                        audioContext.close();
                    };
                    mediaRecorder.start();
                    setTimeout(() => { mediaRecorder.stop(); stream.getTracks().forEach(track => track.stop()); }, Math.max(3000, duration * 1000));
                }
            } catch (error) { resultDiv.innerHTML = `<div class="result-box"><p>❌ Error: ${error.message}</p></div>`; showToast('Conversion failed', 'error'); }
        });
    }, 100);
}

function audioBufferToWav(buffer) {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    let samples = buffer.getChannelData(0);
    if (numChannels > 1) {
        const samples2 = buffer.getChannelData(1);
        const newSamples = new Float32Array(samples.length * 2);
        for (let i = 0; i < samples.length; i++) {
            newSamples[i * 2] = samples[i];
            newSamples[i * 2 + 1] = samples2[i];
        }
        samples = newSamples;
    }
    const dataLength = samples.length * 2;
    const bufferLength = 44 + dataLength;
    const arrayBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(arrayBuffer);
    const writeString = (offset, str) => { for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i)); };
    writeString(0, 'RIFF');
    view.setUint32(4, bufferLength - 8, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, dataLength, true);
    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
        const sample = Math.max(-1, Math.min(1, samples[i]));
        view.setInt16(offset, sample * 0x7FFF, true);
    }
    return arrayBuffer;
}

// ============================================
// ===== PASSWORD GENERATOR =====
// ============================================
function passwordGen() {
    function generatePassword(len, upper, lower, num, sym) {
        let chars = '';
        if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (num) chars += '0123456789';
        if (sym) chars += '!@#$%^&*';
        if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';
        let pass = '';
        for (let i = 0; i < len; i++) pass += chars[Math.floor(Math.random() * chars.length)];
        return pass;
    }
    openModal('Password Generator', `
        <div class="input-group"><label>Length:</label><input type="number" id="passLen" value="16" min="6" max="50"></div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <label><input type="checkbox" id="passUpper" checked> Uppercase</label>
            <label><input type="checkbox" id="passLower" checked> Lowercase</label>
            <label><input type="checkbox" id="passNum" checked> Numbers</label>
            <label><input type="checkbox" id="passSym" checked> Symbols</label>
        </div>
        <button class="btn-primary" id="genPassBtn">Generate</button>
        <div id="passResult"></div>
        <div class="input-group" style="margin-top:15px;"><label>Batch:</label><input type="number" id="batchCount" value="5" min="1" max="50"></div>
        <button class="btn-secondary" id="batchPassBtn">Batch Generate</button>
        <div id="batchResult"></div>
    `);
    setTimeout(() => {
        document.getElementById('genPassBtn')?.addEventListener('click', () => {
            const len = parseInt(document.getElementById('passLen').value);
            const upper = document.getElementById('passUpper').checked;
            const lower = document.getElementById('passLower').checked;
            const num = document.getElementById('passNum').checked;
            const sym = document.getElementById('passSym').checked;
            const pass = generatePassword(len, upper, lower, num, sym);
            document.getElementById('passResult').innerHTML = `<div class="result-box"><input type="text" value="${pass}" style="width:100%; padding:8px; font-family:monospace; background:#0a0a0a; border:1px solid #4f46e5; border-radius:6px; color:#0f0;"><button class="btn-secondary" id="copyPassBtn" style="margin-top:8px;">Copy</button></div>`;
            document.getElementById('copyPassBtn')?.addEventListener('click', () => copyToClipboard(pass));
        });
        document.getElementById('batchPassBtn')?.addEventListener('click', () => {
            const len = parseInt(document.getElementById('passLen').value);
            const upper = document.getElementById('passUpper').checked;
            const lower = document.getElementById('passLower').checked;
            const num = document.getElementById('passNum').checked;
            const sym = document.getElementById('passSym').checked;
            const count = parseInt(document.getElementById('batchCount').value);
            let html = '<div class="result-box"><div class="batch-list">';
            const passes = [];
            for (let i = 0; i < count; i++) { const pass = generatePassword(len, upper, lower, num, sym); passes.push(pass); html += `<div class="batch-item">${pass}</div>`; }
            html += `</div><button class="btn-secondary" id="copyBatchBtn">Copy All</button></div>`;
            document.getElementById('batchResult').innerHTML = html;
            document.getElementById('copyBatchBtn')?.addEventListener('click', () => copyToClipboard(passes.join('\n')));
        });
    }, 100);
}

// ============================================
// ===== OTHER TOOLS (Simplified) =====
// ============================================
function textToBinary() {
    openModal('Text to Binary', `<div class="input-group"><label>Text:</label><textarea id="binaryText" rows="4"></textarea></div><button class="btn-primary" id="toBinaryBtn">Convert</button><div id="binaryResult"></div>`);
    setTimeout(() => {
        document.getElementById('toBinaryBtn')?.addEventListener('click', () => {
            const text = document.getElementById('binaryText').value;
            const binary = text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
            document.getElementById('binaryResult').innerHTML = `<div class="result-box"><p>${binary}</p><button class="btn-secondary" id="copyBinaryBtn">Copy</button></div>`;
            document.getElementById('copyBinaryBtn')?.addEventListener('click', () => copyToClipboard(binary));
        });
    }, 100);
}

function base64Tool() {
    openModal('Base64 Tool', `<div class="input-group"><label>Text:</label><textarea id="base64Text" rows="4"></textarea></div><button class="btn-primary" id="encodeBtn">Encode</button><button class="btn-secondary" id="decodeBtn">Decode</button><div id="base64Result"></div>`);
    setTimeout(() => {
        document.getElementById('encodeBtn')?.addEventListener('click', () => {
            const encoded = btoa(document.getElementById('base64Text').value);
            document.getElementById('base64Result').innerHTML = `<div class="result-box"><p>${encoded}</p><button class="btn-secondary" id="copyBase64Btn">Copy</button></div>`;
            document.getElementById('copyBase64Btn')?.addEventListener('click', () => copyToClipboard(encoded));
        });
        document.getElementById('decodeBtn')?.addEventListener('click', () => {
            try { const decoded = atob(document.getElementById('base64Text').value); document.getElementById('base64Result').innerHTML = `<div class="result-box"><p>${decoded}</p><button class="btn-secondary" id="copyDecodeBtn">Copy</button></div>`; document.getElementById('copyDecodeBtn')?.addEventListener('click', () => copyToClipboard(decoded)); }
            catch(e) { showToast('Invalid Base64', 'error'); }
        });
    }, 100);
}

function urlEncoder() {
    openModal('URL Encoder', `<div class="input-group"><label>URL:</label><input type="text" id="urlText"></div><button class="btn-primary" id="encodeUrlBtn">Encode</button><button class="btn-secondary" id="decodeUrlBtn">Decode</button><div id="urlResult"></div>`);
    setTimeout(() => {
        document.getElementById('encodeUrlBtn')?.addEventListener('click', () => {
            const encoded = encodeURIComponent(document.getElementById('urlText').value);
            document.getElementById('urlResult').innerHTML = `<div class="result-box"><p>${encoded}</p><button class="btn-secondary" id="copyUrlBtn">Copy</button></div>`;
            document.getElementById('copyUrlBtn')?.addEventListener('click', () => copyToClipboard(encoded));
        });
        document.getElementById('decodeUrlBtn')?.addEventListener('click', () => {
            const decoded = decodeURIComponent(document.getElementById('urlText').value);
            document.getElementById('urlResult').innerHTML = `<div class="result-box"><p>${decoded}</p><button class="btn-secondary" id="copyDecodeUrlBtn">Copy</button></div>`;
            document.getElementById('copyDecodeUrlBtn')?.addEventListener('click', () => copyToClipboard(decoded));
        });
    }, 100);
}

function md5Generator() {
    function md5(string) {
        function md5cycle(x, k) { var a = x[0], b = x[1], c = x[2], d = x[3]; a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586); c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330); a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426); c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983); a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417); c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162); a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101); c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329); a = gg(a, b, c, d, k[1], 5, -165796806); d = gg(d, a, b, c, k[6], 9, -1069501632); c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302); a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083); c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848); a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690); c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501); a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784); c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734); a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463); c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556); a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353); c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640); a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222); c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189); a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835); c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651); a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415); c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055); a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894986606); c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799); a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744); c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649); a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379); c = ii(c, d, a, b, k[2], 15, 718787259); b = ii(b, c, d, a, k[9], 21, -343485551); x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]); }
        function cmn(q, a, b, x, s, t) { return add32(rol(add32(add32(a, q), add32(x, t)), s), b); }
        function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
        function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
        function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
        function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
        function rol(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)); }
        function add32(a, b) { return (a + b) & 0xFFFFFFFF; }
        function md5str(s) { var arr = []; for (var i = 0; i < s.length; i++) { var code = s.charCodeAt(i); if (code < 128) arr.push(code); else if (code < 2048) { arr.push(192 | (code >> 6), 128 | (code & 63)); } else { arr.push(224 | (code >> 12), 128 | ((code >> 6) & 63), 128 | (code & 63)); } } var n = arr.length, bits = n * 8, p = 56 - ((n + 8) % 64); var arr2 = arr.slice(); arr2.push(0x80); while (arr2.length % 64 !== 56) arr2.push(0); for (var i = 0; i < 8; i++) arr2.push((bits >>> (8 * i)) & 0xFF); var x = new Array(16), state = [1732584193, -271733879, -1732584194, 271733878]; for (var i = 0; i < arr2.length; i += 64) { for (var j = 0; j < 64; j++) x[j >> 2] = (x[j >> 2] || 0) | (arr2[i + j] << ((j % 4) * 8)); md5cycle(state, x); } var hex = ''; for (var i = 0; i < 4; i++) hex += ('00000000' + state[i].toString(16)).slice(-8); return hex; }
        return md5str(string);
    }
    openModal('MD5 Generator', `<div class="input-group"><label>Text:</label><input type="text" id="md5Text"></div><button class="btn-primary" id="genMd5Btn">Generate</button><div id="md5Result"></div>`);
    setTimeout(() => {
        document.getElementById('genMd5Btn')?.addEventListener('click', () => {
            const hash = md5(document.getElementById('md5Text').value);
            document.getElementById('md5Result').innerHTML = `<div class="result-box"><p>${hash}</p><button class="btn-secondary" id="copyMd5Btn">Copy</button></div>`;
            document.getElementById('copyMd5Btn')?.addEventListener('click', () => copyToClipboard(hash));
        });
    }, 100);
}

function jsonFormatter() {
    openModal('JSON Formatter', `<div class="input-group"><label>JSON:</label><textarea id="jsonText" rows="8" placeholder='{"key":"value"}'></textarea></div><button class="btn-primary" id="formatJsonBtn">Format</button><button class="btn-secondary" id="validateJsonBtn">Validate</button><div id="jsonResult"></div>`);
    setTimeout(() => {
        document.getElementById('formatJsonBtn')?.addEventListener('click', () => {
            try { const formatted = JSON.stringify(JSON.parse(document.getElementById('jsonText').value), null, 2); document.getElementById('jsonResult').innerHTML = `<div class="result-box"><pre style="white-space:pre-wrap;">${formatted}</pre><button class="btn-secondary" id="copyJsonBtn">Copy</button></div>`; document.getElementById('copyJsonBtn')?.addEventListener('click', () => copyToClipboard(formatted)); }
            catch(e) { showToast('Invalid JSON', 'error'); }
        });
        document.getElementById('validateJsonBtn')?.addEventListener('click', () => { try { JSON.parse(document.getElementById('jsonText').value); showToast('Valid JSON!', 'success'); } catch(e) { showToast('Invalid JSON', 'error'); } });
    }, 100);
}

function loremIpsum() {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    openModal('Lorem Ipsum', `<div class="input-group"><label>Paragraphs:</label><input type="number" id="loremCount" value="3" min="1" max="10"></div><button class="btn-primary" id="genLoremBtn">Generate</button><div id="loremResult"></div>`);
    setTimeout(() => {
        document.getElementById('genLoremBtn')?.addEventListener('click', () => {
            const count = parseInt(document.getElementById('loremCount').value);
            let html = '<div class="result-box">';
            for (let i = 0; i < count; i++) html += `<p>${lorem}</p><hr>`;
            html += `<button class="btn-secondary" id="copyLoremBtn">Copy</button></div>`;
            document.getElementById('loremResult').innerHTML = html;
            document.getElementById('copyLoremBtn')?.addEventListener('click', () => copyToClipboard(document.getElementById('loremResult').innerText));
        });
    }, 100);
}

function qrGenerator() {
    openModal('QR Code', `<div class="input-group"><label>Text/URL:</label><input type="text" id="qrText"></div><div class="input-group"><label>Size:</label><select id="qrSize"><option value="128">128x128</option><option value="256">256x256</option><option value="512">512x512</option></select></div><button class="btn-primary" id="genQrBtn">Generate</button><div id="qrResult"></div>`);
    setTimeout(() => {
        document.getElementById('genQrBtn')?.addEventListener('click', () => {
            const text = document.getElementById('qrText').value;
            if (!text) { showToast('Enter text', 'error'); return; }
            const size = document.getElementById('qrSize').value;
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
            document.getElementById('qrResult').innerHTML = `<div class="result-box"><img src="${qrUrl}" style="margin:0 auto; display:block;"><button class="btn-secondary" id="copyQrBtn">Copy URL</button></div>`;
            document.getElementById('copyQrBtn')?.addEventListener('click', () => copyToClipboard(qrUrl));
        });
    }, 100);
}

function colorPicker() {
    openModal('Color Picker', `<div class="input-group"><label>Pick Color:</label><input type="color" id="colorPicker" value="#4f46e5"></div><div id="colorPreview" class="color-preview"></div><div class="input-group"><label>HEX:</label><input type="text" id="hexValue" readonly></div><div class="input-group"><label>RGB:</label><input type="text" id="rgbValue" readonly></div><button class="btn-secondary" id="copyColorBtn">Copy HEX</button>`);
    setTimeout(() => {
        const picker = document.getElementById('colorPicker');
        const preview = document.getElementById('colorPreview');
        const hexVal = document.getElementById('hexValue');
        const rgbVal = document.getElementById('rgbValue');
        function update() {
            const hex = picker.value;
            preview.style.backgroundColor = hex;
            hexVal.value = hex;
            const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
            rgbVal.value = `rgb(${r}, ${g}, ${b})`;
        }
        picker.addEventListener('input', update);
        update();
        document.getElementById('copyColorBtn')?.addEventListener('click', () => copyToClipboard(hexVal.value));
    }, 100);
}

function wordCounter() {
    openModal('Word Counter', `<div class="input-group"><label>Text:</label><textarea id="wordText" rows="8"></textarea></div><div id="wordResult"></div>`);
    setTimeout(() => {
        const textarea = document.getElementById('wordText');
        function count() {
            const text = textarea.value;
            const words = text.trim().split(/\s+/).filter(w=>w.length>0).length;
            const chars = text.length;
            const charsNoSpace = text.replace(/\s/g,'').length;
            document.getElementById('wordResult').innerHTML = `<div class="result-box"><p><strong>Words:</strong> ${words}</p><p><strong>Characters:</strong> ${chars}</p><p><strong>Chars (no space):</strong> ${charsNoSpace}</p></div>`;
        }
        textarea.addEventListener('input', count);
        count();
    }, 100);
}

function randomUser() {
    const first = ['James','John','Robert','Michael','William','David','Mary','Patricia','Jennifer','Linda'];
    const last = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez'];
    openModal('Random User', `<div class="input-group"><label>Number:</label><input type="number" id="userCount" value="3" min="1" max="10"></div><button class="btn-primary" id="genUserBtn">Generate</button><div id="userResult"></div>`);
    setTimeout(() => {
        document.getElementById('genUserBtn')?.addEventListener('click', () => {
            const count = parseInt(document.getElementById('userCount').value);
            let html = '<div class="result-box">';
            for (let i=0; i<count; i++) {
                const f = first[Math.floor(Math.random()*first.length)];
                const l = last[Math.floor(Math.random()*last.length)];
                const email = `${f.toLowerCase()}.${l.toLowerCase()}${Math.floor(Math.random()*999)}@gmail.com`;
                html += `<p><strong>${f} ${l}</strong><br>📧 ${email}<br>📞 (${Math.floor(Math.random()*900)+100}) ${Math.floor(Math.random()*900)+100}-${Math.floor(Math.random()*9000)+1000}</p><hr>`;
            }
            html += `<button class="btn-secondary" id="copyUserBtn">Copy</button></div>`;
            document.getElementById('userResult').innerHTML = html;
            document.getElementById('copyUserBtn')?.addEventListener('click', () => copyToClipboard(document.getElementById('userResult').innerText));
        });
    }, 100);
}

function uuidGenerator() {
    function uuid() { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random()*16|0; const v = c==='x'?r:(r&0x3|0x8); return v.toString(16); }); }
    openModal('UUID Generator', `<div class="input-group"><label>Count:</label><input type="number" id="uuidCount" value="5" min="1" max="20"></div><button class="btn-primary" id="genUuidBtn">Generate</button><div id="uuidResult"></div>`);
    setTimeout(() => {
        document.getElementById('genUuidBtn')?.addEventListener('click', () => {
            const count = parseInt(document.getElementById('uuidCount').value);
            let html = '<div class="result-box"><div class="batch-list">';
            const uuids = [];
            for (let i=0; i<count; i++) { const u = uuid(); uuids.push(u); html += `<div class="batch-item">${u}</div>`; }
            html += `</div><button class="btn-secondary" id="copyUuidBtn">Copy</button></div>`;
            document.getElementById('uuidResult').innerHTML = html;
            document.getElementById('copyUuidBtn')?.addEventListener('click', () => copyToClipboard(uuids.join('\n')));
        });
    }, 100);
}

function ipLookup() {
    openModal('IP Lookup', `<button class="btn-primary" id="getIpBtn">Get My IP</button><div id="ipResult"></div>`);
    setTimeout(() => {
        document.getElementById('getIpBtn')?.addEventListener('click', async () => {
            try {
                const res = await fetch('https://api.ipify.org?format=json');
                const data = await res.json();
                document.getElementById('ipResult').innerHTML = `<div class="result-box"><p>Your IP: <strong>${data.ip}</strong></p><button class="btn-secondary" id="copyIpBtn">Copy</button></div>`;
                document.getElementById('copyIpBtn')?.addEventListener('click', () => copyToClipboard(data.ip));
            } catch(e) { showToast('Failed', 'error'); }
        });
    }, 100);
}

function textCase() {
    openModal('Text Case', `<div class="input-group"><label>Text:</label><textarea id="caseText" rows="6"></textarea></div><div style="display:flex; gap:8px; flex-wrap:wrap;"><button class="btn-primary" id="upperCaseBtn">UPPERCASE</button><button class="btn-primary" id="lowerCaseBtn">lowercase</button><button class="btn-secondary" id="titleCaseBtn">Title Case</button></div><div id="caseResult"></div>`);
    setTimeout(() => {
        const ta = document.getElementById('caseText');
        const res = document.getElementById('caseResult');
        function show(text) { res.innerHTML = `<div class="result-box"><p>${text}</p><button class="btn-secondary" id="copyCaseBtn">Copy</button></div>`; document.getElementById('copyCaseBtn')?.addEventListener('click', () => copyToClipboard(text)); }
        document.getElementById('upperCaseBtn')?.addEventListener('click', () => show(ta.value.toUpperCase()));
        document.getElementById('lowerCaseBtn')?.addEventListener('click', () => show(ta.value.toLowerCase()));
        document.getElementById('titleCaseBtn')?.addEventListener('click', () => show(ta.value.toLowerCase().split(' ').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ')));
    }, 100);
}

function timestampConverter() {
    openModal('Timestamp', `<div class="input-group"><label>Unix Timestamp:</label><input type="number" id="tsInput"></div><button class="btn-primary" id="tsToDateBtn">Convert</button><div id="tsResult"></div><hr><button class="btn-primary" id="currentTsBtn">Get Current</button><div id="currentTsResult"></div>`);
    setTimeout(() => {
        document.getElementById('tsToDateBtn')?.addEventListener('click', () => {
            const ts = parseInt(document.getElementById('tsInput').value);
            if (isNaN(ts)) { showToast('Enter timestamp', 'error'); return; }
            const date = new Date(ts * 1000);
            document.getElementById('tsResult').innerHTML = `<div class="result-box"><p>${date.toString()}</p><button class="btn-secondary" id="copyTsBtn">Copy</button></div>`;
            document.getElementById('copyTsBtn')?.addEventListener('click', () => copyToClipboard(date.toString()));
        });
        document.getElementById('currentTsBtn')?.addEventListener('click', () => {
            const now = Math.floor(Date.now() / 1000);
            document.getElementById('currentTsResult').innerHTML = `<div class="result-box"><p>Current: <strong>${now}</strong></p><button class="btn-secondary" id="copyCurrentTsBtn">Copy</button></div>`;
            document.getElementById('copyCurrentTsBtn')?.addEventListener('click', () => copyToClipboard(now.toString()));
        });
    }, 100);
}

async function sha256Hash() {
    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2,'0')).join('');
    }
    openModal('SHA256', `<div class="input-group"><label>Text:</label><input type="text" id="shaText"></div><button class="btn-primary" id="genShaBtn">Generate</button><div id="shaResult"></div>`);
    setTimeout(() => {
        document.getElementById('genShaBtn')?.addEventListener('click', async () => {
            const hash = await sha256(document.getElementById('shaText').value);
            document.getElementById('shaResult').innerHTML = `<div class="result-box"><p>${hash}</p><button class="btn-secondary" id="copyShaBtn">Copy</button></div>`;
            document.getElementById('copyShaBtn')?.addEventListener('click', () => copyToClipboard(hash));
        });
    }, 100);
}

function regexTester() {
    openModal('Regex Tester', `<div class="input-group"><label>Pattern:</label><input type="text" id="regexPattern" placeholder="\\d+"></div><div class="input-group"><label>Text:</label><textarea id="regexText" rows="6"></textarea></div><button class="btn-primary" id="testRegexBtn">Test</button><div id="regexResult"></div>`);
    setTimeout(() => {
        document.getElementById('testRegexBtn')?.addEventListener('click', () => {
            try {
                const regex = new RegExp(document.getElementById('regexPattern').value, 'g');
                const text = document.getElementById('regexText').value;
                const matches = text.match(regex);
                document.getElementById('regexResult').innerHTML = `<div class="result-box"><p>Matches: ${matches ? matches.length : 0}</p><p>Found: ${matches ? matches.join(', ') : 'none'}</p></div>`;
            } catch(e) { showToast('Invalid regex', 'error'); }
        });
    }, 100);
}

function htmlEncode() {
    openModal('HTML Encode', `<div class="input-group"><label>HTML:</label><textarea id="htmlText" rows="6"></textarea></div><button class="btn-primary" id="encodeHtmlBtn">Encode</button><button class="btn-secondary" id="decodeHtmlBtn">Decode</button><div id="htmlResult"></div>`);
    setTimeout(() => {
        document.getElementById('encodeHtmlBtn')?.addEventListener('click', () => {
            const encoded = document.getElementById('htmlText').value.replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'})[m]);
            document.getElementById('htmlResult').innerHTML = `<div class="result-box"><p>${encoded}</p><button class="btn-secondary" id="copyHtmlBtn">Copy</button></div>`;
            document.getElementById('copyHtmlBtn')?.addEventListener('click', () => copyToClipboard(encoded));
        });
        document.getElementById('decodeHtmlBtn')?.addEventListener('click', () => {
            const decoded = document.getElementById('htmlText').value.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
            document.getElementById('htmlResult').innerHTML = `<div class="result-box"><p>${decoded}</p><button class="btn-secondary" id="copyDecodeHtmlBtn">Copy</button></div>`;
            document.getElementById('copyDecodeHtmlBtn')?.addEventListener('click', () => copyToClipboard(decoded));
        });
    }, 100);
}

function slugifyTool() {
    openModal('Slugify', `<div class="input-group"><label>Text:</label><input type="text" id="slugText"></div><button class="btn-primary" id="slugifyBtn">Generate Slug</button><div id="slugResult"></div>`);
    setTimeout(() => {
        document.getElementById('slugifyBtn')?.addEventListener('click', () => {
            const slug = document.getElementById('slugText').value.toLowerCase().replace(/\s+/g,'-').replace(/[^\w\-]+/g,'').replace(/\-\-+/g,'-').replace(/^-/,'').replace(/-$/,'');
            document.getElementById('slugResult').innerHTML = `<div class="result-box"><p><strong>Slug:</strong> ${slug}</p><button class="btn-secondary" id="copySlugBtn">Copy</button></div>`;
            document.getElementById('copySlugBtn')?.addEventListener('click', () => copyToClipboard(slug));
        });
    }, 100);
}

function creditCardGen() {
    function luhn(card) { let sum=0, alt=false; for(let i=card.length-1; i>=0; i--){ let n=parseInt(card[i]); if(alt){ n*=2; if(n>9) n=(n%10)+1; } sum+=n; alt=!alt; } return sum%10===0; }
    function genCard(bin, len) { let card=bin; for(let i=card.length; i<len-1; i++) card+=Math.floor(Math.random()*10); for(let i=0; i<=9; i++) if(luhn(card+i)) return card+i; return card+'0'; }
    openModal('Credit Card (Test)', `<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> FOR TESTING ONLY</div><div class="input-group"><label>Count:</label><input type="number" id="cardCount" value="3" min="1" max="10"></div><button class="btn-primary" id="genCardBtn">Generate</button><div id="cardResult"></div>`);
    setTimeout(() => {
        document.getElementById('genCardBtn')?.addEventListener('click', () => {
            const count = parseInt(document.getElementById('cardCount').value);
            const bins = ['4','5','6','3'];
            let html = '<div class="result-box"><div class="batch-list">';
            const cards = [];
            for(let i=0; i<count; i++) { const card = genCard(bins[Math.floor(Math.random()*bins.length)], 16); cards.push(card); html += `<div class="batch-item">${card}</div>`; }
            html += `</div><button class="btn-secondary" id="copyCardBtn">Copy</button><p style="font-size:0.7rem; margin-top:10px;">⚠️ Test numbers only</p></div>`;
            document.getElementById('cardResult').innerHTML = html;
            document.getElementById('copyCardBtn')?.addEventListener('click', () => copyToClipboard(cards.join('\n')));
        });
    }, 100);
}

// Map tool names to functions
const toolFunctions = {
    discordspawner: discordSpawner,
    webhookspawner: webhookSpawner,
    discordcloner: discordCloner,
    dumper: websiteDumper,
    converter: mediaConverter,
    passwordgen: passwordGen,
    binary: textToBinary,
    base64: base64Tool,
    urlencoder: urlEncoder,
    md5: md5Generator,
    json: jsonFormatter,
    lorem: loremIpsum,
    qrcode: qrGenerator,
    colorpicker: colorPicker,
    wordcounter: wordCounter,
    randomuser: randomUser,
    uuid: uuidGenerator,
    ipinfo: ipLookup,
    cases: textCase,
    timestamp: timestampConverter,
    hash: sha256Hash,
    regex: regexTester,
    htmlencode: htmlEncode,
    slug: slugifyTool,
    creditcard: creditCardGen
};

// Add click handlers to all tool cards
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => {
        const tool = card.dataset.tool;
        if (toolFunctions[tool]) toolFunctions[tool]();
        else showToast('Tool coming soon!', 'info');
    });
});

// Staff and Admins
const staffMembers = [
    { name: "Black_Shock", role: "STAFF", gifUrl: "https://r2.fivemanage.com/LTzCowpSGsQqAkmQrMwLF/mebers.gif" },
    { name: "Black_Mustafa", role: "SENIOR DEV", gifUrl: "https://r2.fivemanage.com/LTzCowpSGsQqAkmQrMwLF/mebers.gif" },
    { name: "Black_Milaad", role: "BOT ARCH", gifUrl: "https://r2.fivemanage.com/LTzCowpSGsQqAkmQrMwLF/mebers.gif" }
];
function loadStaff() {
    const grid = document.getElementById('staffGrid');
    if (grid) {
        grid.innerHTML = staffMembers.map(s => `
            <div class="staff-card">
                <img src="${s.gifUrl}" class="staff-gif-avatar">
                <div class="staff-name">${s.name}</div>
                <div class="staff-role">${s.role}</div>
            </div>
        `).join('');
    }
}
const adminNames = ["Black_osman", "Black_ceo", "Black_boyka", "Black_ice", "Black_asman", "Black_canpc", "Black_ARYAN", "Black_ace", "Black_hamza", "Black_mudaser"];
function loadAdmins() {
    const grid = document.getElementById('adminsGrid');
    if (grid) {
        grid.innerHTML = adminNames.map(name => `
            <div class="admin-card">
                <img src="https://r2.fivemanage.com/LTzCowpSGsQqAkmQrMwLF/mebers.gif">
                <h4>${name}</h4>
                <p>Admin</p>
            </div>
        `).join('');
    }
}

// Join buttons
document.getElementById('heroJoinBtn')?.addEventListener('click', () => window.open('https://discord.gg/FS3pthJh6a', '_blank'));
document.getElementById('heroWelcomeBtn')?.addEventListener('click', () => showToast('Welcome to BLACK TEAM!', 'success'));
document.getElementById('joinWelcomeBtn')?.addEventListener('click', () => showToast('Welcome to BLACK TEAM!', 'success'));

// Initialize
loadStaff();
loadAdmins();