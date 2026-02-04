/**
 * STORY_CONFIG
 * Defines the narrative graph, text, images, and branching logic.
 * Follows JSON structure from PRD Section 5.2 & 13
 */

const STORY_CONFIG = {
    "start_node": "stage1",
    "nodes": {
        "stage1": {
            "image": "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
            "wittyLine": "Are you ready for an adventure?",
            "question": "Shall we begin our journey together?",
            "yes_target": "stage2_romantic",
            "no_target": "stage2_playful",
            "isTerminal": false
        },
        "stage2_romantic": {
            "image": "https://media.giphy.com/media/26tPqTOGf3MMAaJR6/giphy.gif",
            "wittyLine": "You chose love. How perfect.",
            "question": "Will you be my Valentine?",
            "yes_target": "ending_yes",
            "no_target": "ending_no",
            "isTerminal": false
        },
        "stage2_playful": {
            "image": "https://media.giphy.com/media/l0HlCqv0jnOM8zUqY/giphy.gif",
            "wittyLine": "Playing hard to get? I like it.",
            "question": "Okay but seriously, Valentine?",
            "yes_target": "ending_yes",
            "no_target": "ending_no",
            "isTerminal": false
        },
        "ending_yes": {
            "image": "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyU/giphy.gif",
            "wittyLine": "You said yes! I love you to infinity! 💖",
            "question": "",
            "yes_target": null,
            "no_target": null,
            "isTerminal": true
        },
        "ending_no": {
            "image": "https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif",
            "wittyLine": "Wait, you actually clicked No? 😮",
            "question": "The No button must be broken. Try Yes instead?",
            "yes_target": "ending_yes",
            "no_target": "ending_no",
            "isTerminal": false
        }
    }
};

/**
 * Validates the story configuration for structural integrity
 * PRD Reference: Section 10 - Security and Privacy
 */
function validateStoryConfig(config) {
    const errors = [];
    
    // Check if start_node exists
    if (!config.start_node) {
        errors.push("Missing start_node in configuration");
    } else if (!config.nodes[config.start_node]) {
        errors.push(`start_node "${config.start_node}" does not exist in nodes`);
    }
    
    // Validate each node
    const nodeIds = Object.keys(config.nodes);
    const requiredProps = ['image', 'wittyLine', 'question', 'yes_target', 'no_target', 'isTerminal'];
    
    for (const nodeId of nodeIds) {
        const node = config.nodes[nodeId];
        
        // Check required properties
        for (const prop of requiredProps) {
            if (!(prop in node)) {
                errors.push(`Node "${nodeId}" missing required property: ${prop}`);
            }
        }
        
        // Validate target nodes exist (if not null)
        if (node.yes_target !== null && !config.nodes[node.yes_target]) {
            errors.push(`Node "${nodeId}" yes_target "${node.yes_target}" does not exist`);
        }
        
        if (node.no_target !== null && !config.nodes[node.no_target]) {
            errors.push(`Node "${nodeId}" no_target "${node.no_target}" does not exist`);
        }
        
        // Terminal nodes should have null targets
        if (node.isTerminal) {
            if (node.yes_target !== null || node.no_target !== null) {
                console.warn(`Warning: Terminal node "${nodeId}" has non-null targets`);
            }
        }
    }
    
    // Detect unreachable nodes
    const reachableNodes = new Set();
    const visited = new Set();
    
    function traverse(nodeId) {
        if (!nodeId || visited.has(nodeId)) return;
        visited.add(nodeId);
        reachableNodes.add(nodeId);
        
        const node = config.nodes[nodeId];
        if (node) {
            traverse(node.yes_target);
            traverse(node.no_target);
        }
    }
    
    traverse(config.start_node);
    
    for (const nodeId of nodeIds) {
        if (!reachableNodes.has(nodeId)) {
            console.warn(`Warning: Node "${nodeId}" is unreachable from start_node`);
        }
    }
    
    // Return validation result
    if (errors.length > 0) {
        console.error("Story Configuration Errors:", errors);
        return {
            valid: false,
            errors: errors
        };
    }
    
    console.log("✅ Story configuration validated successfully");
    return {
        valid: true,
        errors: []
    };
}

// Run validation on load
const validationResult = validateStoryConfig(STORY_CONFIG);

if (!validationResult.valid) {
    alert("Configuration Error: The story file has errors. Check console for details.");
}
