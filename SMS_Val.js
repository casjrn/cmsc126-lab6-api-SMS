document.addEventListener("DOMContentLoaded", () => {
    let allAgents = []; //array for agents mainly for search function

    const agentList = document.getElementById('agent-list');
    const searchInput = document.querySelector('input[type="text"]');
    const abilitiesContainer = document.getElementById('abilities-container');
    
    const abilityNameDisplay = document.getElementById('ability-name-display');
    const abilityDescDisplay = document.getElementById('ability-desc-display');

    async function getAgents() {
        try {
            const response = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true"); //isPlayableCharacter=true so only 1 Sova will appear based on documentation
            console.log("Response:", response);
            const data = await response.json();
            console.log("Agent Data:", data);

            allAgents = data.data;
            displayAgents (allAgents);
            if(allAgents.length > 0) renderAgent(allAgents[0]);
        }   
        catch (error) {
            console.error("Error fetching agents:", error);
        }
        };
    

    getAgents();
    // search function
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = allAgents.filter(a => a.displayName.toLowerCase().includes(value));
        displayAgents(filtered);
    });

    function displayAgents(agents) {
        agentList.innerHTML = '';
        agents.forEach(agent => {
            const card = document.createElement('div');
            card.className = "agent-card aspect-square bg-slate-800 border border-slate-700 hover:border-white cursor-pointer transition-all overflow-hidden";
            card.innerHTML = `<img src="${agent.displayIcon}" class="w-full h-full object-cover">`;
            
            card.onclick = () => {
                //remove selected indication 
                document.querySelectorAll('.agent-card').forEach(c => c.classList.remove('selected'));
                //mark the selected agent
                card.classList.add('selected');
                renderAgent(agent);
            };
            agentList.appendChild(card);
        });
    }

    function renderAgent(agent) {
        document.getElementById('agent-name').innerText = agent.displayName;
        document.getElementById('agent-role').innerText = agent.role?.displayName || "N/A";
        document.getElementById('main-portrait').src = agent.fullPortrait;

        abilitiesContainer.innerHTML = '';
        // reset description box when a new agent is selected
        abilityNameDisplay.innerText = "Select an Ability";
        abilityDescDisplay.innerText = "";

        agent.abilities.forEach(ability => {
            if (ability.displayIcon) {
                const img = document.createElement('img');
                img.src = ability.displayIcon;
                img.className = "ability-icon w-12 h-12 p-2 bg-white/10 border border-white/20 hover:bg-red-500/20 cursor-pointer";
        
                img.onclick = () => {
                    document.querySelectorAll('.ability-icon').forEach(icon => {
                        icon.classList.remove('selected');
                    });

                    img.classList.add('selected');

                    document.getElementById('ability-name-display').innerText = ability.displayName;
                    document.getElementById('ability-desc-display').innerText = ability.description;
                };

                abilitiesContainer.appendChild(img);
            }
        });
    }
});