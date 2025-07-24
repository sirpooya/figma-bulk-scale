// Command: Set constraints to scale for selected layers
function setConstraintsToScale() {
    if (figma.currentPage.selection.length === 0) {
        figma.notify("Please select at least one layer");
        return;
    }
    
    const constraints = {
        horizontal: "SCALE",
        vertical: "SCALE"
    };
    
    let updatedCount = 0;
    
    // Recursive function to update constraints for a node and all its children
    function updateNodeConstraints(node) {
        try {
            // Update constraints for any node that supports constraints
            if ("constraints" in node) {
                node.constraints = constraints;
                updatedCount++;
            }
            
            // Recursively check children if the node has any
            if ("children" in node && node.children) {
                for (const child of node.children) {
                    updateNodeConstraints(child);
                }
            }
        } catch (error) {
            console.log("Could not set constraints for node:", error);
        }
    }
    
    // Process all selected nodes
    for (const node of figma.currentPage.selection) {
        updateNodeConstraints(node);
    }
    
    if (updatedCount > 0) {
        figma.notify(`Set scale constraints for ${updatedCount} layers`);
    } else {
        figma.notify("No compatible layers found for constraint changes");
    }
}

// Run the set-constraints-scale command
setConstraintsToScale();
figma.closePlugin();
