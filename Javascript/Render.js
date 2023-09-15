"use strict";

let scale = 30;

function Paint()
{
  for (let x = 0; x < gridSize; x++)
  {
    for (let y = 0; y < gridSize; y++)
    {
      if (grid[x][y] == 0)
      {
        context.fillStyle = "black";
        context.fillRect(x * scale, y * scale, scale - 0, scale - 0);
      }
      else if (grid[x][y] == 1)
      {
        context.fillStyle = "green";
        context.fillRect(x * scale, y * scale, scale - 0, scale - 0);
      }
    }
  }
}
