"use strict";

//0 = wall, 1 = ground

let grid;
let gridSize;

let levelOneGridSize = 20;

function InitializeGrid()
{
  grid = [gridSize];

  for (let x = 0; x < gridSize; x++)
  {
    grid[x] = [gridSize];
    for (let y = 0; y < gridSize; y++)
    {
      grid[x][y] = 0;
    }
  }
}
function CreateRandomIslands(groundCount)
{
  let x, y;
  let isWall;
  let count;

  for (let i = 0; i < groundCount; i++)
  {
    isWall = false;
    count = 0;

    do
    {
      x = Misc.GetRandomNumber(0, gridSize);
      y = Misc.GetRandomNumber(0, gridSize);

      if (grid[x][y] == 0)
      {
        isWall = true;

        GroundToIsland(x, y);
      }
      if (count >= 50)
      {
        return;
      }

      count ++;
    } while (!isWall);
  }
}
function GroundToIsland(x, y)
{
  grid[x][y] = -1; //Ground header

  let rand = Misc.GetRandomNumber(0, 5);

  switch (rand)
  {
    case 0: //2x2
      ToGround(x + 1, y);
      ToGround(x, y + 1);
      ToGround(x + 1, y + 1);
      break;
    case 1: //2x1
      ToGround(x + 1, y);
      break;
    case 2: //1x2
      ToGround(x, y + 1);
      break;
    case 3: //3x2
      ToGround(x + 1, y);
      ToGround(x + 2, y);
      ToGround(x, y + 1);
      ToGround(x + 1, y + 1);
      ToGround(x + 2, y + 1);
      break;
    case 4: //2x3
      ToGround(x + 1, y);
      ToGround(x, y + 1);
      ToGround(x + 1, y + 1);
      ToGround(x, y + 2);
      ToGround(x + 1, y + 2);
      break;
  }
}

function CombineIslands()
{
  //Combine the Islands
  let startX, startY, endX, endY;
  let foundStart = false;

  for (let y = 0; y < gridSize; y++)
  {
    for (let x = 0; x < gridSize; x++)
    {
      if (grid[x][y] == -1)
      {
        if (!foundStart)
        {
          foundStart = true;
          startX = x;
          startY = y;
        }
        else
        {
          endX = x;
          endY = y;

          ConnectHeadToHead(startX, startY, endX, endY);

          startX = endX;
          startY = endY;
        }
      }
    }
  }
}
function ConnectHeadToHead(startX, startY, endX, endY)
{
  if (Misc.GetRandomNumber(0, 2) == 0) //Vert first
  {
    CreateGroundLine(startY, endY, startX, true);
    CreateGroundLine(startX, endX, endY, false);
  }
  else //Horz first
  {
    CreateGroundLine(startX, endX, startY, false);
    CreateGroundLine(startY, endY, endX, true);
  }
}
function CreateGroundLine(start, end, constant, isVertical)
{
  if (start > end)
  {
    let temp = start;
    start = end;
    end = temp;
  }

  if (isVertical)
  {
    for (let i = start; i <= end; i++)
    {
      grid[constant][i] = 1;
    }
  }
  else
  {
    for (let i = start; i <= end; i++)
    {
      grid[i][constant] = 1;
    }
  }
}

function ToGround(x, y)
{
  if (x >= 0 && y >= 0 && x < gridSize && y < gridSize)
  {
    grid[x][y] = 1;
  }
}
function InBounds(x, y)
{
  if (x >= 0 && y >= 0 && x < gridSize && y < gridSize)
  {
    return true;
  }
  else
  {
    return false;
  }
}
//______________________________________________________________________________Level One

function CreateLevelOne()
{
  gridSize = levelOneGridSize;

  InitializeGrid();
  CreateRandomIslands(50);
  CombineIslands();
}
