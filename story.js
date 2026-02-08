/**
 * STORY_CONFIG
 * Defines the narrative graph, text, images, and branching logic.
 * Follows JSON structure from PRD Section 5.2 & 13
 *
 * IMAGE NAMING: Place images in the images/ directory. Use filenames matching node IDs:
 *   stage1.gif, stage2_romantic.gif, stage2_playful.gif, stage_yes_bridge.gif,
 *   no_stage_1.gif ... no_stage_5.gif, ending_yes.gif, ending_no.gif
 * Extensions can be .gif, .jpg, or .png - update the image field per node as needed.
 * Optional imageFallback: URL used when local image fails (e.g. before you add images).
 *
 * WITTY LINES: Use "wittyLine" (string) for a single line, or "wittyLines" (array)
 * for multiple options - one is picked randomly at runtime.
 */

const STORY_CONFIG = {
    "start_node": "stage1",
    "nodes": {
        "stage1": {
            "image": "images/stage1.gif",
            "imageFallback": "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
            "wittyLines": [
                "Are you ready for an adventure?",
                "Ready to begin something special?",
                "Let's start our journey together."
            ],
            "question": "Shall we begin our journey together?",
            "yes_target": "stage2_romantic",
            "no_target": "stage2_playful",
            "isTerminal": false
        },
        "stage2_romantic": {
            "image": "images/stage2_romantic.gif",
            "imageFallback": "https://media.giphy.com/media/26tPqTOGf3MMAaJR6/giphy.gif",
            "wittyLines": [
                "You chose love. How perfect.",
                "Love it is. Naturally.",
                "Perfect choice."
            ],
            "question": "Will you be my Valentine?",
            "yes_target": "stage_yes_bridge",
            "no_target": "no_stage_1",
            "isTerminal": false
        },
        "stage2_playful": {
            "image": "images/stage2_playful.gif",
            "imageFallback": "https://media.giphy.com/media/l0HlCqv0jnOM8zUqY/giphy.gif",
            "wittyLines": [
                "Playing hard to get? I like it.",
                "So you want to play? Let's see.",
                "Alright, I see how it is."
            ],
            "question": "Okay but seriously, Valentine?",
            "yes_target": "stage_yes_bridge",
            "no_target": "no_stage_1",
            "isTerminal": false
        },
        "stage_yes_bridge": {
            "image": "images/stage_yes_bridge.gif",
            "imageFallback": "https://media.giphy.com/media/26tPqTOGf3MMAaJR6/giphy.gif",
            "wittyLines": [
                "One more step...",
                "Almost there!",
                "You're so close!"
            ],
            "question": "Ready to say yes for real?",
            "yes_target": "ending_yes",
            "no_target": "no_stage_1",
            "isTerminal": false
        },
        "no_stage_1": {
            "image": "images/no_stage_1.gif",
            "imageFallback": "https://media.giphy.com/media/l0HlCqv0jnOM8zUqY/giphy.gif",
            "wittyLines": [
                "Hmm, really?",
                "You sure about that?",
                "Okay, first No. Let's try again."
            ],
            "question": "How about now?",
            "yes_target": "ending_yes",
            "no_target": "no_stage_2",
            "isTerminal": false
        },
        "no_stage_2": {
            "image": "images/no_stage_2.gif",
            "imageFallback": "https://media.giphy.com/media/l0HlCqv0jnOM8zUqY/giphy.gif",
            "wittyLines": [
                "Two Nos? You're teasing me.",
                "Still playing hard to get?",
                "I'm not giving up."
            ],
            "question": "Yes? Pretty please?",
            "yes_target": "ending_yes",
            "no_target": "no_stage_3",
            "isTerminal": false
        },
        "no_stage_3": {
            "image": "images/no_stage_3.gif",
            "imageFallback": "https://media.giphy.com/media/l0HlCqv0jnOM8zUqY/giphy.gif",
            "wittyLines": [
                "Three strikes... but I'm persistent.",
                "Alright, round three.",
                "I have all day."
            ],
            "question": "Third time's the charm?",
            "yes_target": "ending_yes",
            "no_target": "no_stage_4",
            "isTerminal": false
        },
        "no_stage_4": {
            "image": "images/no_stage_4.gif",
            "imageFallback": "https://media.giphy.com/media/l0HlCqv0jnOM8zUqY/giphy.gif",
            "wittyLines": [
                "Fourth No? You're committed.",
                "Okay okay, one more try.",
                "I'm not going anywhere."
            ],
            "question": "Last chance before the finale...",
            "yes_target": "ending_yes",
            "no_target": "no_stage_5",
            "isTerminal": false
        },
        "no_stage_5": {
            "image": "images/no_stage_5.gif",
            "imageFallback": "https://media.giphy.com/media/l0HlCqv0jnOM8zUqY/giphy.gif",
            "wittyLines": [
                "Fifth No! You're relentless.",
                "Okay, you win. Almost.",
                "One. More. Try."
            ],
            "question": "Final question — Yes or No?",
            "yes_target": "ending_yes",
            "no_target": "ending_no",
            "isTerminal": false
        },
        "ending_yes": {
            "image": "images/ending_yes.gif",
            "imageFallback": "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyU/giphy.gif",
            "wittyLine": "You said yes! I love you to infinity! 💖",
            "question": "",
            "yes_target": null,
            "no_target": null,
            "isTerminal": true
        },
        "ending_no": {
            "image": "images/ending_no.gif",
            "imageFallback": "https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif",
            "wittyLine": "Wait, you actually clicked No five times? 😮",
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
    const requiredProps = ['image', 'question', 'yes_target', 'no_target', 'isTerminal'];
    
    for (const nodeId of nodeIds) {
        const node = config.nodes[nodeId];
        
        // wittyLine or wittyLines (at least one required)
        const hasWittyLine = typeof node.wittyLine === 'string' && node.wittyLine.length > 0;
        const hasWittyLines = Array.isArray(node.wittyLines) && node.wittyLines.length > 0;
        if (!hasWittyLine && !hasWittyLines) {
            errors.push(`Node "${nodeId}" must have "wittyLine" (string) or "wittyLines" (non-empty array)`);
        }
        if (hasWittyLines && !node.wittyLines.every(s => typeof s === 'string')) {
            errors.push(`Node "${nodeId}" wittyLines must contain only strings`);
        }
        
        // Check other required properties
        for (const prop of requiredProps) {
            if (!(prop in node)) {
                errors.push(`Node "${nodeId}" missing required property: ${prop}`);
            }
        }
        
        // For yesOnly nodes, no_target can be null
        const isYesOnly = node.yesOnly === true;
        if (isYesOnly && node.no_target !== null) {
            errors.push(`Node "${nodeId}" with yesOnly must have no_target: null`);
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
