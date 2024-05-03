document.addEventListener('DOMContentLoaded', function() {
    var body = document.body;
    var tiles = ['utrcraft/tiles/dirt.png', 'utrcraft/tiles/brick.png', 'utrcraft/tiles/wood.png', /* Add more tile paths as needed */];
    
    // Adjust the number of tiles you want on the background
    var numTiles = 100;

    // Loop to create and position random tiles
    for (var i = 0; i < numTiles; i++) {
        var randomTileIndex = Math.floor(Math.random() * tiles.length);
        var randomTile = tiles[randomTileIndex];
        
        var tile = new Image();
        tile.src = randomTile;
        tile.classList.add('tile'); // Optional if you want to apply styles
        
        // Randomly position the tile
        tile.style.position = 'absolute';
        tile.style.left = Math.random() * 100 + '%';
        tile.style.top = Math.random() * 100 + '%';

        body.appendChild(tile);
    }
});
