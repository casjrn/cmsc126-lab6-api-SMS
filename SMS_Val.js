fetch ("https://valorant-api.com/v1/agents?isPlayableCharacter=true") //isPlayableCharacter=true is used to not have duplicate Sova (based on the documentation)
    .then (response => {
        return response.json()
    })
    .then (res => {
        const agents = res.data;

        const agentNames = agents.map(agent => agent.displayName);
        const agentRoles = agents.map(agent => agent.role?.displayName || "N/A");
        const agentIcons = agents.map(agent => agent.displayIcon); // smaill icons only
        const agentPortrait = agents.map(agent => agent.fullPortrait); // full body portrait of each agent

        // list of abilities for each agent
        const agentAbilities = agents.map(agent => 
            agent.abilities.map(a => a.displayName)
        );
    })