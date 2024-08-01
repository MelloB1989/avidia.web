const parseModuleContent = (response) => {
    const blocks = [];
    let currentIndex = 0;
    
    while (currentIndex < response.length) {
        // Determine which type appears next and its starting index
        const nextType = ['TEXT', 'SSML', 'CODE'].reduce((next, type) => {
            const typeIndex = response.indexOf(type + ':', currentIndex);
            if (typeIndex !== -1 && (next === null || typeIndex < next.index)) {
                return { type, index: typeIndex };
            }
            return next;
        }, null);

        if (!nextType) break;  // If none of the types are found, exit loop

        // Find the index of the next type after the current one to determine the end of the current block
        const nextTypeAfterCurrent = ['TEXT', 'SSML', 'CODE'].reduce((next, type) => {
            const typeIndex = response.indexOf(type + ':', nextType.index + nextType.type.length);
            if (typeIndex !== -1 && (next === null || typeIndex < next.index)) {
                return { type, index: typeIndex };
            }
            return next;
        }, null);

        // Extract the content block
        const contentEndIndex = nextTypeAfterCurrent ? nextTypeAfterCurrent.index : undefined;
        const content = response.substring(nextType.index + nextType.type.length + 1, contentEndIndex).trim();
        blocks.push({ type: nextType.type, content });

        currentIndex = nextType.index + nextType.type.length + content.length + 1;
    }

    return blocks;
}

module.exports = parseModuleContent;