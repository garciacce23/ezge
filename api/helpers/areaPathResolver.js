class AreaPathResolver {
    getWishlistPath(area) {
        const paths = {
            'A1': 'content[0].content[1].content[0].content[2].content[0].content[0].tabs[0].content[0].items',
            'A2': 'content[0].content[1].content[0].content[2].content[0].content[0].tabs[1].content[0].items',
            'A3': 'content[0].content[1].content[0].content[2].content[0].content[0].tabs[2].content[0].items',
            'B4': 'content[0].content[1].content[0].content[2].content[0].content[0].tabs[3].content[0].items',
            'B1': 'content[1].content[1].content[0].content[2].content[0].content[0].tabs[0].content[0].items',
            'B2': 'content[1].content[1].content[0].content[2].content[0].content[0].tabs[1].content[0].items',
            'C1': 'content[1].content[2].content[0].content[2].content[0].content[0].tabs[0].content[0].items',
            'C2': 'content[1].content[2].content[0].content[2].content[0].content[0].tabs[1].content[0].items',
            'C12': 'content[1].content[2].content[0].content[2].content[0].content[0].tabs[2].content[0].items',
            'D1': 'content[1].content[3].content[0].content[2].content[0].content[0].tabs[0].content[0].items',
            'D2': 'content[1].content[3].content[0].content[2].content[0].content[0].tabs[1].content[0].items',
            'E': 'content[1].content[4].content[0].content[2].content[0].content[0].items',
            'F': 'content[1].content[5].content[0].content[2].content[0].content[0].items',
        };

        return paths[area] || null;
    }
    getAreaPath(area) {
        const paths = {
            'A1': 'content[0].content[1].content[0].content[1].items[0]',
            'A2': 'content[0].content[1].content[0].content[1].items[1]',
            'A3': 'content[0].content[1].content[0].content[1].items[2]',
            'B4': 'content[0].content[1].content[0].content[1].items[3]',
            'B1': 'content[0].content[1].content[0].content[1].items[0]',
            'B2': 'content[1].content[1].content[0].content[1].items[1]',
            'C1': 'content[1].content[2].content[0].content[1].items[0]',
            'C2': 'content[1].content[2].content[0].content[1].items[1]',
            'C12': 'content[1].content[2].content[0].content[1].items[2]',
            'D1': 'content[1].content[3].content[0].content[1].items[0]',
            'D2': 'content[1].content[3].content[0].content[1].items[1]',
            'E': 'content[1].content[4].content[0].content[1].items[0]',
            'F': 'content[1].content[5].content[0].content[1].items[0]',
        };
        console.log(`GOT AREA: ${area} and path: ${paths[area]}`);
        return paths[area] || null;
    }
}

module.exports = AreaPathResolver;