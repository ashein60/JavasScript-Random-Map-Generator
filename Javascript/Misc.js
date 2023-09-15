"use strict";

class Misc
{
  static GetRandomNumber(min, max) //inclusive, exclusive
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
